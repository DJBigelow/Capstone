import React, { FC } from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { MainMenuList } from "./MainMenu-List";
const MyNavLink: FC<{ to: string; title: string }> = ({ to, title }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (
    <NavLink
      to={to}
      // className={classes.link + " " + (match ? classes.active : "")}
    >
      {title}
    </NavLink>
  );
};

export const Home = () => {
  const navRoutesAcademicResources = [
    {
      to: "/advising",
      title: "Academic Advising",
    },
    {
      to: "/registration",
      title: "Registration",
    },
    {
      to: '/directory',
      title: "Directory"
    }
  ];

  const navRoutesStudents = [
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

  return (
    <div className="row mt-2">
      <h2 className="mt-4" style={{ textAlign: "center" }}>
        Welcome to Portal, a new user friendly Badger web
      </h2>
      <section className="col-3 mt-2">
      <div className="col-6 ml-0">Welcome "Student" !</div>
        <div className="container">
          <ul>
            <li>
              <h5 className="text-warning ml-3 mt-4 mb-3">Home</h5>
              <ul className="list-group my-3">
                {navRoutesAcademicResources.map((r) => (
                  <MyNavLink key={r.to} {...r} />
                ))}
                <li></li>
              </ul>
            </li>

            <li>
              <h5 className="text-warning ml-3 mt-4 mb-3">Student</h5>
              <ul className="list-group my-3">
                <li className="list-group-item"></li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <section className="col-9">
        <div className="row g-3 pb-2 d-flex justify-content-between align-items-center">
          <div className="col-2">
            <input
              className="form-control mr-2"
              type="text"
              style={{ width: 300 }}
              placeholder="Search"
            />
          </div>
          <div className="col-7">
            <button className="btn btn-outline-primary my-2">Search</button>
            <button className="btn btn-outline-success ml-2 my-2">Reset</button>
          </div>
        </div>

        <div className="row">
          <MainMenuList />
        </div>
      </section>
    </div>
  );
};
