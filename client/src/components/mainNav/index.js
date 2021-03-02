import React, { useState } from 'react';
import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';

export default function MainNav(props) {
    const path = useLocation().pathname.substring(1);

    const [menuState, setMenuState] = useState(path);
    
    const handleClick = (event) => {
        setMenuState(event.key)
    }

    return (
        <Menu onClick={handleClick} theme="dark" selectedKeys={menuState}>
            <Menu.Item key="home">
                <NavLink to="/">
                    Home
                </NavLink>            
            </Menu.Item>
            <Menu.Item key="popular">
                <NavLink to="/popular">
                    Popular
                </NavLink>
            </Menu.Item>
            <Menu.Item key="top">
                <NavLink to="/top">
                    Top Rated
                </NavLink>
            </Menu.Item>
            <Menu.Item key="discover">
                <NavLink to="/discover">
                    Discover
                </NavLink>
            </Menu.Item>
            <Menu.Item key="search">
                <NavLink to="/search">
                    Search
                </NavLink>
            </Menu.Item>
        </Menu>
    )
}
