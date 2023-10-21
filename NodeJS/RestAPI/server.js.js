

const Joi=require('joi');

const express=require('express')
//const Blockchain=require('./blockchain')
//var blockchain=new Blockchain();

// helmet is used to help secure our application by setting various http headers
const helmet=require('helmet')

// morgan is used to get info about http requests in terminal on the server
// for example which end point is hit etc 

const morgan=require('morgan')

const config=require('config')

// debug modules returns a function we are giving it an arbitrary namespace

const startrupdebugger=require('debug')('app:startup')

const dbdebugger=require('debug')('app:db')

// to see the debugging info 

// we write export/set DEBUG=app:startup/db

// to remove the DEBUG variable , we write set / export debug=

// to see the debugging info for more than one namespaces we set debug=app:startup , app:db

// to see all the debugging info we write set debug=app:* 

// set debug=app:db node server.js




// npm install morgan 


//console.log(Blockchain)
//console.log(typeof(Blockchain))


const courses=[
{
	id:1,
	courseName:'courseOne'
},
{
	id:2,
	courseName:'courseTwo'
},

];

var app=express()

app.use(express.json());
app.use(express.urlencoded())
app.use(helmet)
//app.use(morgan('tiny'))

//app.use(express.static('public'))


const enviroment=process.env.NODE_ENV;
console.log(enviroment)
console.log(app.get('env'))

// we use this to check the development enviroment and enable/disable morgan according to that

// app.get('env') returns the envirmoent name

if (app.get('env')==='development'){
	app.use(morgan('tiny'))
	console.log('morgan enabled')
	startrupdebugger('morgan enabled')


}

//console.log(config.get('name'))
//console.log(config.get('mail.host'))


app.get('/',function(req,res){
	//res.send('main page')

	//res.send(typeof(chain));
	//console.log(chain);
	res.send('<h1> Main Page </h1>')

})



app.get('/api/courses',function(req,res){
	res.send(courses);


	
})


// url parameters /:param1/:param2
// query parameter   /?paramName=value


// 404 for object not found error
// 400 for bad request
app.get('/api/courses/:id',(req,res)=>{
	//res.send(req.params)
	const course=courses.find(c => c.id === parseInt(req.params.id))
	if(!course){
	return  res.sendStatus(404).send('course not found....')
	 //.send('Requested course was not found....')
	}
	else{


	res.send(course);
}
})


// handling post requests



// download joi for input validation




//will create a schema that include the type of the input valie , its length , wheather its required or not and much more

/*

const schema={
	name: Joi.string().min(3).required()
}

const result=Joi.validate(req.body,schema)

if (result.error){
	res.sendStatus(400).send(result.error.details[0].message)
}

*/


//writing a function for vaidating request bodies

function validate(body){
	schema={
	name:Joi.string().min(3).required()
	}
	const result= Joi.validate(schema,body)
	return result

	//# or we can write
	//return Joi.validate(schmea,body)
}

//object destructuring part






app.post('/api/courses/add',(req,res)=>{
	const course={
		id: courses.length+1,
		courseName: req.body.courseName
	}

	const {error}=validate(req.body)

	if(error){
	return res.sendStatus(400).send(error.details[0].message)
	}

	courses.push(course)
	res.send(course)
})


app.put('/api/courses/enter/:id',(req,res)=>{

 const course=courses.find(c => c.id === req.body.params.id)
 if(!course){
 	return res.statusCode(404).send('Course with given id not found')
 }

 course.name=req.body.name



})



app.delete('/api/courses/delete/:id',(req , res)=>{

	 const course=courses.find(c => c.id === req.body.params.id)
 if(!course){
 	return res.statusCode(404).send('Course with given id not found')
 }
 const index=indexOf(course)

 courses.splice(index,1)
 res.send(courses)


})


app.post('/transection',function(req,res){
	res.send('transection endpoint');
})



app.get('/mine',function(req,res){
	res.send('min endpoint');
})

// enviroment variable

const port=process.env.PORT || 5000;


app.listen(port);
console.log(port)

console.log('listenining on port 5000 ${port}...........')