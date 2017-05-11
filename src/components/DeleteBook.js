import React, {Component} from 'react';
import waterfall from 'async/waterfall';
class DeleteBook  extends Component{
    constructor(props) {
       super(props);
       this.state={
           message:''
       }
       this.changeAuth=this.props.changeAuth;
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
           this.setState({  message: result.message });
   }
    tryFetch=(callback)=>{
        var token=localStorage.getItem('cks_token');
        var options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token' : token
            }
        };
       fetch('http://localhost:8080/books/'+this.props.match.params.ISBN_code, options).then(function(response){
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
        return (
           <div>{this.state.message}</div>
         )
    }
}
export default DeleteBook;
