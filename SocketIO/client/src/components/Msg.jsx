import React from "react";

const Msg = ({ msg }) => {
  const { msgArray } = msg;
  return (
    <div style={{ textAlign: "center" }}>
      {msgArray.map((msg1, index) => (
        <div key={index}>{msg1}</div>
      ))}
    </div>
  );
};

export default Msg;
