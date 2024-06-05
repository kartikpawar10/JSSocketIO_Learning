import React from "react";

const Msg = ({ msg }) => {
  const { msgArray } = msg;
  return (
    <div style={{ textAlign: "center" }}>
      {msgArray.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
};

export default Msg;
