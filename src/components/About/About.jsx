import authorImage from "../../images/author.jpg";
import "./About.css";

function About() {
  return (
    <section className="about">
      <img className="about__image" src={authorImage} alt="Portrait of the author" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          I build small web applications and study software engineering. News Explorer is my
          project for searching recent stories and keeping a personal list of the articles worth
          coming back to.
        </p>
        <p className="about__text">
          I work with HTML, CSS, JavaScript, and React. This section is the biography block from
          the layout: a portrait beside a short introduction.
        </p>
      </div>
    </section>
  );
}

export default About;
