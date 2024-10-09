const app = require("express")();
const nodemailer = require("nodemailer");
app.get("/", async (req, res) => {
  console.log("อีเมลถูกเปิดแล้ว");
  res.sendFile("");
});

app.get("/nodemailer", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.nodemailer_user,
        pass: process.env.nodemailer_pass,
      },
    });
    const message = {
      from: process.env.nodemailer_user,
      to: "surasak.kaewpho@gmail.com",
      subject: "Test nodemailer",
      text: "Plaintext version of the message",
      //   html: "<p>HTML version of the message</p>",
      html: `
        <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
          </head>
          <body>
              <img src="http://localhost:8000/image"/>
              <img src="http://192.168.176.207:8000/image"/>
              <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRb8BMw3RWhIF-wAiHpwibf7h0SNZUZRa0qA0IQ-d5p3EuNL0zR"/>
          </body>
          </html>
      `,
    };
    transporter.sendMail(message, (err, info) => {
      if (err) console.log(err);
      else {
        console.log(info);
        res.json({ msg: "sent email success" });
      }
    });
  } catch (error) {
    console.error(error);
    res.json({ msg: "fail" });
  }
});
