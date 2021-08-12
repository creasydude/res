import Joi from 'joi';

const schema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(8).max(1024).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))
})

const joiValidate = (email, password) => {
    const validate = schema.validate({ email: email, password: password })
    return validate
}

export default joiValidate;