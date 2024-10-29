const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const bodyParser = require('body-parser');
const app = express();

const corsOptions = {
  origin: 'https://print-club-launch.vercel.app', // Replace with your frontend origin
  methods: 'GET,POST,OPTIONS',
  allowedHeaders: ['Content-Type'],
};


app.use(
  cors(corsOptions)
);
app.use(bodyParser.json());

const PORT=3000;


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "printclubworld@gmail.com",
      pass: "ejwm chjz nozp hjgb",
    },
  });
  
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
app.post("/sendwelcome",async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const htmlTemplate = await readFileAsync('./welcome.html', 'utf-8');
const imageAttachment = await readFileAsync('./logo.png');
    console.log(req.body.email)
    const mailOptions = {
        from: "printclubworld@gmail.com",
        to: req.body.email,
        subject: req.body.subject,
        html: htmlTemplate,
        attachments: [{
            filename: 'image.png',
            content: imageAttachment,
            encoding: 'base64',
            cid: 'logo', // Referenced in the HTML template
        }],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email");
        } else {
          console.log("Email sent");
        }
      });

})



app.get('/', (req, res) => {
    res.send('Successful response');
});



app.listen(PORT, () => console.log('Example app is listening on port 3000.'));


module.exports=app