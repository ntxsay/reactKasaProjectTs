import '../styles/components/TagComponent.scss'
import React from "react";

interface TagProp {
    title: string
}

const TagComponent:React.FC<TagProp> = (prop) => {
    return (
        <article className="tagContainer">
            <span className="tagContainer__title">{prop.title}</span>
        </article>
    );
};

export default TagComponent;