import dbConnect from "@/lib/dbConnect";
import Doc from "../../../models/Doc";
import User from "models/User";

export default async function handler(req, res) {
  const { method } = req;
  const { user } = req.query;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const docs = await Doc.find({ user });
        res.status(200).json({ success: true, data: docs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const doc = await Doc.create({ ...req.body, user });
        await User.findByIdAndUpdate(
          user,
          { $push: { documents: doc._id } },
          { new: true }
        );
        res.status(201).json({ success: true, data: doc });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
