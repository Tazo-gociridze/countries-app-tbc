import { FC } from "react"
import Img from "./about-components/Img"
import Description from "./about-components/Description"


const AboutSection: FC = () => {
    return(
        <section className="about__section">
          <Description/>
          <Img/>
        </section>
    )
}

export default AboutSection