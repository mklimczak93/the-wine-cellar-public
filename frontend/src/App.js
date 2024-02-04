//main imports
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
// pages
import CellarPage from "./pages/CellarPage";
import CloseupPage from "./pages/CloseupPage";
import EditWinePage from './pages/EditWinePage';
import FinderPage from "./pages/FinderPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import AddNewWinePage from "./pages/AddNewWinePage";
import FindOutMorePage from "./pages/FindOutMorePage";
//layouts
import RootLayout from "./layouts/RootLayout";
import CellarLayout from "./layouts/CellarLayout";
//css
import './index.css';


function App() {
  const { user } = useAuthContext();
  //creating different routes for each page
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cellar-page" element={<CellarLayout />} >
          <Route 
            path="/cellar-page"
            element={user ? <CellarPage/> : <Navigate to="/login-page" />} />
          <Route 
            path="/cellar-page/:id" 
            element={<CloseupPage />} />
        </Route>
        <Route 
            path="cellar-page/edit/:id" 
            element={<EditWinePage />} />
        <Route path="/finder-page/:id" element={<FinderPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />}/>
        <Route path="/login-page" element={!user ? <LoginPage /> : <Navigate to="/cellar-page"/> } />
        <Route path="/register-page" element={!user ? <RegisterPage /> : <Navigate to="/cellar-page" />} />
        <Route path="/add-new-wine" element={<AddNewWinePage />} />
        <Route path="/find-out-more" element={<FindOutMorePage />}/>
        {/* error catching */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
     
    </div>
  );
}

export default App;
