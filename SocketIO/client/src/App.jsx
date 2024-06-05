import React, { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import Msg from "./components/Msg";
import Member from "./components/Member";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [message, setMessage] = useState("");
  const [msgArray, setMsgArray] = useState(["|| You All Can Chat Here ||"]);
  const [member, setMember] = useState([]);
  const [socketID, setSocketId] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    socket.emit("message", { socketID, message });
    setMessage("");
    setSocketId("");
    setMsgArray((prevArray) => [...prevArray, message]);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
    socket.on("msg", (join) => {
      setMember((m) => [...m, join]);
    });
    socket.on("recieve-message", (data) => {
      setMsgArray((p) => [...p, data]);
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
        <div>SocketID</div>
        <input
          placeholder="Enter ID"
          onChange={(e) => setSocketId(e.currentTarget.value)}
          value={socketID}
        />
        <div>TEXT MESSAGE</div>
        <input
          placeholder="Enter Text"
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        />
        <button type="submit">SEND</button>
      </form>
      <Member mem={member} />
      <Msg msg={{ msgArray }} />
    </div>
  );
};

export default App;
