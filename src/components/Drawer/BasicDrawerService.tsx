import Logo from "../../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export type BasicDrawerServiceProps = {
    label: string;
    onClick?: () => void;
}

const BasicDrawerService = ({label, onClick}: BasicDrawerServiceProps): JSX.Element => {

  return (
    <div className="relative w-full h-12">
      <div className="flex items-center justify-between py-4 px-6 bg-white">
        <button onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h1 className="text-body-m md:text-h1 text-primary-blue font-bold mx-auto">{label}</h1>
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-28 h-14 min-w-28 min-h-14" />
        </div>
      </div>
    </div>
  );
};
export default BasicDrawerService;
