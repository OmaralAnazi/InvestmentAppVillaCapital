import heroImg from "/hero-img.jpg";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const navToExplore = () => {
    navigate("/explore");
  };

  return (
    <div className="container my-5">
      <section className="row align-items-center my-5">
        <div className="col-lg-6 d-flex flex-column gap-3">
          <h1 style={{ fontSize: "3.5rem" }}>
            The fast & visual way to be a{" "}
            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "#007bff",
              }}
            >
              real estate pro!
            </span>
          </h1>
          <p className="lead">
            Welcome to VillaCapital, the foremost destination for discerning investors looking to diversify their portfolio with prime
            investment and real estate funds in Saudi Arabia.
          </p>
          <button onClick={navToExplore} className="btn btn-primary mt-auto align-self-start">
            Start Exploring Now!
          </button>
        </div>
        <div className="col-lg-6 order-lg-2 order-first">
          <div className="row">
            <div className="col-12 mb-2">
              <img src={heroImg} alt="Hero" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
