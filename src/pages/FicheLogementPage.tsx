import {useLocation} from "react-router-dom";
import '../styles/pages/FicheLogementPage.scss'
import CarouselComponent, {ICarouselItem} from "../components/CarouselComponent.tsx";
import TagComponent from "../components/TagComponent.tsx";
import RatingComponent from "../components/RatingComponent.tsx";

const FicheLogementPage = () => {
    let countTag = 0;
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
            <div className="logement-title-host-container">
                <div className="logement-title-container">
                    <h1 className="logement-title">{parentProp.logement.title}</h1>
                    <h2 className="logement-location">{parentProp.logement.location}</h2>
                </div>
                <div className="logement-host-container">
                    <span className="logement-host-name">{parentProp.logement.host.name}</span>
                    <img className="logement-host-picture" src={parentProp.logement.host.picture} alt="Photo de l'hôte"/>
                </div>
            </div>
            <div className="logement-tags-rating-container">
                <div className="logement-tags-container">
                    {
                        parentProp.logement.tags.map( tag => {
                            countTag++;
                            return <TagComponent title={tag} key={countTag}/>
                        })
                    }
                </div>
                <RatingComponent componentId="logementRating" rating={Number.parseInt(parentProp.logement.rating)} />
            </div>
        </section>
    )
}

export default FicheLogementPage