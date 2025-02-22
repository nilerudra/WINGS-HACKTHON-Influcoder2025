import "./LandingPage.css";
import heroImg from "./hero-img.png";
import videoIcon from "./video-camera.png";
import pencil from "./pencil.png";
import chatIcon from "./chat.png";
import resourceIcon from "./file-sharing.png";
import aboutImg from "./about-img.jpg";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <header className="header">
        <h1>Learning Pod</h1>
        <nav>
          <button
            className="signup-button"
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h2>Collaborate & Learn with Peers</h2>
          <p>
            Join public or private study groups, chat, video call, and share
            resources seamlessly.
          </p>
          <button className="get-started" onClick={() => navigate("/sign-up")}>
            Get Started
          </button>
        </div>
        <img
          src={heroImg}
          alt="Collaborative Learning"
          className="hero-image"
        />
      </section>

      <section className="features">
        <h3>Key Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <img src={videoIcon} alt="Video Calls" />
            <h4>Video Calls</h4>
            <p>Host study sessions with live video.</p>
          </div>
          <div className="feature-card">
            <img src={chatIcon} alt="Live Chat" />
            <h4>Live Chat</h4>
            <p>Discuss topics in real-time.</p>
          </div>
          <div className="feature-card">
            <img src={resourceIcon} alt="Resource Sharing" />
            <h4>Resource Sharing</h4>
            <p>Organize and share notes easily.</p>
          </div>
          <div className="feature-card">
            <img src={pencil} alt="Whiteboard" />
            <h4>Whiteboard</h4>
            <p>Visualize and brainstorm together.</p>
          </div>
        </div>
      </section>
      <section className="about-section" data-aos="fade-up">
        <div className="about-container">
          <div className="about-text">
            <h3>
              About <span>Learning Pod</span>
            </h3>
            <p>
              Learning Pod is an interactive and collaborative platform designed
              for students and professionals to enhance their learning
              experience. Our platform provides **real-time chat, video calls,
              whiteboards, resource sharing, and organized study groups** to
              make studying more effective and engaging.
            </p>
            <p>
              Whether you're preparing for exams, working on group projects, or
              just exploring new topics, Learning Pod makes collaboration
              seamless and fun!
            </p>
          </div>
          <div className="about-image">
            <img src={aboutImg} alt="About Learning Pod" />
          </div>
        </div>
      </section>

      <footer className="footer" data-aos="fade-up">
        <div className="footer-container">
          <div className="footer-logo">
            <h2>Learning Pod</h2>
            <p>Collaborate, Learn, and Grow Together</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Learning Pod. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
