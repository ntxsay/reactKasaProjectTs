﻿import React, {useState} from "react";
import chevronUp from '../assets/chevron-up.svg';

interface ExpanderProps {
    header: React.ReactElement | string,
    content: React.ReactElement | string,
    isCollapsed: boolean
}


const ExpanderComponent: React.FC<ExpanderProps> =  (props) => {

    const [isCollapsed, setIsCollapsed] = useState(props.isCollapsed);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <article className="expanderContainer">
            <div className="expander__header" onClick={toggleCollapse}>
                <span className="expanderContainer__header__title">{props.header}</span>
                <button className={`expanderContainer__header__glyph ${isCollapsed ? '' : 'dellapse'}`}>
                    <img src={chevronUp} alt={`${isCollapsed ? "L'expander est fermé" : "L'expander est ouvert"}`}/>
                </button>
            </div>
            <div className={`expanderContainer__content ${isCollapsed ? '' : 'dellapse'}`}>{props.content}</div>
        </article>
    );
};

export default ExpanderComponent; 