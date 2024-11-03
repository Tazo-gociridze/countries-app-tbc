import axios from "axios";
import { useContext, useState } from "react";
import { LanguageContext } from "../../../App";
import { CountryData } from "../static/Interfaces";
import { CountryAction } from "../Reducer/countryReducer";

export interface CountryInfoProps {
    el: CountryData;
    index: number;
    countryState: CountryData[];
    dispatch: React.Dispatch<CountryAction>;
  }

const useCharacteristicsLogic = ({dispatch, el, index}: 
{dispatch: React.Dispatch<CountryAction>, el: CountryData, index: number}) => {

    const {countryAdded, setCountryAdded} = useContext(LanguageContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(el.name);
    const [editedCapital, setEditedCapital] = useState(el.capital);
    const [editedPopulation, setEditedPopulation] = useState(el.population);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
    const handleLikeClick = () => {
      dispatch({ type: "INCREMENT_LIKE", payload: { index } });
    };
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const uploadFile = (file: File) => {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = (e) => {
          if (typeof e.target?.result === 'string') {
            resolve(e.target.result);
          } else {
            reject('Ошибка при чтении файла');
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
  
    const handleSaveClick = async () => {
      try {
        if (selectedFile) {
          const flagUrl = await uploadFile(selectedFile);
          await axios.put(`http://localhost:3000/countries/${el.id}`, {
            name: editedName,
            capital: editedCapital,
            population: editedPopulation,
            likes: el.likes,
            flagUrl: flagUrl
          });
        } else {
          await axios.put(`http://localhost:3000/countries/${el.id}`, {
            name: editedName,
            capital: editedCapital,
            population: editedPopulation,
            likes: el.likes,
            flagUrl: el.flagUrl
          });
        }
        setCountryAdded(!countryAdded)
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating country:", error);
      }
    };
  
    const handleCancelClick = () => {
      setIsEditing(false);
      setCountryAdded(!countryAdded)
    };
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setSelectedFile(event.target.files[0]);
      }
    };


    return{
        isEditing,
        editedName,
        editedCapital,
        setEditedName,
        setEditedCapital,
        setEditedPopulation,
        editedPopulation,
        handleSaveClick,
        handleCancelClick,
        handleFileChange,
        handleEditClick,
        handleLikeClick
    }
};

export default useCharacteristicsLogic;
