import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { Input, Form } from '../../components/form';
import { request } from '../../services/request';
import { Utils } from '../../utils';

export default function NewMedicine({ match }: { match: any }) {
  const formRef = useRef<any>(null);
  const history = useHistory();

  async function handleSubmit() {
    let data = formRef.current.getData();

    const res = Utils.changeEmptyValueToNull(
      await request({
        method: 'POST',
        path: 'medicine',
        data: data,
      }),
    );

    if (!res.error) {
      formRef.current.reset();
    }
    history.push('/');
  }

  return (
    <div className="row mb-4">
      <div className="col-md-8 m-auto">
        <div className="card">
          <div className="card-body">
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h4 className="card-title"> Criar nova aplicação</h4>
              <div className="form-row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="name">Brinco</label>
                    <Input
                      id="earringId"
                      name="earringId"
                      type="text"
                      className="form-control"
                      placeholder="Digite o número do brinco"
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="vermifuge">Vermífugo</label>
                    <Input
                      id="vermifuge"
                      name="vermifuge"
                      className="form-control"
                      placeholder="Vermífugo"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="supplementation">Suplementação</label>
                      <Input
                        id="supplementation"
                        name="supplementation"
                        className="form-control"
                        placeholder="Suplementação"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="remedy">Remédio</label>
                      <Input
                        id="remedy"
                        name="remedy"
                        className="form-control"
                        placeholder="Remédio"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="remedyId">Id. Remédio</label>
                      <Input
                        id="remedyId"
                        name="remedyId"
                        className="form-control"
                        placeholder="Id. Remédio"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="date">Data da aplicação</label>
                    <Input
                      id="date"
                      name="date"
                      type="text"
                      className="form-control"
                      placeholder="Data da aplicação"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="dateValidate">Reforço</label>
                    <Input
                      id="dateValidate"
                      name="dateValidate"
                      type="text"
                      className="form-control"
                      placeholder="Reforço"
                    />
                  </div>
                </div>
              </div>
              <button className="btn btn-primary float-right">Cadastrar</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
