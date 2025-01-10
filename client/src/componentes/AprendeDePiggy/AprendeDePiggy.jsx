import React, { useState } from 'react';
import './aprendeDePiggy.scss';

const AprendeDePiggy = ({ videos }) => {
  const [modalVideo, setModalVideo] = useState(null);

  const openModal = (url) => {
    setModalVideo(url);
  };

  const closeModal = () => {
    setModalVideo(null);
  };

  return (
    <div className="aprendeDePiggy">
      <h1 className="componentTitle">¡Aprende de Piggy!</h1>
      <div className="cardsContainer">
      {videos.map((video, index) => (
          <div
            key={index}
            className="card"
            onClick={() => openModal(video.url)} 
          >
            <div className="videoWrapper">
              <iframe
                src={video.url.replace('youtu.be/', 'www.youtube.com/embed/')}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="videoTitle">{video.title}</div>
          </div>
        ))}
      </div>

      {modalVideo && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={modalVideo.replace('youtu.be/', 'www.youtube.com/embed/')}
              title="Modal Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button className="closeButton" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AprendeDePiggy;
