import React, {Component} from 'react';

class CustomerForm extends Component {
	constructor() {
		super()
		this.state = {
			Name: '',
			Email: '',
			Number: ''
		}
	}

	onNameChange = (event) => {
		this.setState({Name: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({Email: event.target.value})
	}
	onCardNumberChange = (event) => {
		this.setState({Number : event.target.value})
	}

	onRegister = () => {
		fetch('https://safe-springs-05829.herokuapp.com/register', {
			method: 'post',
			headers : {'content-type': 'application/json'},
			body: JSON.stringify({
				name: this.state.Name,
				email: this.state.Email,
				number: this.state.Number
			})
		})
/*		.then(response => response.json())
		.then(data => )*/
	}


	render() {
		return (
			<div>
				<article className="br3 shadow-3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
					<main className="pa4 black-80">
					  <form className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f5 fw6 ph0 mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
					        <input 
					        	onChange={this.onNameChange}
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90" 
						        type="name" 
						        name="name" 
						        id="name"
					        />
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input
						        onChange={this.onEmailChange} 
					        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="email" 
					        	name="email-address"  
					        	id="email-address"
					        />
					      </div>
							<div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="Card-Number">Number</label>
					        <input
						        onChange={this.onCardNumberChange} 
					        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="string" 
					        	name="card Number"  
					        	id="Card"
					        />
					      </div>
					    </fieldset>
					    <div className="mt3">
					      <input
					      	onClick= { this.onRegister } 
					      	//onClick ={() => onRouteChange('home') }
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
					      	type="button" 
					      	value="Register" />
					    </div>

					  </form>
					</main>
				</article>
			</div>
		)
	}

}

export default CustomerForm