import React from 'react';
import "../styles/PricingPage.css";


const PricingPage = () => {
    return (
        <div className="pricing-page">
            <h1 className="Welcome-message">You're welcome, choose your plan </h1>

            <div className="pricing-box-container">

                <div className="user-pricing-box">
                    <h5 className="plan">Free</h5>
                    <p className="price"><sup>$</sup>0<sub>/mo</sub></p>
                    <ul className="subscr">
                        <li><strong>Subscriptions</strong>: 50</li>
                        <li><strong>Traditional visitor</strong></li>
                        <li><strong>Limited experience</strong></li>
                    </ul>
                    <button className="user-btn">Get Free</button>
                </div>


                <div className="writer-pricing-box bg-image">
                    <h5 className="plan">Premium</h5>
                    <p className="price"><sup>$</sup>39<sub>/mo</sub></p>
                    <ul className="subscr">
                        <li><strong>Unlimited</strong> subscriptions</li>
                        <li><strong>Articles writer</strong></li>
                        <li><strong>Customizable experience</strong></li>
                    </ul>
                    <button className="writer-btn">Subscribe</button>
                </div>

            </div>

             
        </div>
    );
};

export default PricingPage;
