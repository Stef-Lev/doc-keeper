import dbConnect from "@/lib/dbConnect";
import User from "models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { username, password, passwordCheck } = req.body;
    if (!username || !password || !passwordCheck) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    if (password !== passwordCheck) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    await dbConnect();

    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({
      username: username,
      password: password,
    });

    await newUser.save();

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user." });
  } finally {
    (await dbConnect()).closeConnection();
  }
}
