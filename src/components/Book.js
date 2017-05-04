import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import waterfall from 'async/waterfall';
import FlatButton from 'material-ui/FlatButton';
import  {Link} from 'react-router-dom';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {},
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
            this.setState({ book: result });
    }
     tryFetch=(callback)=>{
        fetch('http://localhost:8080/books/'+this.props.match.params.ISBN_code).then(function(response){
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
        var book = this.state.book;
        const style = {
          height: '100%',
          width: '95%',
          margin: 20,
          padding:10,
        };
            return (
                <div className='BookInfo' >
                    <Paper style={style}>
                        <h3>{book.name}</h3>
                        <h5>{book.authors ? book.authors.join(', '): ''}</h5>
                        <FlatButton className={isAdmin ? '':'none'}><Link to={'/book/edit/'+book.ISBN_code}>Edit</Link></FlatButton>
                        <FlatButton className={isAdmin ? '':'none'}><Link to={'/book/delete/'+book.ISBN_code}>Delete</Link></FlatButton>
                        <FlatButton className={isAdmin ? 'none':''}><Link to={'/book/order/'+book.ISBN_code}>Order</Link></FlatButton>
                        <p>ISBN code: {book.ISBN_code}</p>
                        <div>
                        <p>Description: </p>
                        <p>{book.description? book.description: ''}</p>
                        </div>
                        <div>
                            <div className='left'>
                                <p>Genres: {book.genres? book.genres.join(', '): ''}</p>
                               <p>Keywords: {book.keywords? book.keywords.join(', '): ''}</p>
                                <p> Alternative names: {book.alternative_names!==undefined? book.alternative_names.join(', '): ''}</p>
                                <p>Copies: {book.copies? book.copies: ''}</p>
                                <p>Pages: {book.pages? book.pages: ''}</p>
                            </div>

                            <div className='right'>
                                <p>Language: {book.language? book.language: ''}</p>
                                <p>Publication year: {book.yearOfPublication? book.yearOfPublication: ''}</p>
                                <p>City of publishing: {book.cityOfPublishing? book.cityOfPublishing: ''}</p>
                                <p>Publishing House: {book.publishingHouse? book.publishingHouse: ''}</p><br/>
                            </div>
                        </div>

                    </Paper>
                </div>

            )
    }
}
export default Books;
