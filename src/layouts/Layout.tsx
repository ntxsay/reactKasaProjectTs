import kasaWhiteLogo from '../assets/logo-white.svg';
import kasaColorLogo from  '../assets/logo-red.svg'
import { Outlet } from 'react-router-dom';
import '../styles/layouts/Layout.scss'

const Layout = () => {
    return (
        <>
            <header>
                <img className="header__logo" src={kasaColorLogo} alt="Logo d'en-tête de Kasa"/>
                <nav className="header__navigation">
                    <ul>
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/">A Propos</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <img className="footer__logo" src={kasaWhiteLogo} alt="Logo de Kasa"/>
                <p className="footer__copyright">© 2020 Kasa. All rights reserved</p>
            </footer>
        </>
    );
}

export default Layout;