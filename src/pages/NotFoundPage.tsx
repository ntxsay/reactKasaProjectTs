import {Link} from "react-router-dom";

const NotFoundPage = () =>{

    return (
        <section id="notFoundPage" className="page">
            <p className="page__error-code">404</p>
            <p className="page__error__message"><span>Oups! La page que </span><span>vous demandez n'existe pas.</span></p>
            <Link to="/" className="page__error__return-link">Retourner sur la page d’accueil</Link>
        </section>
    );
}

export default NotFoundPage;