import React from "react";
const Member = ({ mem }) => {
  console.log(mem);
  return (
    <div style={{ textAlign: "center" }}>
      <div>total Member : {mem.length}</div>
      <ul type="none">
        {mem.map((m, index) => (
          <li key={index}>{`${index + 1} : ${m}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Member;
