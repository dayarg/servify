import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faQuestionCircle,
  faEnvelope,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Logo from '../../assets/img/logo.png';
import Avatar from "../Avatar/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export type DrawerProps = {
  userName: string;
  photo?: string;
};

const Drawer = ({ userName, photo }: DrawerProps): JSX.Element => {
  const { logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleAvatarMenu = () => {
    setIsAvatarOpen(!isAvatarOpen);
  };

  const handleLogOut = async() => {
    try {
      await logOut();
      await navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative w-full h-12">
      <div className="flex items-center justify-between py-4 px-6 bg-white">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-28 h-14" />
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={toggleMenu}
            className="p-1 border-2 border-white rounded-md lg:hidden"
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faTimes} className="text-white text-2xl" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="text-white text-2xl" />
            )}
          </button>
          <button
            onClick={toggleAvatarMenu}
            className="p-1 border-2 border-primary rounded-full"
          >
            <Avatar name={userName} photo={photo} size="w-10 h-10" textSize="text-lg" />
          </button>
          {isAvatarOpen && (
            <div className="absolute right-6 z-30 mt-48 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  className="block px-4 py-2 text-sm text-primary hover:bg-secondary hover:text-white w-full text-left"
                  role="menuitem"
                >
                  <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                  Ayuda
                </button>
                <button
                  className="block px-4 py-2 text-sm text-primary hover:bg-secondary hover:text-white w-full text-left"
                  role="menuitem"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  PQR
                </button>
                <button
                  className="block px-4 py-2 text-sm text-primary hover:bg-secondary hover:text-white w-full text-left"
                  role="menuitem"
                  onClick={handleLogOut}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute inset-y-0 left-0 w-64 bg-gray-800 py-4 px-6">
          <h2 className="text-white font-bold text-lg mb-4">Menú</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="block text-white hover:underline">
                Página principal
              </Link>
            </li>
            <li>
              <Link to="/" className="block text-white hover:underline">
                Opción 1
              </Link>
            </li>
            <li>
              <Link to="/" className="block text-white hover:underline">
                Opción 2
              </Link>
            </li>
            <li>
              <Link to="/" className="block text-white hover:underline">
                Opción 3
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default Drawer;
