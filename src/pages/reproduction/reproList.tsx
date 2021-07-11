import React, { useState, useEffect } from 'react';
import { request } from '../../services/request';
import { useHistory } from 'react-router-dom';
import { Table } from '../../components/form';
import { mdiEye, mdiFileDocumentMultipleOutline } from '@mdi/js';
import Icon from '@mdi/react';

const ReproductionList = () => {
  const [calf, setCalf] = useState([{}]);
  const history = useHistory();
  const columns = [
    {
      name: 'earringId',
      label: 'Brinco',
    },
    {
      name: 'vermifuge',
      label: 'Vermífugo',
    },
    {
      name: 'supplementation',
      label: 'Suplementação',
    },
    {
      name: 'date',
      label: 'Data da Ovulação',
    },
    {
      name: 'winDate',
      label: 'Previsão de Nascer',
    },
    {
      name: '_id',
      label: 'Ações',
      options: {
        filter: false,
        customBodyRender: (v: any) => {
          return (
            <>
              <button
                type="button"
                className="btn btn-outline-primary btn-fw"
                style={{ marginLeft: '8px' }}
                onClick={e => history.push(`calf/${v}`)}
              >
                <Icon size={0.7} className="menu-icon" path={mdiEye} />
              </button>
              <a
                type="button"
                className="btn btn-outline-primary btn-fw"
                style={{ marginLeft: '8px' }}
                href={`${process.env.REACT_APP_BASE_API_URL}/dps/${v}/pdf`}
              >
                <Icon
                  size={0.7}
                  className="menu-icon"
                  path={mdiFileDocumentMultipleOutline}
                />
              </a>
            </>
          );
        },
      },
    },
  ];

  async function getCalf() {
    let response = await request({
      showSuccessMessage: false,
      method: 'GET',
      path: 'calfs',
    });
    // if (response && !response.error) {
    //   let dataToTable = [];
    //   for (const calfData of response) {
    //     let data = {
    //       earringId: calfData.calf.earringId,
    //       weight: calfData.calf.weight,
    //       date: moment(calfData.calf.date.split('T')[0]).format('DD/MM/YYYY'),
    //     };
    //     dataToTable.push(data);
    //   }
    //   setCalf(dataToTable);
    // }
  }

  useEffect(() => {
    getCalf();
  }, []);

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
              Novo Animal
            </button>
            <div className="table-responsive">
              <Table title="Reprodução" data={calf} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReproductionList;
