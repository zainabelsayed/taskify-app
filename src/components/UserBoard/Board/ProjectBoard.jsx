import "./Board.css";
import ProjectProgress from "./progress/ProjectProgress";
// import Calendar from "./calendar/Calendar";
function ProjectBoard() {
  return (
    <>
      <div
        className="w-100 bg-grey py-2 px-4 border-rad-1-3rem"
        style={{ marginTop: "5em" }}
      >
        {/* <Calendar /> */}
        <ProjectProgress />
      </div>
    </>
  );
}
export default ProjectBoard;
