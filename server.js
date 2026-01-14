const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const { publicKey, privateKey } = require("./keys");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/sign", (req, res) => {
  const { message } = req.body;

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(message);
  sign.end();

  const signature = sign.sign(privateKey, "base64");
  res.json({ signature });
});

app.post("/verify", (req, res) => {
  const { message, signature } = req.body;

  const verify = crypto.createVerify("RSA-SHA256");
  verify.update(message);
  verify.end();

  const isValid = verify.verify(publicKey, signature, "base64");
  res.json({ valid: isValid });
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
