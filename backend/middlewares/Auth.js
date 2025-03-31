const jwt = require('jsonwebtoken');

const ensureAuth = (req, res, next) => {
    const auth = req.headers['authorization']; // ✅ Fixed Typo
    if (!auth) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET); // ✅ Correct JWT Usage
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is wrong or expired' });
    }
}

module.exports = ensureAuth;
