import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

interface CheckoutInterface {
    location: any,
    history: any,
    match: any
}

class Checkout extends Component<CheckoutInterface> {
    state = {
        ingredients: [] as any[],
        price: 0,
        totalPrice: 0
    }

    componentWillMount() {
        const query: any = new URLSearchParams(this.props.location.search);
        const ingredients = {} as any[];
        let price = 0;

        if (ingredients !== null) {
            for (let param of query.entries()) {
                if (param[0] === 'price') {
                    price = param[1];
                } else {
                    ingredients[param[0]] = +param[1];
                }
            }

            console.log(price);
            this.setState({ingredients: ingredients, totalPrice: price});
        }
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients}
                                                     price={this.state.totalPrice} {...props} />)}/>
            </div>
        );
    }
}

export default Checkout;
