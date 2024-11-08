// pages/api/users/index.js

import User from "@/models/user";
import connectToDatabase from "@/utils/dbConnect";
import validateToken from "@/utils/validateToken";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { firebaseUID, name, email, mobile, token } = req.body;
    console.log(req.body);
    if (!firebaseUID || !email || !token) {
      return res
        .status(400)
        .json({ message: "firebaseUID, name, token and email are required" });
    }

    try {
      const decodedToken = await validateToken(token);
      if (!decodedToken.uid || decodedToken.uid !== firebaseUID) {
        return res.status(401).json({ message: "Authorization Failed" });
      }
      const user = await User.findOne({ firebaseUID: decodedToken.uid, email });
      if (!user) {
        const newUser = new User({
          firebaseUID,
          name,
          email,
          mobile,
        });

        await newUser.save();
        return res.status(201).json(newUser);
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error creating user", error: true });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
