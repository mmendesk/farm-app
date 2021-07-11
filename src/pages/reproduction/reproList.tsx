import React, { useState, useEffect } from 'react';
import { request } from '../../services/request';
import { useHistory } from 'react-router-dom';
import { Table } from '../../components/form';
import { mdiEye, mdiFileDocumentMultipleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import moment from 'moment';

const ReproductionList = () => {
  const [reproduction, setRepro] = useState([{}]);
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
      name: 'insemination',
      label: 'Inseminação',
    },
    {
      name: 'ride',
      label: 'Monta',
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

  async function getReproduction() {
    let response = await request({
      showSuccessMessage: false,
      method: 'GET',
      path: 'reproduction/all',
    });

    if (response && !response.error) {
      let dataToTable = [];
      for (const reproductionData of response) {
        console.log(reproductionData);
        let data = {
          earringId: reproductionData.repros.earringId,
          vermifuge: reproductionData.repros.vermifuge,
          supplementation: reproductionData.repros.supplementation,
          insemination: moment(reproductionData.repros.insemination).format(
            'DD/MM/YYYY',
          ),
          ride: moment(reproductionData.repros.ride).format('DD/MM/YYYY'),
          winDate: moment(reproductionData.repros.winDate).format('DD/MM/YYYY'),
        };
        dataToTable.push(data);
      }
      setRepro(dataToTable);
    }
  }

  useEffect(() => {
    getReproduction();
  }, []); //eslint-disable-line

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <button
              type="button"
              className="btn btn-sm btn-primary float-right"
              onClick={e => history.push(`reproducao/novo`)}
            >
              Nova Reprodução
            </button>
            <div className="table-responsive">
              <Table title="Reprodução" data={reproduction} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReproductionList;
