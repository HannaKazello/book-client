import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import waterfall from 'async/waterfall';
import FlatButton from 'material-ui/FlatButton';
import  {Link} from 'react-router-dom';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            isAdmin: this.props.isAdmin,
            searchString: this.props.searchString
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
            this.setState({ books: result });
    }
     tryFetch=(callback)=>{
         var address='http://localhost:8080/books';
         if(this.props.match.url==='/books') address='http://localhost:8080';

        fetch(address+this.props.match.url).then(function(response){
                return response.json();
            }
        ).then(function(myJson){
            console.log('books result: ',myJson);
            callback(null, myJson);
        }).catch(function(err){
            console.log(err);
           // callback(err);
        })
    }
    render() {
        var BooksTemplate = <p>No books</p>;
        if(this.state.books){
                BooksTemplate=this.state.books.map(function(item,index){
                return (
                    <div className='Book' key={'Book'+index}>
                        <Card>
                            <CardHeader
                              title={item.name}
                              subtitle={item.authors.join(', ')}
                            />
                            <CardActions>
                              <FlatButton><Link to={'/book/'+item.ISBN_code}>Show more</Link></FlatButton>
                            </CardActions>
                            <CardText  >
                                <p>ISBN code: {item.ISBN_code}</p>
                              <p>Genres: {item.genres.join(', ')}</p>
                              <p>Keywords: {item.keywords? item.keywords.join(', '): ''}</p>
                            </CardText>
                        </Card>
                    </div>

                )
            })
        }
        return(
            <div className='Books' >
               {BooksTemplate}
           </div>
       )
    }
}
export default Books;
