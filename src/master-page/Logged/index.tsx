import Header from './Header';
import React from 'react';
import Sidebar from './Sidebar';
import Icon from '@mdi/react';
import { mdiHeart } from '@mdi/js';

const LoggedDashboard = (props: any) => {
  return (
    <div id="wrapper" className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />

        <div className="main-panel">
          <div className="content-wrapper">{props.children}</div>
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 2020. Todos os direitos reservados.
              </span>
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                Feito a mão &amp; Desenvolvido com o{' '}
                <Icon className="text-danger" path={mdiHeart} size={0.7} />
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoggedDashboard;
