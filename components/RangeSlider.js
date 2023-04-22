import { setMinPrice, setMaxPrice } from "@/slices/filterSlice";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const RangeSlider = ({ step, priceCap }) => {
  const progressRef = useRef(null);
  const dispatch = useDispatch();

  // redux state

  const min = useSelector((state) => state.filter.minPrice);
  const max = useSelector((state) => state.filter.maxPrice);

  // local variables
  var minVal = 0;
  var maxVal = 20000;


  // local functions
  const handleMin = (e) => {
    if (max - min >= priceCap && max <= maxVal) {
      if (parseInt(e.target.value) > parseInt(max)) {
      } else {
        dispatch(setMinPrice(parseInt(e.target.value)));
      }
    } else {
      if (parseInt(e.target.value) < min) {
        dispatch(setMinPrice(parseInt(e.target.value)));
      }
    }
  };

  const handleMax = (e) => {
    if (max - min >= priceCap && max <= maxVal) {
      if (parseInt(e.target.value) < parseInt(min)) {
      } else {
        dispatch(setMaxPrice(parseInt(e.target.value)));
      }
    } else {
      if (parseInt(e.target.value) > max) {
        dispatch(setMaxPrice(parseInt(e.target.value)));
      }
    }
  };

  // REACT STUFF

  useEffect(() => {
    progressRef.current.style.left = (min / maxVal) * step + "%";
    progressRef.current.style.right = step - (max / maxVal) * step + "%";
  }, [min, max, maxVal, step]);

  return (
    <div>
      {/* price input */}
      <div className="price-input mt-2 flex justify-between items-center space-x-4 w-[inherit]">
        <input
          type="number"
          value={min}
          onChange={(e) => {
            dispatch(setMinPrice(e.target.value));
          }}
          className="outline-none bg-gray-100 py-3 px-3 rounded-lg w-1/2"
          placeholder="From"
        />
        <input
          type="number"
          value={max}
          onChange={(e) => {
            dispatch(setMaxPrice(e.target.value));
          }}
          className="outline-none bg-gray-100 py-3 px-3 rounded-lg w-1/2"
          placeholder="To"
        />
      </div>

      {/* slider */}
      <div className="mb-4">
        <div className="slider relative h-1 rounded-md bg-gray-300 mt-6">
          <div
            className="progress absolute h-1 bg-blue-300 rounded"
            ref={progressRef}
          ></div>
        </div>

        <div className="range-input relative">
          <input
            type="range"
            value={min}
            onChange={handleMin}
            min={minVal}
            step={step}
            max={maxVal}
            className="range-min absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />
          <input
            type="range"
            onChange={handleMax}
            value={max}
            min={minVal}
            step={step}
            max={maxVal}
            className="range-max absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
