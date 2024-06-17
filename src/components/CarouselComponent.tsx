import React, {useEffect, useState} from "react";
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg'

interface CarouselProps {
    carouselId: string,
    selectedIndex: number,
    isReversible: boolean,
    imagesUrl: string[]
}

export interface ICarouselItem {
    imageUrl: string,
    caption: string
}

const CarouselComponent: React.FC<CarouselProps> = (carouselProps) => {
    
    /**
     * Déclare l'index de l'image du carousel
     */
    let carouselImageIndex: number = -1;
    
    /**
     * Obtient le nombre d'images contenu dans le prop du composant
     */
    const countImages = carouselProps.imagesUrl.length;

    /**
     * Obtient ou définit la pagination du carousel
     */
    const [caption, setCaption] = useState<string>("");

    /**
     * Obtient ou définit l'index de l'image actuellement affichée
     */
    const [currentIndex, setCurrentIndex] = useState<number>(carouselProps.selectedIndex);
    
    /**
     * Instancie un tableau d'éléments de carousel
     */
    const carouselItems: ICarouselItem[] = [];

    // Parcours les URLs d'images pour les ajouter au tableau d'éléments de carousel
    for (let i = 0; i < countImages; i++) {
        
        // Récupère l'URL de l'image
        const imageUrl = carouselProps.imagesUrl[i];
        
        // Crée un élément de carousel et l'ajoute au tableau
        carouselItems.push({
            caption: `Image ${i + 1} sur ${countImages}`,
            imageUrl: imageUrl
        });
    }

    useEffect(() => {
        
        // Si le nombre d'images est inférieur ou égal à 0 alors la pagination est 0/0
        if (countImages <= 0) {
            setCaption('0/0')
        } else {
            // Sinon la pagination est 1/nombre d'images
            setCaption(`1/${countImages}`)
        }
    }, carouselProps.imagesUrl);

    /**
     * Accède à l'image précédente
     * Se produit lorsque l'utilisateur clique sur le bouton
     */
    function onPreviousImage() {
        // Déclare l'index de la première image
        const firstIndex = 0;

        //Déclare l'index de l'image précédente en partant de l'index actuel
        const previousIndex = currentIndex - 1;

        //Déclare le numéro de page de l'image précédente
        const previousPage = previousIndex + 1;

        // Si l'index de l'image précédente est inférieur à l'index de la première image,
        if (previousIndex < firstIndex) {
            //Et si le carousel n'est pas configuré pour être réverssible
            // alors la fonction est quittée
            if (!carouselProps.isReversible)
                return;

            //Si le carousel est réverssible (dans le contexte où l'index précédent est plus petit que le premier index)

            //Déclare l'index de la dernière image
            const lastIndex = countImages - 1;

            //Définit l'index de la dernière image comme index actuel
            setCurrentIndex(lastIndex);

            //Sélectionne l'image qui contient le dernier index
            selectImage(lastIndex);

            //Met à la pagination
            setCaption(countImages + '/' + countImages);

            //Quitte la fonction
            return;
        }
        // Si l'index de l'image précédente correspond à l'index de la première image
        else if (previousIndex === firstIndex) {
            //Met à jour la pagination
            setCaption(`1/${countImages}`)
        } else {
            // Sinon met simplement à jour la pagination
            setCaption(previousPage + '/' + countImages);
        }

        //Définit l'index de l'image précédnte comme index actuel
        setCurrentIndex(previousIndex);

        //Sélectionne l'image qui contient le précédent index 
        selectImage(previousIndex);
    }

    /**
     * Accède à l'image suivante
     * Se produit lorsque l'utilisateur clique sur le bouton
     */
    function onNextImage() {
        // Déclare l'index de la dernière image
        const lastIndex = countImages - 1;

        //Déclare l'index de l'image suivante en partant de l'index actuel
        const nextIndex = currentIndex + 1;

        //Déclare le numéro de page de l'image suivante
        const nextPage = nextIndex + 1;

        // Si l'index de l'image suivante est supérieur à l'index de la dernière image,
        if (nextIndex > lastIndex) {
            //Et si le carousel n'est pas configuré pour être réverssible
            // alors la fonction est quittée
            if (!carouselProps.isReversible)
                return;

            //Si le carousel est réverssible (dans le contexte où l'index suivant est plus grand que le dernier index)

            //Définit l'index de la première image comme index actuel
            setCurrentIndex(0);

            //Sélectionne l'image qui contient le premier index
            selectImage(0);

            //Met à jour la pagination
            setCaption(`1/${countImages}`);

            //Quitte la fonction
            return;
        }
        // Si l'index de l'image suivante correspond à l'index de la dernière image
        else if (nextIndex === lastIndex) {
            //Met à jour la pagination
            setCaption(countImages + '/' + countImages)
        } else {
            // Sinon met simplement à jour la pagination
            setCaption(nextPage + '/' + countImages);
        }

        //Définit l'index de l'image suivante comme index actuel
        setCurrentIndex(nextIndex);

        //Sélectionne l'image qui contient l'index suivant 
        selectImage(nextIndex);
    }

    /**
     * Sélectionne l'image qui correspond à l'index donné
     * @param selectedIndex Représente l'index de l'image à sélectionner
     */
    function selectImage(selectedIndex: number) {

        //Récupère tous les noeuds d'images du carousel
        const imageNodes = document.getElementById(carouselProps.carouselId)?.querySelectorAll('.carouselContainer__imageContainer__image') as NodeListOf<HTMLElement>;
        if (imageNodes === null || imageNodes.length < 1)
            return;

        //Parcours les noeuds d'images
        imageNodes.forEach((image) => {
            
            //Récupère l'attribut data-image-index de l'image
            const indexAttr = image.getAttribute('data-image-index');

            //Convertit l'attribut data-image-index en entier
            const imageIndex = Number(indexAttr);

            //Si l'attribut data-image-index est null ou n'est pas un entier
            //et si l'image contient la classe "selected" on lui retire et on sort de la fonction
            if (indexAttr === null || Number.isNaN(imageIndex)) {
                if (image.classList.contains("selected"))
                    image.classList.remove("selected");
                return;
            }
            
            //Si l'index de l'image est égal à l'index sélectionné
            //et si l'image ne contient pas la classe "selected" on lui ajoute
            if (imageIndex === selectedIndex) {
                if (!image.classList.contains("selected"))
                    image.classList.add("selected");
            } 
            else {
                //Sinon si l'image contient la classe "selected" on lui retire
                if (image.classList.contains("selected"))
                    image.classList.remove("selected");
            }
        });
    }

    return (
        <figure id={carouselProps.carouselId} className="carouselContainer">
            <div className="carouselContainer__imageContainer">
                {
                    carouselItems.map(item => {
                        carouselImageIndex++;
                        return <img
                            className={`carouselContainer__imageContainer__image${carouselProps.selectedIndex === carouselImageIndex ? ' selected' : ''}`}
                            key={carouselImageIndex} src={item.imageUrl} alt={item.caption}
                            data-image-index={carouselImageIndex}/>
                    })
                }
            </div>
            <div className="carouselContainer__navigationContainer">
                {
                    countImages > 1
                        ? <>
                            <button className="carouselContainer__navButton --previousBtn" onClick={onPreviousImage}>
                                <img src={leftArrow} alt="Image précédente"/>
                            </button>
                            <button className="carouselContainer__navButton --nextBtn" onClick={onNextImage}>
                                <img src={rightArrow} alt="Image suivante"/>
                            </button>
                        </>
                        : <></>
                }
            </div>
            <figcaption className="carouselContainer__Caption">
                <span>{caption}</span>
            </figcaption>
        </figure>
    );
}

export default CarouselComponent;