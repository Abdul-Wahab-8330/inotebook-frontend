const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "wahabisagoodboy";

//Route 1 : create a user using POST: "/api/auth/createuser" doesn't require login
//and authentication using express validator
router.post('/createuser', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password should be atleast 5 characters').isLength({ min: 5 }),
    body('name', 'name should be atleast 3 characters').isLength({ min: 3 })
], async (req, res) => {
    let success = false;
    //if there are errors, return error and message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() })
    }
    try {
        //check whether the email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success,error: "this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        //making jwt token and giving it in response
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success,authtoken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }

})

//Route 2 : Authenticate a user using POST: "/api/auth/login" no login required
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be empty').exists(),
], async (req, res) => {

    let success = false;
    //if there are errors, return error and message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if(!user){
            success = false;
            return res.status(400).json({ error: "please try to login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            success = false;
            return res.status(400).json({ success,error: "please try to login with correct credentials" })
        }
        
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success,authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }

})

//Route 3 : get logged in user details using POST: "/api/auth/getuser" login required
router.post('/getuser',fetchuser, async (req, res) => {
try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
}
})

module.exports = router;