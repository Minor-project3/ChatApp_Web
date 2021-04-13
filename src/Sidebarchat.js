import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./sidebarchat.css";
import db from "./Firebase";
import { Link } from "react-router-dom";
function Sidebarchat({ id, name, addnewchat }) {
  const [seed, setseed] = useState("");
  const [messages, setmessages] = useState("");
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => 
          doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  const createchat = () => {
    const roomname = prompt("please enter name for chat");
    if (roomname) {
      db.collection("rooms").add({
        name: roomname,
      });
    }
  };

  return !addnewchat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarchat">
        <Avatar
          src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`}
        />
        <div className="sidebarchatinfo">
          <h2>{name}</h2>
  <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createchat} className="sidebarchat">
      <h2>Add new chat</h2>
    </div>
  );
}
export default Sidebarchat;
