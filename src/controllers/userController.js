import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utility/genaratetokens.js";
import bcrypt from "bcrypt";
import { UserStatus } from "@prisma/client";


const prisma = new PrismaClient();

export const GetUser = async (req, res) => {
  try{
    const user = await prisma.User.findMany()
    if (user.length === 0) {
      return res.status(404).json({ message: "No users found" });
  }

  return res.status(200).json({ message: "All users", user });
  } catch ( error ) {
    console.error("Error in Gettin users:", error);
    return res.status(500).json({ error: "Error getting user", details: error.message });
  }
}

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name) {
      return res.status(400).json({ error: "Name is required to authorize" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required to authorize" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required to authorize" });
    }

    // Check if user exists
    const userExist = await prisma.User.findUnique({
      where: { email },
    });

    if (userExist) {
      return res.status(409).json({ error: `User email ${email} already exists` });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.User.create({
      data: {
        name,
        email,
        password: hashedPassword,
        status: UserStatus.ACTIVE,
      },
    });

    return res.status(201).json({ message: "User created successfully", user: newUser });

  } catch (error) {
    console.error("Error in Register:", error);
    return res.status(500).json({ error: "Error creating user", details: error.message });
  }
};



// user login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.User.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid Email or Password" });
    }
   
    //Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    } 
    // // varidate an active account
    // if (user.status !== 'ACTIVE ') {
    //   return res.status(401).json({ message: "Your account has been temporarily deactive" });
    // }

    const token = generateToken(user);
    return res.status(200).json({ token,userid:user.id });

  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
