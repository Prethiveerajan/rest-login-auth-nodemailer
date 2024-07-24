const jwt = require('jsonwebtoken');
const models = require('../models'); // Ensure the path to your models file is correct

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Missing token' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        const user = await models.User.findById(decoded.id);
        if (!user) return res.status(403).json({ message: 'User not found' });

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
