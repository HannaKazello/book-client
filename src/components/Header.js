import React, {Component} from 'react';
import {NavItem, Navbar} from 'react-materialize';
import  {Link} from 'react-router-dom';

class Header extends Component{
    handlerClick=()=>{
      this.props.signInClick(!this.props.signIn);
  }
    render() {
        var signInBtnTxt='';
        if(!this.props.signIn) signInBtnTxt='SignIn';
        else signInBtnTxt='SignOut';

        return (
            <Navbar className='blue lighten-3' brand='Book' right>
              <NavItem onClick={this.handlerClick}>
              <Link to={signInBtnTxt}>{signInBtnTxt}</Link></NavItem>
              <NavItem className={this.props.signIn ? '':'none'}><Link to='/home'>Home</Link></NavItem>
            </Navbar>
        );
    }
}
export default Header;
