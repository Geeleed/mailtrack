require('dotenv').config()
const app = require("express")();
const nodemailer = require("nodemailer");

app.get("/", async (req, res) => {
  res.send("Hello world");
});
app.get("/opened", async (req, res) => {
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
              <img src="${process.env.server_hostname}/opened"/>
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

app.listen(8500, () => console.log("ระบบเปิดแล้ว"));
