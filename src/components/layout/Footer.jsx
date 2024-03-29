import twitterIcon from "/twitter-icon.png";
import linkedInIcon from "/linkedin-icon.png";

function Footer() {
  const iconStyle = { maxWidth: "20px", opacity: 0.75 };
  return (
    <footer className="bg-dark text-white text-center p-3">
      <div className="d-flex justify-content-center gap-2 mb-2">
        <a href="https://twitter.com/Villacapital1" target="_blank" rel="noopener noreferrer">
          <img src={twitterIcon} alt="Twitter icon" className="img-fluid" style={iconStyle} />
        </a>
        <a href="https://sa.linkedin.com/company/villacapitalsa" target="_blank" rel="noopener noreferrer">
          <img src={linkedInIcon} alt="LinkedIn icon" className="img-fluid" style={iconStyle} />
        </a>
      </div>
      <div>© 2024 VillaCapital. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
