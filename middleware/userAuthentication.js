import jwt from 'jsonwebtoken'

const userAuthentication = async (req, res, next) => {
    const token = req.cookies.token;
    if (token == "" || !token) {
        return res.status(400).json({
            redirectUrl: "/admin/login",
            message: "First Login To Access!",

        });
    } else {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next();
    }

}

export default userAuthentication