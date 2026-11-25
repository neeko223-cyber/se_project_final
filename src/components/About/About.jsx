import authorImage from "../../images/author.jpg";
import "./About.css";
import nickPhoto from "../../images/Nick.jpg";

function About() {
  return (
    <section className="about">
      <img className="about__image" src={nickPhoto} alt="Portrait of the author" />
      <div className="about__content">
        <h2 className="about__title">About Me</h2>
        <p className="about__text">
          My name is Nicholas Lawrence. I Currently work as a Pump Mechanic, but I am looking to transition into a career in Software Engineering. I have a passion for technology and enjoy learning new skills. I am currently enrolled in a Software Engineering course to enhance my knowledge and skills in this field.
        </p>
        <p className="about__text">
          I work with HTML, CSS, JavaScript, and React. I learned alot over the course of the program. I learned alittle about myself and project management and executing time management skills as well.
        </p>
      </div>
    </section>
  );
}

export default About;
