import React, { useEffect, useState } from 'react';
import {
  mdiAccountMultiple,
  mdiAlphaMBox,
  mdiPig,
  mdiAlphaRCircle,
} from '@mdi/js';

import Icon from '@mdi/react';
import { Link } from 'react-router-dom';
import { getPayload, request } from '../../services/request';
import { useHistory } from 'react-router-dom';

export default function Sidebar() {
  const [menu, setMenu] = useState<Array<TMenu>>([]);
  const [clientMenu, setClientMenu] = useState<Array<TMenu>>([]);
  const route = useHistory();

  interface IUser {
    name: string;
    type: string;
  }

  type TMenu = {
    name: string;
    title: string;
    path: string;
    icon: string;
    active?: Boolean;
  };

  async function getTypeUsers() {
    let response: IUser = await request({
      method: 'GET',
      path: 'user/me',
      showSuccessMessage: false,
    });

    if (response.type === 'admin') {
      setClientMenu([
        {
          name: 'Animais',
          title: 'Animais',
          path: '/',
          icon: mdiPig,
        },
        {
          name: 'Medicamentos',
          title: 'Medicamentos',
          path: '/medicines',
          icon: mdiAlphaMBox,
        },
        {
          name: 'Reprodução',
          title: 'Reprodução',
          path: '/reproduction',
          icon: mdiAlphaRCircle,
        },
        {
          name: 'users',
          title: 'Usuários',
          path: '/usuarios',
          icon: mdiAccountMultiple,
        },
      ]);
    } else {
      setClientMenu([
        {
          name: 'Animais',
          title: 'ANIMAIS',
          path: '/',
          icon: mdiPig,
        },
        {
          name: 'Medicamentos',
          title: 'MEDICAMENTOS',
          path: '/telesubscription',
          icon: mdiAlphaMBox,
        },
      ]);
    }
  }

  const changeTitleHead = (title: string) => {
    const titleEl = document.querySelector('title');
    if (titleEl) {
      titleEl.text = title;
    }
  };

  useEffect(() => {
    getTypeUsers();
  }, []);

  useEffect(() => {
    let newMenu: Array<TMenu> = [];
    let title = 'DPS';
    clientMenu.forEach(m => {
      if (route.location.pathname === '/' && m.path === '/') {
        m.active = true;
        title = `${title} - ${m.title}`;
      } else if (
        route.location.pathname.indexOf(m.path) > -1 &&
        m.path !== '/'
      ) {
        m.active = true;
        title = `${title} - ${m.title}`;
      } else {
        m.active = false;
      }
      newMenu.push(m);
    });
    changeTitleHead(title);
    setMenu(newMenu);
  }, [route.location.pathname, clientMenu]); // eslint-disable-line

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-profile">
        <div className="d-flex align-items-center justify-content-between">
          <div className="profile-desc">
            <p className="name mb-0">{getPayload().name}</p>
          </div>
        </div>
      </div>
      <ul className="nav">
        {menu.map(menu => {
          return (
            <li
              className={menu.active ? 'nav-item active' : 'nav-item'}
              key={menu.title}
            >
              <Link className="nav-link" to={menu.path}>
                <Icon size={0.7} className="menu-icon" path={menu.icon} />
                <span className="menu-title">{menu.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
