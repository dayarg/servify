import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Assets
import Mudanza from "../../assets/img/mudanza-banner.jpg";
import Google from "../../assets/image/google-button.png";
// Components
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import BasicDrawer from "../../components/Drawer/BasicDrawer";
// Context
import { useAuth } from "../../context/AuthContext";
// Firestore
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
// Utils
import { providerGoogle, providerSnapshot } from "../../utils/snapshotCollection/snapshotCollection";


interface LogInClientProps {
  email: string;
  password: string;
}

const LogInClient = () => {
  const navigate = useNavigate();
  const { logIn, authGoogle } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LogInClientProps>({
    email:"",
    password:"",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async () => {
    try {
      const userCredential = await logIn(formData.email, formData.password);
      const user = userCredential.user;
      const userId = user.uid;
      const clientSnapshot = await providerSnapshot(formData, "clientes");
      if(!clientSnapshot.empty) {
        navigate("/start-page", { state: { userName: user.email, userId } });
      } else {
        setError("El usuario está registrado como proveedor");
      }
    } catch (error) {
      console.log(error);
      setError("Credenciales incorrectas o no estás registrado.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await authGoogle();
      const currentUser = result.user;
      
      if (currentUser) {
        const clientRef = await providerGoogle(currentUser?.email, "clientes");
        if(!clientRef.empty) {
          return navigate("/start-page");
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
        console.error("No se pudo obtener el usuario actual después de autenticar con Google.");
      }
    } catch (error) {
      setError("Error al iniciar sesión con Google.");
    }
  };

  return (
    <div className="flex flex-col">
      <BasicDrawer />
      <div className="h-screen w-full flex">
        <div className="mx-auto sm:w-1/2 mt-24">
          <h1 className="font-bold text-h2 text-center p-6 mb-10 text-primary">
            Iniciar Sesión
          </h1>
          <div className="px-14">
            <div className="mb-14">
              <Input
                label={"Correo electrónico"}
                type={"email"}
                placeholder={"Ingresa tu correo electrónico"}
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
              />
            </div>

            <div className="mb-14">
              <Input
                label={"Contraseña"}
                type={"password"}
                placeholder={"Ingresa la contraseña"}
                value={formData.password}
                onChange={(value) => handleChange("password", value)}
              />
              {error && (
                <p className="text-sm text-error rounded-lg bg-error-pastel mt-1 mb-1 p-1 text-center">
                  {error}
                </p>
              )}
            </div>
            <div className="mt-2 w-32 mx-auto">
              <Button
                id="BtnNext"
                children="Ingresar"
                onClick={handleSubmit}
                theme="primary"
                type="submit"
              />
            </div>
            <div className="flex mt-6 justify-center ">
              <button
                id="BtnNext"
                onClick={handleGoogleLogin}
                type="submit"
                className="bg-light-grey hover:bg-grey active:bg-regular-grey p-2 rounded-full"
              >
                <div className="ml-2 mr-2 flex items-center">
                  <img src={Google} alt="google logo" className="w-10 h-10"/>
                  <p className="font-bold text-charcoal ml-2">Continuar con Google</p>
                </div>
              </button>
            </div>
            <div className="mt-10 mx-auto text-center">
              <span className="text-primary">¿No tienes una cuenta? </span>
              <a href={"/register-client"} className="text-secondary">
                Registrate
              </a>
            </div>
          </div>
        </div>
        <div className="hidden mt-6 md:w-1/2 md:block" >
          <img
            src={Mudanza}
            alt="plomero banner"
            className="w-screen h-screen float-right"
          />
        </div>
      </div>
    </div>
  );
};

export default LogInClient;
