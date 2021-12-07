import React,{ useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { database } from "../../../../firebase-config";
import { ref, set } from "firebase/database";

export default function AddList(props) {
  const { lists, setLists} = props;
  const [addList, setAddList] = useState(false);
  const listTitle = useRef();
  function writeListsData(title,listId) {
    set(ref(database, "lists/"+(lists.length-1)), {
      title:title,
      listId:listId
    });
  }
  const showInput = () => {
    setAddList(true);
  };
  const cancel = () =>{
    setAddList(false)
  }
  const addListTitle = () => {
    const title = listTitle.current.value;
    const listId = uuidv4()
    setLists([...lists, { title, listId }]);
    writeListsData(title,listId)
    setAddList(false);
    console.log(lists);
  };
  return (
    <div className="col-md-3">
      <div className="bg-white d-flex align-items-center justify-content-center py-2 rounded-5 position-relative">
        {!addList ? (
          <button
            className="text-decoration-none fw-bold add-list rounded-circle m-0"
            onClick={showInput}
          >
            +
          </button>
        ) : (
          <>
          <button className="btn p-0 position-absolute top-0 start-0 mb-5 close-btn" onClick={cancel}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
          <div className="input-group bg-transparent m-2">
            <input
              type="email"
              className="form-control rounded-pill input-head"
              placeholder="List title"
              ref={listTitle}
            />
            <span
              className="input-group-text rounded-pill m-head text-white"
              id="basic-addon2"
              onClick={addListTitle}
            >
              Add List
            </span>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
