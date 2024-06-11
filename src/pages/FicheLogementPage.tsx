import {Link, useParams} from "react-router-dom";
import CarouselComponent from "../components/CarouselComponent.tsx";
import TagComponent from "../components/TagComponent.tsx";
import RatingComponent from "../components/RatingComponent.tsx";
import ExpanderComponent from "../components/ExpanderComponent.tsx";
import data from '../data/logements.json'
import {useEffect, useState} from "react";

const FicheLogementPage = () => {
    let countTag = 0, countEquipment = 0;
    const {id} = useParams();

    const [logement, setLogement] = useState<ILogement | null>({
        id: '',
        title: '',
        cover: '',
        pictures: [],
        description: '',
        host: {
            name: '',
            picture: ''
        },
        rating: '',
        location: '',
        equipments: [],
        tags: []
    });

    useEffect(() => {
        const foundLogement = data.find((logment) => logment.id === id);
        setLogement(foundLogement ? foundLogement : null);
    }, [id])

    return (
        <section className="page">
            {
                logement === null
                    ? <div className="logement__notFound">
                        <p className="page__error-code">404</p>
                        <p className="page__error__message">Le logement demandé n'existe pas</p>
                        <Link to="/" className="page__error__return-link">Retourner sur la page d’accueil</Link>
                    </div>
                    : logement.id === ''
                        ? <p className="logement__loader">Chargement du logement ...</p>
                        : <>
                            <CarouselComponent carouselId="item-carousel" imagesUrl={logement.pictures} selectedIndex={0}
                                               isReversible={true}/>
                            <div className="logement__data-grid__container">
                                <div className="logement__title-location-tags__container">
                                    <h1 className="logement-title">{logement.title}</h1>
                                    <h2 className="logement-location">{logement.location}</h2>
                                    <div className="logement-tags-container">
                                        {
                                            logement.tags.map(tag => {
                                                countTag++;
                                                return <TagComponent title={tag} key={countTag}/>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="logement__host-rating__container">
                                    <div className="logement-host-container">
                                        <span className="logement-host-name">{logement.host.name}</span>
                                        <img className="logement-host-picture" src={logement.host.picture}
                                             alt="Photo de l'hôte"/>
                                    </div>
                                    <RatingComponent componentId="logementRating"
                                                     rating={Number.parseInt(logement.rating)}/>
                                </div>
                            </div>
                            <div className="logement-description-equipements-container">
                                <ExpanderComponent header="Description" content={<p>{logement.description}</p>}
                                                   isCollapsed={true}/>
                                <ExpanderComponent header="Équipements" content={
                                    <ul className="logement-description-equipements-list">
                                        {
                                            logement.equipments.map(equipment => {
                                                countEquipment++;
                                                return <li key={countEquipment}>{equipment}</li>
                                            })
                                        }
                                    </ul>
                                } isCollapsed={true}/>
                            </div>
                        </>
            }
        </section>
    )
}

export default FicheLogementPage