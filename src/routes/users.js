import express from 'express';
import prisma from '../db/prisma.js';
const router = express.Router();

router.get('/',async (req,res)=>{
    try{
        const users = await prisma.mytodos_user.findMany({
            omit:{pwd:true}
        });
        res.send(users)
    } catch (err) {
        console.log(err);
        return res.status(500).json({error:'Failed to fetch users'});
    }
    
})

router.get('/:id',async (req,res)=>{
    const id = Number(req.params.id)
    if(!Number.isInteger(id)){
        return res.status(400).json({error:'Invalid user id'})
    }
    try{
        const users = await prisma.mytodos_user.findUnique({
            where:{
                user_id: id
            },
            omit:{pwd:true}
        });
        console.log(users)
        res.send(users); 
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Failed to fetch users'});
    }
    
})

router.post('/', async (req, res)=>{
    const required = ["first_name", "last_name", "email", "pwd"];
    const missing = required.filter((key) => !req.body?.[key]);
    if (missing.length>0){
        return res.status(400).json({error:`Missing fields: ${missing.join(", ")}`});
    }
    try{
        const user = await prisma.mytodos_user.create({
            data:{
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email,
                pwd:req.body.pwd
            }
        });
        return res.status(201).json({ id: user.id, email: user.email });
    }catch(err){
        console.log(err);
        return res.status(500).json({error:'Failed to create user.'});
    }
})
export default router;
