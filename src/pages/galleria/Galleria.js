import './Galleria.css';

function Galleria() {
    return(
        <div className='galleria-main'>
            {/* <div className='galleria-header'>
                GALLERIA
            </div> */}
            <div class="container">
                <div class="card">
                    <div className='heading'>Nature</div>
                </div>
                <div class="card">
                    <div className='heading'>Baby</div>
                </div>
                <div class="card">
                    <div className='heading'>Model</div>
                </div>
                <div class="card">
                    <div className='heading'>Product</div>
                </div>
                <div class="card">
                    <div className='heading'>Jewellery</div>
                </div>
                <div class="card">
                    <div className='heading'>Fashion</div>
                </div>
                <div class="card">
                    <div className='heading'>Maternity</div>
                </div>
                <div class="card">
                    <div className='heading'>Monument</div>
                </div>
            </div>
        </div>
    );
}

export default Galleria;