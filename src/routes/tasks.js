import express from 'express';

const router = express.Router();
let id = 0;

const todos = [
    {id:id++,task:"Wake up",done:false,user_id:1},
    {id:id++,task:"Meditate",done:true,user_id:2},
    {id:id++,task:"Brush teeth",done:false,user_id:1},
]

router.get('/',(req,res)=>{
    res.send(todos)
})


router.get('/done',(req,res)=>{
    res.send(todos.filter((t)=>t.done))
})

router.get('/:id',(req,res)=>{
    const id = Number(req.params.id)
    if(!Number.isInteger(id)){
        return res.status(400).json({error:'Invalid user id'})
    }
    const task = todos.find((u)=> u.user_id == id)
    if (!task){
        return res.status(404).json({error:'User not found'});
    }else{
        res.send(task)
    }
})

router.post('/',(req,res)=>{
    if (req.body["task"]===undefined 
        || req.body["user_id"]===undefined
        || req.body["user_id"]!==undefined && users[req.body["user_id"]]==undefined){
         res.status(400).send('Bad request');
    }else{
        todos.push({id:id++,task:req.body["task"],done:false,user_id:req.body["user_id"]})
        console.log(todos)
        res.status(200).send(req.body);
    } 
})


export default router;