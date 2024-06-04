import React, {useEffect, useState} from "react";
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg'

interface CarouselProps {
    carouselId: string,
    selectedIndex:number,
    isReversible: boolean,
    imagesUrl: string[]
}

export interface ICarouselItem {
    imageUrl: string,
    caption: string
}

const CarouselComponent : React.FC<CarouselProps> = (carouselProps) => {
    let carouselImageIndex: number = -1;
    const countImages = carouselProps.imagesUrl.length;
    const [caption, setCaption] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(carouselProps.selectedIndex);
    const carouselItems : ICarouselItem[] = [];

    for (let i = 0; i < countImages; i++){
        const imageUrl = carouselProps.imagesUrl[i];
        carouselItems.push({
            caption: `Image ${i + 1} sur ${countImages}` ,
            imageUrl: imageUrl
        });
    }
    
    useEffect(() => {
        if (countImages <= 0) {
            setCaption('0/0')
        } else {
            setCaption(`1/${countImages}`)
        }
    }, []);

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
        } 
        else {
            // Sinon met simplement à jour la pagination
            setCaption(previousPage + '/' + countImages );
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
            setCaption(nextPage + '/' + countImages );
        }

        //Définit l'index de l'image suivante comme index actuel
        setCurrentIndex(nextIndex);
        
        //Sélectionne l'image qui contient l'index suivant 
        selectImage(nextIndex);
    }
    
    function selectImage(selectedIndex:number) {
        
        const imageNodes = document.getElementById(carouselProps.carouselId)?.querySelectorAll('.carouselContainer__imageContainer__image') as NodeListOf<HTMLElement>;
        if (imageNodes === null || imageNodes.length < 1)
            return;

        imageNodes.forEach((image) => {
            const indexAttr = image.getAttribute('data-image-index');
            
            if (indexAttr === null || !Number.isInteger(Number.parseInt(indexAttr)))
            {
                if ( image.classList.contains("selected"))
                    image.classList.remove("selected");
                return;
            }
            
            const imageIndex = Number.parseInt(indexAttr);
            if (imageIndex === selectedIndex){
                if (!image.classList.contains("selected"))
                    image.classList.add("selected");
            } else {
                if ( image.classList.contains("selected"))
                    image.classList.remove("selected");
            }
        });
    }
    
    return(
        <figure id={carouselProps.carouselId} className="carouselContainer">
            <div className="carouselContainer__imageContainer">
                {
                    carouselItems.map(item =>
                    {
                        carouselImageIndex++;
                        return <img className={`carouselContainer__imageContainer__image${carouselProps.selectedIndex === carouselImageIndex ? ' selected' : ''}`} key={carouselImageIndex} src={item.imageUrl} alt={item.caption} data-image-index={carouselImageIndex}/>
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