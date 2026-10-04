import express from 'express';

const router = express.Router();
let user_id = 0;
const users = [
    {user_id:user_id++,firstname:"john",lastname:"doe",email:"johndoe@gmail.com",pwd:"john_doe"},
    {user_id:user_id++,firstname:"jane",lastname:"doe",email:"janedoe@gmail.com",pwd:"jane_doe"},
    {user_id:user_id++,firstname:"ligma",lastname:"balls",email:"ligmaballs@gmail.com",pwd:"ligma_balls"},
    {user_id:user_id++,firstname:"charlie",lastname:"kirk",email:"charliekirk@gmail.com",pwd:"charlie_kirk"},
]

router.get('/',(req,res)=>{
    res.send(users)
})

router.get('/:id',(req,res)=>{
    const id = Number(req.params.id)
    if(!Number.isInteger(id)){
        return res.status(400).json({error:'Invalid user id'})
    }
    const user = users.find((u)=> u.user_id == id)
    if (!user){
        return res.status(404).json({error:'User not found'});
    }else{
        res.send(user)
    }
    
})

export default router;