import linkedin from "../img/linkedin.png"
import mail from "../img/mail.png"
export default function Button() {
  return (
    <div className="btn-container">
      <div className="btn btn-1">
        <img src={mail} alt="linkedin"></img>
        <p>Email</p>
      </div>
      <div className="btn btn-2">
      <img src={linkedin} alt="linkedin"></img>
        <p>Linkedin</p>
      </div>
    </div>
  );
}
