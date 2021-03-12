import React from "react";

export default function ButtonSm(props) {
  return (
    <button
      className="btn btn-success btn-sm m-0"
      id="folderSelectBtn"
      onClick={(e) => props.onClick(e)}
    >
      {props.children}
    </button>
  );
}
