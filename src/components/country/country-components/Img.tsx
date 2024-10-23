import { FC } from "react"

const Img: FC<{flagUrl:string | null}> = ({flagUrl}) => {
  console.log(flagUrl)
  return (
    <div style={{backgroundImage: `url(${flagUrl})`}} className={"flag-img"}></div>
  )
};

export default Img;
