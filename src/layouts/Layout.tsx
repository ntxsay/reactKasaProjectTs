import kasaWhiteLogo from '../assets/logo-white.svg';
import kasaColorLogo from  '../assets/logo-red.svg'
import {Outlet, useLocation} from 'react-router-dom';
import '../styles/layouts/Layout.scss'

const Layout = () => {
    const location = useLocation();
    const path: string  = location.pathname;
    
    return (
        <>
            <header>
                <img className="header__logo" src={kasaColorLogo} alt="Logo d'en-tête de Kasa"/>
                <nav className="header__navigation">
                    <ul>
                        <li><a href="/" className={`link-item ${path === "/" ? 'selected' : ''}`}>Accueil</a></li>
                        <li><a href="/about" className={`link-item ${path === "/about" ? 'selected' : ''}`}>A Propos</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <img className="footer__logo" src={kasaWhiteLogo} alt="Logo de Kasa"/>
                <div className="footer__copyright__container">
                    <p className="footer__copyright">© 2020 Kasa. All rights reserved</p>
                </div>
            </footer>
        </>
    );
}

export default Layout;