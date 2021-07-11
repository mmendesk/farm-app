import React, { useState, useEffect } from 'react';
import { request } from '../../services/request';
import { useHistory } from 'react-router-dom';
import { Table } from '../../components/form';
import moment from 'moment';

import { mdiEye } from '@mdi/js';
import Icon from '@mdi/react';

const MedicineList = () => {
  const [medicine, setMedicine] = useState([{}]);
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
      name: 'vermifuge',
      label: 'Vermífugo',
    },
    {
      name: 'supplementation',
      label: 'Suplementação',
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
      path: 'medicine/all',
    });

    if (response && !response.error) {
      let dataToTable = [];
      for (const medicineData of response) {
        let data = {
          earringId: medicineData.medicine.earringId,
          vermifuge: medicineData.medicine.vermifuge,
          supplementation: medicineData.medicine.supplementation,
          remedy: medicineData.medicine.remedy,
          remedyId: medicineData.medicine.remedyId,
          date: moment(medicineData.medicine.date).format('DD/MM/YYYY'),
          dateValidate: moment(medicineData.medicine.dateValidate).format(
            'DD/MM/YYYY',
          ),
        };
        dataToTable.push(data);
      }
      setMedicine(dataToTable);
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
            <button
              type="button"
              className="btn btn-sm btn-primary float-right"
              onClick={e => history.push(`medicamento/novo`)}
            >
              Nova Aplicação
            </button>
            <div className="table-responsive">
              <Table title="Medicamentos" data={medicine} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineList;
