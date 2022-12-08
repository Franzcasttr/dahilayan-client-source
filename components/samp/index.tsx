import React from 'react';

const Sampy = () => {
  var cw = window.rating1.clientWidth; // save original 100% pixel width

  function rating(stars) {
    window.rating1.style.width = Math.round(cw * (stars / 5)) + 'px';
  }

  rating(4.3);

  return (
    <div>
      Enter a star rating 0-5:{' '}
      <input onKeyUp='rating(this.value)' value='4.3' />
      <div id='rating1' className='rating'></div>
    </div>
  );
};

export default Sampy;
