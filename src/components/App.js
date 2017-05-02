import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
 Redirect
} from 'react-router-dom';
import Header from './Header.js';
import SignIn from './SignIn.js';
import SignOut from './SignOut.js';
import Home from './Home.js';
import Admin from './Admin.js';
import Menu from './Menu.js';

class App extends Component {
    constructor(props) {
       super(props);
       this.state = {
           isAuthenticated: false,
           user: {}
       };
   }
   componentWillMount(){
       var token=localStorage.getItem('cks_token');
       var user=localStorage.getItem('user');
       if(token===''|| token===null|| user===''|| user===null) this.changeAuth(false);
       else this.changeAuth(true, user.toJSON);
   }
   changeAuth = (e, user) => {
       console.log('im in changeAuth');
       this.setState({isAuthenticated: e});
       this.setState({user: user});
   }
   checkAuth=()=>{
       if(this.state.isAuthenticated){
           console.log('im in checkAuth yes');
           return (<Admin/>)
       }
       else {
           console.log('im in checkAuth NO');
           return(<Redirect to={{pathname: '/signIn',}}/>)
       }
   }
    render() {
        var isAdmin=false;
        if(this.state.user){
            isAdmin=this.state.user.isAdmin;
        }
        return (
            <Router>
                <div>
                  <Header isAuthenticated={this.state.isAuthenticated}/>
                  <div className="Body">
                      <Menu isAdmin={isAdmin}/>
                      {/*<Route path="/home" render={()=><Home signIn={this.state.isAuthenticated}/>} />*/}
                      <Route path="/home"  component={Home}/>
                      <Route path="/signIn" render={()=><SignIn changeAuth={this.changeAuth}/>}/>
                      <Route path="/signOut" render={()=><SignOut changeAuth={this.changeAuth}/>}/>
                      <Route path="/admin" component={this.checkAuth}
                      />
                  </div>

                </div>
        </Router>
        );
    }
}

export default App;
