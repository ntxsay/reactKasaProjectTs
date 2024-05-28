import {useLocation} from "react-router-dom";
import '../styles/pages/FicheLogementPage.scss'
import CarouselComponent, {ICarouselItem} from "../components/CarouselComponent.tsx";

const FicheLogementPage = () => {
    const location = useLocation();
    const parentProp: IPropLogement  = location.state;
    const carouselItems : ICarouselItem[] = [];
    for (let i = 0; i < parentProp.logement.pictures.length; i++){
        const imageUrl = parentProp.logement.pictures[i];
        carouselItems.push({
            caption: `Image n° ${i + 1} de \u00AB ${parentProp.logement.title} \u00BB` ,
            imageUrl: imageUrl
        });
    }
    
    return (
        <section className="page">
            <CarouselComponent carouselId="item-carousel" items={carouselItems} selectedIndex={0} isReversible={true}/>
            <section id="gallery">
                <h1>{parentProp.logement.title}</h1>
            </section>
        </section>
    )
}

export default FicheLogementPage