import React from "react";

interface AvatarUserProps {
  image: string;
  lg?: boolean;
}

const AvatarUser: React.FC<AvatarUserProps> = (props) => {
  return (
    <>
      <div className={`userImg ${props.lg === true ? "lg" : ""}`}>
        <span className="rounded-full">
          <img src={props.image} alt="User avatar" />
        </span>
      </div>
    </>
  );
};

export default AvatarUser;
