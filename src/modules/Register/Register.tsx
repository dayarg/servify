import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Assets
import Electricista from "../../assets/img/electricista-banner.jpg";
// Components
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import DateInput from "../../components/DateInput/DateInput";
import BasicDrawer from "../../components/Drawer/BasicDrawer";
import Dropdown from "../../components/DropdownMenu/Dropdown";
// Context
import { useAuth } from "../../context/AuthContext";
// Firebase
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";

interface FormData {
  nombres: string;
  apellidos: string;
  correo: string;
  identificacion: string;
  telefono: string;
  ciudad: string;
  fecha_nacimiento: string;
  profesion: string;
  password: string;
  role: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { signUp, currentUser } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    nombres: "",
    apellidos: "",
    correo: "",
    identificacion: "",
    telefono: "",
    ciudad: "",
    fecha_nacimiento: "",
    profesion: "",
    password: "",
    role: "",
  });

  const handleClick = async () => {
    try {
      const userCredential = await signUp(formData.correo, formData.password);
  
      await addDoc(collection(db, "proveedores"), {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        correo: formData.correo,
        identificacion: formData.identificacion,
        telefono: formData.telefono,
        ciudad: formData.ciudad,
        fecha_nacimiento: formData.fecha_nacimiento,
        profesion: formData.profesion,
        userId: userCredential.user.uid,
        role: "proveedor"
      });
  
      const userId = userCredential.user.uid;
      if (userId) {
        navigate(`/register-2/${userId}`, { state: { userName: currentUser?.email } });
      }
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

  const profesiones = [
    { label: "Veterinario/a", value: "veterinario" },
    { label: "Albañil", value: "albañil" },
    { label: "Plomero/a", value: "plomero" },
    { label: "Electricista", value: "electricista" },
    { label: "Mecanico/a", value: "mecanico" },
    { label: "Profesor/a", value: "profesor" },
    { label: "Carpintero/a", value: "carpintero" },
    { label: "Jardinero/a", value: "jardinero" },
    { label: "Cerrajero/a", value: "cerrajero" },
    { label: "Aseador/a", value: "aseador" },
    { label: "Maquillista", value: "maquillista" },
    { label: "Mudanzas", value: "mudanzas" },
  ];

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
                value={formData.nombres}
                placeholder={"Ingresa tu nombres"}
                onChange={(value) => handleChange("nombres", value)}
              />
            </div>
            <div className="mb-6">
              <Input
                label={"Apellidos"}
                type={"text"}
                value={formData.apellidos}
                placeholder={"Ingresa tu apellidos"}
                onChange={(value) => handleChange("apellidos", value)}
              />
            </div>
            <div className="mb-6">
              <Input
                label={"Correo electrónico"}
                type={"email"}
                value={formData.correo}
                placeholder={"Ingresa tu correo electrónico"}
                onChange={(value) => handleChange("correo", value)}
              />
            </div>
            <div className="mb-6">
              <Input
                label={"Identificación"}
                type={"text"}
                value={formData.identificacion}
                placeholder={"Ingresa tu identificación"}
                onChange={(value) => handleChange("identificacion", value)}
              />
            </div>
            <div className="mb-6">
              <Input
                label={"Teléfono"}
                type={"phone"}
                value={formData.telefono}
                placeholder={"Ingresa tu teléfono"}
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
              <label
                className="text-primary mb-1 font-bold"
                htmlFor="Profesion"
              >
                Profesión
              </label>
              <Dropdown
                id="dropdownMenu"
                text="Selecciona una profesión"
                options={profesiones}
                selectedOption={formData.profesion}
                onOptionSelect={(value) => {
                  handleChange("profesion", value);
                }}
              />
            </div>
            <div className="mb-6">
              <Input
                label={"Contraseña"}
                type={"password"}
                value={formData.password}
                placeholder={"Ingresa la contraseña"}
                onChange={(value) => {
                  handleChange("password", value);
                }}
              />
            </div>
            <div className="mt-2 w-32 float-right">
              <Button
                id="BtnNext"
                children="Siguiente"
                onClick={handleClick}
                theme="primary"
                type="submit"
              />
            </div>
          </div>
        </div>
        <div className="hidden mt-1 md:w-1/2 md:block">
          <img
            src={Electricista}
            alt="electricista banner"
            className="w-full h-[1000px] float-right"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
