import React, {Component} from 'react';
import  {Link} from 'react-router-dom';
import {Toolbar, ToolbarGroup, FlatButton, ToolbarTitle} from 'material-ui'

class Header extends Component{
    constructor(props) {
       super(props);
       this.state = {
           isAuthenticated: this.props.isAuthenticated
       };
   }
    render() {
        var signInBtnTxt='';
        if(!this.props.isAuthenticated) signInBtnTxt='SignIn';
        else signInBtnTxt='SignOut';

        return (
            <Toolbar style={{background: '#90CAF9'}}>
                <ToolbarTitle text="Books" />
                <ToolbarGroup>
                    <FlatButton><Link to={signInBtnTxt}>
                    {signInBtnTxt}</Link></FlatButton>
                    <FlatButton className={this.props.isAuthenticated ? '':'none'}><Link to='/home'>Home</Link></FlatButton>
               </ToolbarGroup>
           </Toolbar>

        );
    }
}
export default Header;
