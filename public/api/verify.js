const crypto = require("crypto");
const { publicKey } = require("../keys");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, signature } = req.body;

  const verify = crypto.createVerify("RSA-SHA256");
  verify.update(message);
  verify.end();

  const isValid = verify.verify(publicKey, signature, "base64");

  res.status(200).json({ valid: isValid });
}
