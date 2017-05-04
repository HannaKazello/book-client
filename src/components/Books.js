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
            isAdmin: this.props.isAdmin
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
        console.log('im in authResult');
            this.setState({ books: result });
    }
     tryFetch=(callback)=>{
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
        var isAdmin = this.state.isAdmin;
        var BooksTemplate=this.state.books.map(function(item,index){
            return (
                <div className='Book' key={'Book'+index}>
                    <Card>
                        <CardHeader
                          title={item.name}
                          subtitle={item.authors.join(', ')}
                        />
                        <CardActions>
                          <FlatButton className={isAdmin ? '':'none'}><Link to={'/book/edit/'+item.ISBN_code}>Edit</Link></FlatButton>
                          <FlatButton className={isAdmin ? '':'none'}><Link to={'/book/delete/'+item.ISBN_code}>Delete</Link></FlatButton>
                          <FlatButton><Link to={'/book/'+item.ISBN_code}>Show more</Link></FlatButton>
                          <FlatButton className={isAdmin ? 'none':''}><Link to={'/book/order/'+item.ISBN_code}>Order</Link></FlatButton>
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
        return(
            <div className='Books' >
               {BooksTemplate}
           </div>
       )
    }
}
export default Books;
