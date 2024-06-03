import jsonData from '../data/logements.json'
import '../styles/pages/HomePage.scss'
import {Link} from "react-router-dom";
import imageSource from '../assets/Image-source-1.png';
import ThumbComponent from "../components/ThumbComponent.tsx";
import BannerComponent from "../components/BannerComponent.tsx";
const HomePage = () => {
    const jsonLogements : ILogement[] = jsonData;
    return (
        <section className="page">
            <BannerComponent caption={<><span>Chez vous, </span><span>partout et ailleurs</span></>} imageUrl={imageSource} />
            <section id="gallery">
                {jsonLogements && jsonLogements.map((logement) => {
                    return (
                        <Link to="/fiche-logement" state={{logement: logement }} key={logement.id}>
                            <ThumbComponent key={logement.id} logement={logement}></ThumbComponent>
                        </Link>
                    )
                })}
            </section>
        </section>
    )
}

export default HomePage;