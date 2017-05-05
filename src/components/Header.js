import React, {Component} from 'react';
import  {Link} from 'react-router-dom';
import {Toolbar, ToolbarGroup, FlatButton, ToolbarTitle, TextField} from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SearchIcon from 'material-ui/svg-icons/action/search';

class Header extends Component{
    constructor(props) {
       super(props);
       this.state = {
           isAuthenticated: this.props.isAuthenticated,
           searchString: '',
           redirect: ''
       };
       this.search=this.props.search;
   }
   handleSearchStringChange = (event) => {
       this.setState({searchString: event.target.value});
   }
    render() {
        var signInBtnTxt='';
        if(!this.props.isAuthenticated) signInBtnTxt='SignIn';
        else signInBtnTxt='SignOut';

        return (
            <Toolbar style={{background: '#90CAF9'}}>
                <ToolbarTitle text="Books" />
                <ToolbarGroup>
                    <TextField hintText="Search"  value={this.state.searchString} onChange={this.handleSearchStringChange} />
                    <FloatingActionButton mini={true} >
                        <Link to={'/search/'+this.state.searchString}><SearchIcon /></Link>
                    </FloatingActionButton>
                    <FlatButton><Link to={signInBtnTxt}>
                    {signInBtnTxt}</Link></FlatButton>
                    <FlatButton className={this.props.isAuthenticated ? '':'none'}><Link to='/home'>Home</Link></FlatButton>
               </ToolbarGroup>
           </Toolbar>

        );
    }
}
export default Header;
