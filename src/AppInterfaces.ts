export interface LanguageAction {
    type: 'CHANGE_LANGUAGE';
    payload: string;
  }
  
  export interface LanguageState {
    switchLang: string;
  }
  
  export const initialState: LanguageState = {
    switchLang: 'en',
  };
  
  export const languageReducer = (state: LanguageState, action: LanguageAction): LanguageState => {
    switch (action.type) {
      case 'CHANGE_LANGUAGE':
        return { ...state, switchLang: action.payload };
      default:
        return state;
    }
  };
  
  