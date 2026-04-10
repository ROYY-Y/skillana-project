import jwt from 'jsonwebtoken';


const JWT_SECRET = "SECRET_KEY_FOR_JWT";
const payload = {
    id : "69d79d22ce57ad582bf414de"
}

const token = jwt.sign(payload,  JWT_SECRET, { expiresIn : "10h" });

console.log("Generated Token:", token);

localStorage.setItem("token", token)