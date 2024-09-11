import "./Galleria.css";
import "./Galleria-media.css";
import Welcome from "../../components/Welcome/Welcome";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useState, useEffect } from "react";
import {
  Fullscreen,
  Slideshow,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import PhotoAlbum from "react-photo-album";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Galleria() {
  const [loading, setLoading] = useState("");
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState(null);
  const [thumbnails, setThumbnailPhotos] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("getWelcomeShown") === undefined) {
      Cookies.set("getWelcomeShown", "false");
    }

    const handleBackButton = (event) => {
      event.preventDefault();
      document.getElementsByClassName("album-close")[0].click();
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  let background = "";

  const closeAlbum = (e) => {
    let cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      if (card.style.background === "none") {
        card.style.background = background;
        background = "";
      } else {
        card.style.flex = "1";
      }
    });
    setLoading("");
  };

  const Loading = (props) => {
    let { id, title } = props;
    if (loading === "") return <div className="heading">{title}</div>;
    else if (loading === id) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
    } else if (loading === id + "_done")
      return (
        <div className="album-container">
          <div style={{ width: "90%" }}>
            <div className="album-heading">
              {title}
              <div className="album-close" onClick={(e) => closeAlbum(e)}>
                X
              </div>
            </div>
            <div className="album-slideshow" onClick={() => setIndex(0)}>
              <div className="album-slideshow-text">To View In Slideshow</div>
              <div className="album-outline-text">CLICK ME!!</div>
            </div>
            <div className="album-photo">
              <PhotoAlbum
                photos={thumbnails}
                layout="columns"
                spacing={0.5}
                columns={(columnWidth) => {
                  if (columnWidth < 600) return 2;
                }}
                onClick={({ index }) => setIndex(index)}
              />
              <Lightbox
                slides={photos}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                carousel={{ padding: "0px" }}
                plugins={[Fullscreen, Slideshow, Zoom]}
              />
            </div>
          </div>
        </div>
      );
    else return <div className="heading"></div>;
  };

  const fetchData = async (category) => {
    setLoading(category);
    try {
      const response = await fetch(
        "https://sb18ca0v12.execute-api.eu-north-1.amazonaws.com/dev/foldernames",
        {
          method: "POST",
          body: JSON.stringify({
            bucket_name: "polaroidfiles",
            folder_name: category,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let result = await response.json();
      result = JSON.parse(result.body);
      let photosX = [];
      let thumb = [];
      for (let item in result) {
        if (result[item].width != null)
          photosX.push({
            src:
              "https://dg2h7a60hb825.cloudfront.net/" +
              category +
              "/" +
              result[item].file_name,
          });
        thumb.push({
          src:
            "https://dg2h7a60hb825.cloudfront.net/THUMBNAIL/" +
            category +
            "_THUMBNAIL_" +
            result[item].file_name,
          width: parseInt(result[item].width),
          height: parseInt(result[item].height),
        });
      }
      setThumbnailPhotos(thumb);
      setPhotos(photosX);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(category + "_done");
    }
  };

  const handleOnClick = (e, id) => {
    if (loading !== id + "_done") {
      e.preventDefault();
      let cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        if (card !== e.currentTarget) {
          card.style.flex = "0.000";
        } else {
          background = card.style.background;
          card.style.background = "none";
        }
      });
      fetchData(id);
    }
  };

  return (
    <div className="galleria-main">
      <div className="galleria-welcome">
        {Cookies.get("getWelcomeShown") ? <></> : <Welcome />}
      </div>
      <div className="container">
        <div
          className="card image-1"
          style={{
            backgroundImage: `url("https://dg2h7a60hb825.cloudfront.net/CATEGORIES/WILDLIFE.jpg")`,
          }}
          onClick={(event) => handleOnClick(event, "WILDLIFE")}
        >
          <Loading title={"WILDLIFE"} id="WILDLIFE" />
        </div>
        <div
          className="card image-2"
          style={{
            backgroundImage: `url("https://dg2h7a60hb825.cloudfront.net/CATEGORIES/COMMERCIAL.jpg")`,
          }}
          onClick={(event) => handleOnClick(event, "COMMERCIAL")}
        >
          <Loading title={"COMMERCIAL"} id="COMMERCIAL" />
        </div>
        <div
          className="card image-3"
          style={{
            backgroundImage: `url("https://dg2h7a60hb825.cloudfront.net/CATEGORIES/INTERIOR.jpg")`,
          }}
          onClick={(event) => handleOnClick(event, "INTERIOR")}
        >
          <Loading title={"INTERIOR"} id="INTERIOR" />
        </div>
        <div
          className="card image-4"
          style={{
            backgroundImage: `url("https://dg2h7a60hb825.cloudfront.net/CATEGORIES/PRODUCT.jpg")`,
          }}
          onClick={(event) => handleOnClick(event, "PRODUCT")}
        >
          <Loading title={"PRODUCT"} id="PRODUCT" />
        </div>
        <div
          className="card image-5"
          style={{
            backgroundImage: `url("https://dg2h7a60hb825.cloudfront.net/CATEGORIES/JEWELLERY.jpg")`,
          }}
          onClick={(event) => handleOnClick(event, "JEWELLERY")}
        >
          <Loading title={"JEWELLERY"} id="JEWELLERY" />
        </div>
        <div
          className="card image-6"
          style={{
            backgroundImage: `url("https://dg2h7a60hb825.cloudfront.net/CATEGORIES/NEW_BORN.jpg")`,
          }}
          onClick={(event) => handleOnClick(event, "NEW_BORN")}
        >
          <Loading title={"NEW BORN"} id="NEW_BORN" />
        </div>
        <div
          className="card image-7"
          style={{
            backgroundImage: `url("https://dg2h7a60hb825.cloudfront.net/CATEGORIES/MATERNITY.jpg")`,
          }}
          onClick={(event) => handleOnClick(event, "MATERNITY")}
        >
          <Loading title={"MATERNITY"} id="MATERNITY" />
        </div>
        <div
          className="card image-8"
          style={{
            backgroundImage: `url("https://dg2h7a60hb825.cloudfront.net/CATEGORIES/FASHION.jpg")`,
          }}
          onClick={(event) => handleOnClick(event, "FASHION")}
        >
          <Loading title={"FASHION"} id="FASHION" />
        </div>
        <div
          className="card image-8"
          style={{
            backgroundImage: `url("https://dg2h7a60hb825.cloudfront.net/CATEGORIES/MÉLANGE.jpg")`,
          }}
          onClick={(event) => handleOnClick(event, "MÉLANGE")}
        >
          <Loading title={"MÉLANGE"} id="MÉLANGE" />
        </div>
      </div>
    </div>
  );
}

export default Galleria;
