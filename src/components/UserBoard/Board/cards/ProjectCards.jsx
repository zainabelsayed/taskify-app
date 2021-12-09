import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../progress-bar/Progress-bar";
import "./ProjectCards.css";
import person1 from "../../../../assets/images/person1.jpg";
import person2 from "../../../../assets/images/person2.jpg";
import person3 from "../../../../assets/images/person3.jpg";
import { useRef } from "react/cjs/react.development";
import { useEffect, useState } from "react";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { useDispatch } from "react-redux";
import { decrementNum } from "../../../redux/CounterRedux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
library.add(faWhatsapp);

function ProjectCards(props) {
  const projectCard = useRef();
  const { textColor, percent, progressColor, item, todo, setTodo } = props;
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);

  var category = useParams().category;
  if (category === undefined) category = "Work";

  const deleteTodo = () => {
    projectCard.current.style.display = "none";
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
    }).then(() => {
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
    });

    get(child(ref(getDatabase()), `project-members/`))
      .then((snapshot) => {
        if (snapshot !== undefined) {
          snapshot.val().forEach((invitedProject, index) => {
            if (invitedProject.projectID === item.data.projectID) {
              //hnaaaaaaaaaaaaaaaaaa
              update(ref(getDatabase(), `project-members/${index}`), {
                email: null,
                projectID: null,
              });
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const userName = sessionStorage.getItem("user");
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
        const newArr = [];
        arr.forEach((elem) => {
          if (elem.data.projects !== undefined) {
            elem.data.projects.forEach((project) => {
              if (project.projectID === item.data.projectID) {
                if (elem.name !== userName)
                  newArr.push({ name: elem.name, mobile: elem.data.mobile });
              }
            });
          }
        });
        setMembers(newArr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [todo, item]);

  const onWhatsapp = (e) => {
    const userName = sessionStorage.getItem("user");
    if (members.filter((elem) => elem.name === userName)[0].mobile === "") {
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
        if (elem.name === userName) elem.mobile = phoneNumber;
        updateMobile.push(elem);
      });
      setMembers(updateMobile);
    }
    members.forEach((elem) => {
      if (elem.name === e.target.firstChild.data) {
        if (elem.mobile === "")
          alert(elem.name + "'s mobile number isn't available!");
        else window.open(`https://wa.me/2${elem.mobile}`, "_blank");
      }
    });
  };

  return (
    <div
      className="bg-white shadow pt-3 pb-2 px-4 border-rad-1-3rem my-3 text-start"
      ref={projectCard}
    >
      <div className="d-flex justify-content-between align-items-baseline">
        <Link
          to={`/${category}/${item.data.projectID}/tasks`}
          className="text-decoration-none text-dark"
          style={{
            fontFamily:
              "-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif",
          }}
        >
          <h6 className="pb-4">{item.data.projectName}</h6>
        </Link>
        {item.data.whatsapp ? (
          <Dropdown>
            <Dropdown.Toggle split id="dropdown-basic" variant="success">
              <FontAwesomeIcon icon={["fab", "whatsapp"]} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {members.length > 0 ? (
                members.map((elem) => (
                  <Dropdown.Item onClick={onWhatsapp} key={elem.name}>
                    {elem.name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item className="pe-none">
                  No members are available
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <> </>
        )}
        <button className="btn p-0 close-btn" onClick={deleteTodo}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <Link
        to={`/${category}/${item.data.projectID}/tasks`}
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
        <div className="row justify-content-between align-items-baseline">
          <div
            className={`col-3 text-center mx-auto p-2 rounded-pill d-flex align-items-center justify-content-center ${progressColor}`}
          >
            <span className="fw-bold fs-min">{item.data.duration}Days</span>
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
      </Link>
    </div>
  );
}
export default ProjectCards;
