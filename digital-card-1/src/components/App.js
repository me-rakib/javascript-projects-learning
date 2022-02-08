import Picture from "./Picture";
import Title from "./Title";
import "../css/Style.css";
import Button from "./Button";
import About from "./About";
import Interest from "./Interest";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="container">
      <Picture />
      <Title />
      <div className="home-text">
        <Button />
        <About />
        <Interest />
      </div>
      <Footer />
    </div>
  );
}
