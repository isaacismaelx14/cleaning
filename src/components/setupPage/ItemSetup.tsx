import React from "react";

const ItemSetup = (props: { example: fileConfig; title: string; key: any }) => {
  return (
    <div className="col-5 mt-2 mr-2">
      <div className="card" style={{ Width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Archivos {props.title}</h5>
          <p className="card-subtitle mb-2 text-muted">
            {" "}
            Ruta: <span>{props.example.routeFor}</span>
          </p>
          <div className="mt-0 mb-2 ">
            {props.example.files.map((file, id) => {
              return (
                <span
                  className=" mr-1 badge rounded-pill bg-primary text-white mt-0"
                  key={id}
                >
                  {file}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSetup;
