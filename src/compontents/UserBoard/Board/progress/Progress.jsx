import Todo from "./Todo";
import "./Progress.css";
// import InProgress from "./InProgress";
// import Done from "./Done";
function Progress() {
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
export default Progress;
