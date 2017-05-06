import React, {Component} from 'react';
import waterfall from 'async/waterfall';
import OrderList from './OrderList.js';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            filter: '/'
        };
    }
    componentWillMount(){
        console.log('im mount Orders');
        waterfall([
           this.tryFetch,
           this.fetchResult
       ], function (err, result) {
           console.log('done', result);
       });
    }
    fetchResult=(result,callback)=>{
            this.setState({ orders: result });
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
         var address;
         if(this.state.filter==='/') address='http://localhost:8080/orders';
         else address='http://localhost:8080/orders/state/'+this.state.filter;
        fetch(address, options).then(function(response){
                return response.json();
            }
        ).then(function(myJson){
            console.log('orders result: ',myJson);
            callback(null, myJson);
        }).catch(function(err){
            console.log(err);
           // callback(err);
        })
    }
    handleChange = (event, v) =>{
        this.setState({filter: v}, function(){
            waterfall([
               this.tryFetch,
               this.fetchResult
           ], function (err, result) {
               console.log('done', result);
           });
        });

    }
    updateList=()=>{

    }
    render() {
        var ordersTemplate = <p>No orders</p>;
        if(this.state.orders){
                ordersTemplate=<OrderList orders={this.state.orders} updateList={this.updateList}/>
        }
        return(
            <div className='Orders' >
                <RadioButtonGroup className='RB' name="shipSpeed" defaultSelected="/" onChange={this.handleChange}>
                  <RadioButton
                    value="/"
                    label="All"
                  />
                  <RadioButton
                    value="ordered"
                    label="Ordered"
                  />
                  <RadioButton
                    value="returned"
                    label="Returned"
                  />
                  <RadioButton
                    value="taken"
                    label="Taken"
                  />
                </RadioButtonGroup>
                {ordersTemplate}
           </div>
       )
    }
}
export default Orders;
