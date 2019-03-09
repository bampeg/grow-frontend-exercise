import React from "react";

const Details = ({ buildList, listBy }) => {
  return (
    <div className="container">
      <h2>
        List /<span className="title"> {listBy}</span>
      </h2>
      <div className="list-header">
        <p>Name</p>
        <p>Party</p>
      </div>
      {buildList()}
    </div>
  );
};
export default Details;
