import { FC, InputHTMLAttributes } from "react";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return <input {...props} />;
};

export default Input;
