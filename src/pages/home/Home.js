import './Home.css';
import './Home-media.css'
import logo from '../../resources/images/logo.PNG'
import Spline from '@splinetool/react-spline';
import React from 'react';
import { useState } from 'react';
import Typed from 'typed.js';
import image from '../../resources/images/pexels-catiamatos-1072179.jpg'
import baby from '../../resources/images/Baby.jpg'
import Jewel from '../../resources/images/Jewel.jpg'
import belavita from '../../resources/images/belavita.jpg'
import Model from '../../resources/images/Model.jpg'
import Product from '../../resources/images/Product.jpg'
import Wildlife from '../../resources/images/Wildlife.jpg'
import smallCoffee from '../../resources/icons/small-coffee.png'
import mediumCoffee from '../../resources/icons/medium-coffee.png'
import largeCoffee from '../../resources/icons/large-coffee.png'
import premiumCoffee from '../../resources/icons/premium-coffee.png'
import { LuIndianRupee } from "react-icons/lu";
import { BsArrowRight, BsInstagram, BsLinkedin } from "react-icons/bs";
import { MdEmail } from "react-icons/md";


function Home() {

    const el = React.useRef(null);
    const shoot = React.useRef(null);
    const toggleMobile = React.useRef(null);
    const coffee = React.useRef(null);
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    React.useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Freeze! It's time for a photo.", "Life is like a camera—focus on the good times!"],
            typeSpeed: 30,
            backSpeed: 30,
            backDelay: 1000,
            loop: true
        });
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            typed.destroy();
        };
    }, []);

    const openInNewTab = (url) => {
        window.open(url);
    };

    const handleToggle = (e) => {
        console.log(toggleMobile.current)
        toggleMobile.current.style.display = toggleMobile.current.style.display === 'flex'?"none":"flex"
        toggleMobile.current.style.left = '0'
    }

    return (
        <div className="home-container">
            <div className='home-header'>
                <img src={logo} alt="logo" className='home-logo'></img>
                <ul className='home-nav' ref={toggleMobile}>
                    <li onClick={() => {
                        shoot.current.scrollIntoView({behavior: 'smooth'})
                        document.getElementById('checkbox').click()
                    }}>Book a Shoot</li>
                    <li onClick={() => {
                        coffee.current.scrollIntoView({behavior: 'smooth'})
                        document.getElementById('checkbox').click()
                    }}>Buy Me Coffee</li>
                    <li  onClick={() => {
                        openInNewTab("/#/galleria")
                        document.getElementById('checkbox').click()
                    }}>Galleria</li>
                </ul>
                <div className='home-nav-mobile'>
                    <input type="checkbox" onClick={(e) => {handleToggle(e)}}  id="checkbox"/>
                    <label htmlFor="checkbox" className="toggle">
                        <div className="bars" id="bar1"></div>
                        <div className="bars" id="bar2"></div>
                        <div className="bars" id="bar3"></div>
                    </label>
                </div>
            </div>
            <div className='home-intro'>
                <div className='home-intro-text'>
                Hi! Ishitia Here<br/><span ref={el}></span>
                </div>
                <div className='home-spline'>
                    {screenSize.width > 600?<Spline scene="https://prod.spline.design/5bJwyxvC60oRtSHb/scene.splinecode"/>:<Spline scene="https://prod.spline.design/PcCe7m-tBQGuB9a9/scene.splinecode"/>}
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
                            <img src={Model} className='work-image' alt="model" ></img>
                            <div className='overlay'><div>Model Photography</div></div>
                        </div>
                        <div className='item-2 over'>
                            <img src={Wildlife} className='work-image' alt="model" ></img>
                            <div className='overlay'><div>Wildlife</div></div>
                        </div>
                        <div className='item-3 over'>
                            <img src={baby} className='work-image' alt="model" ></img>
                            <div className='overlay'><div>Baby Photography</div></div>
                        </div>
                        <div className='item-4 over'>
                            <img src={Product} className='work-image' alt="model" ></img>
                            <div className='overlay'><div>Product Shoot</div></div>
                        </div>
                        <div className='item-5 over'>
                            <img src={Jewel} className='work-image' alt="model" ></img>
                            <div className='overlay'><div>Jewellery Photography</div></div>
                        </div>
                        <div className='item-6 over'>
                            <img src={belavita} className='work-image' alt="model" ></img>
                            <div className='overlay'><div>Bellavita</div></div>
                        </div>
                        <div className='item-more over'>
                            <img src={image} alt="more" className='work-image' ></img>
                            <div className='overlay more' onClick={() => openInNewTab("/#/galleria")}>
                                <div>You still haven't seen my full album<br/>
                                    <span style={{fontFamily: 'Bebas Neue Book', paddingLeft: "5px"}}>Please Visit my gallery to see more photos that i have shot &nbsp;&nbsp;&gt;&gt;&gt;&gt;&gt;</span>
                                </div>
                                <div className='outline-text'>CLICK ME!!!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='book-a-shoot' ref={shoot}>
                <div className='book-intro'>
                    <div className='book-heading'>Book a shoot with me</div>
                    <div className='book-sub'>Snap into fun – let's make magic with my camera!</div>
                </div>
                <div className='book-container'>
                    <div className='book-spline'>
                        <Spline scene="https://prod.spline.design/qHNbwMjP22mzgFhI/scene.splinecode"/>
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
                                <div className='mail'>
                                    <label className='mail-label'>Phone Number, If you may</label>
                                    <input className='form-input-mail'/>
                                </div>
                                <div className='content'>
                                    <label className='content-label'>Hope a new project awaits me!</label>
                                    <textarea className='form-input-content'/>
                                </div>
                                <div className='button'>
                                    <button className='form-button-submit'>Call a Pigeon 🐦</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='buy-me-tip' ref={coffee}>
                <div className='tip-intro'>
                    <div className='tip-heading'>Buy Me some Coffee</div>
                    <div className='tip-sub'>Fuel my creativity—buy me some coffee, pretty please!</div>
                </div>
                <div className='tip-container'>
                    <div className='tip-menu'>
                        <div className='tip-menu-items'>
                            <div className='items'>
                                <img src={smallCoffee} className="coffee-icons" alt="small"></img>
                                <div className='tip-amount'>₹15</div>
                            </div>
                            <div className='items'>
                                <img src={mediumCoffee} className="coffee-icons" alt="small"></img>
                                <div className='tip-amount'>₹15</div>
                            </div>
                            <div className='items'>
                                <img src={largeCoffee} className="coffee-icons" alt="small"></img>
                                <div className='tip-amount'>₹15</div>
                            </div>
                            <div className='items'>
                                <img src={premiumCoffee} className="coffee-icons" alt="small"></img>
                                <div className='tip-amount'>₹15</div>
                            </div>
                        </div>
                        <div className='tip-menu-custom'>
                            <div className='custom-input'>
                                <LuIndianRupee size={42} style={{position: 'absolute', paddingLeft: '30px', marginTop: '0px'}}/>
                                <input className='custom-item' placeholder='100000'/>
                            </div>
                            <div className='pay-button-container'><button className='pay-button'><BsArrowRight size={70} color='black' /></button></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-distributed">
                <div className="footer-left">
                    <img src={logo} alt='logo'></img>
                    <div className="footer-links">
                        <div onClick={() => shoot.current.scrollIntoView({behavior: 'smooth'})} >Book A Shoot</div>
                        <div>&nbsp;|&nbsp;</div>
                        <div onClick={() => coffee.current.scrollIntoView({behavior: 'smooth'})}>Buy Me A Coffee</div>
                    </div>
                </div>
                <div className="footer-center">
                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p><span>Vepery</span> Chennai, Tamil Nadu</p>
                    </div>
                    <div>
                        <i className="fa fa-phone"></i>
                        <p><a href="tel:+918438936194">+918438936194</a></p>
                    </div>
                    <div>
                        <i className="fa fa-envelope"></i>
                        <p>
                            <a href="mailto:ishujphotography@gmail.com">ishujphotography@gmail.com</a>
                        </p>
                    </div>
                </div>
                <div className="footer-right">
                    <p style={{color: 'black'}} className="footer-company-about">
                        <span>About Me</span>
                        As a fun-loving and passionate photographer, I'm dedicated to capturing the world's beauty through my lens, creating art that tells stories and brings joy to everyone who sees it.
                    </p>
                    <div className="footer-icons">
                        <a href="https://www.instagram.com/ishujphotography/"><i className="fa fa-instagram"><BsInstagram/></i></a>
                        <a href="https://www.linkedin.com/in/ishita-nahar-9564aa224/"><i className="fa fa-linkedin"><BsLinkedin/></i></a>
                        <a href="mailto:ishujphotography@gmail.com"><i className="fa fa-mail"><MdEmail /></i></a>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default Home;
