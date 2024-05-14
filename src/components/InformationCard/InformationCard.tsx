import React from "react";
import Avatar from "../Avatar/Avatar";

export type InformationCardProps = {
  nombre: string;
  fecha: string;
  hora: string;
  direccion: string;
  onClick?: () => void;
};

const InformationCard = ({
  nombre,
  fecha,
  hora,
  direccion,
  onClick,
}: InformationCardProps): JSX.Element => {
  return (
    <button
      className="border border-light-grey p-4 rounded-lg w-full flex flex-col md:flex-row items-center bg-white"
      onClick={onClick}
    >
      <Avatar name={nombre} size="w-14 h-14 md:w-20 md:h-20" textSize="text-h5 md:text-h1" />
      <div className="flex-1 ml-4">
        <h2 className="text-xl font-bold mb-2 text-secondary">{nombre}</h2>
        <p className="text-primary mb-1">Fecha: {fecha}</p>
        <p className="text-primary mb-1">Hora: {hora}</p>
        <p className="text-primary mb-1">Dirección: {direccion}</p>
      </div>
    </button>
  );
};

export default InformationCard;
