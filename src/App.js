import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import ReactPlayer from 'react-player';
import HTMLFlipBook from "react-pageflip";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import { FaThumbsUp, FaHands } from "react-icons/fa";
import axios from 'axios';

function App() {
  // Only include ARU_*.jpg files here
  const [photos, setPhotos] = useState([
    'ARU_1.jpg',
    'ARU_2.jpg',
    'ARU_3.jpg',
    'ARU_4.jpg',
    'ARU_5.jpg',
    'ARU_6.jpg',
    'ARU_7.jpg',
    'ARU_8.jpg',
    'ARU_9.jpg',
    'ARU_10.jpg',
    'ARU_11.jpg',
    'ARU_12.jpg',
    'ARU_13.jpg',
    'ARU_14.jpg',
    'ARU_15.jpg',
    'ARU_16.jpg',
    'ARU_17.jpg',
    'ARU_18.jpg',
    'ARU_19.jpg',
    'ARU_20.jpg',
    'ARU_21.jpg',
    'ARU_22.jpg',
    'ARU_23.jpg',
    'ARU_24.jpg',
    'ARU_25.jpg',
    'ARU_26.jpg',
    'ARU_27.jpg',
    'ARU_28.jpg',
    'ARU_29.jpg',
    'ARU_30.jpg',
    'ARU_31.jpg',
    'ARU_32.jpg',
    'ARU_33.jpg',
    'ARU_34.jpg',
    'ARU_35.jpg',
    'ARU_36.jpg',
    'ARU_37.jpg',
    'ARU_38.jpg',
    'ARU_39.jpg',
    'ARU_40.jpg',
    'ARU_41.jpg',
    'ARU_42.jpg',
    'ARU_43.jpg',
    'ARU_44.jpg',
    'ARU_45.jpg',
    'ARU_46.jpg',
    'ARU_47.jpg',
    'ARU_48.jpg',
    'ARU_49.jpg',
    'ARU_50.jpg',
    'ARU_51.jpg',
    'ARU_52.jpg',
    'ARU_53.jpg',
    'ARU_54.jpg',
    'ARU_55.jpg',
    'ARU_56.jpg',
    'ARU_57.jpg',
    'ARU_58.jpg',
    'ARU_59.jpg',
    'ARU_60.jpg',
    'ARU_61.jpg',
    'ARU_62.jpg',
    'ARU_63.jpg',
    'ARU_64.jpg',
    'ARU_65.jpg',
    'ARU_66.jpg',
    'ARU_67.jpg',
    'ARU_68.jpg',
    'ARU_69.jpg',
    'ARU_70.jpg',
    'ARU_71.jpg',
    'ARU_72.jpg',
    'ARU_73.jpg',
    // Add more if you have additional ARU_*.jpg files in public/photos
  ]);

  const [loading, setLoading] = useState(true); // State to track loading

  // Use localStorage to persist per-browser likes/thumbs up
  const [likeCount, setLikeCount] = useState(() => Number(localStorage.getItem('likeCount')) || 0);
  const [thumbsUpCount, setThumbsUpCount] = useState(() => Number(localStorage.getItem('thumbsUpCount')) || 0);
  const [liked, setLiked] = useState(() => localStorage.getItem('liked') === 'true');
  const [thumbsUp, setThumbsUp] = useState(() => localStorage.getItem('thumbsUp') === 'true');
 

  const settings = {
    dots: false,         // Remove dots under each photo
    infinite: true,
    speed: 350,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      const folderId = ''; // Your Google Drive folder ID
      const apiKey = ''; // Your Google API key
      //const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,webContentLink,webViewLink)`;

      try {
        const response = await axios.get(url);
        console.log('API Response:', response.data); // Log the API response
        const files = response.data.files;
        const imageFiles = files.filter(file => file.mimeType.startsWith('image/'));
        setPhotos(imageFiles); // Update photos state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchPhotos();
  }, []);

  // Example: 5 pages + cover + back cover
  const dameraCardPages = [
    "/ARV-Wedding-Card-Cover.jpeg",      // Cover
    "/ARV-Wedding-Card-1.jpeg",          // Page 1
    "/ARV-Wedding-Card-2.jpeg",          // Page 2
    //"/ARV-Wedding-Card-3.jpeg",          // Page 3
    //"/ARV-Wedding-Card-4.jpeg",          // Page 4
    //"/ARV-Wedding-Card-5.jpeg",          // Page 5
    "/ARV-Wedding-Card-Back.jpeg"        // Back Cover
  ];

  useEffect(() => {
    axios.get('http://localhost:4000/api/counts').then(res => {
      setLikeCount(res.data.like);
      setThumbsUpCount(res.data.thumbsUp);
    });
  }, []);

  // Animation states for each button
  const [showHeartShower, setShowHeartShower] = useState(false);
  const [showFlowerShower, setShowFlowerShower] = useState(false);
  const [showRoseShower, setShowRoseShower] = useState(false);

  // Animation handlers
  const handleLike = () => {
    setShowHeartShower(true);
    setTimeout(() => setShowHeartShower(false), 2000);
  };

  const handleThumbsUp = () => {
    setShowFlowerShower(true);
    setTimeout(() => setShowFlowerShower(false), 2000);
  };

  const handleBlessing = () => {
    setShowRoseShower(true);
    setTimeout(() => setShowRoseShower(false), 2000);
  };

  return (
    <div className="App" style={{ position: "relative", overflow: "hidden" }}>
      {/* Blessing Symbol */}
      <div
        className="blessing-symbol"
        title="Send Your Blessings"
        onClick={handleBlessing}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000,
          cursor: "pointer",
          background: "#fff0fa",
          borderRadius: "50%",
          boxShadow: "0 4px 16px rgba(200,0,100,0.12)",
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          border: "2px solid #e75480",
          transition: "transform 0.2s",
        }}
      >
        <FaHands style={{ color: "#e75480", fontSize: "2.2rem" }} />
      </div>

      {/* Heart Shower Animation */}
      {showHeartShower && (
        <div className="rose-shower">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="rose"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.8}s`,
                fontSize: `${Math.random() * 1.5 + 1.2}rem`,
              }}
            >
              💖
            </span>
          ))}
        </div>
      )}

      {/* Flower Bunch Shower Animation */}
      {showFlowerShower && (
        <div className="rose-shower">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="rose"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.8}s`,
                fontSize: `${Math.random() * 1.5 + 1.2}rem`,
              }}
            >
              💐
            </span>
          ))}
        </div>
      )}

      {/* Red Rose Shower Animation */}
      {showRoseShower && (
        <div className="rose-shower">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="rose"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.8}s`,
                fontSize: `${Math.random() * 1.5 + 1.2}rem`,
              }}
            >
              🌹
            </span>
          ))}
        </div>
      )}

      <section>
        <h1>Two Hearts, One Journey</h1>
        <div className="invitation-container">
          <img src={process.env.PUBLIC_URL + "/wedding-inivte.jpeg"} alt="Invitation" className="invitation-card" />
          <div className="card-divider"></div>
          <img src={process.env.PUBLIC_URL + "/PP_Poster.jpeg"} alt="Invitation" className="invitation-card" />
        </div>
      </section>

      <section>
        <h2>Our Families, Your Blessings</h2>
        <div className="wedding-cards-horizontal">
          <div className="wedding-card-half">
            <WeddingCardFlipbook
              pages={[
                process.env.PUBLIC_URL + "/nampelly-cover.jpeg",
                process.env.PUBLIC_URL + "/nampelly-1.jpeg",
                process.env.PUBLIC_URL + "/nampelly-2.jpeg",
                process.env.PUBLIC_URL + "/damera-cover.jpeg",
                process.env.PUBLIC_URL + "/damera-1.jpeg",
                process.env.PUBLIC_URL + "/damera-2.jpeg"
              ]}
            />
          </div>
          {/* <div className="card-divider"></div>
          <div className="wedding-card-half">
            <h3>Damera’s Loving Wishes</h3>
            <WeddingCardFlipbook
              pages={[
                "/damera-cover.jpeg",
                "/damera-1.jpeg",
                "/damera-2.jpeg"
              ]}
            />
          </div> */}
        </div>
      </section>

      <section>
        <h2>A Heartfelt Invite to Our Celebration</h2>
        <video controls className="wedding-video">
          <source src={process.env.PUBLIC_URL + "/PN_Wedding_Invite.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section>
        <h2>Our Love Story in Motion</h2>
        <Slider {...settings}>
          {photos.map((photo, index) => (
            <div key={index}>
              <img 
                src={process.env.PUBLIC_URL + `/photos/${photo}`}
                alt={`ARU_ ${index + 1}`}
                className="slider-image"
                onContextMenu={e => e.preventDefault()}
                draggable="false"
              />
            </div>
          ))}
        </Slider>
      </section>

      <section>
        <h2>Together, Always & Forever</h2>
        <div className="ReactPlayer-wrapper">
          <ReactPlayer 
            url="https://youtu.be/ABw72SM8PB0"
            controls 
            width="100%" 
            height="500px"
          />
        </div>
      </section>

      <section>
        <h2>Celebrate With Us, Wherever You Are</h2>
        <div className="ReactPlayer-wrapper">
          <ReactPlayer 
            url="https://www.youtube.com/live/xFyXDdOolIk?si=x5qlPKa795D5u9gw"
            controls 
            width="100%" 
            height="500px" 
          />
        </div>
      </section>

      <section>
        <h2>Venue : Where Our Journey Begins</h2>
        <div className="venue-container">
          <div className="venue-item">
            <h3 style={{ color: "#222" }}>Engagement : The Promise</h3>
            <a 
              href="https://maps.google.com/maps/place//data=!4m2!3m1!1s0x3bcb5922d84cdc6f:0xc443f5ef5d605ca?entry=s&sa=X&ved=1t:8290&hl=en-in&ictx=111" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img
                src={process.env.PUBLIC_URL + "/HARI_HARA-GMAPS_LOC.png"}
                alt="Engagement QR"
                className="qr-code"
              />
            </a>
          </div>

          <div className="venue-item">
            <h3 style={{ color: "#222" }}>Wedding : The Beginning</h3>
            <a 
              href="https://maps.app.goo.gl/Qo9KPY3WzohMeZGz6"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img
                src={process.env.PUBLIC_URL + "/NMR-GMAPS-LOC.png"}
                alt="Marriage Venue QR"
                className="qr-code"
              />
            </a>
          </div>
        </div>
      </section>

      <section>
        <h2>Shower Us With Your Love</h2>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "32px", marginBottom: "24px" }}>
          <img
            src={process.env.PUBLIC_URL + "/bless-image.png"}
            alt="Gift Box"
            className="qr-code"
          />
          <img
            src={process.env.PUBLIC_URL + "/PhopePe-PN-QR.jpeg"}
            alt="Payment QR"
            className="qr-code"
          />
        </div>
        {/* Like & Thumbs Up Buttons */}
        <div style={{ marginTop: "24px", textAlign: "center", display: "flex", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={handleLike}
            style={{
              background: "#ff69b4",
              color: "#fff",
              border: "none",
              borderRadius: "24px",
              padding: "12px 32px",
              fontSize: "1.2rem",
              cursor: "pointer",
              transition: "background 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            💖 Ur Love.
          </button>
          <button
            onClick={handleThumbsUp}
            style={{
              background: "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "24px",
              padding: "12px 32px",
              fontSize: "1.2rem",
              cursor: "pointer",
              transition: "background 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <FaThumbsUp /> Liked it.
          </button>
        </div>
      </section>
    </div>
  );
}

function WeddingCardFlipbook({ pages }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <HTMLFlipBook
        width={1300}
        height={1000}
        showCover={true}
        style={{
          boxShadow: "0 8px 32px rgba(150,7,228,0.18)",
          borderRadius: "24px",
          background: "#fff"
        }}
        className="flipbook-custom"
      >
        {pages.map((src, idx) => (
          <div
            key={idx}
            className="flip-page"
            style={{
              width: "100%",
              height: "100%",
              padding: 0,
              margin: 0,
              background: "#fff",
              borderRadius: "24px"
            }}
          >
            <img
              src={src}
              alt={`Card Page ${idx + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "24px",
                display: "block"
              }}
            />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}

export default App;