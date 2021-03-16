import React, { useEffect } from "react";

export default function ButtonSm(props) {
  const classes = `btn btn-${props.color ? props.color : "success"} btn-sm m-0`;
  useEffect(() => {}, []);
  return (
    <button
      className={classes}
      id="folderSelectBtn"
      onClick={(e) => props.onClick(e)}
    >
      {props.children}
    </button>
  );
}
