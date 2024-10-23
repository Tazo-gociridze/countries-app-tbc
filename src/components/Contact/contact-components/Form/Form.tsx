import React, { useContext, useState } from "react";
import { NameState } from "./formLogit";
import Input from "./form-components/Input";
import { LanguageContext } from "../../../../App";

function Form() {
  const { switchLang } = useContext(LanguageContext); 
  const [name, setName] = useState<NameState>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (value.length > 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Cannot exceed 8 characters",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    setName((prevName) => ({
      ...prevName,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errors.firstName || errors.lastName || errors.email || errors.message) {
      console.log("Form contains errors");
      return;
    }

    setName({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__wrapper">
        {errors.firstName && <div className="error">{errors.firstName}</div>}
        <Input
          placeholder={switchLang === 'en' ? "First-name" : 'სახელი'}
          type="text"
          name="firstName"
          value={name.firstName}
          onChange={handleChange}
        />

        {errors.lastName && <div className="error">{errors.lastName}</div>}
        <Input
          placeholder={switchLang === 'en' ? "Last-name" : 'გვარი'}
          type="text"
          name="lastName"
          value={name.lastName}
          onChange={handleChange}
        />

        {errors.email && <div className="error">{errors.email}</div>}
        <Input
          placeholder={switchLang === 'en' ? "E-mail" : 'ელ-ფოსტა'}
          type="email"
          name="email"
          value={name.email}
          onChange={handleChange}
        />

        {errors.message && <div className="error">{errors.message}</div>}
        <textarea
          placeholder={switchLang === 'en' ? "Message" : 'წერილი'}
          name="message"
          value={name.message}
          onChange={handleChange}
        />

        <button type="submit">{switchLang === 'en' ? 'Send' : 'გაგზავნა'}</button>
      </div>
    </form>
  );
}

export default Form;
