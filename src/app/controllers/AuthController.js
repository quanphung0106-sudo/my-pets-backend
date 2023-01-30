const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../configMailer/mailer");
const Token = require("../models/Token");
const User = require("../models/User");
const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:8808";
const CLIENT_ENDPOINT = "http://mypets.click";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT,
    {
      expiresIn: "1d",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_REFRESH_TOKEN,
    {
      expiresIn: "7d",
    }
  );
};

//[POST]: /api/auth/refresh-token
const refreshToken = async (req, res) => {
  try {
    // check refreshToken cookies === refreshToken cookie db
    const refreshToken = req.body.refreshToken;

    console.log("refreshToken from request:", refreshToken);

    if (!refreshToken)
      return res.status(401).json("You are not authenticated!");

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN,
      async (err, user) => {
        if (!user) return res.status(403).json(err);
        if (user.id) {
          const tokens = await Token.find({ userId: user.id });
          const isCheckToken = tokens.some((token) => {
            return token.refreshToken === refreshToken;
          });

          if (!isCheckToken)
            return res.status(403).json({ msg: "Refresh token is not valid!" });

          const newAccessToken = generateAccessToken(user);
          const newRefreshToken = generateRefreshToken(user);

          const newToken = new Token({
            userId: user.id,
            refreshToken: newRefreshToken,
          });
          await newToken.save();

          console.log("refresh token:", { newRefreshToken, newAccessToken });

          return res.status(200).json({
            newRefreshToken: newRefreshToken,
            newAccessToken: newAccessToken,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//[POST]: /api/auth/login
const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) return res.status(404).json("Account does not exist");
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (user.activeAccount === false)
        return res.status(404).json("Please active your account.");
      if (!validPassword) return res.status(404).json("Wrong password!");
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      const newToken = await new Token({
        userId: user._id,
        refreshToken: refreshToken,
      });
      await newToken.save();

      const { password, activeAccount, ...others } = user._doc;

      console.log("user login", { user, accessToken, refreshToken });
      return res.status(200).json({ ...others, accessToken, refreshToken });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

//[POST]: /api/auth/register
const userRegister = async (req, res) => {
  try {
    const usernameDB = await User.findOne({ username: req.body.username });
    const emailDB = await User.findOne({ email: req.body.email });

    console.log({ usernameDB, emailDB });
    const saltRounds = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    if (usernameDB || emailDB)
      return res
        .status(404)
        .json("Username or Email exists. Please try another!");
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    const activateToken = generateAccessToken(newUser);
    const newToken = await new Token({
      userId: newUser._id,
      activateToken: activateToken,
    });
    await newUser.save();
    await newToken.save();
    await sendEmail(
      newUser,
      "Welcome to my website!!",
      `
      <h1>Please click this link to active your account!</h1>
      <a href="${CLIENT_ENDPOINT}/active-account/?token=${newToken.activateToken}">Active your account</a>
      `
    );
    const { isAdmin, activeAccount, password, ...others } = newUser._doc;
    return res.status(200).json({ ...others });
  } catch (err) {
    return res.status(500).json(err);
  }
};

//[POST]: /api/auth/token
const activeAccount = async (req, res) => {
  try {
    const token = await Token.findOne({ activateToken: req.body.token });
    console.log({ token: token.activateToken, requestToken: req.body.token });
    if (req.body.token === token.activateToken) {
      await User.findOneAndUpdate(
        { _id: token.userId },
        {
          activeAccount: true,
        }
      );
      res.status(200).json("Your account has been activated.");
    } else {
      res.status(404).json("Something wrong happen!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//[POST]: /api/auth/logout
const logout = async (req, res) => {
  try {
    return res.status(200).json({ msg: "Logout success" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getToken = async (req, res) => {
  try {
    const token = await Token.find();
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTokens = async (req, res) => {
  try {
    await Token.remove();
    res.status(200).json("All tokens have been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  userLogin,
  userRegister,
  activeAccount,
  logout,
  getToken,
  deleteTokens,
  refreshToken,
};
