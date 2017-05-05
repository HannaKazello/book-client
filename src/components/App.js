import React, {Component} from 'react';
import {
  Route,
 Redirect
} from 'react-router-dom';
import Header from './Header.js';
import SignIn from './SignIn.js';
import SignOut from './SignOut.js';
import Home from './Home.js';
import Admin from './Admin.js';
import Menu from './Menu.js';
import Books from './Books.js';
import Book from './Book.js';
import Authors from './Authors.js';
import Genres from './Genres.js';

class App extends Component {
    constructor(props) {
       super(props);
       this.state = {
           isAuthenticated: false,
           user: {},
           isAdmin: false
       };
   }
   componentWillMount(){
       console.log('mount App');
       var token=localStorage.getItem('cks_token');
       var user=localStorage.getItem('user');
       if(token===''|| token===null|| user===''|| user===null) this.changeAuth(false);
       else this.changeAuth(true, JSON.parse(user));
   }
   changeAuth = (e, user) => {
       if(user) {
           this.setState({
               isAuthenticated: e,
               user: user,
               isAdmin: user.admin,
               searchString:'',
           });
       }
       else this.setState({isAuthenticated: e});
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
   search=(searchString)=>{
       console.log('searchString', searchString);
       this.setState({searchString: searchString});
   }
    render() {
        return (
                <div>
                  <Header isAuthenticated={this.state.isAuthenticated} search={this.search}/>
                  <div className="Body">
                      <Menu isAdmin={this.state.isAdmin}/>
                      {/*<Route path="/home" render={()=><Home signIn={this.state.isAuthenticated}/>} />*/}
                      <Route path="/home"  component={Home}/>
                      <Route path="/signIn" render={()=><SignIn changeAuth={this.changeAuth}/>}/>
                      <Route exact path="/books" render={({match})=><Books isAdmin={this.state.isAdmin} match={match}/>}/>
                      <Route exact path="/authors" render={({match})=><Authors match={match}/>}/>
                      <Route exact path="/genres" render={({match})=><Genres match={match}/>}/>
                      <Route exact path="/search/:searchString" render={({match})=><Books isAdmin={this.state.isAdmin} match={match} searchString={this.state.searchString}/>}/>
                      <Route path="/authors/:author" render={({match})=><Books isAdmin={this.state.isAdmin} match={match}/>}/>
                      <Route path="/genres/:genre" render={({match})=><Books isAdmin={this.state.isAdmin} match={match}/>}/>
                      <Route path="/book/:ISBN_code" render={({match})=><Book isAdmin={this.state.isAdmin} match={match}/>}/>
                      <Route path="/signOut" render={()=><SignOut changeAuth={this.changeAuth}/>}/>
                      <Route path="/admin" component={this.checkAuth}
                      />
                  </div>

                </div>
        );
    }
}

export default App;
