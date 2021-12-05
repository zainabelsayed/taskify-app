import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
export default function CounterItem(props) {
  const { start, end, itemName } = props;
  return (
    <div className="col-7 col-md-4 mx-auto">
      <div className="counter-item">
        <h2 className="fs-1">
          <CountUp start={start} end={end} duration="1.5">
            {({ countUpRef, start }) => (
              <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} />
              </VisibilitySensor>
            )}
          </CountUp>
        </h2>
      </div>
      <p className="fw-bold pt-2">{itemName}</p>
    </div>
  );
}
