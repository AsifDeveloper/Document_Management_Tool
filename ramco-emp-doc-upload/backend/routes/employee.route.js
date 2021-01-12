let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  router = express.Router();

// Multer File upload settings
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    const fileFilterArray = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf', '.doc', '.docx', '.xls', '.xlsx'];
    if (fileFilterArray.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg, .jpeg, .doc, .docx, .xls, .xlsx format allowed!'));
    }
  }
});


// Document model
let Employee = require('../models/Employee');


// POST Documents
router.post('/create-document', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const employee = new Employee({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    tags: req.body.tags,
    document: req.file.filename,
    document_path: url + '/public/' + req.file.filename,

  });
  employee.save().then(result => {
    res.status(201).json({
      message: "Document uploaded successfully!",
      documentCreated: {
        _id: result._id,
        name: result.name,
        tags: result.tags,
        avatar: result.avatar
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})

// GET All Documents
router.get("/", (req, res, next) => {
  Employee.find().then(data => {
    res.status(200).json({
      message: "Documents retrieved successfully!",
      documents: data
    });
  });
});


module.exports = router;