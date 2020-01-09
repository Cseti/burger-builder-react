import React from 'react';

import classes from './NavigationItem.module.scss';
import {NavLink} from "react-router-dom";

interface NavigationItemProps {
    link: string,
    active?: boolean
}

const navigationItem: React.FC<NavigationItemProps> = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            activeClassName={classes.active}
            exact
        >
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;
