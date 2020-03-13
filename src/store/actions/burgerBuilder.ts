import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredients = (name:string) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
};

export const removeIngredients = (name:string) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
};

export const setIngredients = (ingredients: any) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return (dispatch:any) => {
        axios.get('https://react-burger-builder-3698c.firebaseio.com/ingredients.json')
            .then(response => {
                if (response && response.data) {
                    dispatch(setIngredients(response.data))
                } else {
                    dispatch(fetchIngredientsFailed());
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchIngredientsFailed());
            });
    }
};
