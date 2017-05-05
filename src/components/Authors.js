import React, {Component} from 'react';
import waterfall from 'async/waterfall';
import  {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';

class Authors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
        };
    }
    componentWillMount(){
        waterfall([
           this.tryFetch,
           this.fetchResult
       ], function (err, result) {
           console.log('done', result);
       });
    }
    fetchResult=(result,callback)=>{
            this.setState({ authors: result });
    }
     tryFetch=(callback)=>{
         var address='http://localhost:8080/books/authors';
        fetch(address).then(function(response){
                return response.json();
            }
        ).then(function(myJson){
            console.log('Authors result: ',myJson);
            callback(null, myJson);
        }).catch(function(err){
            console.log(err);
           // callback(err);
        })
    }
    render() {
        var AuthorsTemplate = <p>No Authors</p>;
        if(this.state.authors){
                AuthorsTemplate=this.state.authors.map(function(item,index){
                return (
                    <ListItem key={'Author'+index}>
                        <Link to={'/authors/'+item}>{item}</Link>
                    </ListItem>

                )
            })
        }
        return(
            <div className='Authors' >
                <List>
                    {AuthorsTemplate}
               </List>
           </div>
       )
    }
}
export default Authors;
