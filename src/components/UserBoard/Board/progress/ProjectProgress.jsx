import Todo from "./Todo";
import "./ProjectProgress.css";
// import InProgress from "./InProgress";
// import Done from "./Done";
function ProjectProgress() {
  return (
    <>
      <div className="row">
        <Todo />
        {/* <InProgress/> */}
        {/* <Done/> */}
      </div>
    </>
  );
}
export default ProjectProgress;
