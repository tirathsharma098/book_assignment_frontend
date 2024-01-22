import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import style from './AppHeader.module.css';
import { sidebarActions } from '../../store/sidebar';
import { Avatar } from 'primereact/avatar';

const AppHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  const profileMenuRef = useRef(null);
  // get notification count and set state
  let profileMenuItems = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: (e) => {
        navigate('/user-profile-new');
      },
    },
    { label: 'Settings', icon: 'pi pi-cog' },
    { separator: true },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: (e) => {
        navigate('/logout');
      },
    },
  ];
  return (
    <>
      <div className={style.mainNav}>
        <div>
          <ul className={style.topnav}>
            <li onClick={() => dispatch(sidebarActions.set({ sidebarShow: !sidebarShow }))}>
              <i className="pi pi-bars" style={{ fontSize: '1.5rem' }}></i>
            </li>
            <li
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </li>
          </ul>
        </div>
        <div>
          <ul>
            
            <li onClick={(event) => profileMenuRef.current.toggle(event)}>
              <Avatar
                image="/assets/images/TirathSharmaProfilePic.jpeg"
                shape="circle"
                className={style.navItem}
                aria-haspopup
                aria-controls="profile_menu_popup"
              />
              <Menu
                model={profileMenuItems}
                popup
                ref={profileMenuRef}
                id="profile_menu_popup"
                popupAlignment="left"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AppHeader;
