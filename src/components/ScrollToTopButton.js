// src/components/ScrollToTopButton.js
import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = ({ showScrollButton, scrollToTop }) => {
  if (!showScrollButton) return null;

  return (
    <button
      className="scroll-to-top-button fixed bottom-10 right-10 p-3 bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
      onClick={scrollToTop}
    >
      <FaArrowUp className="text-white"/>
    </button>
  );
};

export default ScrollToTopButton;