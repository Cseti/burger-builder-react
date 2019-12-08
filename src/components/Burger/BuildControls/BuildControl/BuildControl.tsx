import React from 'react';

import classes from './BuildControl.module.scss';

interface BuildControlProps {
    label: string,
    removed: any,
    disabled: boolean,
    added: any
}

const buildControl: React.FC<BuildControlProps> = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button
            className={classes.Less}
            onClick={props.removed}
            disabled={props.disabled}>Less
        </button>
        <button
            className={classes.More}
            onClick={props.added}>More
        </button>
    </div>
);

export default buildControl;