import React from 'react';

const SelectedStar = ({width = 15, height=14}) => {
    return <svg width={width} height={height} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M7.5 11.25L3.09161 13.5676L3.93354 8.65881L0.367076 5.18237L5.29581 4.46619L7.5 0L9.7042 4.46619L14.6329 5.18237L11.0665 8.65881L11.9084 13.5676L7.5 11.25Z"
              fill="url(#paint0_linear)"/>
        <defs>
            <linearGradient id="paint0_linear" x1="7.49988" y1="0" x2="7.49988" y2="16.5836"
                            gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFBE72"/>
                <stop offset="1" stopColor="#FF9716"/>
            </linearGradient>
        </defs>
    </svg>
};

export default SelectedStar;
