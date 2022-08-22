import React from "react";

export const PreferenseContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});
