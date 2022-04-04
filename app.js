const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const config = require('./config');
const cron = require('node-cron');
const app = express();


app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));




app.get('/', (req,res)=>{
    res.render('form')
});


app.post('/send', (req,res)=>{
    const output =
    `
    <p>This is email from the host</p>
    <h3>Message</h3>
    <ul>
        <li>Thanks</li>
        <li>Visiting</li>
        <li>Our site</li>
    </ul>
    
    `;

    

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
    //   let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports

        // service:"Gmail",
        auth: {
          user: config.email.email, // generated ethereal user
          pass: config.password.password, // generated ethereal password
        },
      });
    


      cron.schedule('1,10,30 * * * * *', async()=>{
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
              from: config.email.email, // sender address
              to: req.body.email, // list of receivers
              subject: "Hello ✔", // Subject line
              text: "Hello world?", // plain text body
              html: output, // html body
            });
            
            console.log("Message sent:", info.messageId);
            // console.dir(info);
        });
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      res.render('home');
    }
    
    main().catch(console.error);

})


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})





