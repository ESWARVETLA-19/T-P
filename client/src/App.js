import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Home from "./pages/Home"; // Home as the layout
import Body from "./pages/Body"; // Main content component
import Detail from "./components/Detail"; // Component for team details
import ProfileDetail from "./scenes/Profile/ProfileDetail";
import DriveData from "./scenes/Drives"; // Component for drives
import SigninMain from "./pages/SigninMain"; // Component for sign-in
import Team from "./scenes/team"; // Component for teams
import JobApplicationForm from "./scenes/form/JobApplicationForm";
import JobApplicationDisplay from "./scenes/form/JobApplicationDisplay";
function App() {
  const [theme, colorMode] = useMode();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />, 
      children: [
        {
          path: "/", 
          element: <Body />,
        },
        {
          path: "team", 
          element: <Team />,
        },
        {
          path: "teams/:id",
          element: <Detail />,
        },
        {
          path: "profile/:id",
          element: <ProfileDetail />,
        },
        {
          path: "drives", 
          element: <DriveData />, 
        },
        {
          path: "signin",
          element: <SigninMain />, 
        },
        {
          path: "application",
          element: <JobApplicationForm />,
        },
        {
          path : "jobs",
          element: <JobApplicationDisplay />,
        }
      ],
    },
  ]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
