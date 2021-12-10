import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../progress-bar/Progress-bar";
import "./ProjectCards.css";
import { useEffect, useState, useRef } from "react";
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
  const { textColor, progressColor, item, todo, setTodo } = props;
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
            Object.values(elem.data.projects).forEach((project) => {
              if (project.projectID === item.data.projectID)
                newArr.push({
                  name: elem.name,
                  mobile: elem.data.mobile,
                  email: elem.data.email,
                });
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
      className="bg-white shadow pt-3 pb-2 px-4 border-rad-1-3rem my-3 text-start projectCard"
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
              {members.length > 1 ? (
                members.map(
                  (elem) =>
                    elem.name !== sessionStorage.getItem("user") && (
                      <Dropdown.Item onClick={onWhatsapp} key={elem.name}>
                        {elem.name}
                      </Dropdown.Item>
                    )
                )
              ) : (
                <Dropdown.Item onClick={onWhatsapp} className="pe-none">
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
              {item.data.percent}%
            </div>
          </div>
        </div>
        <div>
          <p className="fs-min">{item.data.description}</p>
        </div>
        <div className="row justify-content-between align-items-baseline">
          <div
            className={`col-3 text-center p-2 rounded-pill d-flex w-auto align-items-center justify-content-center ${progressColor}`}
          >
            <span className="fw-bold fs-min">{item.data.duration}Months</span>
          </div>
          <div className="col-7">
            <div className="row g-0 align-items-baseline">
              <div className="d-flex justify-content-end">
                {members.map((elem) => (
                  <button
                    type="button"
                    className="border-0 mem-icon fw-bold fs-min shadow-sm"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-tip
                    data-for={elem.email}
                  >
                    {elem.email.charAt(0)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default ProjectCards;