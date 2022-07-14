export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, email } = req.body;
    if (username === "sulav" && email === "test@gmail.com") {
      res.status(200).json({ message: "Hello from Next.js" });
    } else {
      res.status(500).json({ error: "Invalid Credentials" });
    }
  }
}
