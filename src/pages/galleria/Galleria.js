import './Galleria.css';
import './Galleria-media.css'
import Welcome from '../../components/Welcome/Welcome'
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useState, useEffect } from 'react';
import { Fullscreen, Slideshow, Zoom } from 'yet-another-react-lightbox/plugins';
import PhotoAlbum from 'react-photo-album';
import Cookies from "js-cookie"

function Galleria() {

    const [loading, setLoading] = useState("");
    const [index, setIndex] = useState(-1);
    const [photos, setPhotos] = useState(null)
    const [thumbnails, setThumbnailPhotos] = useState(null)

    useEffect(() => {
        if (Cookies.get('getWelcomeShown') === undefined) {
            Cookies.set('getWelcomeShown', 'false');
        }
    }, []);

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
                            <PhotoAlbum photos={thumbnails} layout='rows' onClick={({ index }) => setIndex(index)} />
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
        setLoading(category);
        try {
            const response = await fetch('https://sb18ca0v12.execute-api.eu-north-1.amazonaws.com/dev/foldernames', {
                method: 'POST',
                body: JSON.stringify({
                    "bucket_name": "polaroidfiles",
                    "folder_name": category
                }),
                headers:{
                    "Content-Type": "application/json" 
                }
            });
            let result = await response.json();
            result = JSON.parse(result.body)
            let photosX = []
            let thumb = []
            for(let item in result){
                if (result[item].width != null)
                    photosX.push({src: "https://dg2h7a60hb825.cloudfront.net/" + category + "/" + result[item].file_name});
                    thumb.push({src: "https://dg2h7a60hb825.cloudfront.net/THUMBNAIL/" + category + "_THUMBNAIL_" + result[item].file_name, width: parseInt(result[item].width), height: parseInt(result[item].height)})
            }
            setThumbnailPhotos(thumb)
            setPhotos(photosX)
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
                    card.style.flex = "0.000";
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
                {Cookies.get('getWelcomeShown')?<></>:<Welcome/>}
            </div>
            <div className="container">
                <div className="card image-1" onClick={(event) => handleOnClick(event, 'NATURE')}>
                    <Loading id="NATURE" />
                </div>
                <div className="card image-2" onClick={(event) => handleOnClick(event, 'BABY')}>
                    <Loading id="BABY" />
                </div>
                <div className="card image-3" onClick={(event) => handleOnClick(event, 'INTERIOR')}>
                    <Loading id="INTERIOR" />
                </div>
                <div className="card image-4" onClick={(event) => handleOnClick(event, 'PRODUCT')}>
                    <Loading id="PRODUCT" />
                </div>
                <div className="card image-5" onClick={(event) => handleOnClick(event, 'JEWELLERY')}>
                    <Loading id="JEWELLERY" />
                </div>
                <div className="card image-6" onClick={(event) => handleOnClick(event, 'FASHION')}>
                    <Loading id="FASHION" />
                </div>
                <div className="card image-7" onClick={(event) => handleOnClick(event, 'MATERNITY')}>
                    <Loading id="MATERNITY" />
                </div>
                <div className="card image-8" onClick={(event) => handleOnClick(event, 'MONUMENT')}>
                    <Loading id="MONUMENT" />
                </div>
                <div className="card image-8" onClick={(event) => handleOnClick(event, 'MODEL')}>
                    <Loading id="MODEL" />
                </div>
            </div>
        </div>
    );
}

export default Galleria;