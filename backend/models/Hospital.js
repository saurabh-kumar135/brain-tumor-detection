const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: [true, 'Hospital name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters']
    },
    licenseNumber: {
        type: String,
        required: [true, 'Medical license number is required'],
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    }
}, {
    timestamps: true
});

// Hash password before saving
hospitalSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
hospitalSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
hospitalSchema.methods.toJSON = function() {
    const hospital = this.toObject();
    delete hospital.password;
    return hospital;
};

module.exports = mongoose.model('Hospital', hospitalSchema);
