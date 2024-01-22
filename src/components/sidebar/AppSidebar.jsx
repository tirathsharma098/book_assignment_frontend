import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CSidebar, CSidebarNav, CSidebarToggler } from '@coreui/react';
import { AppSidebarNav } from './AppSidebarNav';
import SimpleBar from 'simplebar-react';
// sidebar nav config
import { getNavigationArray } from '../../_nav';
import { sidebarActions } from '../../store/sidebar';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  const [userType, setUserType] = useState('');
  useEffect(() => {
    setUserType(localStorage.getItem('user_type'));
  }, []);
  return (
    <CSidebar
      unfoldable={unfoldable}
      position="fixed"
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(sidebarActions.set({ sidebarShow: visible }));
      }}
    >
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={getNavigationArray({ userType })} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(sidebarActions.set({ sidebarUnfoldable: !unfoldable }))}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
