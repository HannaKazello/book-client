import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import waterfall from 'async/waterfall';


class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {},
            isAdmin: this.props.isAdmin,
            newState: '',
            message:''
        };
    }
    componentWillMount(){
        waterfall([
            this.setOptionsForFetch,
           this.tryFetch,
           this.fetchResult
       ], function (err, result) {
           console.log('done', result);
       });
    }
    setOptionsForFetch=(callback)=>{
        var token=localStorage.getItem('cks_token');
        var options = {
            method: (this.state.newState?'PUT':'GET'),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token' : token
            }
        };
        callback(null,options)
    }
    fetchResult=(result,callback)=>{
        if(result.messaage){
            var nOrder=this.state.order;
            nOrder.state=this.state.newState;
            this.setState({ message: result.messaage , order: nOrder});
        }
        else    this.setState({ order: result });
            console.log('result', result);
    }
     tryFetch=(options,callback)=>{
         console.log('id',this.props.match.params.id);
        fetch('http://localhost:8080/orders/'+this.props.match.params.id+'/'+this.state.newState, options).then(function(response){
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
    handleStateChange=(e)=>{
        this.setState({newState: e.target.value}, ()=>{
            waterfall([
                this.setOptionsForFetch,
               this.tryFetch,
               this.fetchResult
           ], function (err, result) {
               console.log('done', result);
           });
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
                        <h6>{this.state.message ? this.state.message: ''}</h6>
                        <h3>{item.user?item.user.firstName+' '+item.user.lastName:''}</h3>
                        <h5>{item.book? item.book.name:''}</h5>
                        <h6>{item.book ? item.book.authors.join(', '): ''}</h6>
                        <div>

                                <p>Order date: {item.orderDate?item.orderDate:''}</p>
                               <p>Taking date: {item.takingDate? item.takingDate: 'Not taken'}</p>
                               <p>Returned date: {item.returnDate? item.returnDate: 'Not returned'}</p>
                                <p>Current state: {item.state? item.state:''}</p>

                                <select value={item.state} onChange={this.handleStateChange}>

                                  <option value="taking" disabled={isAdmin ? true:false}>Taking</option>
                                  <option value="ordered" disabled={isAdmin ? false:true}>Ordered</option>
                                  <option value="returned" disabled={isAdmin ? true:false}>Returned</option>
                                </select>


                        </div>

                    </Paper>
                </div>

            )
    }
}
export default Order;
