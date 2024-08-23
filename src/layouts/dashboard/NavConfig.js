// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: getIcon('pajamas:tachometer'),
  },
  {
    title: 'Grievances',
    path: '/dashboard/Grievances',
    icon: getIcon('fluent:notepad-edit-20-regular'),
    notifications: 24
  },
  {
    title: 'Events & Schedules',
    // path: '/dashboard/Events',
    icon: getIcon('tabler:vector-triangle'),
    children: [
      {
        title: 'Add Event',
        path: '/dashboard/Events/add',
      },
      {
        title: 'Event Requests',
        path: '/dashboard/Events/requests',
      },
      {
        title: 'Events List',
        path: '/dashboard/Events/list',
      },
    ],
  },
  {
    title: 'Karyakarthas',
    // path: '/dashboard/Karyakarthas',
    icon: getIcon('eva:file-text-fill'),
    children: [
      {
        title: 'Add New',
        path: '/dashboard/Karyakarthas/add',
      },
      {
        title: 'Karyakartha List',
        path: '/dashboard/Karyakarthas/list',
      },
      {
        title: 'Remove Karyakartha',
        path: '/dashboard/Karyakarthas/remove',
      },
    ],
  },
  {
    title: 'Users',
    // path: '/dashboard/Users',
    icon: getIcon('heroicons:users'),
    children: [
      {
        title: 'Add User',
        path: '/dashboard/Users/add',
      },
      {
        title: 'Remove User',
        path: '/dashboard/Users/remove',
      },
      {
        title: 'User List',
        path: '/dashboard/Users/list',
      },
    ],
  },
  {
    title: 'Push Notifications',
    path: '/dashboard/Push-notification',
    icon: getIcon('typcn:bell'),
  },
  {
    title: 'Voters Lists',
    path: '/dashboard/Voters-list',
    icon: getIcon('fluent:clipboard-bullet-list-20-regular'),
  },
  {
    title: 'Analytics',
    path: '/dashboard/Analytics',
    icon: getIcon('hugeicons:analytics-up'),
  },

  {
    title: 'Constituency',
    // path: '/dashboard/Constituency',
    icon: getIcon('heroicons:users'),
    children: [
      {
        title: 'Add Constituency',
        path: '/dashboard/Constituency/add',
      },
      {
        title: 'Add Booth',
        path: '/dashboard/Constituency/booth',
      },
      {
        title: 'Constituency List',
        path: '/dashboard/Constituency/list',
      },
      {
        title: 'Booth List',
        path: '/dashboard/Booth/list',
      },
    ],
  },
  // {
  //   title: 'CMS',
  //   path: '/dashboard/CMS',
  //   icon: getIcon('flowbite:users-solid'),
  // },
  // {
  //   title: 'Search Log',
  //   path: '/dashboard/Search',
  //   icon: getIcon("ic:baseline-search"),
  // },
  // {
  //   title: 'Users',
  //   path: '/dashboard/user',
  //   icon: getIcon('flowbite:users-solid'),
  // },
  // {
  //   title: 'Settings',
  //   path: '/dashboard/products',
  //   icon: getIcon('ic:baseline-settings'),
  // },
  // {
  //   title: 'Localization',
  //   path: '/dashboard/blog',
  //   icon: getIcon('heroicons:language-solid'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
