import jwt from 'jsonwebtoken';

function requireAuth(req,res,token){
    try{
        const token = req.body.token;
        if (!token){
            res.status(401).json({
                error:'Missing token'
            });
        }else{
            const payload = jwt.verify(token,'MYSECRET'); //TODO:replace MYSECRET
            res.json({
                login:true,
                data:decode
            });
        }
    }catch{
        res.status(401).json({
            error:'Invalid token'
        });
    }
}

export default requireAuth;