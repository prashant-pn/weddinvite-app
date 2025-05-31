import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import ReactPlayer from 'react-player';
import HTMLFlipBook from "react-pageflip";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]); // State to store photo file names
  const [loading, setLoading] = useState(true); // State to track loading

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      const folderId = '1OEVFnmSnVh3KDR-Ys2xePgWZnzk8PEV_'; // Your Google Drive folder ID
      const apiKey = 'AIzaSyD20mpTttVSxTcPQclM2UHKYjjk9gcFcVo'; // Your Google API key
      const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,webContentLink,webViewLink)`;

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

  useEffect(() => {
    // Fetch the list of photo file names from the public/photos folder
    const fetchLocalPhotos = async () => {
      // Replace this with the actual file names in your `public/photos` folder
      const localPhotos = [
        'PP1.jpeg',
        'PP2.jpeg',
        'PP3.jpeg',
      ];
      setPhotos(localPhotos);
    };

    fetchLocalPhotos();
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

  return (
    <div className="App">
      <section>
        <h1>PP's Invitation</h1>
        <div className="invitation-container">
          <img src="/E-Invite-SP.png" alt="Invitation" className="invitation-card" />
          <div className="card-divider"></div>
          <img src="/wed-invite-mock.jpeg" alt="Invitation" className="invitation-card" />
        </div>
      </section>

      <section>
        <div className="wedding-cards-horizontal">
          <div className="wedding-card-half">
            <h1>Nampelly's</h1>
            <img src="/ARV-Wedding-Card.jpeg" alt="Nampelly's" className="invitation-card" />
          </div>
          <div className="card-divider"></div>
          <div className="wedding-card-half">
            <h1>Damera's</h1>
            <div style={{display: "flex", justifyContent: "center"}}>
              <HTMLFlipBook
                width={350}
                height={500}
                size="stretch"
                minWidth={315}
                maxWidth={500}
                minHeight={420}
                maxHeight={650}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                style={{margin: "0 auto", boxShadow: "0 8px 32px rgba(150,7,228,0.12)", borderRadius: "16px"}}
                className="flipbook-custom"
              >
                {dameraCardPages.map((src, idx) => (
                  <div key={idx} className={`flip-page ${idx === 0 ? 'cover' : idx === dameraCardPages.length - 1 ? 'back-cover' : ''}`}>
                    <img
                      src={src}
                      alt={`Damera's Card Page ${idx}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: idx === 0 || idx === dameraCardPages.length - 1 ? "16px" : "0"
                      }}
                    />
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h1>Wedding Invitation</h1>
        <video controls className="wedding-video">
          <source src="/PP-Wedding-Invitation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* <section>
        <h2>Pre-Wedding Photos</h2>
        {loading ? ( // Show loading spinner or placeholder while fetching data
          <p>Loading photos...</p>
        ) : (
          <Slider {...settings}>
            {photos.map((photo, index) => (
              <div key={index}>
                <img 
                  src={photo.webContentLink} // Render from the Google Drive link
                  alt={`Pre-wedding ${index + 1}`} 
                  className="slider-image" 
                />
              </div>
            ))}
          </Slider>
        )}
      </section> */}

      {/* <section>
        <h2>Static Pre-Wedding Photos</h2>
        <Slider {...settings}>
          <div>
            <img src="/PP1.jpeg" alt="Pre-wedding 1" className="slider-image" />
          </div>
          <div>
            <img src="/PP2.jpeg" alt="Pre-wedding 2" className="slider-image" />
          </div>
        </Slider>
      </section> */}

      <section>
        <h2>Pre-Wedding Photos</h2>
        <Slider {...settings}>
          {photos.map((photo, index) => (
            <div key={index}>
              <img 
                src={`/photos/${photo.name}`} // Render from the local folder
                alt={`PP ${index + 1}`} 
                className="slider-image" 
                onContextMenu={(e) => e.preventDefault()} // Disable right-click
                draggable="false" // Disable dragging
              />
            </div>
          ))}
        </Slider>
      </section>

      <section>
        <h2>Pre-Wedding Video</h2>
        <div className="ReactPlayer-wrapper">
          <ReactPlayer 
            url="https://www.youtube.com/watch?v=uxojVPpa7N4"
            controls 
            width="100%" 
            height="500px" // Increased height
          />
        </div>
      </section>

      <section>
        <h2>Live Wedding Stream Video</h2>
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
        <h2>Our Big Day, This Way</h2>
        <div className="venue-container">
          <div className="venue-item">
            <h3>Engagement Venue</h3>
            <a 
              href="https://maps.google.com/maps/place//data=!4m2!3m1!1s0x3bcb5922d84cdc6f:0xc443f5ef5d605ca?entry=s&sa=X&ved=1t:8290&hl=en-in&ictx=111" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img
                src="/HARI_HARA-GMAPS_LOC.png"
                alt="Engagement QR"
                className="qr-code"
              />
            </a>
          </div>

          <div className="venue-item">
            <h3>Marriage Venue</h3>
            <a 
              href="https://maps.app.goo.gl/Qo9KPY3WzohMeZGz6"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img
                src="/NMR-GMAPS-LOC.png"
                alt="Marriage Venue QR"
                className="qr-code"
              />
            </a>
          </div>
        </div>
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