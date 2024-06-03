import React, { useEffect } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.close();
    };
  }, [socket]);
  return (
    <div>
      <i>App</i>
    </div>
  );
};

export default App;
