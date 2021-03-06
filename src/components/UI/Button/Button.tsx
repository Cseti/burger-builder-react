import React from 'react';

import classes from './Button.module.scss';

interface ButtonProps {
    btnType: string,
    clicked?: any,
    disabled?: any
}

const button: React.FC<ButtonProps> = (props) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        disabled={props.disabled}
        onClick={props.clicked}>{props.children}</button>
);

export default button;
