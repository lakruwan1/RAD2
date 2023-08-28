var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
var cors = require('cors');


var bodyParser = require('body-parser');
var assignmentRoutes = require('./routes/Assignment');

var app = express();

var mongoose = require('mongoose');

var port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended:false
    })
)

app.use('/assignment', assignmentRoutes);

//file upload initializer
app.use(fileUpload());

app.post('/upload', (req, res) => {
    if(req.files === null){
        return res.status(400).json({msg: 'No file upload'});
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err){
            console.error(err);
            res.status(500).send(err);
        }
        res.json({fileName: file.name, filePath: `/uploads/${file.name}`})
    });
})

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

const mongoURI = 'mongodb://localhost:27017/Students';

mongoose.connect(mongoURI, { useNewUrlParser: true })
.then(()=> console.log('mongodb connected'))
.catch(err => console.log(err));

// mongoose.connect(mongoURI, { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true })
// .then(()=> console.log('mongodb connected'))
// .catch(err => console.log(err));



//new
// const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };

// mongoose
// .connect(mongoURI, connectionParams)
// .then(() => {
//     console.info("Connected to the db");
// })
// .catch((e)=> {
//     console.log("Error ", e);
// });

var Users = require('./routes/Users');

app.use('/users', Users);

app.listen(port, ()=> {
    console.log("Server is listening on port " + port);
})