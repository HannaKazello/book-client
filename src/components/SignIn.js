import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {
 Redirect
} from 'react-router-dom';
import waterfall from 'async/waterfall';

export class SignIn extends Component{
    constructor(props) {
       super(props);
       this.changeAuth=this.props.changeAuth;
       this.state = {
           email: '',
           password: '',
           errorEmail:'',
           errorPassword:'',
           redirectToReferrer: false,
           message:'',
           isAdmin:false
       }
   }
   handleEmailChange = (event) => {
       this.setState({email: event.target.value});
   }
   handlePasswordChange = (event) => {
       this.setState({password: event.target.value});
   }
   validEmail = () => {
       if(this.state.email===''){
           this.setState({errorEmail: 'This field is required'});
           return false;
       }
       else return true;
   }
   validPassword = () => {
       if(this.state.password===''){
           this.setState({errorPassword: 'This field is required'});
           return false;
       }
       else return true;
   }
  handleSubmit =(event)=> {
       if(this.validEmail() && this.validPassword()){
           waterfall([
              this.tryAuth,
              this.authResult
          ], function (err, result) {
              console.log('done', result);
          });
       }
       event.preventDefault();
   }
   authResult=(result,callback)=>{
       console.log('im in authResult');
       if(result.success){
           localStorage.setItem('cks_token', result.token);
           localStorage.setItem('user', JSON.stringify(result.user));
           this.changeAuth(true, result.user);
           var isAdmin = result.user.admin;
           this.setState({ redirectToReferrer: true, isAdmin: isAdmin });
       }
       else this.setState({message: result.message});
   }
    tryAuth=(callback)=>{
       var options = {
           method:'POST',
           body: 'email='+this.state.email+'&hashedPassword='+this.state.password,
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           }
       };
       fetch('http://localhost:8080/users/authenticate',options).then(function(response){
               return response.json();
           }
       ).then(function(myJson){
           console.log(myJson);
           callback(null, myJson);
       }).catch(function(err){
           console.log(err);
          // callback(err);
       })
   }
    render() {
        var path='/';
        if(this.state.isAdmin) path+='admin';
        if(this.state.redirectToReferrer){
            return (
               <Redirect to={path} />
             )
        }
        return(
            <form className='center' onSubmit={this.handleSubmit}>
                <div>
                <TextField hintText="Email" floatingLabelText="Email"  type="email"  value={this.state.email} onChange={this.handleEmailChange} errorText={this.state.errorEmail}/>
                </div>
                <div >
                <TextField hintText="Password" floatingLabelText="Password"  type="password"  value={this.state.password} onChange={this.handlePasswordChange} errorText={this.state.errorEmail}/>
                </div>
                <FlatButton backgroundColor='#90CAF9' label="Sign in" type="submit"/>
                <p>{this.state.message}</p>
            </form>
        )
    }
}
export default SignIn;
