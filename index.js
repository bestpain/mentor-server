const express=require('express')
const app=express()
const cors=require('cors')
app.use(cors())
//import mongo related files
const mongoDb=require('./db/mongo')
const port=process.env.PORT || 8000;
app.use(express.json())

app.get('/mentors',async (req,res)=>{
	try{
		const mentors=await mongoDb.mentor.find()
		res.send(mentors)
	}catch(e){
		res.send(e)
	}
})

app.get('/mentor/:id',async (req,res)=>{
	try{
		const mentor=await mongoDb.mentor.findById(req.params.id)
		res.send(mentor)
	}catch(e){
		res.send(e)
	}
})

app.patch('/mentors/update/:id',async (req,res)=>{
	const id=req.params.id;
	const updated=await mongoDb.mentor.findByIdAndUpdate(id,req.body,{new:true});
	res.send(updated)
})

app.post('/mentors/add',async(req,res)=>{
	const mentor=new mongoDb.mentor(req.body)
	try{
		const result=await mentor.save();
		res.status(201).send(result)
	}catch(e){
		res.status(400).send(e)
	}
})

app.delete('/mentors/delete/:id',async (req,res)=>{
	try{
		const deletedMentor=await mongoDb.mentor.findByIdAndDelete(req.params.id)
		if(!deletedMentor){
			return res.status(404).send("not found")
		}
		res.send(deletedMentor)
	}catch(e){
		res.status(500).send(e)
	}
})

app.post('/tasks/add/:id',async (req,res)=>{
	try{
		await mongoDb.mentor.findById(req.params.id).then(user=>{
			user.tasks.push({title:req.body.title})
			user.save().then(mentor=>{
				res.send(mentor)
			})
		})
		
	}catch(e){
		res.send(e)
	}
})

//start the server
app.listen(port,()=>console.log("server listening on 8000"))


