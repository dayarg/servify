import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Assets
import Mecanico from "../../assets/img/mecanico-banner.jpg";
// Components
import Dropdown from "../../components/DropdownMenu/Dropdown";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import DateInput from "../../components/DateInput/DateInput";
import BasicDrawer from "../../components/Drawer/BasicDrawer";
import Checkbox from "../../components/Checkbox/Checkbox";
// Context
import { useAuth } from "../../context/AuthContext";
// Firebase
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";

interface RegisterClientProps {
  identificacion: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  ciudad: string;
  correo: string;
  telefono: string;
  password: string;
  terms: boolean;
  role: string;
}

const RegisterClient = () => {
  const navigate = useNavigate();
  const { signUp, currentUser } = useAuth();

  const [formData, setFormData] = useState<RegisterClientProps>({
    identificacion: "",
    nombres: "",
    apellidos: "",
    fecha_nacimiento: "",
    ciudad: "",
    correo: "",
    telefono: "",
    password: "",
    terms: true,
    role: "",
  });

  const handleClick = async () => {
    try {
      const userCredential = await signUp(formData.correo, formData.password);

      await addDoc(collection(db, "clientes"), {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        correo: formData.correo,
        identificacion: formData.identificacion,
        telefono: formData.telefono,
        ciudad: formData.ciudad,
        fecha_nacimiento: formData.fecha_nacimiento,
        terms: formData.terms,
        userId: userCredential.user.uid,
        role: "cliente",
      });

      navigate("/start-page", { state: { userName: currentUser?.email } });
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const terms =
    "He leído y acepto los términos y condiciones de la política de privacidad de Servify";

  return (
    <div className="flex flex-col">
      <BasicDrawer />
      <div className="h-screen w-full flex">
        <div className="mx-auto sm:w-1/2 mt-2">
          <h1 className="font-bold text-h2 text-center p-6 text-primary">
            Registro
          </h1>
          <div className="px-14">
            <div className="mb-6">
              <Input
                label={"Nombres"}
                type={"text"}
                placeholder={"Ingresa tu nombre"}
                value={formData.nombres}
                onChange={(value) => handleChange("nombres", value)}
              />
            </div>
            <div className="mb-6">
              <Input
                label={"Apellidos"}
                type={"text"}
                placeholder={"Ingresa tu apellido"}
                value={formData.apellidos}
                onChange={(value) => handleChange("apellidos", value)}
              />
            </div>
            <div className="mb-6">
              <Input
                label={"Correo electrónico"}
                type={"email"}
                placeholder={"Ingresa tu correo electrónico"}
                value={formData.correo}
                onChange={(value) => handleChange("correo", value)}
              />
            </div>
            <div className="mb-6">
              <Input
                label={"Identificación"}
                type={"text"}
                placeholder={"Ingresa tu identificación"}
                value={formData.identificacion}
                onChange={(value) => handleChange("identificacion", value)}
              />
            </div>
            <div className="mb-6">
              <Input
                label={"Teléfono"}
                type={"phone"}
                placeholder={"Ingresa tu teléfono"}
                value={formData.telefono}
                onChange={(value) => handleChange("telefono", value)}
              />
            </div>
            <div className="mb-6">
              <Dropdown
                id="dropdownMenu"
                label="Ciudad de residencia"
                text="Selecciona una ciudad"
                options={[{ label: "Bogotá", value: "Bogota" }]}
                selectedOption={formData.ciudad}
                onOptionSelect={(value) => {
                  handleChange("ciudad", value);
                }}
              />
            </div>
            <div className="mb-6">
              <DateInput
                label="Fecha de nacimiento"
                placeholder="Ingresa tu fecha de nacimiento"
                value={formData.fecha_nacimiento}
                onChange={(value) => handleChange("fecha_nacimiento", value)}
              />
            </div>
            <div className="mb-6">
              <Input
                label={"Contraseña"}
                type={"password"}
                placeholder={"Ingresa la contraseña"}
                value={formData.password}
                onChange={(value) => handleChange("password", value)}
              />
            </div>
            <div className="mb-10">
              <Checkbox id="checkbox-legal" label={terms} />
            </div>
            <div className="mt-2 w-32 float-right">
              <Button
                id="BtnNext"
                children="Finalizar"
                onClick={handleClick}
                theme="primary"
                type="submit"
              />
            </div>
          </div>
        </div>
        <div className="hidden mt-1 md:w-1/2 md:block">
          <img
            src={Mecanico}
            alt="electricista banner"
            className="w-full h-[1000px] float-right"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterClient;
