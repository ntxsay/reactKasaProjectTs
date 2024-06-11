import BannerComponent from "../components/BannerComponent.tsx";
import imageSource from "../assets/Image-source-2.png";
import ExpanderComponent from "../components/ExpanderComponent.tsx";
import data from '../data/aboutData.json'


const  AboutPage = () => {
    return(
        <section className="page">
            <BannerComponent caption={null} imageUrl={imageSource} />
            <section className="about-expanders-container">
                {
                    data.map(about => {
                        return <ExpanderComponent key={about.id} header={about.title} content={<p className="about-expanders-content">{about.content}</p>} isCollapsed={true}/>
                    })
                }
            </section>
        </section>
    );
}

export default AboutPage;