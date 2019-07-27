import React from 'react'
import QuestionChart from './QuestionChart'
import PlatformChart from './PlatformChart'
import TimeChart from './TimeChart'

const allowed_users = ['admin', 'priyanshu'];
const passwords = {
	admin: "theaienterprise#",
	priyanshu: "iwasintern"
}

function checkLogin(name, pass) {
	if(allowed_users.includes(name)) {
		if(pass === passwords[name]) {
			return true;
		} else {
			alert("Invalid password for this authorised username!")
			return false
		};
	}
	alert("You are not an authorised user!")
	return false;
}


class ProtectedData extends React.Component {
	constructor(props) {
        super(props);
        this.state = {LoggedIn: false};
    }
    handleChangename = event => {
	    this.setState({name: event.target.value})
	  }

	handleChangePass = event => {
		 	this.setState({pass: event.target.value})
		 }

	handleSubmit = e => {
	    	e.preventDefault();
	    	var pass = this.state.pass;
	    	var name = this.state.name;
	    	if (checkLogin(name, pass)) {
	    		this.setState({LoggedIn: true})
	    	} else {
	    		this.setState({LoggedIn: false, name: "", pass: ""})
	    	}
    }
    render() {
    	var isLoggedIn = this.state.LoggedIn;
    	if (isLoggedIn) {
    return (<div>
    		<div style={{overflowY: "auto", height: 500, width: "100%", marginTop: 50}}><QuestionChart /></div>
    		<div style={{overflowY: "auto", height: 250, width: "100%", marginTop: 50}}><PlatformChart /></div>
    		<div style={{overflowY: "auto", height: 500, width: "100%", marginTop: 50}}><TimeChart /></div>
    	</div>);
	} else {
		return (<div style={{marginTop: 30}}>
			<form onSubmit={this.handleSubmit}><input name="name" type="text"
              onChange={this.handleChangename} placeholder="Enter your name" />
          <br /><input
            name="password"
            type="password"
              onChange={this.handleChangePass}
            placeholder="Enter your password"
          /><br />
          <button type="submit" >
            Login
          </button>
        </form>
			</div>)
	}
    }
    
}
export default ProtectedData;
