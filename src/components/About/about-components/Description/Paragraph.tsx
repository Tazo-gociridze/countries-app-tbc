import { useContext } from "react";
import { LanguageContext } from "../../../../App";

const Paragraph = () => {
  const { switchLang } = useContext(LanguageContext);
  return (
    <>
      {switchLang === "en" ? (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, ea rem?
          Non explicabo repellat quas voluptatibus nesciunt molestiae culpa eos
          incidunt accusantium? Dignissimos voluptate explicabo cum quaerat,
          distinctio quibusdam odio? Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Sunt, soluta non. Illum minus esse, architecto, a
          corrupti dolores dicta amet id accusamus officiis facere atque vero.
          <br /> <br />
          Fuga corrupti voluptatenecessitatibus asperiores cumque ad in cum
          molestiae aperiam et aspernatur, accusamus vitae nulla doloremque
          omnis ducimus assumenda natus totam! Cum, culpa?
        </p>
      ) : (
        <p>
          თავად კომპანია ძალიან წარმატებული კომპანიაა. ამას აქვს მნიშვნელობა? არ
          განვმარტავ მოგერიებას, რომელი სიამოვნებით არ იციან მათი ბრალის
          უბედურება? ყველაზე ღირსეულს სიამოვნებით აგიხსნი, როცა იკითხავს,
          ​​განსხვავებას რაღაც სიძულვილით? თავად მომხმარებელი, მომხმარებელს
          შეეძლება განახორციელოს კომპანიის adipiscing. ისინი არ არიან ფხვიერი.
          მასზე ნაკლებად ვიყოთ, არქიტექტორი, ამას კორუფციული ტკივილები
          გვაბრალებენ და ეს მართალია.
          <br /> <br />
          გაფუჭებული სიამოვნება-მოთხოვნილებების ფრენა უფრო მძაფრდება და როცა მე
          ვუხსნი უბედურებას და ის უხეშია, ჩვენ სიცოცხლეს არაფერში ვადანაშაულებთ
          და მთელ ტკივილს მივყავართ იმისთვის, რომ ვივარაუდოთ მთელი დაბადება!
          როდის, ბრალია?
        </p>
      )}
    </>
  );
};

export default Paragraph;
