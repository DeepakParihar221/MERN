const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})

//Authenticate user and get token
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], 
async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors})
    }

    const {email, password} = req.body;

    try {
        //see if user exists
        let user = await User.findOne({email})

        if(!user){
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials"}] });
        }

        //check for email and password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials"}] });
        }


        // return jwt
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), 
        {  expiresIn: 360000 },
        (err, token) => {
            if(err)
            throw err;
            
            res.json({ token })
        }
        )

        // res.send("Users Registered");
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error')
    }
})

module.exports = router;