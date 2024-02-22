import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

import Sidebar from '../SideBar/SideBar';
import logo from '../../images/logo.svg';


const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoggedIn] = useState(true);

    function toggleMenu() {
        setIsSidebarOpen(!isSidebarOpen);
        document.querySelector('.header__burger').classList.toggle('open');
    }

    const sidebarHandler = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <header className='header'>
            <NavLink className='header__logo-link' to='/'>
                <img className='header__logo' src={logo} alt='logo' />
            </NavLink>
            <nav className='header__nav'>
                <div className={`header__links ${isLoggedIn
                    ? ""
                    : "header__links_type_hidden"}`}>
                    <NavLink 
                        className={({isActive}) =>
                        isActive
                            ? "header__link header__link_type_active"
                            : "header__link"
                        } 
                        to='/movies'
                    >
                        Фильмы
                    </NavLink>
                    <NavLink 
                        className={({isActive}) =>
                            isActive
                                ? "header__link header__link_type_active"
                                : "header__link"
                        } 
                        to='/saved-movies'
                    >
                        Сохранённые фильмы
                    </NavLink>
                </div>
            </nav>
            <div className='header__account-menu'>
                {isLoggedIn ? (
                    <NavLink to='/profile' className='header__btn_type-acc header__btn'>
                        Аккаунт
                    </NavLink>
                ) : (
                    <>
                        <NavLink to='/signup' className='header__btn_type-reg header__btn'>
                            Регистрация
                        </NavLink>
                        <NavLink to='/signin' className='header__btn_type-login header__btn'>
                            Войти
                        </NavLink>
                    </>
                )}
            </div>
            <div className={`header__burger ${isLoggedIn
                ? ""
                : "header__burger_type_hidden"}`} onClick={toggleMenu}></div>
            <Sidebar isOpen={isSidebarOpen} closeHandler={sidebarHandler} />
        </header>
    );
};

export default Header;