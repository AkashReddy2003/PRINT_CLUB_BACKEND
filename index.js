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
  
  
app.post("/sendwelcome",async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', 'https://print-club-launch.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }


  const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <title>Welcome to Print Club!</title>
  <style>
    body {

      font-family: Montserrat, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #000000;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background-color: #FFF8E8;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px;
      
      color: #000000;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content p {
      color: #333;
      font-size: 16px;
      line-height: 1.5;
    }
    .cta-button {
      display: inline-block;
      margin-top: 20px;
      padding: 15px 30px;
      background-color: #ff5733;
      color: #ffffff;
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      color: #888;
      font-size: 12px;
    }
    .footer a {
      color: #888;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
        <img src="cid:logo" style="height: 200px;"/>
      <h1>Welcome to Print Club!</h1>
    </div>
    <div class="content">
      <p>Hey there,</p>
      <p>Thanks for signing up! You’re officially part of Print Club, where we turn creative designs into unique stickers and posters just for you.</p>
      <p>Stay tuned for our exclusive collections, design inspirations, and limited-time offers – all coming straight to your inbox.</p>
    
    </div>
    <div class="footer">
      <p>© 2024 Print Club </p>
      
    </div>
  </div>
</body>
</html>
`
const imageAttachment = await readFileAsync('logo.png');
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