import dbConnect from 'libs/db-connect';
import User from 'models/user'
import Validator from 'validatorjs';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return res.status(405).send("Method not allowed")
        case 'POST':
            try {
                const body = req.body;
                const rules = {
                    username: 'required',
                    firstName: 'required',
                    lastName: 'required',
                    email: 'required|email',
                    password: 'required|confirmed',
                };
            
                let validation = new Validator(body, rules);
                if (validation.fails()) {
                    return res.status(400).json({ message: 'error', data: validation.errors.all() })
                }
            
                await dbConnect();
            
                await User.create({
                    'username': body.username,
                    'firstName': body.firstName,
                    'lastName': body.lastName,
                    'email': body.email,
                    'password': body.password,
                })
                return res.redirect(301, '/post')
            } catch (error) {
                return res.status(500).json({ success: false, data: error });
            }
        default:
            return res.status(400).json({ success: false })
    }
}
