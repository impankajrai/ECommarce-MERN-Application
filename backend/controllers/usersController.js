const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getFileURL = require("../utils/getFileURL");
const { isValidEmail } = require("../utils/validateEmail");
const { getTokenCookie } = require("../utils/genrateTokenCookie");
const { verifyToken } = require("../utils/VerifyToken");
const { sendEmail } = require("../utils/sendEmail");
const { forgetPasswordTemplate } = require("../utils/forgetPasswordTemplate");

//Logout route =========================================================================================================
module.exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name || email || password)) {
    res.status(400).json({
      success: false,
      message: "name, email and password are required",
    });
    return false;
  }
  let Errormessage = "";

  //check name is not longer then 40charaters
  if (!name.length > 40) Errormessage = "Name should be maximum 40 characters";

  //check email is valid or not
  if (!isValidEmail(email)) Errormessage = "Enter valid email id";

  //check email is already exist or not
  const emailExist = await User.findOne({ email });
  if (emailExist) Errormessage = "email is already exist";

  //if there is no error then inserted data into database and users browser by cookies otherwise show valid error message
  if (!Errormessage) {
    //create a encrypted password
    const encryptedPass = await bcrypt.hash(password, 10);

    //create fields in database
    const user = await User.create({
      name,
      email,
      photo: `${req.protocol}://${req.get("host")}/defaultProfilePic.svg`,
      password: encryptedPass,
    });

    user.password = undefined;
    res
      .status(200)
      .json({ success: true, message: "user registerd successfully", user });
  } else {
    res.status(500).json({ success: false, message: Errormessage });
  }
};

// SignIn route ===========================================================================================================
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  // check both field are exist or not
  if (!(email || password)) {
    res
      .status(500)
      .json({ success: false, message: "email and password are require" });
  }

  const getUser = await User.findOne({ email }).select("+password");
  if (!getUser) {
    res.status(400).json({ success: false, message: "email is not registerd" });
    return false;
  }

  //validatePassword method comming from models section
  const isValidUser = await getUser.validatePassword(password);
  if (isValidUser) {
    getTokenCookie(getUser, res, "Logged in successfully");
  } else {
    res.status(400).json({
      success: false,
      message: "email or password does not match or exist",
    });
  }
};

//Logout ==================================================================================================================
module.exports.logout = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token) {
    res.status(401).json({ success: false, message: "already logged out" });
  } else {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout success" });
  }
};

//User logged in or not ====================================================================================================
module.exports.isAuthanticated = async (req, res) => {
  const { token } = req.cookies || req.body;
  console.log(token);
  const tokendata = verifyToken(token);
  if (tokendata.error) {
    res.status(501).json({ success: false, message: "user not logged in !" });
  } else {
    const user = await User.findOne({
      _id: tokendata.data?.id,
      email: tokendata.data.email,
    });
    res
      .status(200)
      .json({ success: true, message: "you are already loggedin", user });
  }
};

// forget password request =================================================================================================

module.exports.forgetPassRequest = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ success: false, message: "Email is required" });
  } else {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res
        .status(401)
        .json({ success: false, message: "Email is not registered" });
    } else {
      const forgetPassToken = jwt.sign(
        { email: user.email, password: user.password },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
      );
      const genratedURL = `http://localhost:3000/resetpassword/${forgetPassToken}`;

      console.log(forgetPassToken);
      let emailResponse = await sendEmail({
        to: user.email,
        subject: " Password Reset Link ",
        html: forgetPasswordTemplate(genratedURL),
      });

      if (emailResponse.success) {
        res
          .status(200)
          .json({ success: true, message: "Email sent to registerd email id" });
      } else {
        res.status(500).json({ success: false, message: emailResponse.error });
      }
    }
  }
};

// Authanticate link while open the page ============================================================================================

module.exports.validateResetPassURL = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    res.status(400).json({ success: false, message: "invalid link" });
  } else {
    const tokendata = verifyToken(token);
    if (tokendata?.error) {
      tokendata.error.message === "jwt expired"
        ? res
            .status(401)
            .json({ success: false, message: "Link has been expired" })
        : res.status(401).json({ success: false, message: "Invalid link" });
    } else {
      const validate = await User.findOne({
        email: tokendata.data?.email,
        password: tokendata.data?.password,
      });
      if (validate) {
        res.status(200).json({ success: true, message: "Valid URL" });
      } else {
        res.status(401).json({ success: false, message: "invalid URL" });
      }
    }
  }
};

// Change password into the database  ============================================================================================

module.exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (!password) {
    res.status(501).json({ success: false, message: "Password required" });
  } else {
    const tokenData = verifyToken(token);
    if (tokenData.data) {
      const encryptedPass = await bcrypt.hash(password, 10);
      const update = await User.findOneAndUpdate(
        { email: tokenData.data.email, password: tokenData.data.password },
        { password: encryptedPass },
        { new: true }
      );

      if (update) {
        res
          .status(200)
          .json({ success: true, message: "password changed", user: update });
      }
    } else {
      tokenData.error.message === "jwt expired"
        ? res
            .status(401)
            .json({ success: false, message: "Link has been expired" })
        : res.status(401).json({ success: false, message: "Invalid link" });
    }
  }
};

// change password with old password  ============================================================================================
module.exports.changePassword = async (req, res) => {
  const { token, oldPassword, newPassword } = req.body;
  const encryptOldPass = await bcrypt.hash(newPassword, 10);
  // const {token}=req.cookies;
  if (!token) {
    res.status(501).json({ success: false, message: "You are not logged in" });
  } else {
    const tokenData = verifyToken(token);
    const user = await User.findOne({
      _id: tokenData.data.id,
      email: tokenData.data.email,
    }).select("+password");

    let validateOldPass = await user.validatePassword(oldPassword); //validate old password
    if (!validateOldPass) {
      res.status(401).json({ success: false, message: "invalid old password" });
    } else {
      const updateStatus = await user.updateOne({ password: encryptOldPass }); //update password into the database

      if (updateStatus.modifiedCount) {
        ///if updated into database then send response
        res.status(200).json({ success: true, message: "Password Updated" });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Password Not Updated" });
      }
    }
  }
};

//update user --------------------------------------------------------------------------------------------------------------
module.exports.updateUser = async (req, res) => {
  const { token } = req.cookies;
console.log(req.body)

  const {
    fullName,
    email,
    gender,
    mobile,
    line1,
    line2,
    houseNumber,
    landMark,
    pinCode,
    state,
    district,
    subDistrict,
  } = req.body;
  const name = fullName;


  if (!Object.keys(req.body).length) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid information" });
  }

  if (!token) {
    return res
      .status(501)
      .json({ success: false, message: "Please login to change your details" });
  }
  const tokenData = verifyToken(token);

  if (tokenData.data) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        { _id: tokenData.data.id, email: tokenData.data.email },
        {
          name,
          email,
          gender,
          photo: req.file && getFileURL(req),
          mobile: mobile && Number(mobile),
          address_line1: line1 && line1,
          address_line2: line2 && line2,
          address_houseNumber: houseNumber && houseNumber,
          address_landMark: landMark && landMark,
          address_pinCode: pinCode && pinCode,
          address_state: state && state,
          address_district: district && district,
          address_subDistrict: subDistrict && subDistrict,
        },
        { new: true }
      );

      console.log(updateUser);

      return res
        .status(200)
        .json({
          success: true,
          message: "User Update Success",
          user: updateUser,
        });
    } catch (error) {
      return res
        .status(501)
        .json({ success: false, message: "Invalid update request" });
    }
  } else {
    return res.status(400).json({ success: false, message: "Invalid User" });
  }
};

//change password ===================================================================================
module.exports.UpdatePassword = async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  const { token } = req.cookies;

  //get token data
  const { data } = verifyToken(token);

  //invalid token validation
  if (!data)
    return res.status(401).json({ success: false, message: "Please login" });

  //required field validation
  if (!(newPassword || oldPassword))
    return res
      .status(401)
      .json({
        success: false,
        message: "Old password and new password is required",
      });

  //get all the data from database by token data
  const user = await User.findOne({ _id: data.id, email: data.email }).select(
    "+password"
  );

  //check if user is not in database
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Please login again" });

  //check old password is correct or not
  const isValidPassword = await user.validatePassword(oldPassword);

  if (!isValidPassword)
    return res
      .status(401)
      .json({ success: false, message: "Old password is not correct" });

  if (isValidPassword) {
    const encryptNewPassword = await bcrypt.hash(newPassword, 10);
    const response = await user.updateOne({ password: encryptNewPassword });

    if (response.modifiedCount) {
      return res
        .status(200)
        .json({ success: true, message: "Password changed successfully" });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Unknown error occurs" });
    }
  }
};
