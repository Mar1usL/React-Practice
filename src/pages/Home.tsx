import React from "react";

import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Home = () => {

  useDocumentTitle("Home");

  return <div>Home</div>;
};

export default Home;
