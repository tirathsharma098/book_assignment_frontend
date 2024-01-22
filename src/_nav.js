import { CNavGroup, CNavItem } from '@coreui/react';

export const getNavigationArray = ({ userType }) => {
  const _nav = [
    {
      component: CNavItem,
      name: 'Home',
      to: '/',
      icon: <i className="pi pi-home pr-3" />,
      badge: {
        color: 'info',
      },
    },
  ];
  if (userType === "super_admin") {
    _nav.push(
      {
        component: CNavGroup,
        name: 'Admin',
        icon: <i className="pi pi-shield pr-3" />,
        items: [
          {
            component: CNavItem,
            name: 'Users List',
            icon: <i className="pi pi-user pr-3" />,
            to: '/admin/users',
          },
        ],
      })
  }
  _nav.push({  component: CNavItem,
    name: 'Book',
    to: '/book',
    icon: <i className="pi pi-book pr-3" />,
    badge: {
      color: 'info',
    },
  })
  return _nav;
};
