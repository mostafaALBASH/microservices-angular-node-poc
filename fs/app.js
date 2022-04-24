const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors');
var nodemailer = require('nodemailer');
var fs = require('fs');

app.use(cors({ origin: true, credentials: true }));
var mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '*********@gmail.com',
    pass: '***********'
  }
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var result;

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8887');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.post('/api/base64', urlencodedParser, function (req, res) {
  
  console.log(req.body.email)
  if (!req.body.value) {
    
    
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    var  email = req.body.email
   
    console.log('file received');
    var base64Data = req.body.value.replace(/^data:image\/png;base64,/, "");
    require("fs").writeFile("out.png", base64Data, 'base64', async function (err) {
      let x = await err

      console.log(err);
      if (x === null) {
        var mailOptions = {
          from: 'elbeshpro@gmail.com',
          to: email,
          subject: 'Sending Email via a MicroS',
          text: `Greetings, \n Mostafa Elbesh`,
          attachments: [
            /*{   // stream as an attachment
              filename: 'text4.txt',
              content: fs.createReadStream('file.txt')
            },*/
            {   // encoded string as an attachment
              filename: 'image.png',
              content: base64Data,
              encoding: 'base64'
            }
          ]
        };

        mail.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            result = info.response;
            console.log('Email sent: ' + info.response);
          }
        });
      }
    });
    let content = base64Data
    let r = (Math.random() + 1).toString(36).substring(7);
    // writeFile function with filename, content and callback function
    fs.writeFile(r + 'newfile.txt', 'Learn Node FS module', function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    });
    // writeFile function with filename, content and callback function
    fs.writeFile(r + 'img.png', base64Data, 'base64', function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    });
    return res.send({
      result: result
    })

  }
});

//const PORT = process.env.PORT || 3000;
const PORT = 3000;

app.listen(PORT, function () {
  console.log('Node.js server is running on port ' + PORT);
});