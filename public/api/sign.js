const crypto = require("crypto");
const { privateKey } = require("../keys");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(message);
  sign.end();

  const signature = sign.sign(privateKey, "base64");

  res.status(200).json({ signature });
}
