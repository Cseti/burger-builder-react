import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from "../../store/actions";
import {connect} from "react-redux";

interface OrderInterface {
    fetchOrders: any,
    orders: [],
    loading: boolean
}

class Orders extends Component<OrderInterface> {
    componentDidMount() {
        this.props.fetchOrders();
    }

    loadOrders = () => {
        if (this.props.orders) {
            return this.props.orders.map((order:any) => <Order key={order.id} ingredients={order.ingredients} price={order.price} />);
        }

        return null;
    };

    render () {
        const order = !this.props.loading ? this.loadOrders() : <Spinner/>;

        return (
            <div>
                {order}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchOrders: () => dispatch(orderActions.fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
