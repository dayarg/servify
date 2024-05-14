// Assets
import Mecanico from "../../assets/img/mecanico-banner.jpg";
import Google from "../../assets/image/google-button.png";
// Components
import BasicDrawer from "../Drawer/BasicDrawer";
import { useAuth } from "../../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../Button/Button";
import { providerGoogle } from "../../utils/snapshotCollection/snapshotCollection";

const RegisterOptions = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { authGoogle } = useAuth();
  const handleGoogleRegister = async () => {
    try {
      const result = await authGoogle();
      const currentUser = result.user;

      if (currentUser) {
        const clientRef = await providerGoogle(currentUser?.email, "clientes");
        if (!clientRef.empty) {
          setError("El correo electrónico ya está registrado.");
          return;
        }

        await addDoc(collection(db, "clientes"), {
          nombres: currentUser?.displayName?.split(" ")[0],
          apellidos: currentUser?.displayName?.split(" ")[1],
          correo: currentUser.email,
          identificacion: "",
          telefono: "",
          ciudad: "Bogota",
          fecha_nacimiento: "",
          terms: true,
          userId: currentUser.uid,
          role: "cliente",
        });
        navigate("/start-page");
      } else {
        console.error(
          "No se pudo obtener el usuario actual después de autenticar con Google."
        );
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };
  return (
    <div className="flex flex-col">
      <BasicDrawer />
      <div className="h-screen w-full flex">
        <div className="flex flex-col items-center justify-center mx-auto sm:w-1/2">
          <span className="text-h4 text-center -mt-64 mb-64">
            ¿Cómo te gustaría registrarte?
          </span>
          <div className="mx-auto w-72">
            <div className="flex flex-col items-center">
              <button
                id="BtnGoogle"
                onClick={handleGoogleRegister}
                type="submit"
                className="bg-light-grey hover:bg-grey active:bg-regular-grey p-2 rounded-full mb-2 w-72"
              >
                <div className="ml-2 mr-2 flex items-center">
                  <img src={Google} alt="google logo" className="w-10 h-10" />
                  <p className="font-bold text-charcoal ml-2">
                    Registrarse con Google
                  </p>
                </div>
              </button>
              <div className="w-72">
                <Button
                  id="BtnNext"
                  children="Registrarse con correo electrónico"
                  onClick={() => navigate("/register-client")}
                  theme="primary"
                  type="submit"
                />
              </div>
              {error && (
                <p className="text-sm text-error rounded-lg bg-error-pastel mt-2 mb-1 p-1 text-center">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="hidden mt-1 md:w-1/2 md:block">
          <img
            src={Mecanico}
            alt="electricista banner"
            className="w-full h-screen float-right"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterOptions;
