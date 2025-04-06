import React, { useState, useEffect } from "react";

const PublicHomepage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#2D2D2D",
  };

  const titleContainerStyle = {
    display: "flex",
    backgroundColor: "#2D2D2D",
    padding: "20px",
    margin: "100px",
    marginTop: "300px",
    justifyContent: "center",
    alignItems: "center",
    border: "20px solid #EDE8D0",
  };

  const titleStyle = {
    fontFamily: "Josefin Sans, sans-serif",
    color: "#EDE8D0",
    fontWeight: 700,
    fontSize: "5.5rem",
    textAlign: "center",
  };

  const contentTitleStyle = {
    textAlign: "center",
    color: "#2d2d2d",
    fontFamily: "Oswald",
    backgroundColor: "#F08080",
    width: "100%",
    fontSize: "4rem",
    fontWeight: 700,
    marginTop: "300px",
  };

  const descriptionStyle = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1.2rem",
    textAlign: "center",
    color: "white",
    maxWidth: "1000px",
    margin: "60px",
  };

  // const buttonStyle = {
  //   backgroundColor: "#3BB4A1",
  //   color: "white",
  //   border: "none",
  //   padding: "12px 24px",
  //   fontSize: "1rem",
  //   cursor: "pointer",
  //   transition: "background-color 0.3s ease",
  // };

  const imageStyle = {
    position: "absolute",
    left: `${scrollPosition}px`,
    width: "400px",
    justifyContent: "center",
  };

  const imageBelowStyle = {
    position: "absolute",
    right: `${scrollPosition}px`,
    width: "400px",
    justifyContent: "center",
  };

  const textContainer = {
    textAlign: "center",
    alignItems: "center",
    marginBottom: "40px",
  };

  // const handleButtonClick = () => {
  //   // Handle button click event
  //   console.log("Button clicked!");
  // };

  return (
    <div style={containerStyle}>
      <div style={containerStyle}>
        <div>
          <img src={"/1.png"} alt="" style={imageStyle} />
          <div style={titleContainerStyle}>
            <h1 style={titleStyle}>CollabNest</h1>
          </div>
          <img src={"/2.png"} alt="" style={imageBelowStyle} />
        </div>
      </div>
      <h2 style={contentTitleStyle}>Why to use CollabNest?</h2>
      <div id="why-skill-swap" style={textContainer}>
        <div style={descriptionStyle}>
        At CollabNest, we bridge the gap between learning and real-world experience by connecting students with project sponsors, innovators, and peers for hands-on collaboration and continuous skill development.
          <br />
          <br />
          <br />
          <h4 style={{ color: "#F08080" }}>➊Real-World Projects, Real Impact </h4>
          CollabNest empowers students to apply their knowledge by working on real-world projects posted by businesses, startups, and innovators. 
          It’s more than just learning—it's about solving real challenges and building a portfolio that matters.
          <br />
          <br />
          <h4 style={{ color: "#F08080" }}>➋ Skill Exchange Community</h4> Students can share their learning paths, 
          including the tools and resources they used to gain skills. By connecting with peers, they can explore diverse approaches
           and learn from each other’s experiences.
          <br />
          <br />
          <h4 style={{ color: "#F08080" }}>➌  Build, Lead, Innovate</h4> Students don’t just participate—they lead. 
          CollabNest enables students to act as project sponsors too, pitching their own ideas, forming teams, and managing projects.
           It’s a place to innovate, lead, and grow.
          <br />
          <br />
          <h4 style={{ color: "#F08080" }}>➍A Thriving Collaborative Ecosystem</h4> CollabNest is designed for mutual growth. 
          Project sponsors get skilled contributors; students gain practical experience.
           Together, they form a vibrant ecosystem where collaboration, creativity, and continuous improvement thrive.
          <br />
          <br />
    
        </div>
      </div>
    </div>
  );
};

export default PublicHomepage;