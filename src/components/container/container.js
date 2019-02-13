import React from "react";
import Search from "../search/search";
import classes from "./container.module.css";

const Container = () => {
  return (
    <div className={classes.container}>
      <Search />
    </div>
  );
};

export default Container;
