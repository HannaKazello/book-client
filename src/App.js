import React, {Component} from 'react';
import{Navbar, NavItem}  from 'react-materialize';


class App extends Component {
    render() {
        return (
            <div className="App" >
            <Navbar className='blue lighten-3' brand='Book' right>
              <NavItem >Sign In</NavItem>
            </Navbar>
            <p>Something.</p>
            </div>
        );
    }
}

export default App;
