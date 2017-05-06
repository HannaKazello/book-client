import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import waterfall from 'async/waterfall';
import FlatButton from 'material-ui/FlatButton';
import  {Link} from 'react-router-dom';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {},
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
            this.setState({ order: result });
            console.log('result', result);
    }
     tryFetch=(callback)=>{
         var token=localStorage.getItem('cks_token');
         var options = {
             method:'GET',
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
                 'x-access-token' : token
             }
         };
         console.log('id',this.props.match.params.id);
        fetch('http://localhost:8080/orders/'+this.props.match.params.id, options).then(function(response){
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
        var item = this.state.order;
        console.log('item',item);
        const style = {
          height: '100%',
          width: '95%',
          margin: 20,
          padding:10,
        };
            return (
                <div className='OrderInfo' >
                    <Paper style={style}>
                        <h3>{item.user?item.user.firstName+' '+item.user.lastName:''}</h3>
                        <h5>{item.book? item.book.name:''}</h5>
                        <h6>{item.book ? item.book.authors.join(', '): ''}</h6>
                        <div>

                                <p>Order date: {item.orderDate?item.orderDate:''}</p>
                               <p>Taking date: {item.takingDate? item.takingDate: 'Not taken'}</p>
                               <p>Returned date: {item.returnDate? item.returnDate: 'Not returned'}</p>
                                <p>Current state: {item.state? item.state:''}</p>

                                <select defaultValue={item.state}>
                                  <option value="taking" disabled={isAdmin ? false:true}>Taking</option>
                                  <option value="ordered" disabled={isAdmin ? true:false}>Ordered</option>
                                  <option value="returned" disabled={isAdmin ? false:true}>Returned</option>
                                </select>
                            

                        </div>

                    </Paper>
                </div>

            )
    }
}
export default Order;
