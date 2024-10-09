require("dotenv").config();
const app = require("express")();
const nodemailer = require("nodemailer");
const path = require("path");
const hostname = process.env.server_hostname_global;
// const hostname = process.env.server_hostname_local;
app.get("/", async (req, res) => {
  res.send(`
    <a href="${hostname + "/send"}">send the apply</a>
    `);
});
app.get("/image", async (req, res) => {
  try {
    await fetch(hostname + "/alert")
      .then((r) => r.json())
      .then((r) => {
        console.log("อีเมลถูกเปิดแล้ว");
        console.log(r);
        res.sendFile(path.join(__dirname, "track.png"));
      });
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
      to: "surasak.kaewpho@gmail.com",
      //   to: "jobjob.thailand@gmail.com",
      subject: "Test nodemailer",
      //   text: "Plaintext version of the message",
      //   html: "<p>HTML version of the message</p>",
      html: `
          <html lang="en">
          <body>
                ทดลองระบบ การเปิดอีเมลนี้จะแจ้งเตือนไปยังผู้สมัครว่าคุณได้อ่านข้อความแล้ว
              <a href="${hostname}/alert">ส่งแจ้งเตือนว่าอ่านแล้ว</a>
              <img src="${hostname}/image"/>
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
app.get("/alert", async (req, res) => {
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
      //   to: "surasak.kaewpho@gmail.com",
      subject: "Test nodemailer",
      //   text: "Plaintext version of the message",
      //   html: "<p>HTML version of the message</p>",
      html: `
              <html lang="en">
              <body>
              อีเมลของคุณถูกเปิดอ่านแล้ว
              </body>
              </html>
          `,
    };
    console.log("sending email...");
    transporter.sendMail(message, (err, info) => {
      if (err) console.log(err);
      else {
        console.log(info);
        res.json({ msg: "sent email success" });
      }
    });
  } catch (error) {
    console.error(error);
    res.json({ msg: "err" });
  }
});

app.listen(8500, () => console.log("ระบบเปิดแล้ว", "http://localhost:8500"));
