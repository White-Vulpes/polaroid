import React, { useRef } from 'react';
import './Gallery.css';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

const Gallery = () => {

  const thumbnailRef = useRef(null);

  return (
    <div className='carousel-container'>
      <div className='carousel'>
      <Lightbox
        open={true}
        plugins={[Thumbnails]}
        thumbnails = {{ref: thumbnailRef, position: "absolute"}}
        carousel={{padding: '0px'}}
        slides={[
          { src: "https://picsum.photos/1920/1080", imageFit: 'cover' },
          { src: "https://picsum.photos/1920/1080", imageFit: 'cover' },
          { src: "https://picsum.photos/1920/1080", imageFit: 'cover' },
        ]}
      />
      </div>
    </div>
  );
};

export default Gallery;