import React, {Component} from 'react';
import waterfall from 'async/waterfall';
import  {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';

class Genres extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
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
            this.setState({ genres: result });
    }
     tryFetch=(callback)=>{
         var address='http://localhost:8080/books/genres';
        fetch(address).then(function(response){
                return response.json();
            }
        ).then(function(myJson){
            console.log('Genres result: ',myJson);
            callback(null, myJson);
        }).catch(function(err){
            console.log(err);
           // callback(err);
        })
    }
    render() {
        var GenresTemplate = <p>No Genres</p>;
        if(this.state.genres){
                GenresTemplate=this.state.genres.map(function(item,index){
                return (
                    <ListItem key={'Author'+index}>
                        <Link to={'/Genres/'+item}>{item}</Link>
                    </ListItem>

                )
            })
        }
        return(
            <div className='Genres' >
                <List>
                    {GenresTemplate}
               </List>
           </div>
       )
    }
}
export default Genres;
