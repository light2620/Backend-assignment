import { UserModel } from "../models/user.model.js";
const isAdmin = async (req, res, next) => {
    try {

        const id = req.userId;
        if (!id) {
            return res.json({
                message: "no id provided",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findById(id);
        if (!user) {
            return res.json({
                message: "no user found with this id"
            })
        }
        if (user.role !== 'ADMIN') {
            return res.json({
                message: "unauthorize person",
                success: false,
                error: true
            })
        }

        next();

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export { isAdmin }