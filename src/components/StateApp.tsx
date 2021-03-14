import React from "react";

export default function StateApp(props) {
  if (props.state === "doing") {
    return <p>Doing</p>;
  } else if (props.state === "Success") {
    return (
      <div>
        <h3 className="title succes">Proceso terminado</h3>
        <p>
          <strong>Numero de archivos: </strong>
          {props.file.length}
        </p>
      </div>
    );
  } else if (props.state === "Error") {
    return <div>Error</div>;
  } else if (props.state === "Warning") {
    return (
      <div>
        <h3 className="title warning">Proceso terminado</h3>
        <p>{props.file}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
}
