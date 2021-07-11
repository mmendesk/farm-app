import React, { useState, useEffect } from 'react';
import { request } from '../../services/request';
import { useHistory } from 'react-router-dom';
import { Table } from '../../components/form';
import moment from 'moment';
import { statusTranslater } from '../../utils/utilsFunction';

import { mdiEye } from '@mdi/js';
import Icon from '@mdi/react';

const TelesubscriptionsList = () => {
  const [telesubscritions, setTelesubscritions] = useState([{}]);
  const history = useHistory();
  const columns = [
    {
      name: 'earringId',
      label: 'Brinco',
    },
    {
      name: 'remedy',
      label: 'Vacina',
    },
    {
      name: 'remedyId',
      label: 'Identificador da Vacina',
    },
    {
      name: 'date',
      label: 'Data da Aplicação',
    },
    {
      name: 'dateValidate',
      label: 'Próxima Aplicação',
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
              className="btn btn-outline-primary"
              style={{ marginLeft: '8px' }}
              onClick={e => history.push(`telesubscription/${v}`)}
            >
              <Icon size={0.7} className="menu-icon" path={mdiEye} />
            </button>
          );
        },
      },
    },
  ];

  async function getTelesubscritions() {
    let response = await request({
      showSuccessMessage: false,
      method: 'GET',
      path: 'telesubscription',
    });
    if (response && !response.error) {
      let dataToTable = [];
      for (const tele of response) {
        let data = {
          _id: tele._id,
          name: tele.patient.name,
          email: tele.patient.email,
          status: statusTranslater(tele.status),
          createdAt: moment(tele.createdAt).format('DD/MM/YYYY'),
        };
        dataToTable.push(data);
      }
      setTelesubscritions(dataToTable);
    }
  }

  useEffect(() => {
    getTelesubscritions();
  }, []); //eslint-disable-line

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <Table
                title="Telesubscrições"
                data={telesubscritions}
                columns={columns}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelesubscriptionsList;
