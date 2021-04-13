import React, { useEffect, useState } from "react";
import "./chat.css";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";

import { SearchOutlined, AttachFile, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { Avatar, IconButton } from "@material-ui/core";
import db from "./Firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";


function Chat() {
  const [seed, setseed] = useState("");
  const [input, setinput] = useState("");
  const { roomid } = useParams();
  const [roomname, setroomname] = useState("");
  const [messages, setmessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomid) {
      db.collection("rooms")
        .doc(roomid)
        .onSnapshot((snapshot) => setroomname(snapshot.data().name));

      db.collection("rooms")
        .doc(roomid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomid]);

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, [roomid]);

  const sendmessage = (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomid).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setinput("");
  };
 
  return (
    <div className="chat">
      <div className="chatheader">
        <Avatar
          src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`}
        />
        <div className="chatheaderinfo">
          <h3>{roomname}</h3>
          <p>
            {" "}
           {" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chatheaderright">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chatbody">
        {messages.map((message) => (
          <p
            className={`chatmessage ${
              message.name == user.displayName && "chatreciever"
            }`}
          >
            <span className="chatname">{message.name}</span>
            {message.message}
            <span className="chattimestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chatfooter">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        <form>
          <input
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendmessage} type="submit"></button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
