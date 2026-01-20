const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');

router.post('/signup', async (req, res) => {
    try {
        const { hospitalName, email, password, licenseNumber, address, phone } = req.body;

        const existingHospital = await Hospital.findOne({ 
            $or: [{ email }, { licenseNumber }] 
        });

        if (existingHospital) {
            return res.status(400).json({ 
                success: false,
                error: 'Hospital with this email or license number already exists' 
            });
        }

        const hospital = new Hospital({
            hospitalName,
            email,
            password,
            licenseNumber,
            address,
            phone
        });

        await hospital.save();

        res.status(201).json({
            success: true,
            message: 'Hospital registered successfully',
            hospital: hospital.toJSON()
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            success: false,
            error: error.message || 'Registration failed' 
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const hospital = await Hospital.findOne({ email });
        if (!hospital) {
            return res.status(401).json({ 
                success: false,
                error: 'Invalid email or password' 
            });
        }

        const isMatch = await hospital.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                error: 'Invalid email or password' 
            });
        }

        req.session.hospitalId = hospital._id;
        req.session.hospital = hospital.toJSON();

        res.json({
            success: true,
            message: 'Login successful',
            hospital: hospital.toJSON()
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Login failed' 
        });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false,
                error: 'Logout failed' 
            });
        }
        res.clearCookie('connect.sid');
        res.json({ 
            success: true,
            message: 'Logged out successfully' 
        });
    });
});

router.get('/check', (req, res) => {
    if (req.session.hospitalId) {
        res.json({
            authenticated: true,
            hospital: req.session.hospital
        });
    } else {
        res.json({
            authenticated: false
        });
    }
});

module.exports = router;
