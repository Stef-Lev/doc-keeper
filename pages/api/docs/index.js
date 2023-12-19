import dbConnect from "../../../lib/dbConnect";
import Doc from "../../../models/Doc";

export default async function handler(req, res) {
  const { method } = req;

  //   await dbConnect();

  switch (method) {
    case "GET":
      try {
        const docs = await Doc.find({});
        res.status(200).json({ success: true, data: docs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const doc = await Doc.create(req.body);
        res.status(201).json({ success: true, data: doc });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
