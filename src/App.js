import React from 'react';
import Slider from "react-slick";
import ReactPlayer from 'react-player';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

function App() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="App">
      <section>
        <h1>PP's Invitation</h1>
        <img src="/E-Invite-SP.png" alt="Invitation" className="invitation-card" />
      </section>

      <section>
        <h1>Wedding Invitation</h1>
        <img src="/invitation-card.png" alt="Invitation" className="invitation-card" />
      </section>

      <section>
        <h2>Pre-Wedding Photos</h2>
        <Slider {...settings}>
          <div>
            <img src="/PP1.jpeg" alt="Pre-wedding 1" className="slider-image" />
          </div>
          <div>
            <img src="/PP2.jpeg" alt="Pre-wedding 2" className="slider-image" />
          </div>
        </Slider>
      </section>

      <section>
        <h2>Pre-Wedding Video</h2>
        <div className="ReactPlayer-wrapper">
          <ReactPlayer 
            url="https://www.youtube.com/watch?v=uxojVPpa7N4"
            controls 
            width="100%" 
            height="500px" 
          />
        </div>
      </section>

      <section>
        <h2>Live Wedding Stream</h2>
        <div className="ReactPlayer-wrapper">
          <ReactPlayer 
            url="https://www.youtube.com/watch?v=5NV6Rdv1a3I" 
            controls 
            width="100%" 
            height="500px" 
          />
        </div>
      </section>

      <section>
        <h2>Venue</h2>
        <a 
          href="https://maps.google.com/maps/place//data=!4m2!3m1!1s0x3bcb5922d84cdc6f:0xc443f5ef5d605ca?entry=s&sa=X&ved=1t:8290&hl=en-in&ictx=111" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img
            src="/Location.png"
            alt="Location QR"
            className="qr-code"
          />
        </a>
      </section>

      <section>
        <h2>Gift Us</h2>
        <a 
          href="upi://pay?pa=9959912634@ybl&pn=Prashanth_Nampally&mc=0000&tid=1234567890&tr=1234567890&tn=Wedding+Gift&am=0&cu=INR" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img
            src="/PhopePe-PN-QR.jpeg"
            alt="Payment QR"
            className="qr-code"
          />
        </a>
      </section>
    </div>
  );
}

export default App;