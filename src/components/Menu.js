import React, {Component} from 'react';
import  {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import BookIcon from 'material-ui/svg-icons/av/library-books';
import ClassIcon from 'material-ui/svg-icons/action/class';
import FaceIcon from 'material-ui/svg-icons/action/face';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import AddIcon from 'material-ui/svg-icons/content/add';


class Menu extends Component{
    constructor(props) {
       super(props);
       this.state = {
           isAdmin:this.props.isAdmin
       }
   }

    render() {
        if(this.state.isAdmin){
            return(
                <div className='Menu'>
                    <List>
                        <ListItem leftIcon={<BookIcon />}>
                            <Link to='/books'>Books</Link>
                        </ListItem>
                        <ListItem leftIcon={<ClassIcon />}>
                            <Link to='/genres'>Genres</Link>
                        </ListItem>
                        <ListItem leftIcon={<FaceIcon />}>
                            <Link to='/authors'>Authors</Link>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem leftIcon={<AssignmentIcon />}>
                            <Link to='/orders'>Orders</Link>
                        </ListItem>
                        <ListItem leftIcon={<AddIcon />}>
                            <Link to='/books/add'>Add Book</Link>
                        </ListItem>
                    </List>
                </div>
            )
        }
        return(
            <div className='Menu'>
                <List>
                    <ListItem leftIcon={<BookIcon />}>
                        <Link to='/books'>Books</Link>
                    </ListItem>
                    <ListItem leftIcon={<ClassIcon />}>
                        <Link to='/genres'>Genres</Link>
                    </ListItem>
                    <ListItem leftIcon={<FaceIcon />}>
                        <Link to='/authors'>authors</Link>
                    </ListItem>
                </List>
            </div>

        )
    }
}
export default Menu;
