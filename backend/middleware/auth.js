const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.hospitalId) {
        return next();
    }
    res.status(401).json({ 
        success: false,
        error: 'Authentication required. Please login.' 
    });
};

module.exports = { isAuthenticated };
