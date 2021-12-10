import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import logo from "../../../assets/images/logo.png";
import './Footer.css'
export default function Footer() {
  return (
    <footer>
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-4">
            <Link className="d-flex align-items-center text-white text-decoration-none pb-4" to="/">
              <img className="pe-2" src={logo} alt="" />
              <h1 className="d-inline-block logo-font">TASKIFY</h1>
            </Link>
            <div className="d-flex pb-5 mb-5">
            <div className="bg-white rounded-circle me-4 bg-brand d-flex align-items-center justify-content-center">
            <FontAwesomeIcon className="brand"  icon={faFacebookF} />
            </div>
            <div className="bg-white rounded-circle me-4 bg-brand d-flex align-items-center justify-content-center">
            <FontAwesomeIcon className="brand"  icon={faInstagram} />
            </div>
            <div className="bg-white rounded-circle bg-brand d-flex align-items-center justify-content-center">
            <FontAwesomeIcon className="brand"  icon={faTwitter} />
            </div>
            </div>
            <div className="pb-3">
            <Link className="btn rounded-pill bg-pink text-white text-decoration-none" to="/learn-more">Learn More</Link>
            </div>
            <p className="text-light text-start">©2021 All rights reserved</p>
          </div>
          <div className="col-md-4 text-start p-0 pe-md-5">
              <h5 className="text-white">Contact us</h5>
              <div className="input-group mb-3 mt-5 bg-transparent pb-5 w-100 w-md-75">
                  <input
                    type="email"
                    className="form-control rounded-pill p-input border-white border text-white"
                    placeholder="Your email"
                  />
                  <span
                    className="input-group-text rounded-pill m-in text-white"
                    id="basic-addon2"
                  >
                    Subscribe
                  </span>
                </div>
          </div>
          <div className="col-md-4 text-start p-0 ps-md-5">
              <h5 className="text-white">Start tracking your projects</h5>
              <div className="input-group mb-3 mt-5 bg-transparent pb-5">
                  <input
                    type="email"
                    className="form-control rounded-pill p-input border-white border text-white"
                    placeholder="Your email"
                  />
                  <span
                    className="input-group-text rounded-pill m-in text-white"
                    id="basic-addon2"
                  >
                    Try for free
                  </span>
                </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
