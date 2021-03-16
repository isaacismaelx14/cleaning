import React from "react";

export default function List(props) {
  return (
    <div id="toDo" className="container bg-primary m-0">
      {props.list.map((element) => (
        <div key={element.id} className="list-item" id={element.id}>
          {element.path}
          <button
            className="btn btn-danger btn-sm"
            onClick={(e) => props.func(e, element.id)}
          >
            Remove from list
          </button>
        </div>
      ))}
    </div>
  );
}
