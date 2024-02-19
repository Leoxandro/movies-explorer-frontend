import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';

import Sidebar from '../SideBar/SideBar';
import logo from '../../images/logo.svg';


const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoggedIn] = useState(false);

    function toggleMenu() {
        setIsSidebarOpen(!isSidebarOpen);
        document.querySelector('.header__burger').classList.toggle('open');
    }

    const sidebarHandler = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <header className='header'>
            <Link className='header__logo-link' to='/'>
                <img className='header__logo' src={logo} alt='logo' />
            </Link>
            <nav className='header__nav'>
                <div className={`header__links ${isLoggedIn
                    ? ""
                    : "header__links_type_hidden"}`}>
                    <NavLink className='header__link' to='/movies'>
                        Фильмы
                    </NavLink>
                    <NavLink className='header__link' to='/saved-movies'>
                        Сохранённые фильмы
                    </NavLink>
                </div>
            </nav>
            <div className='header__account-menu'>
                {isLoggedIn ? (
                    <Link to='/profile'>
                        <button className='header__btn_type-acc header__btn'>
                            Аккаунт
                        </button>
                    </Link>
                ) : (
                    <>
                        <Link to='/signup'>
                            <button className='header__btn_type-reg header__btn'>
                                Регистрация
                            </button>
                        </Link>
                        <Link to='/signin'>
                            <button className='header__btn_type-login header__btn'>
                                Войти
                            </button>
                        </Link>
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