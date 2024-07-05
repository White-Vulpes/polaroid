import './Home.css';
import logo from '../../resources/images/logo.PNG'
import Spline from '@splinetool/react-spline';
import React from 'react';
import Typed from 'typed.js';
import image from '../../resources/images/pexels-catiamatos-1072179.jpg'
import baby from '../../resources/images/Baby.jpg'
import Jewel from '../../resources/images/Jewel.jpg'
import belavita from '../../resources/images/belavita.jpg'
import Model from '../../resources/images/Model.jpg'
import Product from '../../resources/images/Product.jpg'
import Wildlife from '../../resources/images/Wildlife.jpg'
import workSpline from '../../resources/spline/work.splinecode'
import cameraSpline from '../../resources/spline/polaroid.splinecode'

function Home() {

    const el = React.useRef(null);

    React.useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Freeze! It's time for a photo.", "Life is like a camera—focus on the good times!"],
            typeSpeed: 30,
            backSpeed: 30,
            backDelay: 1000,
            loop: true
        });

        return () => {
            typed.destroy();
        };
    }, []);

    const NF = 50, 
          S = document.body.style;
    
    let rID = null, 
        f = 0, 
        typ = 0;

    function update() {
        let k = ++f/NF;
        S.setProperty('--stop', `${+(k*100).toFixed(2)}%`);
        if(!(f%NF)) {
            f = 0;
            S.setProperty('--gc1', `var(--c${typ})`);
            typ = 1 - typ;
            S.setProperty('--gc0', `var(--c${typ})`);
            S.setProperty('--stop', `0%`);
            cancelAnimationFrame(rID);
            rID = null
            return
        }
        rID = requestAnimationFrame(update)
    };

    const handleMouseUp = (e) => {
        if(!rID) {
            S.setProperty('--x', `${e.clientX}px`);
            S.setProperty('--y', `${e.clientY}px`);
            update()
        }
    };

    const openInNewTab = (url) => {
        window.open(url);
    };

    return (
        <div className="home-container">
            <div className='home-header'>
                <img src={logo} alt="logo" className='home-logo'></img>
                <ul className='home-nav'>
                    <li>Book a Shoot</li>
                    <li>Buy Me Coffee</li>
                    <li onMouseUp={(e) => handleMouseUp(e)} style={{paddingBottom: "0px", paddingTop: "0px"}}><Spline scene="https://prod.spline.design/V23qPSknmvUgSCQX/scene.splinecode"/></li>
                </ul>
            </div>
            <div className='home-intro'>
                <div className='home-intro-text'>
                    Hey! Ishita Here<br/><span ref={el}></span>
                </div>
                <div className='home-spline'>
                    <Spline scene={cameraSpline} />
                </div>
            </div>
            <div className='home-work'>
                <div className='work-heading'>
                    Featured Work<br/>
                    <span style={{fontFamily: 'Bebas Neue Book'}}>Some of the finest works I have done</span>
                </div>
                <div className='home-work-grid'>
                    <div className='work-grid'>
                        <div className='item-1 over'>
                            <img src={Model} className='work-image' alt="model" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}></img>
                            <div className='overlay'><div>Model Photography</div></div>
                        </div>
                        <div className='item-2 over'>
                            <img src={Wildlife} className='work-image' alt="model" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}></img>
                            <div className='overlay'><div>Wildlife</div></div>
                        </div>
                        <div className='item-3 over'>
                            <img src={baby} className='work-image' alt="model" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}></img>
                            <div className='overlay'><div>Baby Photography</div></div>
                        </div>
                        <div className='item-4 over'>
                            <img src={Product} className='work-image' alt="model" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}></img>
                            <div className='overlay'><div>Product Shoot</div></div>
                        </div>
                        <div className='item-5 over'>
                            <img src={Jewel} className='work-image' alt="model" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}></img>
                            <div className='overlay'><div>Jewellery Photography</div></div>
                        </div>
                        <div className='item-6 over'>
                            <img src={belavita} className='work-image' alt="model" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}></img>
                            <div className='overlay'><div>Bellavita</div></div>
                        </div>
                        <div className='item-more over'>
                            <img src={image} alt="more" className='work-image' style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}></img>
                            <div className='overlay-more' onClick={() => openInNewTab("/galleria")}>
                                <div>You still haven't seen my full album<br/>
                                    <span style={{fontFamily: 'Bebas Neue Book', fontSize: "25px", paddingLeft: "5px"}}>Please Visit my gallery to see more photos that i have shot</span>
                                </div>
                                <div className='outline-text'>CLICK ME!!!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='book-a-shoot'>
                <div className='book-intro'>
                    <div className='book-heading'>Book a shoot with me</div>
                    <div className='book-sub'>Snap into fun – let's make magic with my camera!</div>
                </div>
                <div className='book-container'>
                    <div className='book-spline'>
                        <Spline className="splineTag" scene={workSpline}/>
                    </div>
                    <div className='book-form'>
                        <div className='book-form-container'>
                            <div className='form-input'>
                                <div className='name'>
                                    <label className='name-label'>Your good name, If I may</label>
                                    <input className='form-input-name'/>
                                </div>
                                <div className='mail'>
                                    <label className='mail-label'>And your Mail ID, Sire!!</label>
                                    <input className='form-input-mail'/>
                                </div>
                                <div className='content'>
                                    <label className='content-label'>Hope a new project awaits me!</label>
                                    <textarea className='form-input-content'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default Home;
