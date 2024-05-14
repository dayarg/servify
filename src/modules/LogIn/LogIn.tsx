import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Assets
import Plomero from "../../assets/img/plomero-banner.jpg";
// Components
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import BasicDrawer from "../../components/Drawer/BasicDrawer";
// Context
import { useAuth } from "../../context/AuthContext";
// Utils
import { providerSnapshot } from "../../utils/snapshotCollection/snapshotCollection";

interface LogInClientProps {
  email: string;
  password: string;
}

const LogIn = () => {
  const navigate = useNavigate();
  const { logIn, currentUser } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LogInClientProps>({
    email: "",
    password: "",
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
      const snapshot = await providerSnapshot(formData, "proveedores");
      if (!snapshot.empty) {
        navigate("/proveedor-page", {
          state: { userName: currentUser?.email, userId },
        });
      } else {
        setError("El usuario está registrado como cliente");
      }
    } catch (error) {
      console.log(error);

      setError("Credenciales incorrectas o no estás registrado.");
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
            <div className="mt-10 mx-auto text-center">
              <span className="text-primary">¿No tienes una cuenta? </span>
              <a href={"/register"} className="text-secondary">
                Registrate
              </a>
            </div>
          </div>
        </div>
        <div className="hidden mt-6 md:w-1/2 md:block">
          <img
            src={Plomero}
            alt="plomero banner"
            className="w-screen h-screen float-right"
          />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
