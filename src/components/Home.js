import React, {Component} from 'react';
import file from'../source.json';


class Home extends Component{
    handlerClick=()=>{
      this.props.signInClick(!this.props.signIn);
  }
    render() {
        return(
            <div className='Home'>
                <h3 >Welcom to our library</h3>
                <div className='welcomText'>
                    <p>{file.welcomText}</p>
                    <p>{localStorage.getItem('cks_token')}</p>
                </div>
            </div>

        )
    }
}
export default Home;
