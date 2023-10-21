const exp=require('express')

var app=exp()

app.get('/',(req,res)=>{
	res.send('index page.......')
})

//app.listen(4000)



const mongo=require('mongoose')

mongo.connect('mongodb://localhost/mongdatabase')
	.then(()=>console.log('connected to the database'))
	.catch((err)=>console.log(err.message))


/*

mongo db types

string
number
date
objectid
buffer
boolean
array






*/
// creating a scheam

const schma=mongo.Schema({
	name:{type:String , required:true},
	//price:Number,
	author:String ,
	tags:[String],
	date:{type:Date , default:Date.now},
	isPublished:Boolean ,
	price:{
		type: Number,
		required: function(){return this.isPublished}
	}



})

const Course=mongo.model('course',schma)


async function createCourse(){


const course1=new Course({
	name:'Abrar',
	author:'Abrar Ahmed',
//	price:50,
	tags:['python','machine learning','ai'],
	isPublished:true,
	//price//:20
})
try{
	const p=await course1.save()
console.log(p)

}
catch(ex){
	console.log(ex.message)
}

}

createCourse()

// in mongo , collection => table , document => row


/*

comparison query operators

eq : equal
ne : not equal to

gt: greater than

lt: less than

gte: greater than or equal to

lte: less than or equal to

in : in 

nin : not in


imagine we have a property of dollars ( price ) we want to reterive all the documents that are greater than or 10

.find({price:{$gte:10}})

what if we gotta find the courses that are in 10 , 15 , 20 prices

.find({price:{$in:[10,15,20]}}) 

what if we gotta find courses whoes prices are less 20 and greater than 30 dollars

.find({price:{$gte:20 , $lte:30}})

logical quires

.find()
.or([{isPublished:true},{price:10}])


*/



// quering or retereiving documents

async function getCourse () {
	const courses=await Course
						//.find({price:{$gte:10,$lte:50}} )
						//.limit(2)
						.find()
						//.or([{isPublished:true},{price:{$gt:10}}])
						.or([{isPublished:true},{price:{$gt:500}}])
						.sort({author:-1})
						//.select({name:1,tags:1,isPublished:1,price:1})

						// count : to get the number of ducuments
						.count()

	console.log(courses)


	
}


getCourse()


// updating documents/rows

// query first method

async function updateById(id){
  const course= await	Course.findById(id)
  if (!course){
  	return null;
  }
  else{
  	course.set({
  		name: 'new name',
  		author:'new authoer',
  		price: 222,
  	})
  }
  const result=course.save()
  console.log(result)

}

//console.log(updateById('6321615828e83a5dccc461d4'))




// update first method

async function updateFirst(id){
 const result= await	Course.updateOne({_id:id},{
		name:'zobia',
		author:'abrar ahmed'
	})
 console.log(result['modifiedCount'])
}

//updateFirst('6321615828e83a5dccc461d4')


// deleting documents

async function deleteDocument(id){
 const result= await	Course.deleteOne({_id:id})
 console.log(result)
}


//deleteDocument('6321615828e83a5dccc461d4')





//console.log(Course.find())



// asanchronous js and call back functions

// functions as a reference to another function







//console.log('before')

//test(2,display_data);

/*
test(2)
	.then(result=>getrepos(result.githubusername))
	.then(r=>console.log(r))
	.catch(err=>console.log(err.message))



p=test(2)
p2=getrepos(p.githubusername)
Promise.all([p,p2])
	.then(result=>console.log(result[0]))
	.catch(err=>console.log(err.message))



console.log('after')


// resolved call back hell , using call back functions







function display_data(data){
	console.log(data)
	getrepos(data.githubusername,display_repos);
}



function display_repos(repos){
	console.log(repos)
}





function test(id){
	return new Promise((resolve,reject)=>{

		setTimeout(()=>{
		console.log('reading from a databaset')
		resolve({id:id,githubusername:'abrar'})

	},3000);

	})
	
}

function getrepos(username){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			reject(new Error())

		 //resolve(['repo1','repo2','repo3'])

	},3000)

	})
	
	

}






*/

/*
console.log('promisies')


p=new Promise((resolve,reject)=>{


	setTimeout(()=>{
	//	reject(new Error('error'))
	resolve(1)

	},3000)
});


p
 .catch(err=>console.log(err.message))
 .then(result=>console.log(result))

*/





