import Navbar from "../navbar/Navbar";

function Learn() {
  return (
    <>
    <div className="bg-purple" style={{padding:"2.3rem"}}>
    <Navbar/>
    </div>
    <div className="container text-center pt-5">
      <h2 className="fs-3rem mb-3 mx-auto">Learn More!</h2>
      <p className="mx-auto text-secondary my-2 fs-5 w-50">
        If you need to learn more about project management techniques, you can
        start by watching the ones below!
      </p>
        <h3 className="my-3">Scrum vs Kanban</h3>
        <iframe
          height="553"
          className="w-75"
          src="https://www.youtube.com/embed/pxxmSLJj8FQ"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <h3 className="my-3">Introduction to Scrum</h3>
        <iframe
          height="553"
          className="w-75"
          src="https://www.youtube.com/embed/9TycLR0TqFA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <h3 className="my-3">What is Kanban?</h3>
        <iframe
          height="553"
          className="w-75 mb-5"
          src="https://www.youtube.com/embed/iVaFVa7HYj4"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
    </div>
    </>
  );
}
export default Learn;
