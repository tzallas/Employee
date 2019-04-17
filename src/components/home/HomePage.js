import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1>INDEAVOR</h1>
    <a href="https://www.indeavor.com/">
      Indeavor - Unlock Workforce Efficiency
    </a>
    <hr />
    <Link to="about" className="btn btn-primary btn-lg">
      About
    </Link>
  </div>
);

export default HomePage;
