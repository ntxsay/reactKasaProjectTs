import {Link, useParams} from "react-router-dom";
import CarouselComponent from "../components/CarouselComponent.tsx";
import TagComponent from "../components/TagComponent.tsx";
import RatingComponent from "../components/RatingComponent.tsx";
import ExpanderComponent from "../components/ExpanderComponent.tsx";
import data from '../data/logements.json'
import {useEffect, useState} from "react";

const FicheLogementPage = () => {
    /**
     * Déclare les compteurs pour les tags et les équipements à renseigner dans la propriété key
     */
    let countTag = 0, countEquipment = 0;
    
    // Obtient l'identifiant du logement à afficher depuis l'URL
    const {id} = useParams();

    /**
     * Obtient ou définit le logement à afficher.
     * Si le logement n'existe pas, la valeur est null
     * Si le logement est en cours de chargement, la valeur est un objet dont les propriétés sont vides
     * Si le logement est chargé, la valeur est un objet dont les propriétés sont remplies.
     * 
     * Logique: 
     *  1- A la création du composant, par défaut la propriété est un objet ILogement vide, se qui permet d'afficher un message de chargement et d'éviter de passer des valeurs null, vide ou incorrectes à des composants enfants avant que le logement ne soit chargé ou déclaaré null via le useEffect
     *  2- Lorsque l'identifiant du logement change, le useEffect est déclenché et recherche le logement correspondant dans le tableau de données
     */
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
        // Recherche le logement dont l'identifiant correspond à l'identifiant dans l'URL
        const foundLogement = data.find((logment) => logment.id === id);
        
        // Met à jour le logement à afficher ou à déclarer comme inexistant
        setLogement(foundLogement ? foundLogement : null);
    }, [id])

    return (
        <section className="page">
            {
                logement === null
                    // Null : Le logement n'existe pas
                    ? <div className="logement__notFound">
                        <p className="page__error-code">404</p>
                        <p className="page__error__message">Le logement demandé n'existe pas</p>
                        <Link to="/" className="page__error__return-link">Retourner sur la page d’accueil</Link>
                    </div>
                    // NON NULL, affiche un message de chargement ou le logement lui-même
                    : logement.id === ''
                        // Vide : Le logement n'est pas encore chargé
                        ? <p className="logement__loader">Chargement du logement ...</p>
                        // NON VIDE : affiche le logement
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