import {
  AppBar,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import React from "react";
import { NAVBAR_HEIGHT } from "../../constants/index";
import useScrollPosition from "../../hooks/useScrollPosition";
import { navbarContent } from "../../utils/content";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../utils/user";

const { Logo } = navbarContent;

const LinkButton = ({ children, ...props }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={0.2}
    sx={{
      cursor: "pointer",
      color: "white", // Set text color to white
      fontSize: "1rem", // Increase text size
      "&:hover": { color: "white", opacity: 0.8 }, // Optional: slight opacity change on hover
    }}
    {...props}
  >
    {children}
  </Stack>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.users);
  const isStudent = useSelector((store) => store.user.isStudent);
  const scrollPosition = useScrollPosition();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));


  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        py: 1,
        height: NAVBAR_HEIGHT,
        bgcolor: scrollPosition > 10 ? "rgba(7,7,16,.7)" : "transparent",
        backdropFilter: scrollPosition > 10 && "blur(60px)",
      }}
    >
      <Container
        sx={{
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1380px!important",
            padding: "11px 0px",
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          {/* Logo */}
          <img
            src={Logo}
            style={{ height: "40px", objectFit: "contain" }}
            alt="Logo"
          />

          {/* Links */}
          {!isMobile && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={6}
              sx={{ flex: 1 }}
              flexWrap="wrap"
            >
              <LinkButton>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="body2">Home</Typography>
                </Link>
              </LinkButton>

              {!isStudent ? (
                <LinkButton>
                  <Link
                    to="/team"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography variant="body2">Student data</Typography>
                  </Link>
                </LinkButton>
              ) : null}
              {!isStudent ? (
                <LinkButton>
                  <Link
                    to="/application"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography variant="body2">Upcomming Jobs</Typography>
                  </Link>
                </LinkButton>
              ) : null}
              {!isStudent ? (
                <LinkButton>
                  <Link
                    to="/jobs_applied"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography variant="body2">Job Tracking</Typography>
                  </Link>
                </LinkButton>
              ) : null}
              {isStudent ? (
                <LinkButton spacing={0.5}>
                  <Link
                    to="/student_jobs"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography variant="body2">Upcomming Drives</Typography>
                  </Link>
                  <CallMadeIcon sx={{ fontSize: 12, color: "white" }} />
                </LinkButton>
              ) : null}

              <LinkButton>
                <Link
                  to="/about"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="body2">About</Typography>
                </Link>
              </LinkButton>
            </Stack>
          )}

          {/* Action Buttons */}
          <Stack direction="row" alignItems="center" spacing={2}>
            {user && isStudent && (
              <Link
                to={`/profile/${user["regno"]}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  sx={{ borderRadius: 4, backgroundColor: "#002e4e" }}
                >
                  Profile
                </Button>
              </Link>
            )}

            {user ? (
              <Link
                to="/"
                style={{ textDecoration: "none" }}
                onClick={() => dispatch(logout())}
              >
                <Button
                  variant="contained"
                  sx={{ borderRadius: 4, backgroundColor: "primary.main" }}
                >
                  Logout
                  <KeyboardArrowRightIcon />
                </Button>
              </Link>
            ) : (
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 4, backgroundColor: "primary.main" }}
                >
                  Sign in
                  <KeyboardArrowRightIcon />
                </Button>
              </Link>
            )}
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Navbar;
