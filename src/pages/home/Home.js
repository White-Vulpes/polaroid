import "./Home.css";
import "./Home-media.css";
import logo from "../../resources/images/logo.PNG";
import Spline from "@splinetool/react-spline";
import React, { useEffect, useState, useRef } from "react";
import { ReactTyped } from "react-typed";
import image from "../../resources/images/pexels-catiamatos-1072179.jpg";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import Marquee from "react-fast-marquee";
import Loader from "../../components/Loader/Loader";
import eventLog from "../../utils/eventsLogger";
import { useLocation } from "../../providers/LocationContext";

function Home() {
  const shoot = useRef(null);
  const toggleMobile = useRef(null);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState([]);
  const [thumbnails, setThumbnailPhotos] = useState([]);
  const { location } = useLocation();
  const [sent, setSent] = useState("default");

  useEffect(() => {
    console.log("Home Page View");
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://sb18ca0v12.execute-api.eu-north-1.amazonaws.com/dev/foldernames",
          {
            method: "POST",
            body: JSON.stringify({
              bucket_name: "polaroidfiles",
              folder_name: "HERO",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        const parsedResult = JSON.parse(result.body);

        const photosX = [];
        const thumb = [];
        for (const item of parsedResult) {
          if (item.width != null) {
            photosX.push({
              src: `https://dg2h7a60hb825.cloudfront.net/HERO/${item.file_name}`,
            });
            thumb.push({
              src: `https://dg2h7a60hb825.cloudfront.net/THUMBNAIL/HERO_THUMBNAIL_${item.file_name}`,
              width: parseInt(item.width),
              height: parseInt(item.height),
            });
          }
        }
        setThumbnailPhotos(thumb);
        setPhotos(photosX);
        setTimeout(() => setLoading(false), 6000);
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  const openInNewTab = (url) => {
    window.open(url);
  };

  const handleToggle = () => {
    const display = toggleMobile.current.style.display;
    toggleMobile.current.style.display = display === "flex" ? "none" : "flex";
    toggleMobile.current.style.left = "0";
  };

  const openMail = () => {
    eventLog(location, "send_message", "button_click");
    const name = document.getElementsByClassName("form-input-name")[0].value;
    const mail = document.getElementsByClassName("form-input-mail")[0].value;
    const phone = document.getElementsByClassName("phone")[0].value;
    const content =
      document.getElementsByClassName("form-input-content")[0].value;
    setSent("loading");
    fetch("https://white-vulpes.hasura.app/v1/graphql", {
      method: "POST",
      headers: {
        "x-hasura-role": "client",
        "X-Hasura-Website-Id": "267b46d5-d330-478b-9a51-89af8bfb7528",
      },
      body: JSON.stringify({
        query: `mutation MyMutation($website_id: uuid = "", $name: String = "", $message: String = "", $email: String = "", $phone: String = "", $heading: String = "", $logo: String = "", $sub_heading: String = "") {
          insert_messages(objects: {website_id: $website_id, email: $email, message: $message, name: $name, phone: $phone}) {
            affected_rows
          }
          insert_notifications(objects: {heading: $heading, logo: $logo, sub_heading: $sub_heading, website_id: $website_id}) {
            affected_rows
          }
        }`,
        variables: {
          website_id: "267b46d5-d330-478b-9a51-89af8bfb7528",
          name: name,
          message: content,
          email: mail,
          phone: phone,
          heading: `${name}`,
          logo: "ic-notification-chat",
          sub_heading: "has messaged you.",
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          setSent("error");
        } else {
          setSent("success");
        }
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="home-container">
      <div className="home-header">
        <img src={logo} alt="logo" className="home-logo" />
        <ul className="home-nav" ref={toggleMobile}>
          <li
            onClick={() => {
              shoot.current.scrollIntoView({ behavior: "smooth" });
              document.getElementById("checkbox").click();
            }}
          >
            Book a Shoot
          </li>
          <li
            onClick={() => {
              openInNewTab("/#/galleria");
              document.getElementById("checkbox").click();
            }}
          >
            Galleria
          </li>
        </ul>
        <div className="home-nav-mobile">
          <input type="checkbox" onClick={handleToggle} id="checkbox" />
          <label htmlFor="checkbox" className="toggle">
            <div className="bars" id="bar1"></div>
            <div className="bars" id="bar2"></div>
            <div className="bars" id="bar3"></div>
          </label>
        </div>
      </div>
      <div className="home-intro">
        <div className="home-intro-text">
          Hi! Ishita Here
          <br />
          <ReactTyped
            strings={[
              "Freeze! It's time for a photo.",
              "Life is like a camera—focus on the good times!",
            ]}
            typeSpeed={30}
            backSpeed={30}
            backDelay={1000}
            loop
          />
        </div>
        <div className="home-spline">
          {window.innerWidth > 600 ? (
            <Spline scene="https://prod.spline.design/5bJwyxvC60oRtSHb/scene.splinecode"/>
          ) : (
            <Spline scene="https://wvdashboard.s3.eu-north-1.amazonaws.com/mobile.splinecode" />
          )}
        </div>
      </div>
      <div className="home-work">
        <div className="work-heading">
          Featured Work
          <br />
          <span style={{ fontFamily: "Bebas Neue Book" }}>
            Some of the finest works I have done
          </span>
        </div>
        <Marquee>
          <div className="work-grid">
            <PhotoAlbum
              photos={thumbnails}
              layout="columns"
              spacing={0}
              columns={(columnWidth) => {
                if (columnWidth < 600) return 2;
                return 5;
              }}
            />
          </div>
        </Marquee>
        <Lightbox
          slides={photos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          carousel={{ padding: "0px" }}
          plugins={[Zoom]}
        />
        <div className="over">
          <img src={image} alt="more" className="work-image" />
          <div
            className="overlay more"
            onClick={() => {
              eventLog(location, "gallery_click", "click");
              openInNewTab("/#/galleria");
            }}
          >
            <div>
              You still haven't seen my full album
              <br />
              <span
                style={{
                  fontFamily: "Bebas Neue Book",
                  paddingLeft: "5px",
                }}
              >
                Please Visit my gallery to see more photos that I have shot
                &nbsp;&nbsp;&gt;&gt;&gt;&gt;&gt;
              </span>
            </div>
            <div className="outline-text">CLICK ME!!!</div>
          </div>
        </div>
      </div>
      <div className="book-a-shoot" ref={shoot}>
        <div className="book-intro">
          <div className="book-heading">Book a shoot with me</div>
          <div className="book-sub">
            Snap into fun – let's make magic with my camera!
          </div>
        </div>
        <div className="book-container">
          <div className="book-spline">
            <Spline scene="https://prod.spline.design/qHNbwMjP22mzgFhI/scene.splinecode" />
          </div>
          <div className="book-form">
            <div className="book-form-container">
              <div className="form-input">
                <div className="name">
                  <label className="name-label">Your Name</label>
                  <input className="form-input-name" />
                </div>
                <div className="mail">
                  <label className="mail-label">Mail ID</label>
                  <input className="form-input-mail" />
                </div>
                <div className="mail">
                  <label className="mail-label">Phone Number</label>
                  <input className="form-input-mail phone" />
                </div>
                <div className="content">
                  <label className="content-label">Write a message</label>
                  <textarea className="form-input-content" />
                </div>
                <div className="button">
                  <button
                    className="form-button-submit"
                    onClick={() => {
                      openMail();
                    }}
                  >
                    {sent === "success"
                      ? "Success"
                      : sent === "loading"
                      ? "Loading...."
                      : sent === "error"
                      ? "Error"
                      : "Send Message"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-distributed">
        <div className="footer-left">
          <img
            src={logo}
            alt="logo"
            className="home-logo"
            style={{ width: "150px" }}
          ></img>
          <div className="footer-links">
            <div
              onClick={() =>
                shoot.current.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book A Shoot
            </div>
          </div>
        </div>
        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>Chennai, Tamil Nadu</p>
          </div>
          <div>
            <i className="fa fa-phone"></i>
            <p>
              <a href="tel:+918438936194">+918438936194</a>
            </p>
          </div>
          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:ishujphotography@gmail.com">
                ishujphotography@gmail.com
              </a>
            </p>
          </div>
        </div>
        <div className="footer-right">
          <p style={{ color: "black" }} className="footer-company-about">
            <span>About Me</span>
            As a fun-loving and passionate photographer, I'm dedicated to
            capturing the world's beauty through my lens, creating art that
            tells stories and brings joy to everyone who sees it.
          </p>
          <div className="footer-icons">
            <a href="https://www.instagram.com/ishujphotography/">
              <i className="fa fa-instagram">
                <BsInstagram />
              </i>
            </a>
            <a href="https://www.linkedin.com/in/ishita-nahar-9564aa224/">
              <i className="fa fa-linkedin">
                <BsLinkedin />
              </i>
            </a>
            <a href="mailto:ishujphotography@gmail.com">
              <i className="fa fa-mail">
                <MdEmail />
              </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
