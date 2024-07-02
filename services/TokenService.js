const jwt =require("jsonwebtoken");

class TokenService {
    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: process.env.JWT_ACCESS_EXPIRED });
    }

    validateToken(token, secret) {
        try {
            const userData = jwt.verify(token, secret);
            return userData;
        } catch (error) {
            return null;
        }
    }
    
}

module.exports = new TokenService();    