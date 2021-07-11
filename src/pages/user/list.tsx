import React, { useState, useEffect } from 'react';
import { request } from '../../services/request';
import { useHistory } from 'react-router-dom';
import { Table } from '../../components/form';
import { mdiLeadPencil } from '@mdi/js';
import Icon from '@mdi/react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const columns = [
    {
      name: 'name',
      label: 'Nome',
    },
    {
      name: 'login',
      label: 'Login',
    },
    {
      name: 'status',
      label: 'Status',
    },
    {
      name: '_id',
      label: 'Ações',
      options: {
        filter: false,
        customBodyRender: (v: any) => {
          return (
            <button
              type="button"
              className="btn btn-outline-primary btn-fw"
              onClick={e => history.push(`usuarios/${v}/editar`)}
            >
              <Icon size={0.7} className="menu-icon" path={mdiLeadPencil} />
            </button>
          );
        },
      },
    },
  ];

  async function getUsers() {
    let response = await request({
      showSuccessMessage: false,
      method: 'GET',
      path: 'users',
    });

    if (response && !response.error) {
      setUsers(
        response.map((user: any) => {
          user.status = user.status ? 'Ativo' : 'Inativo';

          return user;
        }),
      );
    }
  }

  useEffect(() => {
    getUsers();
  }, []); //eslint-disable-line

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <button
              type="button"
              className="btn btn-sm btn-primary float-right"
              onClick={e => history.push(`usuarios/novo`)}
            >
              Novo usuário
            </button>
            <div className="table-responsive">
              <Table title="Usuários" data={users} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
