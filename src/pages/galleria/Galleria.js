import './Galleria.css';
import Welcome from '../../components/Welcome'
import React from 'react';

function Galleria() {

    React.useEffect(() => {
        console.log("Hello")
    }, []);

    return(
        <div className='galleria-main'>
            <div className='galleria-welcome'>
                <Welcome/>
            </div>
            <div className="container">
                <div className="card image-1">
                    <div className='heading'>Nature</div>
                </div>
                <div className="card image-2">
                    <div className='heading'>Baby</div>
                </div>
                <div className="card image-3">
                    <div className='heading'>Model</div>
                </div>
                <div className="card image-4">
                    <div className='heading'>Product</div>
                </div>
                <div className="card image-5">
                    <div className='heading'>Jewellery</div>
                </div>
                <div className="card image-6">
                    <div className='heading'>Fashion</div>
                </div>
                <div className="card image-7">
                    <div className='heading'>Maternity</div>
                </div>
                <div className="card image-8">
                    <div className='heading'>Monument</div>
                </div>
            </div>
        </div>
    );
}

export default Galleria;