import "./Board.css";
import Progress from "./progress/Progress";
function Board(props) {
  const { projectID } = props
  return (
    <>
      <div className="container-fluid">
        <Progress projectID={projectID} />
      </div>
    </>
  );
}
export default Board;
