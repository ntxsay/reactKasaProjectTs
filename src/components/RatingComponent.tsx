import React from "react";
import ratingOff from '../assets/rating-off.svg'
import ratingOn from '../assets/rating-on.svg'

interface IRatingProp {
    componentId:string,
    rating: number
}

const RatingComponent:React.FC<IRatingProp> = (prop) => {
    
    // Instancie un tableau de 5 éléments pour les notes de 1 à 5
    const ratingArray = [1, 2, 3, 4, 5];
    
    return (
        <article id={prop.componentId} className="ratingContainer">
            {
                ratingArray.map(ratingItem => {
                    
                    //Si la note actuelle (du prop) est inférieure à 1 ou inférieure à la note de la variable (ratingItem)
                    //alors l'image de la note est ratingOff (désactivée), sinon c'est ratingOn (activée)
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
