import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../progress-bar/Progress-bar";
import "./Cards.css";
import person1 from "../../../../assets/images/person1.jpg";
import person2 from "../../../../assets/images/person2.jpg";
import person3 from "../../../../assets/images/person3.jpg";
import { useRef } from "react/cjs/react.development";
import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  child,
  get,
  update,
  onValue,
} from "firebase/database";
import { useDispatch } from "react-redux";
import { decrementNum } from "../../../redux/CounterRedux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
library.add(faWhatsapp);

function Cards(props) {
  const card = useRef();
  const { textColor, percent, progressColor, item, todo, setTodo } = props;
  const dispatch = useDispatch();
  const userName = sessionStorage.getItem("user");

  var category = useParams().category;
  if (category === undefined) category = "Work";
  const [members, setMembers] = useState([]);

  useEffect(() => {}, [todo]);

  const deleteTodo = (e) => {
    card.current.style.display = "none";
    dispatch(decrementNum(item.data.category));
    const userName = sessionStorage.getItem("user");
    update(ref(getDatabase(), `users/${userName}/projects/${item.name}`), {
      projectID: null,
      projectName: null,
      description: null,
      category: null,
      duration: null,
      whatsapp: null,
      percent: null,
    });

    update(ref(getDatabase(), `project-members/${item.data.projectID}`), {
      email: null,
    });

    get(child(ref(getDatabase()), `users/${userName}/projects/`))
      .then((snapshot) => {
        if (snapshot !== undefined) {
          const arr = [];
          Object.keys(snapshot.val()).forEach((key) =>
            arr.push({
              name: key,
              data: snapshot.val()[key],
            })
          );
          setTodo(arr);
        }
      })
      .catch((error) => {
        setTodo([]);
        console.log(error);
      });
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "users/"))
      .then((snapshot) => {
        const arr = [];
        Object.keys(snapshot.val()).forEach((key) =>
          arr.push({
            name: key,
            data: snapshot.val()[key],
          })
        );
        setMembers(arr);
        //arr[i] da el username
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(members);
  const onWhatsapp = () => {
    if (
      members.filter((elem) => elem.name === userName)[0].data.mobile === ""
    ) {
      let phoneNumber = prompt(
        "Please enter your number to be able to use Whatsapp!"
      );
      while (
        phoneNumber === null ||
        phoneNumber === "" ||
        !phoneNumber.match(/^01[0125][0-9]{8}$/)
      ) {
        alert("Please enter a valid number!");
        phoneNumber = prompt(
          "Please enter your number to be able to use Whatsapp!"
        );
      }
      update(ref(getDatabase(), "users/" + userName), {
        mobile: phoneNumber,
      });
      const updateMobile = [];
      members.forEach((elem) => {
        if (elem.name === userName) elem.data.mobile = phoneNumber;
        updateMobile.push(elem);
      });
      setMembers(updateMobile);
    }
    const database = getDatabase();
    const mobile_number = ref(database, "/project-members/");
    onValue(mobile_number, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      console.log(data[0].mobile_number); //dh rkm el mobile
      window.open(`https://wa.me/2${data[0].mobile_number}`, "_blank");
    });
  };

  return (
    <div
      className="bg-white shadow pt-3 pb-2 px-4 border-rad-1-3rem my-3 text-start"
      ref={card}
    >
      <div className="d-flex justify-content-between align-items-baseline">
        <Link
          to={`/${category}/${item.data.projectID}`}
          className="text-decoration-none text-dark"
          style={{
            fontFamily:
              "-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif",
          }}
        >
          <h6>{item.data.projectName}</h6>
        </Link>
        <button className="btn p-0 close-btn" onClick={deleteTodo}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <Link
        to={`/${category}/${item.data.projectID}`}
        className="text-decoration-none text-dark"
      >
        <div className="row align-items-center justify-content-start">
          <div className="col-8">
            <ProgressBar
              percent={item.data.percent}
              colorClass={progressColor}
            />
          </div>
          <div className="col-3">
            <div className={`text-todo fs-6 fw-bold ${textColor}`}>
              {percent}%
            </div>
          </div>
        </div>
        <div>
          <p className="fs-min">{item.data.description}</p>
        </div>
      </Link>
      <div className="row justify-content-between align-items-baseline">
        <div
          className={`col-3 text-center mx-auto p-2 rounded-pill d-flex align-items-center justify-content-center ${progressColor}`}
        >
          <span className="fw-bold fs-min">{item.data.duration}Days</span>
        </div>
        <div className="col-8">
          <Link
            to={`/${category}/${item.data.projectID}`}
            className="text-decoration-none text-dark"
          >
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
          </Link>
          {item.data.whatsapp ? (
            <Dropdown>
              <Dropdown.Toggle split id="dropdown-basic" variant="success">
                <FontAwesomeIcon icon={["fab", "whatsapp"]} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {members.map((elem) => (
                  <Dropdown.Item onClick={onWhatsapp}>
                    {elem.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <> </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Cards;
