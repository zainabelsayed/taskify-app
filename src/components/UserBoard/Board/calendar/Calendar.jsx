import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Calendar.css";
function Calendar() {
  var date = new Date();
  setInterval(() => {
    date = new Date();
  }, 60000);
  return (
    <div className="w-100 mb-3">
      <div className="row align-items-center justify-content-between">
        <div className="col-1">
          <span className=" p-2 bg-dark-grey d-flex align-items-center rounded-3 justify-content-center">
            <FontAwesomeIcon icon={faChevronLeft} className="fs-6" />
          </span>
        </div>
        <div className="col-8 text-center">
          <p className="mb-0 fs-5 fw-bold">
            {date.toLocaleString("default", { month: "long" })},{" "}
            {date.getDate()}
          </p>
          <p className="m-0 fs-6">
            {date.toLocaleString("en-us", { weekday: "long" })}
          </p>
        </div>
        <div className="col-1">
          <span className="p-2 bg-dark-grey d-flex align-items-center rounded-3 justify-content-center">
            <FontAwesomeIcon icon={faChevronRight} className="fs-6" />
          </span>
        </div>
      </div>
    </div>
  );
}
export default Calendar;
