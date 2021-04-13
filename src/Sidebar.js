import React, { useEffect, useState } from "react";
import "./sidebar.css";
import Sidebarchat from "./Sidebarchat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { SearchOutlined, Unsubscribe } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import db from "./Firebase";
import {useStateValue} from "./StateProvider";

function Sidebar() {
  const [rooms, setrooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe=db.collection("rooms").onSnapshot((snapshot) =>
      setrooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return()=>{
      unsubscribe();
    }
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarheader">
        <Avatar src={user?.photoURL}/>
        <div className="sidebarright">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebarsearch">
        <div className="sidebarsearchcontainer">
          
          <input placeholder="Search or start new chat" type="text" />
          <SearchOutlined />
        </div>
      </div>
      <div className="sidebarchats">
        <Sidebarchat addnewchat />
        {rooms.map((room) => (
          <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
