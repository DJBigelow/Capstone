import { FC } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { authService } from "./pages/auth/authService";
import { LoginLanding } from "./pages/auth/LoginLanding";
import { LoginSilent } from "./pages/auth/LoginSilent";
import { Home } from "./pages/home/Home";
import { Directory } from "./pages/directory/Directory"
import { EmployeeDetail } from "./pages/directory/EmployeeDetail";
import { useStoreSelector } from "./store";
import NavBar from "./pages/layouts/NavBar";
import { Alerts } from "./components/Alerts";
import { DirectoryAdmin } from "./pages/directory/admin/DirectoryAdmin";
import { AdminEmployeeDetail } from "./pages/directory/admin/AdminEmployeeDetail";
import { ChangeApprovals } from "./pages/directory/admin/ChangeApprovals";

type AuthorizedRouteProps = {
  authorizedGroups: string[];
}

const AuthorizedRoute = ({authorizedGroups}: AuthorizedRouteProps) => {
  const user = useStoreSelector((store) => store.auth.user);

  if (!user) {
    authService.signinRedirect();
    return <div>redirecting...</div>
  } 
  else if (user.groups.some(group => authorizedGroups.includes(group))) {
    return <Outlet />
  }
  else {
    return (
      <div>
        <h1 className="display-1">You are not authorized to view this page</h1>
      </div>
    )
  }
}

const ProtectedRoute: FC = () => {
  const user = useStoreSelector((store) => store.auth.user);

  if (!user) {
    console.log("redirecting");
    authService.signinRedirect();
    return <div>redirecting...</div>;
  } else {
    return <Outlet />;
  }
};

function App() {
  return (
    <>
      <NavBar />
      <Alerts />
      <div className="container mt-2">
        <Routes>
        <Route path="/login/landing" element={<LoginLanding />}></Route>
        <Route path="/login/silent" element={<LoginSilent />}></Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/directory" element={<Directory />}></Route>
        <Route path="/directory/detail/:id" element={<EmployeeDetail />}></Route>
        <Route path="/directory/admin" element={<AuthorizedRoute authorizedGroups={['Example-Group']}/>} >
          <Route path="/directory/admin" element={<DirectoryAdmin />}></Route>
          <Route path="/directory/admin/detail/:id" element={<AdminEmployeeDetail />}></Route>
          <Route path="/directory/admin/changeapprovals" element={<ChangeApprovals />}></Route>
        </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
