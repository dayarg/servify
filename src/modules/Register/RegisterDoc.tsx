import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Assets
import Carpintero from "../../assets/img/carpintero-banner.jpg";
// Components
import Button from "../../components/Button/Button";
import Uploader from "../../components/Uploader/Uploader";
import Checkbox from "../../components/Checkbox/Checkbox";
import BasicDrawer from "../../components/Drawer/BasicDrawer";
// Utils
import { uploadDocs } from "../../utils/storage/storage";

const RegisterDoc = () => {
  const { userId, userName } = useParams();
  const navigate = useNavigate();
  const [archivos, setArchivos] = useState({
    frontal: "",
    posterior: "",
    certificacion: "",
    experiencia: "",
  });

  const handleFileSelect = (file: File, tipo: string) => {
    setArchivos((prevState) => ({
      ...prevState,
      [tipo]: file,
    }));
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        Object.entries(archivos).map(async ([tipo, file]) => {
          if (file) {
            await uploadDocs(file, userId, tipo);
          }
        })
      );
      navigate("/proveedor-page", { state: { userName } });
    } catch (error) {
      console.error("Error al cargar los documentos:", error);
    }
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
            {Object.entries(archivos).map(([tipo, _]) => (
              <div className="mb-10" key={tipo}>
                <Uploader
                  label={tipo === "frontal" ? "Documento de identidad lado frontal" :
                          tipo === "posterior" ? "Documento de identidad lado posterior" :
                          tipo === "certificacion" ? "Certificación profesional" :
                          "Evidencia de experiencia"}
                  onFileSelect={(file) => handleFileSelect(file, tipo)}
                />
              </div>
            ))}
            <div className="mb-10">
              <Checkbox id="checkbox-legal" label={terms} />
            </div>
            <div className="mt-2 w-32 mx-auto">
              <Button
                id="BtnRegister"
                children="Registrarse"
                onClick={handleClick}
                theme="primary"
                type="submit"
              />
            </div>
            <div className="mt-10 mx-auto text-center">
              <span className="text-primary">¿Ya tienes una cuenta? </span>
              <a href="/login" className="text-secondary">
                Inicia sesión
              </a>
            </div>
          </div>
        </div>
        <div className="hidden mt-1 md:w-1/2 md:block sm:w-1/2">
          <img
            src={Carpintero}
            alt="carpintero banner"
            className="w-full h-[1000px] float-right"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterDoc;
