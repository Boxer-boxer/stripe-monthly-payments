
import React, {Component}  from 'react';
import './App.css';

import {Elements, StripeProvider} from 'react-stripe-elements';
import PaymentForm from './Components/PaymentForm/PaymentForm';
import Logo from './Components/Logo/Logo';


class App extends Component  {
/*
=========== TO DO ================
Add E-mail to client form; Check
Frontend; Check 
Deployment -> Heroku
CSS ? Get some ideas; Check
==================================


*/

	render() {
	    return (
	      <div className="App">
	        <Logo />
	        <StripeProvider apiKey="pk_live_gOBVKYDV4kz3OSFDb0xg1Bgz001mDninon">
		        <div className="PaymentForm">
		          <Elements>
		            <PaymentForm />
		          </Elements>
		        </div>
		      </StripeProvider>
	      </div>
	      );
	}

}

export default App;
