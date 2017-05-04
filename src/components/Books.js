import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import waterfall from 'async/waterfall';
import FlatButton from 'material-ui/FlatButton';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            isAdmin: false
        };
    }
    componentWillMount(){
        waterfall([
           this.tryAuth,
           this.authResult
       ], function (err, result) {
           console.log('done', result);
       });
    }
    authResult=(result,callback)=>{
        console.log('im in authResult');
            this.setState({ books: result });
    }
     tryAuth=(callback)=>{
        fetch('http://localhost:8080/books').then(function(response){
                return response.json();
            }
        ).then(function(myJson){
            console.log(myJson);
            callback(null, myJson);
        }).catch(function(err){
            console.log(err);
           // callback(err);
        })
    }
    render() {
        var BooksTemplate=this.state.books.map(function(item,index){
            return (
                <div className='Book' key={'Book'+index}>
                    <Card>
                        <CardHeader
                          title={item.name}
                          subtitle={item.authors.join(', ')}
                          actAsExpander={true}
                          showExpandableButton={true}
                        />
                        <CardActions>
                          <FlatButton label="Edit" />
                          <FlatButton label="Delete" />
                        </CardActions>
                        <CardText expandable={true}>
                          <p>Genres: {item.genres.join(', ')}</p>
                          <p>Keywords: {item.keywords? item.keywords.join(', '): ''}</p>
                        </CardText>
                    </Card>
                </div>

            )
        })
        return(
            <div className='Books' >
               {BooksTemplate}
           </div>
       )
    }
}
export default Books;
