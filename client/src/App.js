import styled, { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import Storage from 'local-storage-fallback';
import { Route, Switch } from 'react-router-dom';

const lightColors = {
  test : "red"
};

const darkColors = {
  test: 'gray'
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
      test
    </ThemeProvider>
  );
}

export default App;
