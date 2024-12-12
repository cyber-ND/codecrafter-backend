const User = require('../models/User')

const bcryptjs = require('bcryptjs')

const sendMail = require('../config/mailService')


exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message);
        
    }
}

exports.createUsers = async (req, res, next) => {
    try {
       const {name, email, password} = req.body;
       const hashedPassword = await bcryptjs.hash(password, 10)
       const newUser = await User.create({name, email, password: hashedPassword});
        
       //send welcome mail

       const subject = 'welcome to code crafters';
       const text = `hi ${name}, welcome to our platform. we are glad to have you onborad`;
       const html = `
       <h1>Welcome, ${name}</h1>
       <p>We are excited to have you join us. If you have any question, feel free to reach out to our support team.</p>
       `;
       await sendMail(email, subject, text, html)
       res.status(201).json({message:'User created successfully. Check your mail box for a welcome message', user:newUser, email:newUser.email})
    } catch (error) {
        console.log(error.message);        
    }
}
exports.getUserByid = async (req, res, next) => {
    try {
       const user = await User.findById(req.params.id);

       if (!user) {
            return res.status(404).json({message: "User not found"});
       }
       res.status(200).json(user);
    } catch (error) {
        console.log(error.message);        
    }
}
exports.updateUserByid = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10)
       const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {name, email, password:hashedPassword},
        {new: true}
       );
       if (!updatedUser) {
        return res.status(404).json({message: "User not found"})
       }
       res.status(201).json({message:'User updated successfully', user:updatedUser})
    } catch (error) {
        console.log(error.message);
        
    }
}
exports.deleteUserByid = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
       const deletedUser = await User.findByIdAndDelete(  
        req.params.id,
        {name, email, password},
        {new: true}
       );
       if (!deletedUser) {
        return res.status(404).json({message: "User not found"})
       }
       res.status(201).json({message:'User deleted successfully', user:deletedUser})
    } catch (error) {
        console.log(error.message);        
    }
}
