import './Galleria.css';
import Welcome from '../../components/Welcome/Welcome'
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useState } from 'react';
import { Fullscreen, Slideshow, Zoom } from 'yet-another-react-lightbox/plugins';
import PhotoAlbum from 'react-photo-album';
import { } from 'react-icons'

function Galleria() {

    const [loading, setLoading] = useState("");
    const [data, setData] = useState(null);
    const [index, setIndex] = useState(-1);

    const photos = [
        {src: "https://picsum.photos/200/300", width: 200, height: 300},
        {src: "https://picsum.photos/1920/1080", width: 1920, height: 1080},
        {src: "https://picsum.photos/400/300", width: 400, height: 300},
        {src: "https://picsum.photos/1600/900", width: 1600, height: 900},
        {src: "https://picsum.photos/400/300", width: 400, height: 300},
        {src: "https://picsum.photos/1920/1080", width: 1920, height: 1080},
        {src: "https://picsum.photos/200/300", width: 200, height: 300},
        {src: "https://picsum.photos/1600/900", width: 1600, height: 900},
        {src: "https://picsum.photos/400/300", width: 400, height: 300},
        {src: "https://picsum.photos/1920/1080", width: 1920, height: 1080},
        {src: "https://picsum.photos/1600/900", width: 1600, height: 900},
        {src: "https://picsum.photos/1920/1080", width: 1920, height: 1080},
        {src: "https://picsum.photos/200/300", width: 200, height: 300},
    ];

    let background = "";

    const closeAlbum = (e) => {
        let cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if(card.style.background === 'none'){
                card.style.background = background;
                background = "";
            } else {
                card.style.flex = "1";
            }
        });
        setLoading("");
    }

    const Loading = (props) => {
        let { id } = props;
        if( loading === "") return <div className='heading'>{id}</div>
        else if(loading === id){
            return (
                <div style={{width: "100%", height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div className="spinner">
                        <div></div>
                        <div></div>    
                        <div></div>    
                        <div></div>    
                        <div></div>    
                        <div></div>    
                        <div></div>    
                        <div></div>    
                        <div></div>    
                        <div></div>    
                    </div>
                </div>
            );
        }
        else if(loading === (id + "_done")) 
            return( 
                <div className='album-container'>
                    <div style={{width: "90%"}}>
                        <div className='album-heading'>{id}<div className='album-close' onClick={(e) => closeAlbum(e)}>X</div></div>
                        <div className='album-slideshow' onClick={() => setIndex(0)}>
                            <div className='album-slideshow-text'>To View In Slideshow</div>
                            <div className='album-outline-text'>CLICK ME!!</div>
                        </div>
                        <div className='album-photo'>
                            <PhotoAlbum photos={photos} layout='rows' onClick={({ index }) => setIndex(index)} />
                            <Lightbox
                                slides={photos}
                                open={index >= 0}
                                index={index}
                                close={() => setIndex(-1)}
                                carousel={{padding: '0px'}}
                                plugins={[Fullscreen, Slideshow, Zoom]}
                            />
                        </div>
                    </div>
                </div>
            );
        else return <div className='heading'></div>
    }

    const fetchData = async (category) => {
        console.log(data);
        setLoading(category);
        try {
            const response = await fetch('https://httpbin.org/delay/3');
            const result = await response.json();
            setData(result);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(category + "_done");
        }
    };

    const handleOnClick = (e, id) => {
        if(loading !== id + "_done"){
            e.preventDefault();
            let cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                if(card !== e.currentTarget){
                    card.style.flex = "0.001";
                } else {
                    background = card.style.background;
                    card.style.background = 'none';
                }
            });
            fetchData(id);
        }
    }

    return(
        <div className='galleria-main'>
            <div className='galleria-welcome'>
                <Welcome/>
            </div>
            <div className="container">
                <div className="card image-1" onClick={(event) => handleOnClick(event, 'nature')}>
                    <Loading id="nature" />
                </div>
                <div className="card image-2" onClick={(event) => handleOnClick(event, 'baby')}>
                    <Loading id="baby" />
                </div>
                <div className="card image-3" onClick={(event) => handleOnClick(event, 'model')}>
                    <Loading id="model" />
                </div>
                <div className="card image-4" onClick={(event) => handleOnClick(event, 'product')}>
                    <Loading id="product" />
                </div>
                <div className="card image-5" onClick={(event) => handleOnClick(event, 'jewellery')}>
                    <Loading id="jewellery" />
                </div>
                <div className="card image-6" onClick={(event) => handleOnClick(event, 'fashion')}>
                    <Loading id="fashion" />
                </div>
                <div className="card image-7" onClick={(event) => handleOnClick(event, 'maternity')}>
                    <Loading id="maternity" />
                </div>
                <div className="card image-8" onClick={(event) => handleOnClick(event, 'monument')}>
                    <Loading id="monument" />
                </div>
            </div>
        </div>
    );
}

export default Galleria;