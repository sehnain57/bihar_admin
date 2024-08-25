import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//

import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Grievances from './pages/Grievances';
import AddUser from './pages/User/AddUser';
import RemoveUser from './pages/User/RemoveUser';
import UserList from './pages/User/UserList';
import AddEvent from './pages/Events/AddEvent';
import EventsList from './pages/Events/EventsList';
import EventRequest from './pages/Events/EventRequest';
import AddKaryakarthas from './pages/Karyakarthas/AddKaryakarthas';
import KaryakarthasList from './pages/Karyakarthas/KaryakarthasList';
// import RemoveKaryakarthas from './pages/Karyakarthas/RemoveKaryakarthas';
import PushNotifications from './pages/PushNotifications';
import Analytics from './pages/Analytics';
import VotersList from './pages/VotersList';
import AddConstituency from './pages/Constituency/AddConstituency';
import ConstituencyList from './pages/Constituency/ConstituencyList';
import AddBooth from './pages/Constituency/AddBooth';
import BoothList from './pages/Constituency/BoothList';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Navigate to="app" /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'Grievances', element: <Grievances /> },
        { path: 'Users/add', element: <AddUser /> },
        { path: 'Users/list', element: <UserList /> },
        { path: 'Users/remove', element: <RemoveUser /> },
        { path: 'Events/add', element: <AddEvent /> },
        { path: 'Events/list', element: <EventsList /> },
        { path: 'Events/requests', element: <EventRequest /> },
        { path: 'Karyakarthas/add', element: <AddKaryakarthas /> },
        { path: 'Karyakarthas/list', element: <KaryakarthasList /> },
        // { path: 'Karyakarthas/remove', element: <RemoveKaryakarthas /> },
        { path: 'Push-notification', element: <PushNotifications /> },
        { path: 'Analytics', element: <Analytics /> },
        { path: 'Voters-list', element: <VotersList /> },
        { path: 'Constituency/add', element: <AddConstituency /> },
        { path: 'Constituency/list', element: <ConstituencyList /> },
        { path: 'Constituency/booth', element: <AddBooth /> },
        { path: 'Booth/list', element: <BoothList /> },


        // { path: 'products', element: <Products /> },
        // { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
