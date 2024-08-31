import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/global/Navbar';
import Signup from './components/authorization/Signup';
import Login from './components/authorization/Login';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Search from './components/Search';
import Profile from './components/Profile';
import JobDetails from './components/JobDetails';
import Companies from './admin/Companies';
import AddCompanies from './admin/AddCompanies';
import CompanySetup from './admin/CompanySetup';
import AdminJobs from './admin/AdminJobs';
import PostJobs from './admin/PostJobs';
import Applicants from './admin/Applicants';
import AdminJobsList from './admin/AdminJobsList';
import JobSetup from './admin/JobSetup';

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/search",
    element:<Search/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/description/:id",
    element:<JobDetails/>
  },
  {
    path:"/admin/companies",
    element:<Companies/>
  },
  {
    path:"/admin/companies/create",
    element:<AddCompanies/>
  },
  {
    path:"/admin/companies/:id",
    element:<CompanySetup/>
  },
  {
    path:"/admin/jobs",
    element:<AdminJobs/>
  },
  {
    path:"/admin/jobs/create",
    element:<PostJobs/>
  },
  {
    path:"/admin/jobs/:id",
    element:<JobSetup/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
  },
])
function App() {


  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
