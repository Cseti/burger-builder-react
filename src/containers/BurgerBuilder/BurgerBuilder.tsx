import React, {Component} from 'react';
import {connect} from "react-redux";

import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

interface BurgerBuilderInterface {
    history: any,
    ingredients: any,
    onIngredientAdded: any,
    onIngredientRemoved: any,
    onInitIngredients: any,
    totalPrice: number,
    error: boolean
}

class BurgerBuilder extends Component<BurgerBuilderInterface> {
    state = {
        purchasing: false,
    };

    componentDidMount(): void {
        this.props.onInitIngredients();
    }

    hasKey<O>(obj: O, key: keyof any): key is keyof O {
        return key in obj
    }

    updatePurchaseState = (ingredients: any) => {
        let sum: any;

        sum = Object.keys(ingredients).map((ingKey) => {
            if (this.hasKey(ingredients, ingKey)) {
                return ingredients[ingKey];
            } else {
                return null;
            }
        }).reduce((sum, element) => {
            if ((typeof sum !== undefined) && (typeof element !== undefined)) {
                return sum + element;
            } else {
                return 0;
            }
        }, 0);

        return sum > 0;
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        // const queryParams = [];
        //
        // for (let i in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        // }
        //
        // queryParams.push('price=' + this.props.totalPrice);
        // const queryString = queryParams.join('&');
        //
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: queryString
        // });

        this.props.history.push('/checkout');
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    render() {
        let disableInfo: any;
        disableInfo = {
            ...this.props.ingredients
        };

        for (let key in disableInfo) {
            if (this.hasKey(disableInfo, key)) {
                disableInfo[key] = disableInfo[key] <= 0;
            }
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.props.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        price={this.props.totalPrice}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                    />
                </>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;
        }

        return (
            <>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onIngredientAdded: (ingName: string) => dispatch(burgerBuilderActions.addIngredients(ingName)),
        onIngredientRemoved: (ingName: string) => dispatch(burgerBuilderActions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
