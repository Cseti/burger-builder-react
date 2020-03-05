import React, {Component} from 'react';
import {connect} from "react-redux";

import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

interface BurgerBuilderInterface {
    history: any,
    ingredients: any,
    onIngredientAdded: any,
    onIngredientRemoved: any,
    totalPrice: number
}

class BurgerBuilder extends Component<BurgerBuilderInterface> {
    state = {
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(): void {
        // axios.get('https://react-burger-builder-3698c.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         if (response && response.data) {
        //             this.setState({ingredients: response.data});
        //         } else {
        //             this.setState({error: true});
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({error: true});
        //     });
    }

    hasKey<O>(obj: O, key: keyof any): key is keyof O {
        return key in obj
    }

    addIngredientHandler = (type: any) => {
        // const oldCount = this.hasKey(this.props.ingredients, type) ? this.props.ingredients[type] : 0;
        //
        // const updatedCount = oldCount + 1;
        // const updatedIngredients = {
        //     ...this.props.ingredients
        // };
        //
        // if (this.hasKey(updatedIngredients, type)) {
        //     updatedIngredients[type] = updatedCount;
        // }
        //
        // const priceAddition = this.hasKey(INGREDIENT_PRICES, type) ? INGREDIENT_PRICES[type] : 0;
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition;
        // this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        // this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type: any) => {
        // const oldCount = this.hasKey(this.props.ingredients, type) ? this.props.ingredients[type] : 0;
        //
        // if (oldCount <= 0) {
        //     return;
        // }
        //
        // const updatedCount = oldCount - 1;
        // const updatedIngredients = {
        //     ...this.props.ingredients
        // };
        //
        // if (this.hasKey(updatedIngredients, type)) {
        //     updatedIngredients[type] = updatedCount;
        // }
        //
        // const priceDeduction = this.hasKey(INGREDIENT_PRICES, type) ? INGREDIENT_PRICES[type] : 0;
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice - priceDeduction;
        // this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        // this.updatePurchaseState(updatedIngredients);
    };

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

        // this.setState({purchasable: sum > 0});
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
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

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

        if (this.state.loading) {
            orderSummary = <Spinner/>
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onIngredientAdded: (ingName: string) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved: (ingName: string) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
