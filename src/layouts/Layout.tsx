import kasaWhiteLogo from '../assets/logo-white.svg';
import kasaColorLogo from  '../assets/logo-red.svg'
import {Outlet, useLocation, Link} from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const path: string  = location.pathname;
    
    return (
        <>
            <div className="header-content-container">
                <div className="header-content-sub-container">
                    <header>
                        <div className="header__logo__container">
                            <img className="header__logo" src={kasaColorLogo} alt="Logo d'en-tête de Kasa"/>
                        </div>
                        <nav className="header__navigation">
                            <ul>
                                <li><Link to="/" className={`link-item ${path === "/" ? 'selected' : ''}`}>Accueil</Link></li>
                                <li><Link to="/about" className={`link-item ${path === "/about" ? 'selected' : ''}`}>A Propos</Link></li>
                            </ul>
                        </nav>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
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