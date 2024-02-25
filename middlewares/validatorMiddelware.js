const {validationResult}=require('express-validator');

const validatorMiddelware=(req,res,next)=>{
    //finds the validation errors in this request and wraps them in an object 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    //if no errors exist continue
    next();
};

module.exports=validatorMiddelware;