import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class SignOut  extends Component{
    constructor(props) {
       super(props);
       this.changeAuth=this.props.changeAuth;
   }
   componentWillMount(){
       localStorage.setItem('cks_token','');
       localStorage.setItem('user','');
       this.changeAuth(false);
   }
    render() {
        return (
           <Redirect to='/'/>
         )
    }
}
export default SignOut;
