import React from 'react';

function ChannelModal({type, data, setModalData }) {
    return (
        <>
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    zIndex: '10',
                    top: '0'
                }}
                className="receive_click_div_helper"
                onClick={() => {
                    console.log('clicked wrapper');
                    if(type!=="public_channels")
                    setModalData(null)//close modal

                }}
            />

            <div
                style={{
                    padding: '2rem',
                    backgroundColor: 'rgb(36 36 36)',
                    width: '90%', // Adjusted for responsiveness
                    maxWidth: '600px', // Limit width on larger screens
                    height: '300px',
                    position: 'fixed',
                    zIndex: '100',
                    left: '50%',
                    transform: 'translateX(-50%)', // Center horizontally
                    top: '50%',
                    marginTop: '-150px', // Center vertically
                    borderRadius: '20px',
                    boxShadow:'4px 4px 0px rgba(250, 248, 248, 0.514)'
                }}
            >
                <p
                    style={{
                        fontSize: '20px',
                        lineHeight: '1.5'
                    }}
                >
                    {data.description.substring(0, 400)}
                </p>
                <a
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        color: '#ff6262',
                        left: '50%', // Center link horizontally
                        transform: 'translateX(-50%)', // Adjust for centering
                        marginBottom: '1rem'
                    }}
                    target='_blank'
                    rel="noreferrer"
                    href={`${data.link}`}
                >
                    <svg
                        style={{
                            width: '4rem',
                            height: '4rem'
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <g fill="currentColor">
                            <path d="M14.5 14.5v-3.25a.5.5 0 0 1 1 0V15a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h3.75a.5.5 0 0 1 0 1H5.5v9h9Z" />
                            <path d="M10.354 10.354a.5.5 0 0 1-.708-.708l5-5a.5.5 0 0 1 .708.708l-5 5Z" />
                            <path d="M15.5 8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 1 0v3.5Z" />
                            <path d="M11.5 5.5a.5.5 0 0 1 0-1H15a.5.5 0 0 1 0 1h-3.5Z" />
                        </g>
                    </svg>
                </a>
            </div>
        </>
    );
}

export default ChannelModal;
