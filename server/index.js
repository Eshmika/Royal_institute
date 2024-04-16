const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const multer = require('multer');

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch((err)=> console.log('Database not connected', err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use("/files", express.static("files")); //accessing files folder



app.use('/', require('./routes/authRouters'));
app.use('/', require('./routes/timetableRouter'));
app.use('/', require('./routes/InstituenoticeRouter'));
app.use('/', require('./routes/LessonMaterialRouter'));
app.use('/', require('./routes/paymentRouters'));
app.use('/', require('./routes/QA&FeedbackRouter'));

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

  // Modified route to handle file uploads
  app.post('/addmaterial', upload.single('file'), (req, res) => {
      
    const { filename} = req.file;

    // Create a new material document in MongoDB
    UserModelLesson.create({
        lesson_Files: filename, 
        lesson_topic: req.body.lesson_topic,
        lesson_fileType:req.body.lesson_fileType,
        lesson_date: req.body.lesson_date,
        lesson_description: req.body.lesson_description,
        class_id: req.body.class_id,
        teacher_id: req.body.teacher_id
        
    })
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
});




const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));