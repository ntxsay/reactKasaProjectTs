import '../styles/components/RatingComponent.scss'
import React, {useEffect} from "react";
import ratingOff from '../assets/rating-off.svg'
import ratingOn from '../assets/rating-on.svg'

interface IRatingProp {
    componentId:string,
    rating: number
}

const RatingComponent:React.FC<IRatingProp> = (prop) => {

    useEffect(() => {

        if (prop.rating < 1) 
            return;
        
        if (prop.rating >= 5){
            const imagesStars = document.getElementById(prop.componentId)?.querySelectorAll('.ratingContainer__star > img') as NodeListOf<HTMLElement>;
            if (imagesStars === null || imagesStars.length < 1)
                return;
            
            imagesStars.forEach((image) => {
                image.setAttribute('src', ratingOn);
            });
        } else {
            const buttonStars = document.getElementById(prop.componentId)?.querySelectorAll('.ratingContainer__star') as NodeListOf<HTMLButtonElement>;
            if (buttonStars === null || buttonStars.length < 1)
                return;

            const selectedButtons =  (prop.rating === 1)
                ? Array.from(buttonStars).filter(f => f.value === "1")
                : Array.from(buttonStars).filter(f => Number.parseInt(f.value) <= prop.rating);
            
            selectedButtons.forEach((button) => {
                const image = button.querySelector('img') as HTMLImageElement;
                image.setAttribute('src', ratingOn);
            });
        }
    }, []);
    
    return (
        <article id={prop.componentId} className="ratingContainer">
            <button className="ratingContainer__star" value="1">
                <img src={ratingOff} alt="Image de la note de 1 sur 5"/>
            </button>
            <button className="ratingContainer__star" value="2">
                <img src={ratingOff} alt="Image de la note de 2 sur 5"/>
            </button>
            <button className="ratingContainer__star" value="3">
                <img src={ratingOff} alt="Image de la note de 3 sur 5"/>
            </button>
            <button className="ratingContainer__star" value="4">
                <img src={ratingOff} alt="Image de la note de 4 sur 5"/>
            </button>
            <button className="ratingContainer__star" value="5">
                <img src={ratingOff} alt="Image de la note de 5 sur 5"/>
            </button>
        </article>
    );
};

export default RatingComponent;
