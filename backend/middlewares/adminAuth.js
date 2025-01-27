import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const atoken = req.headers.atoken;
    if (!atoken) {
      return res.status(401).json({ success: false, message: "Unauthorized login required"});
    }
    const decoded_Token = jwt.verify(atoken , process.env.JWT_SECRET_KEY);
    if (decoded_Token !== (process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)) {
      return res.json({success: false, message: "Forbidden"})
    } 
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default adminAuth