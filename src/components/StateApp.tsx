import React from "react";

export default function StateApp(props) {
  if (props.state === "doing") {
    return (
      <div>
        <h2>Espere un segundo</h2>
        <div className="d-flex align-items-center">
          <strong>Procesando...</strong>
          <div
            className="spinner-border ms-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    );
  } else if (props.state === "Success") {
    return (
      <div className="card">
        <div className="card-header bg-primary">
          <h4 className=" text-white">Proceso terminado</h4>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            Numero de archivos procesados: {props.file.length}
          </h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <button
            onClick={() => props.setState("none")}
            className="btn btn-primary"
          >
            volver
          </button>
          <a href="#" className="btn btn-success">
            Ver resume
          </a>
        </div>
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
