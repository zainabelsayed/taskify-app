import React from 'react'

export default function DeleteListModal(props) {
    const {id, deleteList, close} = props
    return (
        <div
          className="modal fade"
          id={`list${id}`}
        >
          <div className="modal-dialog modal-dialog-centered" id={id}>
            <div className="modal-content border-rad-1-3rem border-0 p-1">
              <div className="modal-header border-0">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref= {close}
                ></button>
              </div>
              <div className="modal-body border-0">
                <h6>
                Are you sure you want to delete the entire list?
                </h6>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary rounded-pill border-0"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-danger border-0 rounded-pill" onClick={deleteList}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}
