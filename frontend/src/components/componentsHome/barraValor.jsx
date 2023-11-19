import React, { useState } from 'react';

const ProgressBarWithSlider = () => {
  const [progress, setProgress] = useState(0);

  const handleSliderChange = (event) => {
    setProgress(event.target.value);
  };

  const min = 0;
  const max = 30000;

  return (
    <div className="text-center mt-4 ">
        <h1 className='mr-[3%]'>Limite de gastos</h1>
      <div className="relative">
        <input
          type="range"
          id="progressSlider"
          value={progress}
          onChange={handleSliderChange}
          min={min}
          max={max}
          className="w-full  p-1"
        />
        <div className="flex justify-between">
          <span>{min}</span>
          <span>{progress}</span>
          <span>{max}</span>
        </div>
      </div>
      <br />
    </div>
  );
};

export default ProgressBarWithSlider;