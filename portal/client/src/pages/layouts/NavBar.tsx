// import { FC } from "react";
import { FC } from "react";
import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { useStoreSelector } from "../../store";
import { authService } from "../auth/authService";
import classes from "./NavBar.module.scss";

const MyNavLink: FC<{ to: string; title: string }> = ({ to, title }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  if (title === "My Profile" || "My Grades"){
    return(
      <NavLink
      to={to}
      className={classes.link + " " + (match ? classes.active : "")}
    >
      {title}
    </NavLink>
      );
  }
  return (
    <NavLink
      to={to}
      className={classes.link + " " + (match ? classes.active : "")}
    >
      {title}
    </NavLink>
  );
};

export default function NavBar() {
  const user = useStoreSelector((s) => s.auth.user);
  const isFullUser = useStoreSelector((s) => s.auth.fullUser);
  const logout = () => {
    authService.logout();
  };
  const globalAdminGroup = "ITgroup";
  const isGlobalAdmin =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? true
      : user?.groups.includes(globalAdminGroup);

  const globalAdminRoute = {
    to: "/admin/global",
    title: "Global Admin",
  };
  const groupAdminRoute = {
    to: "/admin/group",
    title: "Group Admin",
  };
  const routes = [
    {
      to: "/",
      title: "Home",
    },
    {
      to: "/schedule",
      title: "My Semester Schedule",
    },
    {
      to: "/currentSemesterGrades",
      title: "My Grades",
    },
    {
      to: "/profile",
      title: "My Profile",
    },
  ];

  const dropdownRoutes = [
    {
      to: "/spring",
      title: "My Fall Grades",
    },

    {
      to: "/spring",
      title: "My Spring Grades",
    },
  ]
  return (
    <div className="bg-primary">
      <nav className="navbar navbar-expand-lg navbar-dark container">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              className="img-fluid"
              id="navbar-logo"
              alt="Snow College Logo"
              src='/SnowCollegeLogo.png'
            />
          </Link>

          <button
            className={classes.navbar_toggler + " btn btn-bold navbar-toggler"}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {routes.map((r) => (
              <MyNavLink key={r.to} {...r} />
            ))}
            <li className="nav-item my-auto">
              <button className={classes.logout} onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
