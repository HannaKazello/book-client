import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import  {Link} from 'react-router-dom';




class OrderList extends Component {

    render() {
        var ordersTemplate=this.props.orders.map(function(item,index){
            return (
                <TableRow key={'Order'+index}>
                    <TableRowColumn>{item.user.firstName+' '+item.user.lastName}</TableRowColumn>
                    <TableRowColumn>{item.book.name}</TableRowColumn>
                    <TableRowColumn>{item.book.authors ? item.book.authors.join(', '): ''}</TableRowColumn>
                    <TableRowColumn>{item.orderDate}</TableRowColumn>
                    <TableRowColumn>{item.takingDate}</TableRowColumn>
                    <TableRowColumn>
                        <Link to={'/orders/'+item._id}>
                        {item.state}
                        </Link>
                    </TableRowColumn>
                </TableRow>
            )}
        )
        return(
            <div className='Orders' >
            <Table  fixedHeader={true}>
                <TableHeader displaySelectAll={false}>
                  <TableRow >
                  <TableHeaderColumn style={{textAlign: 'center'}}>User</TableHeaderColumn>
                  <TableHeaderColumn style={{textAlign: 'center'}}>Book</TableHeaderColumn>
                  <TableHeaderColumn style={{textAlign: 'center'}}>Author</TableHeaderColumn>
                  <TableHeaderColumn>Order Date</TableHeaderColumn>
                  <TableHeaderColumn>Taking Date</TableHeaderColumn>
                  <TableHeaderColumn>State</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {ordersTemplate}
               </TableBody>
            </Table>
           </div>
       )
    }
}
export default OrderList;
