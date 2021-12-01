import React from 'react'
import Cards from "../cards/Cards";
export default function InProgress() {
    return (
        <div className="col-md-4" id="in-progress">
          <div>
            <h2 className="in-prog-bg py-3 text-center fs-6 fw-bold rounded-5">
              In progress
            </h2>
          </div>
          {/* <div>
            <Cards
              progressColor="progress-inprogress"
              textColor="text-inprogress"
              percent={20}
            />
          </div> */}
          <div className="bg-white d-flex align-items-center justify-content-center py-4 shadow border-rad-1-3rem">
            <button className="fw-bold in-prog-plus rounded-circle m-0">
              +
            </button>
          </div>
        </div>
    )
}
