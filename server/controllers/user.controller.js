import { UserModel } from '../models/user.model.js'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { generateToken } from '../config/generateToken.js'
dotenv.config()


const userRegisterController = async (req, res) => {
    try {
        const { email, name, password, confirmPassword } = req.body;
        if (!email || !name || !password || !confirmPassword) {
            return res.json({
                message: "All Fields are Mandatory",
                error: true,
                success: false
            })
        }
        if (password.length < 6) {
            return res.json({
                message: "password length must be greate than 6",
                error: true,
                success: false
            })
        }

        if (password !== confirmPassword) {
            return res.json({
                message: "password did not match",
                error: true,
                success: false
            })
        }
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.json({
                message: "this email is already registered",
                success: false,
                error: true
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);
        const userDetails = {
            name,
            email,
            password: hashPassword
        }
        const newUser = new UserModel(userDetails);
        await newUser.save();

        return res.json({
            message: "Registration Successfull",
            error: false,
            success: true
        })



    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        if (!email || !password) {
            return res.json({
                message: "All Fields are Mandatory",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({
                message: "email id is not register",
                error: true,
                success: false
            })
        }
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({
                message: "password is wrong",
                error: true,
                success: false
            })
        }
        const token = await generateToken(user._id);

        return res.json({
            message: "login successfully",
            success: true,
            error: false,
            token
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

const getUserDetails = async (req, res) => {
    try {
        const { userId } = req
        console.log(userId)
        if (!userId) {
            return res.json({
                message: "no user id found"
            })
        }
        const user = await UserModel.findById({ _id: userId }).select('-password');
        console.log(user);
        return res.json({
            message: "user details",
            data: user,
            success: true,
            error: false
        })
    } catch (err) {

        return res.json({
            message: "something went wrong",
            error: true,
            success: false
        })

    }
}

export { userRegisterController, userLoginController, getUserDetails }