import React from 'react';

import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.module.scss';

interface BurgerInterface {
    ingredients: object
}

const burger: React.FC<BurgerInterface> = (props) => {
    let transformedIngredients:any;

    function hasKey<O>(obj: O, key: keyof any): key is keyof O {
        return key in obj
    }

    transformedIngredients = Object.keys(props.ingredients).map((ingKey) => {
        if (hasKey(props.ingredients, ingKey)) {
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                return <BurgerIngredients key={ingKey + i} type={ingKey} />
            });
        } else {
            return [];
        }
    }).reduce((arr, el) => {
        if (arr && el) {
            return arr.concat(el);
        } else {
            return [];
        }
    }, []);

    if (transformedIngredients && transformedIngredients.length === 0) {
        transformedIngredients = <p>Set ingredients</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}

export default burger;
