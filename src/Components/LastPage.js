import React from 'react';
import LottieAnimationPayment from './LottieAnimationPayment';
import './LastPage.css'; // Import the regular CSS file

function LastPage() {
  return (
    <div>
      <div className="lastpage-content-animation-wrapper">
        <div className="lastpage-animation">
          <LottieAnimationPayment />
        </div>
      </div>
    </div>
  );
}

export default LastPage;
