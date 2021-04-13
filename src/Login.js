import { Button } from "@material-ui/core";
import React from "react";
import "./login.css";
import { auth, provider } from "./Firebase";
import { actionTypes } from "./reducer";
import {useStateValue} from "./StateProvider";

export default function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>{
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
    })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="logincontainer">
        <img
          src="https://cdn3.f-cdn.com/contestentries/892698/11649066/583be74dea9e6_thumb900.jpg"
          alt=""
        />
        <div className="logintext">
          <h1 >Welcome to Community</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}
