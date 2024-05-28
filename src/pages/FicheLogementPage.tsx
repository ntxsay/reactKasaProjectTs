import {useLocation} from "react-router-dom";
import '../styles/pages/FicheLogementPage.scss'

const FicheLogementPage = () => {
    const location = useLocation();
    const {logement} = location.state;

    return (
        <section className="page">
            <section id="gallery">
                <h1>{logement.title}</h1>
            </section>
        </section>
    )
}

export default FicheLogementPage