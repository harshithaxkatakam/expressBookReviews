const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
const jwtSecret = "secretKey123"; // Define this globally

app.use(express.json());
app.use(session({
    secret: "fingerprint_customer",
    resave: false,
    saveUninitialized: true
}));

app.use("/customer/auth/*", (req, res, next) => {
    const token = req.session.token || req.headers["authorization"];
    
    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
