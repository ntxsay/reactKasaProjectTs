import React from "react";

interface IBannerProps {
    imageUrl: string,
    caption: string | null | React.ReactElement
}

const BannerComponent : React.FC<IBannerProps> = (props) => {
    return (
        <figure className="bannerContainer">
            <div className="bannerContainer__imageContainer">            
                <img className="bannerContainer__image" src={props.imageUrl} alt="image de la bannière"/>
            </div>
            <div className="bannerContainer__mask"></div>
            <figcaption className="bannerContainer__captionContainer"><span className="bannerContainer__caption">{props.caption}</span></figcaption>
        </figure>
    );
}

export default BannerComponent;