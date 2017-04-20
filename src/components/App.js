import React, {Component} from 'react';
import Header from './Header.js';
import {Router,Route} from 'react-router-dom';
import SignIn from './SignIn.js';
import Home from './Home.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            signIn: false,
        };
    }
    signInClick=(change)=>{
      this.setState({
          signIn: change
      });

   }
    render() {

        return (

            <div className="App" >
            <Header signIn={this.state.signIn} signInClick={this.signInClick}/>
            <Route path="/home" component={Home} />
            <Route path="/signIn" component={SignIn} />

            <p>Something.</p>
            </div>

        );
    }
}

export default App;
