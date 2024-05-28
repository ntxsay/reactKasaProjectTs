import jsonData from '../data/logements.json'
import '../styles/pages/HomePage.scss'
import {Link} from "react-router-dom";
import ThumbComponent from "../components/ThumbComponent.tsx";
const HomePage = () => {
    const jsonLogements : ILogement[] = jsonData;
    return (
        <section className="page">
            <section id="gallery">
                {jsonLogements && jsonLogements.map((logement) => {
                    return (
                        <Link to="/fiche-logement"  state={{logement: logement }} key={logement.id}>
                            <ThumbComponent key={logement.id} logement={logement}></ThumbComponent>
                        </Link>
                    )
                })}
            </section>
        </section>
    )
}

export default HomePage;