import React from "react";
import ratingOff from '../assets/rating-off.svg'
import ratingOn from '../assets/rating-on.svg'

interface IRatingProp {
    componentId:string,
    rating: number
}

const RatingComponent:React.FC<IRatingProp> = (prop) => {
    const ratingArray = [1, 2, 3, 4, 5];
    
    return (
        <article id={prop.componentId} className="ratingContainer">
            {
                ratingArray.map(ratingItem => {
                    const src = prop.rating < 1 || prop.rating < ratingItem
                        ? ratingOff
                        : ratingOn;
                    
                    return <button className="ratingContainer__star" key={ratingItem} value={ratingItem}>
                        <img src={src} alt={`Image de la note de ${ratingItem} sur ${ratingArray.length}`}/>
                    </button>
                })
            }
        </article>
    );
};

export default RatingComponent;
