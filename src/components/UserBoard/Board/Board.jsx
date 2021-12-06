import "./Board.css";
import Progress from "./progress/Progress";
// import Calendar from "./calendar/Calendar";
function Board() {
  return (
    <>
      <div
        className="w-100 bg-grey py-2 px-4 border-rad-1-3rem"
        style={{ marginTop: "5em" }}
      >
        {/* <Calendar /> */}
        <Progress />
      </div>
    </>
  );
}
export default Board;