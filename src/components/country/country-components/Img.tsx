import { FC } from "react";

const Img: FC<{ flagUrl: string | unknown }> = ({ flagUrl }) => {
  return (
    <div
      style={{ backgroundImage: `url(${flagUrl})` }}
      className={"flag-img"}
    ></div>
  );
};

export default Img;
