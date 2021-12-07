import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

export default function Checklists(props) {
    const {item,index,list,statusFlag,setStatusFlag,tasks,setTasks} = props
    return (
        <div
                className="collapse mb-1"
                id={`collapse${item.id}`}
                key={index}
              >
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faCheckDouble} />
                  <p className="pb-1 m-0 fs-min ps-2">{list.title}</p>
                </div>
                {list.items
                  ? list.items.map((checklistItem, indx) => (
                      <div className="form-check fs-min m-0" key={indx}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          defaultChecked={checklistItem.status}
                          onChange={(e) => {
                            if (e.target.checked) {
                              checklistItem.status = true;
                            } else {
                              checklistItem.status = false;
                            }
                            statusFlag
                              ? setStatusFlag(false)
                              : setStatusFlag(true);
                            const newTasks = tasks;
                            setTasks([...newTasks]);
                          }}
                        />
                        <label
                          className={
                            checklistItem.status
                              ? `form-check-label fs-min text-decoration-line-through`
                              : `fs-min form-check-label`
                          }
                          htmlFor="flexCheckDefault"
                        >
                          {checklistItem.item}
                        </label>
                      </div>
                    ))
                  : null}
              </div>
    )
}
