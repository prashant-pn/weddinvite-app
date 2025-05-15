import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import ReactPlayer from 'react-player';
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

  return (
    <div className="App">
      <section>
        <h1>PP's Invitation</h1>
        <img src="/E-Invite-SP.png" alt="Invitation" className="invitation-card" />
      </section>

      <section>
        <h1>Wedding Card</h1>
        <img src="/ARV-Wedding-Card.jpeg" alt="Invitation" className="invitation-card" />
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