

const router=require('express').Router()
const joi=require('Joi')

 
const mongoose=require('mongoose')

/*
mongoose.connect('mongodb://localhost/movies')
	//.then(()=>console.log('connected'))
	.catch((err)=>console.log(err))
*/

const movies=mongoose.model('movie',mongoose.Schema({
	name:{
		type:String,
		required:true,
		minlength:2,
		maxlength:255
	}
})
)

function validate(data){
	schema={
		name: Joi.string().min(2).maxlength(255).required()
	}
	return Joi.validate(schema,data)
}



// view engine to create html dynamically and sent it to the client

//app.set('view engine','pug')
//app.set('views','./views')

var app=express()


app.get('/',async (req,res)=>{
	//res.send('root page.....')
	//res.render('html',{title:'my web app',heading:'a fucking heading'})
	res.send('<h1> all data </h1>')
	const result = await  movies.find()
	res.send(result)




})

app.post('/',async (req,res)=>{
	const data=req.body.name;
	if(validate(data)){
	const new_movie=new movies({
		name:data
	})
}
else{
	res.statusCode(404).send('invalid data')
}

})

app.put('/:id',async (req,res)=>{
	const error=validate(req.body.name)
	if (error){
		res.send(error.details[0].message)
	}
	else{
		const result=await movies.findByIdAndUpdate(req.params.id,{
			name: req.body.name

		})

	 }

})

app.delete('/:id',async (req,res)=>{
	const result= await movies.findByIdAndRemove(req.params.id)
	if(!result){
		res.statusCode(404).send('movie with given id not found')

	}
	else{
		res.send(result)
	}
})

app.get('/:id', async (req,res)=>{
	const result= await  movies.findById(req.params.id)
	if(!result){
		res.statusCode(404).send('movie with given id not found')

	}
	else{
		res.send(result)
	}
})

module.exports=router

//app.listen(5000)