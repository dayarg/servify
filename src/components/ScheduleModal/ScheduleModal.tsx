/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import DateInput from "../DateInput/DateInput";
import TimeInput from "../TimeInput/TimeInput";
import Textarea from "../Textarea/Textarea";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  disabled?: boolean;
  proveedorId: string;
  service: string;
};

interface FormData {
  clientId: string;
  correo: string;
  direccion: string;
  hora: string;
  fecha: string;
  descripcion: string;
  proveedorId: string;
  servicio: string;
}

const   ScheduleModal = ({ isOpen, onClose, disabled, proveedorId, service }: ScheduleModalProps) => {
  if (!isOpen) return null;

  const navigate = useNavigate();
  const {currentUser} = useAuth();

  const [formData, setFormData] = useState<FormData>({
    clientId: "",
    correo: currentUser?.email || "",
    direccion: "",
    hora: "",
    fecha: "",
    descripcion: "",
    proveedorId: "",
    servicio: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitService = async() => {
    try {
      await addDoc(collection(db, "servicios"), {
        proveedorId,
        clientId: currentUser?.uid,
        correo: formData.correo,
        direccion: formData.direccion,
        hora: formData.hora,
        fecha: formData.fecha,
        descripcion: formData.descripcion,
        servicio: service,
      });
      onClose();
      navigate(-1);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-regular-grey opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex">
              <div className="mt-3 sm:mt-0 sm:ml-4 align-center justify-center">
                <h3
                  className="text-h4 leading-6 font-medium text-primary mb-5 text-center"
                  id="modal-headline"
                >
                  Agenda el servicio
                </h3>
                <div className="mt-2 flex flex-wrap">
                  <div className="w-full">
                    <Input
                      label={"Correo electrónico"}
                      type={"text"}
                      placeholder={"Ingresa tu correo electrónico"}
                      value={formData.correo}
                      onChange={(value) => handleChange("correo", value)}
                    />
                    <Input
                      label={"Dirección"}
                      type={"text"}
                      placeholder={"Ingresa tu dirección"}
                      value={formData.direccion}
                      onChange={(value) => handleChange("direccion", value)}
                    />
                  </div>
                  <div className="w-full sm:w-1/2 sm:pr-2">
                    <TimeInput
                      label={"Hora"}
                      placeholder={"Hora del servicio"}
                      value={formData.hora}
                      onChange={(value) => handleChange("hora", value)}
                    />
                  </div>
                  <div className="w-full sm:w-1/2 ">
                    <DateInput
                      label={"Fecha"}
                      placeholder={"Fecha del servicio"}
                      value={formData.fecha}
                      onChange={(value) => handleChange("fecha", value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full sm:pl-3">
              <Textarea
                label={"Describe el servicio que necesitas"}
                placeholder={"Deja tu descripción aquí"}
                value={formData.descripcion}
                onChange={(value) => handleChange("descripcion", value)}
              />
            </div>
          </div>

          <div className="bg-light-grey px-4 py-3 sm:px-6">
            <div className="flex flex-col items-center justify-center space-y-2.5 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button
                id={"btnAccept"}
                onClick={handleSubmitService}
                theme="primary"
                type="submit"
                disabled={disabled}
              >
                Agendar
              </Button>
              <Button id={"btnDiscard"} onClick={onClose} theme="secondary">
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
