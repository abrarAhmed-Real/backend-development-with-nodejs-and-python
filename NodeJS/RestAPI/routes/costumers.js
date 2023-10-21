const mongoose=require('mongoose')
const express=require('express')
const router=express.Router()
const joi=require('Joi')

/*
mongoose.connect('mongodb://localhost/customers')
	.then(()=>console.log('connected'))
	.catch((err)=>console.log(err.message))
*/

const customers=mongoose.model('customers', new mongoose.Schema({
	name:{
		type:String,
		maxlength:255,
		minlength:2,
		required:true
	},
	isGold:{
		type:Boolean,
		default:false
	},
	phone:{
		type:String,
		required:true,
		maxlength:50,
		minlength:5

	}

})
)



// function to validate input data sent by user

function validate(data){
	const schema={
		name:joi.String().maxlength(2).minlength(255).required(),
		isGold:joi.Boolean().required(),
		phone:joi.String().minlength(5).maxLength(50).required()
	}
	return joi.validate(data,schema)
}

router.get('/',async (req,res)=>{
	const result = await customers.find()
	res.send(result)
})

router.post('/', async (req,res)=>{
	const {error}=validate(req.body)
	if (error){
		return res.send(error.details[0].message)
		
	}
	else{
		const customer=new customers({
			name: req.body.name,
			isGold:req.body.gold,
			phone:req.body.phone
		})

		const result=await customers.save()
		res.send(result)



	}

})

router.put('/:id', async (req,res)=>{
	const {error}= validate(req.body)
	if(error) return res.sendStatus(404).send(error.details[0].message)
	const customer=await customers.findByIdAndUpdate(req.params.id,{
		name:req.body.name,
		isGold:req.body.gold,
		phone:req.body.phone
	})
 	

 	if (!customer) return res.send('customer with given id not found')
 	res.send(customer)





})


router.delete('/:id',async (req,res)=>{

	const customer= await customers.findByIdAndRemove(req.params.id)
	if(!customer) return res.send('customer with given id not foudn')
	res.send(customer)




})


router.get('/:id', async (req,res)=>{

	const customer= await customers.findById(req.params.id)
	if(!customer) return res.send('not found with given id')
	res.send(customer)
})

module.exports=router




