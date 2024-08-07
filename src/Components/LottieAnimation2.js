import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../animations/animation2yellow';

const LottieAnimation2 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={500} />
    </div>
  );
};

export default LottieAnimation2;