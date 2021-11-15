import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import "./TaskifyNumbers.css";
import dashboardImg from "../../../assets/images/Taskify dashboard.png";
import dashboardImgPart1 from "../../../assets/images/Taskify dashboard-1.png";
export default function TaskifyNumbers() {
  return (
    <section className="mt-0 pt-0 my-md-5 py-md-5">
      <div className="container py-5">
        <div className="row pt-5">
          <div className="col-md-6">
            <h2 className="fs-1 text-start fw-bolder pb-5 head-hight">
              Let's see Taskify <pre></pre> in numbers
            </h2>
            <p className="text-secondary text-start">
              View task updates in real time, monitor key metrics and keep
              everthing on track. Our dashboards automatically detects project
              data in easy to read simple view, and a user friendly user
              interface with no hassle.
            </p>
            <div className="row pt-5">
              <div className="col-7 col-md-4 mx-auto">
                <div className="counter-item">
                  <h2 className="fs-1">
                  <CountUp start={0} end={13} duration="1.5">
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>M
                  </h2>
                </div>
                <p className="fw-bold pt-2">Active users</p>
              </div>
              <div className="col-7 col-md-4 mx-auto">
                <div className="counter-item">
                  <h2 className="fs-1">
                  <CountUp start={0} end={20} duration="1.5">
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>M
                  </h2>
                </div>
                <p className="fw-bold pt-2">Projects</p>
              </div>
              <div className="col-7 col-md-4 mx-auto">
                <div className="counter-item">
                  <h2 className="fs-1">
                    <CountUp start={0} end={24} duration="1.5">
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                    /<CountUp start={0} end={7} duration="1.5">
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                  </h2>
                </div>
                <p className="fw-bold pt-2">Support</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 pt-5">
            <figure className="d-flex justify-content-center justify-content-lg-end">
              <img className="image-border shadow" src={dashboardImg} alt="" />
            </figure>
            <figure className="d-flex justify-content-center justify-content-lg-end">
              <img
                className="image-border shadow"
                src={dashboardImgPart1}
                alt=""
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
