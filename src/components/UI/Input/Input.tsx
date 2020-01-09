import React from 'react';

import classes from './Input.module.scss';

interface PropsInterface {
    invalid: boolean,
    shouldValidate: any,
    touched: any,
    elementConfig: any,
    value: any,
    changed: any,
    elementType: string,
    label?: string
}

const input: React.FC<PropsInterface> = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):
            if (props.elementConfig) {
                inputElement = (
                    <select
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}>
                        {props.elementConfig.options.map((option:any) => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
                );
            }
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
