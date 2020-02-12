import React, {Component} from 'react';
import {CardNumberElement, CardExpiryElement, CardCvcElement, injectStripe} from 'react-stripe-elements';


class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false,
                error: false,
                token: "",
                email: "",
                emailWarn: false,
                emailIsValid: "",
                isLoading: false}
    this.submit = this.submit.bind(this); 
  }

  onEmail = (event) => {  
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(event.target.value)) { 
      this.setState({email: event.target.value,
                    emailWarn: false})
    } else {
      this.setState({emailWarn:true})
    }
  }

 
  async submit(ev) {
    
    if(!this.state.email) {
      this.setState({emailWarn:true})
    }

    let {token} = await this.props.stripe.createToken({name: "NOL"});
      if(token && !this.state.emailWarn) {
          this.setState({isLoading: true}) // loading init

          let response = await fetch("https://safe-springs-05829.herokuapp.com/charge", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              'token': token.id,
              'email': this.state.email
            }) 
          })
          if (response.ok) this.setState({token: {token},
                                          email:this.state.email,
                                          isLoading: false}) // loading terminate
          
          if (response.ok) this.setState({complete: true});
      } else {
        fetch('https://safe-springs-05829.herokuapp.com/error', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            error: "true"
          })
        })
        .then(response => response.json())
        .then(data => {
          this.setState({error: data})
        });
    };
}


  onReturn = (event) => {
    this.setState({error:"",
           emailWarn: false})
  }

  render() {
        
    if(this.state.complete) return( 
        <div className="SuccessMessage">
                  <h1> Thanks for Subscribing! </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
                )
                if(this.state.error) return( 
                  <div className="errorMessage">
                    Something seems to have gone wrong, make sure you have submited the correct information and try again. <br/>
                    If you continue getting this message, reach out to us at someemail@email.com.<br/>
                    <button className="returnBtn" onClick={this.onReturn}> Try again </button>
                  </div>
        )

        return (
          <div>
            {this.state.isLoading === false 
            ?<div className="paymentForm">
              <img alt="Client Logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXyLJKogQcNgoLIXK9FFT5GGP5IZctPvDh5LTcm48cCH0Kmm5q&s" className="logo"/>
              <h3 className="subtitle" id="top">\ Informação do Cliente \</h3>
              <input type="email" className="emailInput" placeholder="E-mail" onChange={this.onEmail} />

              <h3  className="subtitle">\ Informação do Cartão \</h3>
              <CardNumberElement className="cardNumber"/>
              <CardExpiryElement className="cardExpiry"/>
              <CardCvcElement className="cardCvc"/>
              <button className="btn-submit" onClick={this.submit}><b>Fazer Pagamento</b></button>
            </div>
            :(this.state.isLoading === true
              ? <div class="loading la-ball-rotate la-dark la-2x">
                    <div></div>
                </div>
              : <div> LOADING... </div>
            )
          }
          </div>
      )
       
  }
}

// https://stripe.dev/react-stripe-elements/#payment-request Is this what we want? Yep confirmed.

export default injectStripe(PaymentForm);