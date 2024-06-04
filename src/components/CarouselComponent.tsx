import React, {useEffect, useState} from "react";
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg'

interface CarouselProps {
    carouselId: string,
    selectedIndex:number,
    isReversible: boolean,
    items: ICarouselItem[]
}

export interface ICarouselItem {
    imageUrl: string,
    caption: string
}

const CarouselComponent : React.FC<CarouselProps> = (carouselProps) => {
    let carouselImageIndex: number = -1;
    const countImages = carouselProps.items.length;
    const [caption, setCaption] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(carouselProps.selectedIndex);

    useEffect(() => {
        if (countImages <= 0) {
            setCaption('0/0')
        } else {
            setCaption(`1/${countImages}`)
        }
    }, []);
    
    function onPreviousImage() {
        const firstIndex = 0;
        const previousIndex = currentIndex - 1;
        const previousPage = previousIndex + 1;
        
        if (previousIndex < firstIndex) {
            if (!carouselProps.isReversible)
                return;

            setCurrentIndex(countImages - 1);
            selectImage(countImages - 1);
            setCaption(countImages + '/' + countImages);
            
            return;
        } else if (previousIndex === firstIndex) {
            setCaption(`1/${countImages}`)
        } else {
            setCaption(previousPage + '/' + countImages );
        }

        setCurrentIndex(previousIndex);
        selectImage(previousIndex);
    }

    function onNextImage() {
        const lastIndex = countImages - 1;
        const nextIndex = currentIndex + 1;
        const nextPage = nextIndex + 1;
        
        if (nextIndex > lastIndex) {
            if (!carouselProps.isReversible)
                return;

            setCurrentIndex(0);
            selectImage(0);
            setCaption(`1/${countImages}`);

            return;
        } else if (nextIndex === lastIndex) {
            setCaption(countImages + '/' + countImages)
        } else {
            setCaption(nextPage + '/' + countImages );
        }

        setCurrentIndex(nextIndex);
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
                    carouselProps.items.map(item =>
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