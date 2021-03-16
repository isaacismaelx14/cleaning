import React, { useState, useEffect } from "react";
import ItemSetup from "../components/setupPage/ItemSetup";

function Setup(props: { data: jsonRe; changeState: any }) {
  useEffect(() => console.log(props.data), []);

  const { data } = props;
  const toRecore = [
    { example: data.audioFiles, title: "de Audios" },
    { example: data.compressedFiles, title: "Comprimidos" },
    { example: data.executableFiles, title: "Ejecutables" },
    { example: data.imageFiles, title: "de Imagen" },
    { example: data.textFiles, title: "de Texto" },
    { example: data.videoFiles, title: "de Video" },
  ];
  return (
    <div>
      <div className="container mt-3">
        <div className="row">
          {toRecore.map((element, id) => {
            return (
              <ItemSetup
                example={element.example}
                title={element.title}
                key={id}
              />
            );
          })}
        </div>
        <div className="row">
          <div className="col mt-2">
            <button
              className="btn btn-primary"
              onClick={() => props.changeState(false)}
            >
              Regresar
            </button>
            <button
              className="btn btn-success"
              onClick={() => console.log("click")}
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Setup;
