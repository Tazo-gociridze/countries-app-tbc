import React, { FC } from "react"

const Button: FC<React.PropsWithChildren> = ({children}) => {
  return (
    <button>{children}</button>
  )
};

export default Button;
