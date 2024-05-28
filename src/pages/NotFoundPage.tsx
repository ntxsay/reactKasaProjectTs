import '../styles/pages/NotFoundPage.scss'


const NotFoundPage = () =>{

    return (
        <section id="notFoundPage" className="page">
            <p className="page__error-code">404</p>
            <p className="page__message">Oups! La page que vous demandez n'existe pas.</p>
            <a href="/" className="page__return-link">Retourner sur la page d’accueil</a>
        </section>
    );
}

export default NotFoundPage;