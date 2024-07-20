import React from 'react';
import '../styles/Spinner.css'; 

const Spinner = ({style}) => {
    return (
        <div style={style} className='spin-container'>
            {/* <div>Loading .</div> */}
            
            <div className="spinner-grow text-success1" role="status">
                <span className="sr-only"></span>
            </div>
            <div className="spinner-grow text-success2" role="status">
                <span className="sr-only"></span>
            </div>
            <div className="spinner-grow text-success3" role="status">
                <span className="sr-only"></span>
            </div>
            <div className="spinner-grow text-success4" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    );
};

export default Spinner;
