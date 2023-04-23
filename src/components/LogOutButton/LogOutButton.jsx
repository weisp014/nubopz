import React from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button color="inherit" onClick={() => dispatch({ type: "LOGOUT" })}>
      Log Out
    </Button>
  );
}

export default LogOutButton;
