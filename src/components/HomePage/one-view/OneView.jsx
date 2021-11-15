import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
function OneView() {
  return (
    <section className="one-view bg-white mx-auto w-75 border-radius-2rem p-1 pb-3 p-lg-5 p-md-3 shadow-lg text-center">
      <h2 className="fs-1 pt-3">All Your Tasks in One View</h2>
      <p className="mx-auto text-secondary my-4">
        View tasks updates in real time, monitor key metrics and keep everything
        on track with project dashboards
      </p>
      <button className="btn rounded-pill bg-pink text-white border-0 mt-4 py-3 px-4 shadow fs-6 mb-4">
        Start now for FREE!
      </button>
      <div className="row pt-5">
        <div className="col-md-6 col-lg-4 col-12 text-white mt-3">
          <div className="border-radius-2rem mx-auto bg-pink p-4">
            <div className="mb-5">
              <p className="rounded-circle bg-white d-flex align-items-center white-border-2rem mx-auto">
                <FontAwesomeIcon
                  icon={faChartPie}
                  className="mx-auto text-pink text-center"
                />
              </p>
            </div>
            <h2 className="fs-5">Structured reports</h2>
            <p className="fs-6">
              You can see which tasks are started or completed
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-12 text-white mt-3">
          <div className="border-radius-2rem mx-auto bg-pink p-4">
            <div className="mb-5">
              <p className="rounded-circle bg-white d-flex align-items-center white-border-2rem mx-auto">
                <FontAwesomeIcon
                  icon={faCloud}
                  className="mx-auto text-pink text-center"
                />
              </p>
            </div>
            <h2 className="fs-5">Cloud system</h2>
            <p className="fs-6">
              Your tasks and your progress are saved on the cloud
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-12 text-white mt-3">
          <div className="border-radius-2rem mx-auto bg-pink p-4">
            <div className="mb-5">
              <p className="rounded-circle bg-white d-flex align-items-center white-border-2rem mx-auto">
                <FontAwesomeIcon
                  icon={faLink}
                  className="mx-auto text-pink text-center"
                />
              </p>
            </div>
            <h2 className="fs-5">Stay connected</h2>
            <p className="fs-6">
              You can connect to 3rd parties apps through taskify.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default OneView;
