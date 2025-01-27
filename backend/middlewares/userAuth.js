import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized login required"});
    }
    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default userAuth