const jwt = require("jsonwebtoken");
const sequelize = require("../config/db.config");

const googleCallback = async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    return res.redirect(`${process.env.APP_URL_FE}?token=${token}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Authentication failed" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await sequelize.models.User.findByPk(decoded.id);

    return res.status(200).json({
        success: true,
        message: "User profile retrieved successfully",
        user
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token" });
  }
};

const isAdmin = async (req, res) => {
    try {
        const {user, pass} = req.body;
        if(user === 'admin' && pass === 'admin') {
            return res.status(200).json({ 
                success: true, 
                message: "Admin authenticated successfully" 
            });
        } else {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server Error",    
            error: error.message
         });
    }
}

module.exports = {googleCallback, getUserProfile, isAdmin};
