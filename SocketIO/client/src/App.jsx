import React, { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import Msg from "./components/Msg";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [message, setMessage] = useState("");
  const [msgArray, setMsgArray] = useState("");
    const [check, setCheck] = useState([]);

  const handleClick = (e) => {
    const ID = socket.id;
    e.preventDefault();
    socket.emit("message", { ID, message });
    setMessage("");
      setMsgArray((prevArray) => [...prevArray, message]);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
    socket.on("msg", (m) => {
      console.log(m);
    });
    socket.on("recieve-message", (data) => {
       setMsgArray((p) => [data]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("msg");
      socket.off("recieve-message");
      socket.close();
    };
  }, [socket]);

  return (
    <div>
      <form onSubmit={handleClick}>
        <div>TEXT MESSAGE</div>
        <input
          placeholder="Enter Text"
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        />
        <button type="submit">SEND</button>
      </form>
      <Msg msg={{ msgArray }} />
    </div>
  );
};

export default App;
