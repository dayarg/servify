export type AvatarProps = {
  name: string;
  size?: string;
  textSize: string;
  photo?: string;
}

const Avatar = ({ name, size = "w-10 h-10", textSize, photo="" }: AvatarProps): JSX.Element => {
  const firstLetter = (name && name.length > 0) && name.charAt(0).toUpperCase();

  return (
    <div
      className={`bg-secondary rounded-full flex items-center justify-center ${size}`}
    >
      {photo === null || photo === "" ? (
        <span className={`text-white font-medium ${textSize}`}>{firstLetter}</span>
      ):(
        <img className="w-10 h-10 rounded-full" src={photo} alt="foto usuario"/>
      )}
    </div>
  );
};

export default Avatar;
