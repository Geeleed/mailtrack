require("dotenv").config();
const app = require("express")();
const nodemailer = require("nodemailer");
const path = require('path');
const hostname = process.env.server_hostname_global;
// const hostname = process.env.server_hostname_local;
app.get("/", async (req, res) => {
  res.send(`
    <a href="${hostname + "/send"}">send the apply</a>
    `);
});
app.get("/image", async (req, res) => {
  try {
    console.log("อีเมลถูกเปิดแล้ว");
    await alertmsg();
    res.sendFile(path.join(__dirname, "track.png"));
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("An error occurred");
  }
});

app.get("/send", async (req, res) => {
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
      to: "jobjob.thailand@gmail.com",
      subject: "Test nodemailer",
      //   text: "Plaintext version of the message",
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
                ทดลองระบบ การเปิดอีเมลนี้จะแจ้งเตือนไปยังผู้สมัครว่าคุณได้อ่านข้อความแล้ว
              <img src="https://mailtrack-brown.vercel.app/image"/>
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
async function alertmsg() {
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
    //   to: "surasak.kaewpho@gmail.com",
      to: "jobjob.thailand@gmail.com",
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
          อีเมลของคุณถูกเปิดอ่านแล้ว
          </body>
          </html>
      `,
    };
    console.log("sending email...")
    transporter.sendMail(message, (err, info) => {
        if (err) console.log(err);
        else {
            console.log(info);
        }
    });
    console.log("sent email")
  } catch (error) {
    console.error(error);
  }
}

app.listen(8500, () => console.log("ระบบเปิดแล้ว","http://localhost:8500"));
