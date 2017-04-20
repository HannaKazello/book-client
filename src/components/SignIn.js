import React, {Component} from 'react';


class SignIn extends Component{
    handlerClick=()=>{
      this.props.signInClick(!this.props.signIn);
  }
    render() {
        return(
            <div className='SignIn'>
            Sign in
            </div>

        )
    }
}
export default SignIn;
