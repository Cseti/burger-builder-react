import React from 'react';
import classes from './Backdrop.module.scss';

interface BackdropProps {
    show: boolean,
    clicked: any
}

const backdrop: React.FC<BackdropProps> = (props) => {
    return (
        props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
    );
}

export default backdrop;
