const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/brain-tumor-detection';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'brain-tumor-detection-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'mri-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const authRoutes = require('./routes/auth');
const { isAuthenticated } = require('./middleware/auth');

app.get('/', (req, res) => {
    res.json({
        message: 'Brain Tumor Detection API',
        version: '2.0.0',
        endpoints: {
            auth: {
                signup: 'POST /api/auth/signup',
                login: 'POST /api/auth/login',
                logout: 'POST /api/auth/logout',
                check: 'GET /api/auth/check'
            },
            predict: 'POST /api/predict (protected)'
        }
    });
});

app.use('/api/auth', authRoutes);

app.post('/api/predict', isAuthenticated, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const imagePath = path.resolve(req.file.path);
        const pythonScriptPath = path.resolve('../ml-model/predict.py');

        const pythonPath = path.resolve('../ml-model/venv/bin/python3');
        const python = spawn(pythonPath, [pythonScriptPath, imagePath]);

        let result = '';
        let errorOutput = '';

        python.stdout.on('data', (data) => {
            result += data.toString();
        });

        python.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        python.on('close', (code) => {
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Error deleting file:', err);
            });

            if (code !== 0) {
                console.error('Python script error:', errorOutput);
                return res.status(500).json({
                    error: 'Prediction failed',
                    details: errorOutput
                });
            }

            try {
                const prediction = JSON.parse(result);
                
                if (prediction.error) {
                    return res.status(500).json(prediction);
                }

                res.json({
                    success: true,
                    prediction: prediction
                });
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                res.status(500).json({
                    error: 'Failed to parse prediction result',
                    details: result
                });
            }
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            error: 'Server error',
            message: error.message
        });
    }
});

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size is too large. Max 10MB allowed.' });
        }
    }
    res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
    console.log(`🚀 Brain Tumor Detection API running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});
