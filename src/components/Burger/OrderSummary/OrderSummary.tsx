import React from 'react';

import Button from '../../UI/Button/Button';

interface OrderSummaryProps {
    ingredients: object,
    price: number,
    purchaseCancelled: any,
    purchaseContinued: any
}

const orderSummary: React.FC<OrderSummaryProps> = (props) => {

    function hasKey<O>(obj: O, key: keyof any): key is keyof O {
        return key in obj
    }

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            if (hasKey(props.ingredients, igKey)) {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                    </li>);
            } else {
                return null;
            }
        });

    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </>
    );
}

export default orderSummary;
