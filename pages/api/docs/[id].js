import dbConnect from "../../../lib/dbConnect";
import Doc from "../../../models/Doc";
import User from "models/User";

export default async function handler(req, res) {
  const {
    query: { id, user: userID },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        // Check if the user exists
        const user = await User.findById(userID);
        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }
        // Check if the document exists for the user
        const doc = await Doc.findOne({ _id: id, user: userID });
        if (!doc) {
          return res
            .status(404)
            .json({ success: false, message: "Document not found" });
        }
        // Return the document
        res.status(200).json({ success: true, data: doc });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
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

        await User.findByIdAndUpdate(
          userID,
          { $pull: { documents: id } },
          { new: true }
        ).exec();

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
