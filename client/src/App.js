import styled, { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import Storage from 'local-storage-fallback';
import { Route, Switch } from 'react-router-dom';
import axios from "axios";

//Import Components
import ErrorBoundary from "./utils/ErrorBoundary";
import VerifyMail from "./utils/VerifyMail";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Todo from "./Todo";


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
  const [token, setToken] = useState();
  useEffect(async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "/api/auth/refreshToken",
      });
      return setToken(res?.data?.accessToken);
    } catch (err) {
      return setToken(null);
    }

  })
  axios.interceptors.request.use(async (config) => {
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  }, (error) => Promise.reject(error))

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
      <Header token={token} thememode={theme} themeHandler={themeHandler} />
      <ErrorBoundary>
        <Switch>
          <Route exact path="/">
            <Todo />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/verifyMail/:email/:code">
            <VerifyMail />
          </Route>
        </Switch>
      </ErrorBoundary>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
