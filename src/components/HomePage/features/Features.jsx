import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import tablet from "../../../assets/images/tablet.jpeg";

function Features(){
    return(
 <section className="bg-purple-grad text-white pt-8rem pb-12rem">
        <div className="container">
          <div className="row row-cols-lg-2 row-cols-1 justify-content-between align-items-center">
            <div className="col col-lg-6 pe-4">
              <img src={tablet} alt="tablet view" className="w-100 border-radius-2rem mb-4"/>
            </div>
            <div className="col col-lg-6">
              <h2 className="fs-3rem mb-5 text-start">Features that help your business</h2>
              <div className="row row-cols-lg-2 row-cols-md-1 justify-content-between text-start">
                <div className="col-md-6 col-10">
                  <div className="row">
                    <div className="col-1">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className="col-10">
                      <h5 className="fs-5">Choose a view</h5>
                      <p>See your schedule moving forward.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-10">
                  <div className="row">
                    <div className="col-1">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className="col-10">
                      <h5 className="fs-5">Meet your new butler</h5>
                      <p>Assigned tasks are shown as to-do, doing ,and done.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-10">
                  <div className="row">
                    <div className="col-1">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className="col-10">
                      <h5 className="fs-5">Track projects Tasks</h5>
                      <p>You can see which tasks are started or completed.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-10">
                  <div className="row">
                    <div className="col-1">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className="col-10">
                      <h5 className="fs-5">Power Up</h5>
                      <p>Know how much you've finished of your tasks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )
}
export default Features;