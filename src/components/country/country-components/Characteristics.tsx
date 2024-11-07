import { FC } from "react";
import { AiOutlineLike } from "react-icons/ai";
import useCharacteristicsLogic, {
  CountryInfoProps,
} from "./useCharacteristicsLogic";

const Characteristics: FC<CountryInfoProps> = ({ el, index, dispatch }) => {
  const {
    isEditing,
    editedName,
    editedCapital,
    setEditedName,
    setEditedCapital,
    setEditedPopulation,
    editedPopulation,
    editingCountryMutation,
    handleSaveClick,
    handleCancelClick,
    handleFileChange,
    handleEditClick,
    handleLikeClick,
  } = useCharacteristicsLogic({ dispatch, el, index });

  return (
    <div className="characteristics">
      <div className="characteristic">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <br />
            <input
              type="text"
              value={editedCapital}
              onChange={(e) => setEditedCapital(e.target.value)}
            />
            <br />
            <input
              type="text"
              value={editedPopulation}
              onChange={(e) => setEditedPopulation(e.target.value)}
            />
            <br />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <br />
            {editingCountryMutation.isPending ? (
              <button
                disabled
                className="country-edit-save-btn country-edit-btn"
                onClick={handleSaveClick}
              >
                Save
              </button>
            ) : (
              <button
                className="country-edit-save-btn country-edit-btn"
                onClick={handleSaveClick}
              >
                Save
              </button>
            )}
            <button
              className="country-edit-undo-btn country-edit-btn"
              onClick={handleCancelClick}
            >
              Undo
            </button>
          </>
        ) : (
          <>
            <span>{editedName}</span>
            <br />
            <span>{editedCapital}</span>
            <br />
            <span>{editedPopulation}</span>
            <br />
            <button className="country-edit-btn" onClick={handleEditClick}>
              Edit
            </button>
          </>
        )}

        <div onClick={handleLikeClick} className="like-icon">
          <span>{el.likes}</span>
          <AiOutlineLike />
        </div>
      </div>
    </div>
  );
};

export default Characteristics;
