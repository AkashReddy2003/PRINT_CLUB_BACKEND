const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT=3000;
const htmlTemplate = await readFileAsync('./welcome.html', 'utf-8');
const imageAttachment = await readFileAsync('./logo.png');

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
  

app.post("/sendwelcome",(req,res)=>{
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