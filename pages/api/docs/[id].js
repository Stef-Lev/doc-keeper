import dbConnect from "../../../lib/dbConnect";
import Doc from "../../../models/Doc";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const doc = await Doc.findById(id);
        if (!doc) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: doc });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const doc = await Doc.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!doc) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: doc });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedDoc = await Doc.deleteOne({ _id: id });
        if (!deletedDoc) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
