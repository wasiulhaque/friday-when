
import "./App.css";
import DaysUntilFriday from "./components/DaysUntilWeekend";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import { FacebookEmbed } from "react-social-media-embed";

const postUrls = [
  "https://www.facebook.com/tanvir.sultan.mba/posts/pfbid0ud7mznvuNh8iVtjuBj1Egx3q5JV9KhdC82tpmqXw7zHcMa4AQCFbyMz1w516iJHPl",
  "https://www.facebook.com/tanvir.sultan.mba/posts/pfbid0qXUb1ndKEzuYd6YcyPUFUPUsyxhGertEkEftxfUiLLUwJwWbsE8GA62x3FvKrNSZl",
  "https://www.facebook.com/tanvir.sultan.mba/posts/pfbid022h6K3cCrUaH6u12m7m6Cctt2GL5i9t91Gj9ctjhTsTiw8pCvfGL4oeDBjBzqizG1l",
  "https://www.facebook.com/tanvir.sultan.mba/posts/pfbid0HfyA7Fmx1r4uAKH3CF6EPsXSyix2fBtXpBWqnQVkGrBWjE4UuvoBDzXWjPFfLvUol",
  "https://www.facebook.com/tanvir.sultan.mba/posts/pfbid02NTMvxouLeKMp7hzfDHSZdoL9ACw3KXWaoxi7PSwN4QNeBofm2esXZnrs7qNHKagHl",
  "https://www.facebook.com/tanvir.sultan.mba/posts/pfbid0jZptSLtcxJJPZeDqjEZ8mYKRKu5t6edbUKcLCvXAtzwBkgvPzwajJYLg7SdUfNWul",
  "https://www.facebook.com/tanvir.sultan.mba/posts/pfbid0mo8ZgJVn9N9ou8mhYyX54HSyAqt3NwUDMpWjFGR2EZJj8qBEJTYmDZtAJZLS4NFTl",
  "https://www.facebook.com/tanvir.sultan.mba/posts/pfbid0ZdrPXUREjQYN8Cdqar6PKE4gt7c1TzX8cw7YoTbzHN7TdGagrt6Kq7hXgdBSqvDkl",
  "https://www.facebook.com/tanvir.sultan.mba/posts/pfbid0XkKCaCRHaSsWbPWf2kZC5UnG6Xv5bUpy5fHBmPyQDdEMpQpcju5qPKC4qMU66rzol",
];

const randomPostUrl = postUrls[Math.floor(Math.random() * postUrls.length)];

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

function App() {
  // Check if the user's dark mode preference is already stored in the local storage
  const storedDarkMode = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState(storedDarkMode === "true");

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // Save the new preference to local storage
    localStorage.setItem("darkMode", newDarkMode);
  };

  // Update the CSS class when the dark mode state changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <div className="overlay"></div>
      <header className="App-header">
        <DaysUntilFriday />
        <FormGroup>
          <Tooltip
            title={`${darkMode ? "Enable Light Mode" : "Enable Dark Mode"}`}
          >
            <FormControlLabel
              control={
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  checked={darkMode}
                  onClick={toggleDarkMode}
                  id="switch"
                />
              }
            />
          </Tooltip>
        </FormGroup>
        <div
          className="facebook-embed-container"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <FacebookEmbed url={randomPostUrl} width={550} />
        </div>
        {/* <p>
          <img
            src="https://media.tenor.com/6GIi9tonjeEAAAAd/parkour-the-office.gif"
            height="300px"
          />
        </p> */}
      </header>
    </div>
  );
}

export default App;
