import React from "react";

const Details = ({ person }) => {
  const { name, district, phone, office } = person;
  let firstName;
  let lastName;
  if (name) {
    const firstAndLast = name.split(" ");
    firstName = firstAndLast[0];
    lastName = firstAndLast[1];
  }
  return (
    <div className="container details">
      <h2>Info</h2>
      <div>{firstName ? firstName : "First Name"}</div>
      <div>{lastName ? lastName : "Last Name"}</div>
      <div>{district ? district : "District"}</div>
      <div>{phone ? phone : "Phone"}</div>
      <div>{office ? office : "Office"}</div>
    </div>
  );
};
export default Details;
