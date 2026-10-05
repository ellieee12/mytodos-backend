import express from 'express';
import prisma from '../db/prisma.js';
import cookieParser from 'cookie-parser';
import requireAuth from '../middlewares/auth.js';

const router = express.Router();
router.use(cookieParser());
router.use(requireAuth);

router.get('/',async (req,res)=>{
    console.log(req.user.user_id);
    try{
        const tasks = await prisma.mytodos_task.findMany({
            where:{
                user_id:req.user.user_id
            }
        });
        res.send(tasks);
    }catch(err){
        console.log(err);
        return res.status(500).json({error:'Failed to fetch tasks'});
    }
})

router.get('/:id',async (req,res)=>{
    const id = Number(req.params.id)
    if(!Number.isInteger(id)){
        return res.status(400).json({error:'Invalid task id'})
    }
    try{
        const tasks = await prisma.mytodos_task.findUnique({
            where:{
                task_id:id
            }
        })
        res.send(tasks);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Failed to fetch users'});
    }
})

router.post('/',async (req,res)=>{
    const required = ["name"]
    const missing = required.filter((key)=>!req.body?.[key]);
    missing.concat(["user_id"].filter((key)=>!req.cookies[key]));
    if (missing.length>0){
         return res.status(400).json({error:`Missing fields: ${missing.join(", ")}`});
    }
    const id = Number(req.user.user_id)
    if(!Number.isInteger(id)){
        return res.status(400).json({error:'Invalid user id'})
    }
    try{
        const task = await prisma.mytodos_task.create({
            data:{
                name:req.body.name,
                done:false,
                user_id:id
            }
        });
        return res.status(201).json(task);
    }catch(err){
        console.log(err);
        return res.status(500).json({error:'Failed to create task.'});
    }
})

router.delete('/:id',async (req,res)=>{
    const id = Number(req.params.id)
    if(!Number.isInteger(id)){
        return res.status(400).json({error:'Invalid task id'})
    }
    try {
        await prisma.mytodos_task.deleteMany({
            where:{
                task_id:id
            }
        });
        return res.json({message:"Blog deleted successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Unable to delete task"});
    }
})


export default router;