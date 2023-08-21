const prisma = require("../prismaInstance");
const generatePassword = require("../utils/passwordGenerator");
const { hashPassword } = require("../utils/bcrypt");
const nodemailer = require("nodemailer");

const register = async (req, res) => {
  const { name, email, createdAt } = req.body;
  const randomPassword = generatePassword();
  try {
    const hashedPassword = await hashPassword(randomPassword);
    const myMail = process.env.MY_MAIL;
    const myPassword = process.env.MY_MAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: myMail,
        pass: myPassword,
      },
    });

    const mailOptions = {
      from: myMail,
      to: email,
      subject: "Welcome to Dentee! Your Account Details",
      html: `<h1>Welcome to Dentee, ${name}!</h1>
    <p>You have successfully created your Dentee account.</p>
    <p>You can now log in using the following temporary password:</p>
    <p style="font-weight: bold; color: #1E90FF;">${randomPassword}</p>
    <p>Please make sure to change your password after logging in for the first time.</p>
    <p>Thank you!<br>The Dentee Team</p>`,
    };

    const response = await prisma.employees.create({
      data: {
        name,
        email,
        createdAt,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    if (response) {
      transporter.sendMail(mailOptions);
      const message =
        "User created Successfully. Please check your email for confirmation";
      return res.send({ message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = register;
