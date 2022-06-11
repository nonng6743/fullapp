const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")

router.get("/", (req, res) => {
  res.send("home api");
});

//Register
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    //Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is requried");
    }

    //check if user already exist
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User already exist. Please login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is requried");
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      //save user token
      user.token = token;
      res.status(200).json(user);
    }

    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.post("/welcome", auth, (res, req) => {
  res.status(200).send("Welcome");
});

module.exports = router;
