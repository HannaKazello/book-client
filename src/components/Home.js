import React, {Component} from 'react';


class SignIn extends Component{
    handlerClick=()=>{
      this.props.signInClick(!this.props.signIn);
  }
    render() {
        return(
            <div className='Home'>
            Home
            </div>

        )
    }
}
export default SignIn;
