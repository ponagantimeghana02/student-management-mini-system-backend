const userModel = require("./userModel.js");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const register = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });
    // console.log(existingUser);
    if (existingUser) {
      return res.json({ msg: "user already exists" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPwd = await bcryptjs.hash(req.body.password, salt);
    req.body.password = hashedPwd;
    const newUser = await new userModel(req.body).save();
    const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET);    
    const result = {
      success: true,
      msg: "user registered successfully",
      user: {
        token,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    };
    return res.status(201).json(result);
  } catch (err) {
    console.log(err);
    
    // res.json({ msg: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await userModel.findOne({ email });
    const details = {
      id: userDetails._id,
      username: userDetails.username,
      email: userDetails.email,
      role: userDetails.role,
      // token:userDetails.token
    };
    const isMatched =await bcryptjs.compare(password, userDetails.password);
    if (isMatched) {
      if (userDetails) {
        const token = jwt.sign(details,process.env.JWT_SECRET);
        res.json({ msg: "login success", details:{...details,token}  });
      }
    }
  } catch (err) {
    res.json({ msg: err });
  }
};

module.exports = { register, login };