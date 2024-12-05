import React from "react";
import { Link, NavLink } from "react-router-dom";
import Header from "./Header";
import Banner from "./Banner";
import WhatWeDo from "./WhatWeDo";
import Work from "./Work";
import Values from "./Values";

const Homepage = () => {
  return (
    <>
      <Header />
      <Banner />
      <WhatWeDo />
      <Work />
      <Values />
    </>
  );
};

export default Homepage;
