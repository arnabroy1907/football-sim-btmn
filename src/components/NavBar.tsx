import React, { useEffect, useRef, useState } from 'react';
import st from 'styled-components';
import { NavLink } from 'react-router-dom';
import footballIcon from '../assets/football.png';

interface MainMenuProps {
    isOpen: boolean;
}

const NavBar = st.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    border-bottom: solid 1px #000;
    box-shadow 0 2px 6px #000;
    z-index: 1;
    background-color: #001a00;
`;

const LogoWrapper = st(NavLink)`
    height: 3rem;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    margin-right: 1.5rem;
    img {
        width: 2rem;
    }
`;

const MainMenu = st.div`
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 16px;
    height: 2.5rem;
    padding: 0 1rem;
    color: ${(props: MainMenuProps) => props.isOpen ? '#000' : '#fff'};
    background-color: ${(props: MainMenuProps) => props.isOpen ? '#efe' : '#001a00'};
    &:hover {
        color: #000;
        background-color: #efe;
    }
    cursor: pointer;
`;

const SubMenuBox = st.div`
    position: fixed;
    top: 2.5rem;
    left: 6rem;
    background-color: #efe;
`;

const SubMenus = st(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    color: #000;
    font-weight: 700;
    font-size: 16px;
    height: 2.5rem;
    padding: 0 1rem;
    &:hover {
        color: #fff;
        background-color: #262;
    }
    &.active {
        color: #fff;
        background-color: #262;
    }
`;

const MenusLink = st(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    height: 2.5rem;
    padding: 0 1rem;
    &:hover {
        color: #000;
        background-color: #efe;
    }
    &.active {
        color: #000;
        background-color: #efe;
    }
`;

export const Navbar = () => {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            const currentRef = menuRef.current;
            const target = event.target;
            // @ts-ignore
            if (currentRef && target && !currentRef.contains(target)) {
                setShowSubMenu(false);
            }
        });
    }, [menuRef]);

    const closeSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    };

    return (
        <NavBar>
            <LogoWrapper exact to='/'>
                <img alt='covid-logo' src={footballIcon} />
            </LogoWrapper>
            <MainMenu onClick={closeSubMenu} isOpen={showSubMenu}> Leagues </MainMenu>
            <MenusLink exact to='/ucl'> UCL </MenusLink>
            {showSubMenu &&
                <SubMenuBox ref={menuRef}>
                    <SubMenus onClick={closeSubMenu} exact to='/epl'>EPL</SubMenus>
                    <SubMenus onClick={closeSubMenu} exact to='/laliga'>La Liga</SubMenus>
                    <SubMenus onClick={closeSubMenu} exact to='/seriea'>Serie A</SubMenus>
                    <SubMenus onClick={closeSubMenu} exact to='/bundesliga'>BundesLiga</SubMenus>
                    <SubMenus onClick={closeSubMenu} exact to='/ligue1'>Ligue 1</SubMenus>
                </SubMenuBox>
            }
        </NavBar>
    )
};
