import React, { useState, useEffect } from 'react';
import { request } from '../../services/request';
import { useHistory } from 'react-router-dom';
import { Table } from '../../components/form';
import { mdiEye, mdiFileDocumentMultipleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import moment from 'moment';

const DpsList = () => {
  const [calf, setCalf] = useState([{}]);
  const history = useHistory();
  const columns = [
    {
      name: 'earringId',
      label: 'Brinco',
    },
    {
      name: 'sex',
      label: 'Sexo',
    },
    {
      name: 'weightOne',
      label: 'Peso 1',
    },
    {
      name: 'weightTwo',
      label: 'Peso 2',
    },
    {
      name: 'weightThree',
      label: 'Peso 3',
    },
    {
      name: 'dateWeightOne',
      label: 'Data da Pesagem 1',
    },
    {
      name: 'dateWeightTwo',
      label: 'Data da Pesagem 2',
    },
    {
      name: 'dateWeightThree',
      label: 'Data da Pesagem 3',
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
      path: 'calf/all',
    });

    if (response && !response.error) {
      let dataToTable = [];

      for (const calfData of response) {
        let data = {
          earringId: calfData.calf.earringId,
          sex: calfData.calf.sex,
          weightOne: calfData.calf.weightOne,
          weightTwo: calfData.calf.weightTwo,
          weightThree: calfData.calf.weightThree,
          dateWeightOne: moment(calfData.calf.dateWeightOne).format(
            'DD/MM/YYYY',
          ),
          dateWeightTwo: moment(calfData.calf.dateWeightTwo).format(
            'DD/MM/YYYY',
          ),
          dateWeightThree: moment(calfData.calf.dateWeightThree).format(
            'DD/MM/YYYY',
          ),
        };
        dataToTable.push(data);
      }
      setCalf(dataToTable);
    }
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
              onClick={e => history.push(`animal/novo`)}
            >
              Novo Animal
            </button>
            <div className="table-responsive">
              <Table title="Animais" data={calf} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DpsList;
