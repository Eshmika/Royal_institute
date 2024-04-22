const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const multer = require('multer');
const UserModelLesson = require('./models/Lesson');
const BankModel = require('./models/BankPayments');
const SalaryModel = require('./models/Salary');
const PhotoModel = require('./models/ProfilePhoto');

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Database not connected', err));

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/files", express.static("files")); // Accessing files folder
app.use("/files2", express.static("files2")); // Accessing files folder2
app.use("/files3", express.static("files3")); // Accessing files folder3
app.use("/ProfilePhotos", express.static("ProfilePhotos")); // Accessing files folder

// Routes
app.use('/', require('./routes/authRouters'));
app.use('/', require('./routes/timetableRouter'));
app.use('/', require('./routes/InstituenoticeRouter'));
app.use('/', require('./routes/LessonMaterialRouter'));
app.use('/', require('./routes/paymentRouters'));
app.use('/', require('./routes/QA&FeedbackRouter'));
app.use('/', require('./routes/salaryRouters'));
app.use('/', require('./routes/classRouter'));
app.use('/', require('./routes/subjectRouter'));

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Initialize multer middleware
const upload = multer({ storage: storage });

// Route to handle file uploads for Lesson materials
app.post('/addmaterial', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { filename } = req.file;

  // Create a new material document in MongoDB
  UserModelLesson.create({
    lesson_Files: filename,
    lesson_topic: req.body.lesson_topic,
    lesson_fileType: req.body.lesson_fileType,
    lesson_date: req.body.lesson_date,
    lesson_description: req.body.lesson_description,
    subject_name: req.body.subject_name,
    grade: req.body.grade,
    teacher_id: req.body.teacher_id
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Route to get all materials
app.get('/showmaterials', (req, res) => {
  UserModelLesson.find()
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

// Route to get material by id
app.get('/getmaterial/:id', (req, res) => {
  const id = req.params.id;
  UserModelLesson.findById({ _id: id })
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

// Route to update material
app.put('/updatematerial/:id', (req, res) => {
  const id = req.params.id;
  UserModelLesson.findByIdAndUpdate({ _id: id }, {
    lesson_topic: req.body.lesson_topic,
    lesson_date: req.body.lesson_date,
    lesson_fileType: req.body.lesson_fileType,
    lesson_description: req.body.lesson_description,
  })
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

// Route to delete material
app.delete('/deletematerial/:id', (req, res) => {
  const id = req.params.id;
  UserModelLesson.findByIdAndDelete({ _id: id })
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

// Setup Multer for file uploads 2
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files2");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Initialize multer middleware 2
const upload2 = multer({ storage: storage2 });

// Route to handle file uploads for bank payments
app.post('/createbank', upload2.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { filename } = req.file;

  // Create a new bank document in MongoDB2
  BankModel.create({
    itnumber: req.body.itnumber,
    accountname: req.body.accountname,
    accountnumber: req.body.accountnumber,
    bankname: req.body.bankname,
    description: req.body.description,
    date: req.body.date,
    amount: req.body.amount,
    status: req.body.status,
    type: req.body.type,
    upload_files: filename
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
});



// Setup Multer for file uploads 3
const storage3 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files3");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Initialize multer middleware 3
const upload3 = multer({ storage: storage3 });

// Route to handle file uploads for bank payments
app.post('/createSalary', upload3.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { filename } = req.file;

  // Create a new bank document in MongoDB 3
  SalaryModel.create({

    TeacherName: req.body.TeacherName,
    TeacherID: req.body.TeacherID,
    SubjectName: req.body.SubjectName,
    Grade: req.body.Grade,
    AttendStudents: req.body.AttendStudents,
    FreeCardAmount: req.body.FreeCardAmount,
    InstitutePayment: req.body.InstitutePayment,
    MonthlySalary: req.body.MonthlySalary,
    Date: req.body.Date,
    upload_paymentFiles: filename

  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
});



// Setup Multer for profile photo uploads
const storage4 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./ProfilePhotos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Initialize multer middleware for photo uploads
const upload4 = multer({ storage: storage4 });

// Route to handle file uploads for profile photo
app.post('/addphoto', upload4.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { filename } = req.file;

  // Create a profile photo in MongoDB 
  PhotoModel.create({

    profile_photo: filename,
    student_id: req.body.student_id

  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.get("/getimage", async (req, res) => {
  try {
    PhotoModel.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});

// Route to delete Photo
app.delete('/deletephoto/:id', (req, res) => {
  const id = req.params.id;
  PhotoModel.findByIdAndDelete({ _id: id })
      .then(() => {
          res.status(200).json({ message: 'Photo deleted successfully' });
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
      });
});



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
