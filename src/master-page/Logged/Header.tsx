import { mdiMenu, mdiAccount, mdiLogout } from '@mdi/js';
import Icon from '@mdi/react';
import Logo from '../../assets/images/logo.png';
import React from 'react';

export default function Header() {
  const dropDownUser = () => {
    const dropDownUserEl = document.querySelector(
      '#dropDownUser',
    ) as HTMLDivElement;

    if (
      (dropDownUserEl && dropDownUserEl.style.display === 'none') ||
      dropDownUserEl.style.display === ''
    ) {
      dropDownUserEl.style.display = 'block';
    }
    document.body.addEventListener('click', () => {
      if (dropDownUserEl && dropDownUserEl.style.display === 'block') {
        dropDownUserEl.style.display = 'none';
      }
    });
  };

  const handleMenuReduceMobile = () => {
    const sideBarOffCanvasEl = document.querySelector(
      '.sidebar.sidebar-offcanvas',
    ) as HTMLDivElement;
    if (
      sideBarOffCanvasEl &&
      !sideBarOffCanvasEl.classList.contains('active')
    ) {
      sideBarOffCanvasEl.classList.add('active');
      return;
    }

    sideBarOffCanvasEl.classList.remove('active');
  };

  const handleMenuReduce = () => {
    const bodyEl = document.querySelector('body') as HTMLBodyElement;
    if (bodyEl && !bodyEl.classList.contains('sidebar-icon-only')) {
      bodyEl.classList.add('sidebar-icon-only');
      return;
    }
    bodyEl.classList.remove('sidebar-icon-only');
  };

  function logout() {
    localStorage.removeItem(process.env.REACT_APP_KEY_TOKEN ?? '');
    window.location.pathname = '/login';
  }

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo" href="/">
          <span>FAZENDA DONIDA</span>
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown">
            <button type="button" className="nav-link" onClick={dropDownUser}>
              <Icon size={0.7} path={mdiAccount} />
            </button>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              id="dropDownUser"
            >
              <button type="button" className="dropdown-item" onClick={logout}>
                <Icon size={0.7} path={mdiLogout} />
                Logout
              </button>
            </div>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
          onClick={handleMenuReduceMobile}
        >
          <Icon path={mdiMenu} size={0.7} />
        </button>
      </div>
    </nav>
  );
}
