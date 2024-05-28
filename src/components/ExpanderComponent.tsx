import React, {useState} from "react";
import '../styles/components/ExpanderComponent.scss'

interface ExpanderProps {
    header: React.ReactElement | string,
    content: React.ReactElement,
    isCollapsed: boolean
}
/**
 * Représente un expander avec deux états ouvert et fermé
 * @returns {Element}
 */
const ExpanderComponent: React.FC<ExpanderProps> =  (props) => {

    const [isCollapsed, setIsCollapsed] = useState(props.isCollapsed);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <article className="expander">
            <button className="expander__header" onClick={toggleCollapse}>
                <span className="expander__header__title">{props.header}</span>
                <i className={`fa-solid fa-chevron-up expander__header__glyph ${isCollapsed ? '' : 'dellapse'}`}></i>
            </button>
            <div className={`expander__content ${isCollapsed ? '' : 'dellapse'}`}>{props.content}</div>
        </article>
    );
};

export default ExpanderComponent; 