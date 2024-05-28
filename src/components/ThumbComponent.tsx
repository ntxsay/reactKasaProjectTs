import '../styles/components/ThumbComponent.scss'
import React from "react";

/**
 * Retourne un composant Thumbnail
 * @param prop
 */
const ThumbComponent : React.FC<IPropLogement> = (prop) => {
    return(
        <figure className="thumb">
            <img src={prop.logement.cover} alt="Titre de la location" />
            <div className="thumb__gradient"></div>
            <figcaption className="thumb__caption">{prop.logement.title}</figcaption>
        </figure>
    );
}

export default ThumbComponent;