import React, { useRef, useState, useEffect } from 'react';
import Card from './Card';

const CardContainer = ({ videos }) => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <div 
      ref={scrollContainerRef}
      className="flex overflow-x-scroll scrollbar-hide mt-8"
      style={{
        overscrollBehaviorX: 'contain',
        cursor: isDragging ? 'grabbing' : 'grab',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex">
        {videos.map((video) => (
          <div key={video.videoId} className="flex-shrink-0 w-64 mr-4">
            <Card
              thumbnail={video.thumbnail}
              title={video.title}
              views={video.views}
              videoURL={video.videoURL}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardContainer;