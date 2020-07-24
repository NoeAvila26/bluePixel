import React from 'react';

const EmptyStar = () => {
    return <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i)">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M7.5 11.25L3.09161 13.5676L3.93354 8.65881L0.367076 5.18237L5.29581 4.46619L7.5 0L9.7042 4.46619L14.6329 5.18237L11.0665 8.65881L11.9084 13.5676L7.5 11.25Z"
                  fill="#D7DBDF"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M7.5 11.25L3.09161 13.5676L3.93354 8.65881L0.367076 5.18237L5.29581 4.46619L7.5 0L9.7042 4.46619L14.6329 5.18237L11.0665 8.65881L11.9084 13.5676L7.5 11.25Z"
                  fill="#65718E"/>
        </g>
        <defs>
            <filter id="filter0_i" x="0.367188" y="0" width="14.2658" height="14.5676" filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                               result="hardAlpha"/>
                <feOffset dy="1"/>
                <feGaussianBlur stdDeviation="1"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
            </filter>
        </defs>
    </svg>
};

export default EmptyStar;
