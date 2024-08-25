// component
import Iconify from '../../components/Iconify';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

// Define navConfig with default values
export const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('pajamas:tachometer'),
  },
  {
    title: 'Grievances',
    path: '/dashboard/Grievances',
    icon: getIcon('fluent:notepad-edit-20-regular'),
    notifications: 24 // Default value
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
      // {
      //   title: 'Remove Karyakartha',
      //   path: '/dashboard/Karyakarthas/remove',
      // },
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
  // Additional items can be added here
];

export const GetNavConfig = (notification) => 
  navConfig.map(item => 
    item.title === 'Grievances' 
      ? { ...item, notifications: notification || item.notifications } 
      : item
  );
