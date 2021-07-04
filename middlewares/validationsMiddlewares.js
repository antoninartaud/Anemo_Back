const expressValidator = require("express-validator");
const passwordValidator = require('password-validator');

const validate = (req, res, next) => {
    const errors = expressValidator.validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: "Please send data in the good format" })
    } else {
        next()
    }
}


const validationSignup = [
    expressValidator.body("name").exists().isString(),
    expressValidator.body("email").exists().isEmail(),
    expressValidator.body("password").exists().isString().custom(value => {
        const schema = new passwordValidator()

        schema
            .is().min(4)
            .is().max(30)
            .has().uppercase()
            .has().lowercase()
            .has().digits(1)
            .has().not().spaces()


        return schema.validate(value);

    }),
    validate
]

const validationLogin = [
    expressValidator.body("email").exists().isEmail(),
    expressValidator.body("password").exists().isString(),
    validate
]



module.exports = {

    validationSignup,
    validationLogin
}