const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const sk = process.env.sk_stripe;
const stripe = require("stripe")(sk);

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT;


app.get('/', (req, res) => { 
	res.json("working");
})


app.post('/charge', async (req, res) => {
	try {

		(async() => {
			const customer = await stripe.customers.create({
			name: "NOL",
			email: req.body.email,
			source: req.body.token //ID for token also where the CArd information is
		}, function(err, cust){
			if(err){
				res.send({
					success:false,
					message: "error",
				})
			} else {
				const {id} = cust;
				stripe.subscriptions.create({
					customer: id,
					items: [
					{ 
						plan: "plan_G4lZNUEpBKikyj" //ID for the plan this customer is going to be assigned to.
					}]
				}, function(err, subs){
					if(err){
						res.send({
							success:false,
							message: "error"
						})
					} else {
						res.send({
							success:true,
							message: "success"
						})
					}
				})
			}	
		});

	})();

	} catch (err) {

		res.status(500).end();
	}
})

app.post('/error', (req, res) => {
	const {error} = req.body

	return res.json(error)
})

app.post('/success', (req, res) => {
	const {success} = req.body

	return res.json(success)
})

app.listen(PORT)

// for future reference: https://www.youtube.com/watch?v=cpsu6ZTy--U