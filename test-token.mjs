import jwt from 'jsonwebtoken';


const JWT_SECRET = "SECRET_KEY_FOR_JWT";
const payload = {
    id : "69d46fb7d37419e37976cc40"
}

const token = jwt.sign(payload,  JWT_SECRET, { expiresIn : "10h" });

console.log("Generated Token:", token);