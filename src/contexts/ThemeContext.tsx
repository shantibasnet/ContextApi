import React, { createContext, useReducer, ReactNode, Dispatch, SetStateAction } from 'react';

interface IThemeContext {
  theme: string;
  dispatch: Dispatch<ThemeAction>;
}

export const ThemeActionTypes = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  UPDATE_THEME: 'UPDATE_THEME',
} as const;

const themeReducer = (state: string, action: ThemeAction): string => {
  switch (action.type) {
    case ThemeActionTypes.TOGGLE_THEME:
      return state === 'light' ? 'dark' : 'light';
    case ThemeActionTypes.UPDATE_THEME:
      return action.payload;
    default:
      return state;
  }
};

const defaultThemeState: string = 'light';

export type ThemeAction =
  | { type: typeof ThemeActionTypes.TOGGLE_THEME }
  | { type: typeof ThemeActionTypes.UPDATE_THEME; payload: string };

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

interface IThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [theme, dispatch] = useReducer(themeReducer, defaultThemeState);

  const toggleTheme = () => {
    dispatch({ type: ThemeActionTypes.TOGGLE_THEME });
  };


  const contextValue: IThemeContext = {
    theme,
    dispatch: toggleTheme,
    
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
