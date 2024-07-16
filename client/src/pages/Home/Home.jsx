import React from "react";

import TEST_ID from "./Home.testid";

const style = {
  background: "lightblue",
}
const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <h1 style={style}>This is the homepage</h1>
      <p>Good luck with the project!</p>
    </div>
  );
};

export default Home;
