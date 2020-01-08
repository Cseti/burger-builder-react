import React from "react";

import classes from './Spinner.module.scss';

const spinner: React.FC = () => {
    return (
        <div className={classes.Loader}>Loading..</div>
    );
}

export default spinner;
