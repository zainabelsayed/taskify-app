import mobile from "../../../assets/images/mobile.jpeg";
function Responsive(){
return(
    <section className="py-8rem">
        <div className="container">
          <div className="row align-items-center text-start">
            <div className="col-lg-4 col-md-9">
              <h2 className="fs-1 pb-3">Taskify also works on your tablet and phone!</h2>
              <p className="text-secondary mb-5">
                View tasks updates in real time, monitor key metrics and keep
                everything on track with project dashboards.
              </p>
            </div>
            <div className="col-lg-6 col-md-9 text-center d-flex justify-content-center justify-content-lg-end align-items-center position-relative">
              <figure>
              <img className="shadow-lg border-radius-2rem me-3" src={mobile} alt="mobile view" />
              </figure>
              <div className="trapezoid d-none d-md-block"></div>
            </div>
          </div>
        </div>
      </section>
)
}
export default Responsive;