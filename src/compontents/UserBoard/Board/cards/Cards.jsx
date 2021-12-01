import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../progress-bar/Progress-bar";
import "./Cards.css";
import person1 from "../../../../assets/images/person1.jpg";
import person2 from "../../../../assets/images/person2.jpg";
import person3 from "../../../../assets/images/person3.jpg";
import { useRef } from "react/cjs/react.development";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { decrementNum } from "../../../redux/CounterRedux";

function Cards(props) {
  const card = useRef();
  const { textColor, percent, progressColor, item, todo, setTodo } = props;
  const dispatch = useDispatch();

  useEffect(() => {}, [todo]);
  const deleteTodo = () => {
    card.current.style.display = "none";
    const newTodos = todo.filter((elem) => elem.id !== item.id);
    setTodo(newTodos);
    dispatch(decrementNum(item.category));
  };
  return (
    <>
      <div
        className="bg-white shadow pt-3 pb-2 px-4 border-rad-1-3rem my-3 text-start"
        ref={card}
      >
        <div className="d-flex justify-content-between align-items-baseline">
          <h6>{item.projectName}</h6>
          <button className="btn p-0 close-btn" onClick={deleteTodo}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="row align-items-center justify-content-start">
          <div className="col-8">
            <ProgressBar percent={item.percent} colorClass={progressColor} />
          </div>
          <div className="col-3">
            <div className={`text-todo fs-6 fw-bold ${textColor}`}>
              {percent}%
            </div>
          </div>
        </div>
        <div>
          <p className="fs-min">{item.description}</p>
        </div>
        <div className="row justify-content-between align-items-baseline">
          <div
            className={`col-3 text-center mx-auto p-2 rounded-pill d-flex align-items-center justify-content-center ${progressColor}`}
          >
            <span className="fw-bold fs-min">{item.duration}Days</span>
          </div>
          <div className="col-8">
            <div className="row g-0 justify-content-between align-items-baseline">
              <figure className="col-3">
                <img
                  src={person1}
                  alt="person1"
                  className="rounded-circle w-100"
                />
              </figure>
              <figure className="col-3">
                <img
                  src={person2}
                  alt="person2"
                  className="rounded-circle w-100"
                />
              </figure>
              <figure className="col-3">
                <img
                  src={person3}
                  alt="person3"
                  className="rounded-circle w-100"
                />
              </figure>
              <div className="col-3">
                <span className="fs-min fw-bold">+3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cards;
