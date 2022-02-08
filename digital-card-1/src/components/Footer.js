import Twitter from "../img/Twitter.png";
import Facebook from "../img/Facebook.png";
import Instagram from "../img/Instagram.png";
import GitHub from "../img/GitHub.png";

export default function Footer() {
  return (
    <div className="footer">
      <img src={Twitter} alt="Twitter"></img>
      <img src={Facebook} alt="Facebook"></img>
      <img src={Instagram} alt="Instagram"></img>
      <img src={GitHub} alt="GitHub"></img>
    </div>
  );
}
