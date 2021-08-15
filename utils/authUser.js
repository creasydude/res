import jwt from 'jsonwebtoken';

const authUser = (req,res,next) => {
    const token = req.header("x-access-token");
    if (!token) return res.status(401).json({ message: "401 Access Denied No Token Found!" })

    try {
        const verifyToken = jwt.verify(token, process.env.ATPKEY);
        req.user = verifyToken;
        next()
    } catch (err) {
        return res.status(400).json({message: err})
    }
}
export default authUser;