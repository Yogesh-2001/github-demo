import React from "react";
import { useSelector } from "react-redux";
const HomePage = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div>hello world</div>
      <h1>welcome {user.displayName}</h1>
    </>
  );
};

export default HomePage;
