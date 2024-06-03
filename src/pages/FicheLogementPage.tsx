import {useLocation} from "react-router-dom";
import '../styles/pages/FicheLogementPage.scss'
import CarouselComponent, {ICarouselItem} from "../components/CarouselComponent.tsx";
import TagComponent from "../components/TagComponent.tsx";
import RatingComponent from "../components/RatingComponent.tsx";
import ExpanderComponent from "../components/ExpanderComponent.tsx";

const FicheLogementPage = () => {
    let countTag = 0, countEquipment = 0;
    const location = useLocation();
    const parentProp: IPropLogement  = location.state;
    const carouselItems : ICarouselItem[] = [];
    for (let i = 0; i < parentProp.logement.pictures.length; i++){
        const imageUrl = parentProp.logement.pictures[i];
        carouselItems.push({
            caption: `Image n°${i + 1} de \u00AB ${parentProp.logement.title} \u00BB` ,
            imageUrl: imageUrl
        });
    }
    
    return (
        <section className="page">
            <CarouselComponent carouselId="item-carousel" items={carouselItems} selectedIndex={0} isReversible={true}/>
            <div className="logement__data-grid__container">
                <div className="logement__title-location-tags__container">
                    <h1 className="logement-title">{parentProp.logement.title}</h1>
                    <h2 className="logement-location">{parentProp.logement.location}</h2>
                    <div className="logement-tags-container">
                        {
                            parentProp.logement.tags.map( tag => {
                                countTag++;
                                return <TagComponent title={tag} key={countTag}/>
                            })
                        }
                    </div>
                </div>
                <div className="logement__host-rating__container">
                    <div className="logement-host-container">
                        <span className="logement-host-name">{parentProp.logement.host.name}</span>
                        <img className="logement-host-picture" src={parentProp.logement.host.picture} alt="Photo de l'hôte"/>
                    </div>
                    <RatingComponent componentId="logementRating" rating={Number.parseInt(parentProp.logement.rating)} />
                </div>
            </div>
            <div className="logement-description-equipements-container">
                <ExpanderComponent header="Description" content={<p>{parentProp.logement.description}</p>} isCollapsed={true} />
                <ExpanderComponent header="Équipements" content={
                    <ul className="logement-description-equipements-list">
                        {
                            parentProp.logement.equipments.map(equipment => {
                                countEquipment++;
                                return <li key={countEquipment}>{equipment}</li>
                            })
                        }
                    </ul>
                } isCollapsed={true} />
            </div>
        </section>
    )
}

export default FicheLogementPage