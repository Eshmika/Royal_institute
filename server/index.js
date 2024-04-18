const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch((err)=> console.log('Database not connected', err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));


app.use('/', require('./routes/authRouters'));
app.use('/', require('./routes/timetableRouter'));


const QuestionModel = require('./models/questions');
const TFeedbackModel = require('./models/teacherfeedback');
const SFeedbackModel = require('./models/servicefeedback');


//-------------Student side question-------------------------------------
//create question
app.post('/createQ',(req,res) => {
    QuestionModel.create(req.body)
    .then((data) =>{
        res.json(data);
    })
    .catch((err) =>{
        res.json(err);
    })
});

//all questions
app.get('/Myquestions', (req, res) => {
    QuestionModel.find()
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
});


//get questions to update
app.get('/getQuestion/:id', (req, res) =>{
    const id = req.params.id;
    QuestionModel.findById({_id:id})
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
});

//update question
app.put('/updateQuestion/:id',(req,res) => {
    const id = req.params.id;
    QuestionModel.findByIdAndUpdate({_id:id},{grade:req.body.grade,subject:req.body.subject,teacher:req.body.teacher,sid:req.body.sid,question:req.body.question})
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
});

//delete question
app.delete('/deleteQuestion/:id',(req,res) => {
    const id = req.params.id;
    QuestionModel.findByIdAndDelete({_id:id})
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
});


//-------------Teacher side question-------------------------------------

//get not anwered questions 
app.get('/getTQuestions', (req, res) => {
    QuestionModel.find({answer: {$exists: false}}).select('-answer')
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
});


//give the answer
app.get('/giveToAnswers/:id', (req, res) => {
    const { id } = req.params;
    QuestionModel.findById(id)
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
});

app.put('/getToAnswers/:id', (req, res) => {
    const { id } = req.params;
  const { answer } = req.body;
    QuestionModel.findByIdAndUpdate(id, { answer }, { new: true })
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
})

//show the answer in THQuestion

app.get('/questionsShow', (req, res) => {
    QuestionModel.find({answer: {$exists: true}}).exec()
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
});


//get Answer to update
app.get('/getAnswer/:id', (req, res) => {
    const id  = req.params.id;
    QuestionModel.findById({_id:id})
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
});


//update Answer
app.put('/updateAnswers/:id', (req, res) => {
    const id  = req.params.id;
 
    QuestionModel.findByIdAndUpdate({_id:id}, { answer :req.body.answer})
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
});

// delete answer
app.put('/deleteAnswer/:id', (req, res) => {
    const { id } = req.params;
    QuestionModel.findByIdAndUpdate(id, { $unset: { answer: 1 } }, { new: true })
    .then(questions => res.json(questions))
    .catch(err => res.json(err));
  });

  //faq dispaly
  
  app.get('/fAskQs', (req, res) => {
    QuestionModel.find({answer: {$exists: true}})
      .then(allQuestions => {
        const uniqueQuestions = new Set(); // Set to store unique questions
  
        // Filter out repeated questions and questions with empty answers
        const filteredQuestions = allQuestions.filter(QuestionModel => {
          if (!uniqueQuestions.has(QuestionModel.question) ) {
            uniqueQuestions.add(QuestionModel.question);
            return true; // Include this question
          }
          return false; // Skip repeated question or question with empty answer
        });
  
        res.json(filteredQuestions);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  

  //fAQ search option
  app.get('/fASearch', (req, res) => {
    let { grade, subject } = req.query;
    
    const query = { answer: { $exists: true } };

    // Check if grade is provided and convert to case-insensitive regular expression
    if (grade) {
        grade = new RegExp(grade, 'i');
        query.grade = grade;
    }

    // Check if subject is provided and convert to case-insensitive regular expression
    if (subject) {
        subject = new RegExp(subject, 'i');
        query.subject = subject;
    }

    QuestionModel.find(query)
      .then(allQuestions => {
        const uniqueQuestions = new Set(); // Set to store unique questions
  
        // Filter out repeated questions
        const filteredQuestions = allQuestions.filter(question => {
          if (!uniqueQuestions.has(question.question) ) {
            uniqueQuestions.add(question.question);
            return true; // Include this question
          }
          return false; // Skip repeated question
        });
  
        res.json(filteredQuestions);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
});
  
//----------------------------------------------------------------------------------------------------------

//create teacher feedback
app.post('/createTF',(req,res) => {
    TFeedbackModel.create(req.body)
    .then((data) =>{
        res.json(data);
    })
    .catch((err) =>{
        res.json(err);
    })
});

//create service feedback
app.post('/createSF',(req,res) => {
    SFeedbackModel.create(req.body)
    .then((data) =>{
        res.json(data);
    })
    .catch((err) =>{
        res.json(err);
    })
});

//get teacher feedbacks
app.get('/MyTFeedbacks', (req, res) => {
    TFeedbackModel.find()
    .then(tfeedbacks => res.json(tfeedbacks))
    .catch(err => res.json(err));
});

//get service feedbacks
app.get('/MySFeedbacks', (req, res) => {
    SFeedbackModel.find()
    .then(sfeedbacks => res.json(sfeedbacks))
    .catch(err => res.json(err));
});

//get teacher feedbck to update
app.get('/getTFeedback/:id', (req, res) =>{
    const id = req.params.id;
    TFeedbackModel.findById({_id:id})
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
});

//update teacher feedback
app.put('/updateTFeedback/:id',(req,res) => {
    const id = req.params.id;
    TFeedbackModel.findByIdAndUpdate({_id:id},{grade:req.body.grade,subject:req.body.subject,teacher:req.body.teacher,sid:req.body.sid,feedback:req.body.tfeedback},{ new: true })
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
});

//delete teacher feedback
app.delete('/deleteTFeedback/:id',(req,res) => {
    const id = req.params.id;
    TFeedbackModel.findByIdAndDelete({_id:id})
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
});

//get service feedback to update
app.get('/getSFeedback/:id', (req, res) =>{
    const id = req.params.id;
    SFeedbackModel.findById({_id:id})
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
});

//delete service feedback
app.delete('/deleteSFeedback/:id',(req,res) => {
    const id = req.params.id;
    SFeedbackModel.findByIdAndDelete({_id:id})
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
});

//update service feedback
app.put('/updateSFeedback/:id',(req,res) => {
    const id = req.params.id;
    SFeedbackModel.findByIdAndUpdate({_id:id},{grade:req.body.grade,feedback:req.body.sfeedbacks,date:req.body.date},{ new: true })
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
});

//-----------------------------------Manager side feedback(service feedback)------------------------------------
//get not anwered service feedback 
app.get('/getMFeedbacks', (req, res) => {
    SFeedbackModel.find({reply: {$exists: false}}).select('-reply')
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
});

//give the respponse
app.get('/giveToReply/:id', (req, res) => {
    const { id } = req.params;
    SFeedbackModel.findById(id)
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
});

app.put('/getToReply/:id', (req, res) => {
    const { id } = req.params;
  const { reply } = req.body;
  SFeedbackModel.findByIdAndUpdate(id, { reply }, { new: true })
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
})

//show the reply in ManagerFeedback

app.get('/feedbacksShow', (req, res) => {
    SFeedbackModel.find({reply: {$exists: true}}).exec()
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
});

//get reply to update
app.get('/getReply/:id', (req, res) => {
    const id  = req.params.id;
    SFeedbackModel.findById({_id:id})
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
});


//update reply
app.put('/updateReply/:id', (req, res) => {
    const id  = req.params.id;
 
    SFeedbackModel.findByIdAndUpdate({_id:id}, { reply :req.body.reply})
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
});

// delete reply
app.put('/deleteReply/:id', (req, res) => {
    const { id } = req.params;
    SFeedbackModel.findByIdAndUpdate(id, { $unset: { reply: 1 } }, { new: true })
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err));
  });
const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));