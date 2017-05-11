import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import waterfall from 'async/waterfall';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            title:'',
            description:'',
            isAdmin: this.props.isAdmin
        };
    }
    componentWillMount(){
    //     waterfall([
    //        this.setOptionsForFetch,
    //        this.tryFetch,
    //        this.fetchResult
    //    ], function (err, result) {
    //        console.log('done', result);
    //    });
    }
    setOptionsForFetch=(callback)=>{
        var token=localStorage.getItem('cks_token');
        var options = {
            method: ((this.state.type==='add')?'POST':'PUT'),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token' : token
            }
        };
        var address = (this.state.type==='add')?'http://localhost:8080/books/':('http://localhost:8080/books/'+this.state.book.ISBN_code);
        callback(null,options, address)
    }
    fetchResult=(result,callback)=>{
            this.setState({ book: result });
    }
     tryFetch=(options, address,callback)=>{
        fetch(address, options).then(function(response){
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
    handleSubmit=(event)=>{
        var form = new FormData();
        form.append('title',this.state.title);
        form.append('username', 'Chris');
        console.log('form', form);
        event.preventDefault();
    }
    titleChange=(e)=>{
        this.setState({title: e.target.value});
    }
    descriptionChange=(e)=>{
        this.setState({description: e.target.value});
    }
    render() {

        const style = {
          height: '100%',
          width: '95%',
          margin: 20,
          padding:10,
        };
            return (
                <div className='BookInfo' >
                    <Paper style={style}>
                        <h3>Add Book</h3>
                        <form onSubmit={this.handleSubmit}>
                        <TextField floatingLabelText="Title"  value={this.state.title} onChange={this.titleChange}/>
                        <TextField floatingLabelText="Description"  value={this.state.description} onChange={this.descriptionChange}/>
                        <TextField floatingLabelText="Title"  value={this.state.title} onChange={this.titleChange}/>
                        <FlatButton type="submit">Submit</FlatButton>
                        </form>


                    </Paper>
                </div>

            )
    }
}
export default AddBook;
