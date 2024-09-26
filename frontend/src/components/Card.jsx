import React from 'react';

const Card = ({ thumbnail, title, views, videoURL }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <a href={videoURL} target="_blank" rel="noopener noreferrer">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-48 object-cover" 
          draggable="false" 
          style={{ cursor: 'pointer' }}
        />
      </a>
      <div className="p-4" style={{ userSelect: 'none', cursor: 'default' }}>
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-600">{views} views</p>
      </div>
    </div>
  );
};

export default Card;
