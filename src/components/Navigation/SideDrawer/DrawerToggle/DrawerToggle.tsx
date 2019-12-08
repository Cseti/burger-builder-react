import React from 'react';

import classes from './DrawerToggle.module.scss';

interface DrawerToggleProps {
    clicked: any
}

const drawerToggle: React.FC<DrawerToggleProps> = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;