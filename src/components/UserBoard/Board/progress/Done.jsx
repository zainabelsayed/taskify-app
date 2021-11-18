import React from 'react'
import Cards from "../cards/Cards";
export default function Done() {
    return (
        <div className="col-md-4" id="done">
          <div>
            <h2 className="done-bg py-3 text-center fs-6 fw-bold rounded-5">
              Done
            </h2>
          </div>
          {/* <div>
            <Cards progressColor="progressDone" textColor="text-done" percent={30} />
          </div>
          <div>
            <Cards progressColor="progressDone" textColor="text-done" percent={50} />
          </div> */}
          <div className="bg-white d-flex align-items-center justify-content-center py-4 shadow border-rad-1-3rem">
            <button className="text-decoration-none fw-bold done-plus rounded-circle m-0">
              +
            </button>
          </div>
        </div>
    )
}
