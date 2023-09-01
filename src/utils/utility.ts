import Joi from "joi";


export const option = {
    abortEarly: false,
    errors: {
       wrap : { label: '' }
    }
};

export const UserSchema = Joi.object().keys({
    account_holder_name: Joi.string().required(),
    account_holder_DOB: Joi.date().required(),
    account_type: Joi.string().valid("Savings").required(),
    initial_balance: Joi.number().min(0).required(),
});


export const GenerateAccountNumber = ()=> {
    return Math.floor(1000000000 + Math.random() * 9000000000); 
};