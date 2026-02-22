import User from "../Modules/userModule.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

export const signUpUserController = async(req , res) => {
    try {
        const { fullName , email , password } = req.body;
        // console.log(fullName , email , password);
        if(!fullName || !email || !password){
            return res.status(400).json({
                message : "All user information is required!",
                success : false,
            })
        }

        // Hash Password
        const saltCount = process.env.SALT_COUNT;
        const hashedPassword = await bcrypt.hash(req.body.password , Number(saltCount));
        // console.log(hashedPassword , Number(process.env.SALT_COUNT));

        // create user
        const signUp = await User.create({
            ...req.body , password : hashedPassword 
        })

        if(signUp){
            return res.status(201).json({
                message : "user Created SuccessFully",
                user : signUp,
                success : true,
                id : signUp._id
            });
        }
    } catch (error) {
        return res.status(400).json({
            message : error.message ,
            success : false
        })
    }
}

export const loginUserController = async(req , res) => {
    try {
        const { email , password } = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "Email and password required!", success: false });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: "Invalid email or password!", success: false });
        }

        const isMatchPassword = await bcrypt.compare(password ,user.password);

        if (!isMatchPassword) {
            return res.status(400).json({ message: "Invalid password!", success: false });
        }

        // Generate token
        const token = jwt.sign({id : user._id , email : user.email} , process.env.JWT_SECRET , {expiresIn : '1h'});

         const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

        res.status(201).json({
            message : "Login SuccessFully",
            user : userData ,
            token ,
            success : true
        })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}