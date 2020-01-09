import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.8,
    cheese: 1.2,
    meat: 2
};

interface BurgerBuilderInterface {
    history: any
}

class BurgerBuilder extends Component<BurgerBuilderInterface> {
    state = {
        ingredients: [] as any[],
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(): void {
        axios.get('https://react-burger-builder-3698c.firebaseio.com/ingredients.json')
            .then(response => {
                if (response && response.data) {
                    this.setState({ingredients: response.data});
                } else {
                    this.setState({error: true});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({error: true});
            });
    }

    hasKey<O>(obj: O, key: keyof any): key is keyof O {
        return key in obj
    }

    addIngredientHandler = (type: any) => {
        const oldCount = this.hasKey(this.state.ingredients, type) ? this.state.ingredients[type] : 0;

        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        if (this.hasKey(updatedIngredients, type)) {
            updatedIngredients[type] = updatedCount;
        }

        const priceAddition = this.hasKey(INGREDIENT_PRICES, type) ? INGREDIENT_PRICES[type] : 0;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type: any) => {
        const oldCount = this.hasKey(this.state.ingredients, type) ? this.state.ingredients[type] : 0;

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        if (this.hasKey(updatedIngredients, type)) {
            updatedIngredients[type] = updatedCount;
        }

        const priceDeduction = this.hasKey(INGREDIENT_PRICES, type) ? INGREDIENT_PRICES[type] : 0;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
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

        this.setState({purchasable: sum > 0})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    render() {
        let disableInfo: any;
        disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo) {
            if (this.hasKey(disableInfo, key)) {
                disableInfo[key] = disableInfo[key] <= 0;
            }
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        price={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
