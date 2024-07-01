import './Home.css';
import logo from '../../resources/images/logo.PNG'
import Spline from '@splinetool/react-spline';
import React from 'react';
import Typed from 'typed.js';
import image from '../../resources/images/pexels-catiamatos-1072179.jpg'

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
                    <Spline scene="https://prod.spline.design/5bJwyxvC60oRtSHb/scene.splinecode" />
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
                            <img src="" className='work-image' alt="model" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}></img>
                            <div className='overlay'><div>Model Photography</div></div>
                        </div>
                        <div className='item-2 over'>
                            <img src="" className='work-image' alt="model" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}></img>
                            <div className='overlay'><div>Nature Photography</div></div>
                        </div>
                        <div className='item-3 over'>
                            <img src="" className='work-image' alt="model" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}></img>
                            <div className='overlay'><div>Baby Photography</div></div>
                        </div>
                        <div className='item-4 over'>
                            <img src="" className='work-image' alt="model" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}></img>
                            <div className='overlay'><div>Product Shoot</div></div>
                        </div>
                        <div className='item-5 over'>
                            <img src="" className='work-image' alt="model" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}></img>
                            <div className='overlay'><div>Jewellery Photography</div></div>
                        </div>
                        <div className='item-6 over'>
                            <img src="" className='work-image' alt="model" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}></img>
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
        </div>  
    );
}

export default Home;
