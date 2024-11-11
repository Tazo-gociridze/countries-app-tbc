import { useContext, useState } from "react";
import { LanguageContext } from "../../../App";
import { CountryData } from "../static/Interfaces";
import { CountryAction } from "../Reducer/countryReducer";
import { useMutation } from "@tanstack/react-query";
import { editingCountry, updateLikes } from "../../../api/countries";
import { countryComponentContext } from "./countrySection/CountryComponent";

export interface CountryInfoProps {
  el: CountryData;
  index: number;
  countryState: CountryData[];
  countryLikes: number;
  dispatch: React.Dispatch<CountryAction>;
}

const useCharacteristicsLogic = ({
  el,
  countryLikes
}: {
  el: CountryData,
  countryLikes: number
}) => {
  const { countryAdded, setCountryAdded} = useContext(LanguageContext);
  const { refetch } = useContext(countryComponentContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(el.name);
  const [editedCapital, setEditedCapital] = useState(el.capital);
  const [editedPopulation, setEditedPopulation] = useState(el.population);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const likesMutation = useMutation({ mutationFn: updateLikes});

  const handleLikeClick = ({ el }: { el: CountryData, countryLikes: number }) => {
    likesMutation.mutate({ el, countryLikes }, {
      onSuccess: () => {
        console.log('isSuccsess')
        refetch()
      },
      onError: () => {
        console.log('error for increment likes')
      }
    }); 
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const uploadFile = (file: File) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          resolve(e.target.result);
        } else {
          reject("Ошибка при чтении файла");
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const editingCountryMutation = useMutation({ mutationFn: editingCountry });

  // ქვეყნის რედაქთირება მუტაციით
  const handleSaveClick = async () => {
    try {
      if (selectedFile) {
        const flagUrl = await uploadFile(selectedFile);
        const updatedCountry = {
          id: el.id,
          name: editedName,
          capital: editedCapital,
          population: editedPopulation,
          likes: el.likes,
          flagUrl: flagUrl,
        };
        await editingCountryMutation.mutate(updatedCountry);
      } else {
        const updatedCountry = {
          id: el.id,
          name: editedName,
          capital: editedCapital,
          population: editedPopulation,
          likes: el.likes,
          flagUrl: el.flagUrl,
        };
        await editingCountryMutation.mutate(updatedCountry);
      }
      setCountryAdded(!countryAdded);
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error("Error updating country:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setCountryAdded(!countryAdded);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return {
    isEditing,
    editedName,
    editedCapital,
    setEditedName,
    setEditedCapital,
    setEditedPopulation,
    editingCountryMutation,
    editedPopulation,
    handleSaveClick,
    handleCancelClick,
    handleFileChange,
    handleEditClick,
    handleLikeClick,
  };
};

export default useCharacteristicsLogic;
