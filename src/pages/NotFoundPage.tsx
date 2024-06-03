import '../styles/pages/NotFoundPage.scss'


const NotFoundPage = () =>{

    return (
        <section id="notFoundPage" className="page">
            <p className="page__error-code">404</p>
            <p className="page__message"><span>Oups! La page que </span><span>vous demandez n'existe pas.</span></p>
            <a href="/" className="page__return-link">Retourner sur la page d’accueil</a>
        </section>
    );
}

export default NotFoundPage;