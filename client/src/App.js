import styled, { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import Storage from 'local-storage-fallback';
import { Route, Switch } from 'react-router-dom';

//Import Components
import Footer from "./Footer";
import Header from "./Header";


// Theme Light/Dark Mode Section
const darkColors = {
  bgColor: "#393E46",
  hfbBgColor: "#222831",
  hfbColor: "#EEEEEE",
  mainTextColor: "#FFD369",
  borderForNote: "#FFD369",
  bgForNote: "#e8e9ea",
  btnSubmit: "#64686e",
  
};
const lightColors = {
  bgColor: "#FCEFEE",
  hfbBgColor: "#FC5C9C",
  hfbColor: "#FFFFFF",
  mainTextColor: "#000000",
  borderForNote: "#FC5C9C",
  bgForNote: "#fff",
  btnSubmit: "#fc8cb9",
  
};
const themes = {
  light: lightColors,
  dark: darkColors
};

function App() {
  const initialTheme = () => {
    const savedTheme = Storage.getItem('theme-mode');
    return savedTheme ? savedTheme : 'light';
  }
  const [theme, setTheme] = useState(initialTheme);
  useEffect(() => {
    Storage.setItem('theme-mode', theme);
  }, [theme]);
  const themeHandler = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeProvider theme={themes[theme]}>
     <Header thememode={theme} themeHandler={themeHandler} />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
