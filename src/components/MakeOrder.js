import React, {Component} from 'react';
import waterfall from 'async/waterfall';
class MakeOrder  extends Component{
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
            method: 'POST',
            body: 'book='+this.props.match.params.ISBN_code+'&user='+this.props.user._id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token' : token
            }
        };
        console.log('i make order');
       fetch('http://localhost:8080/orders/', options).then(function(response){
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
export default MakeOrder;
