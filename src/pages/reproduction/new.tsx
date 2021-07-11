import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { Input, Form } from '../../components/form';
import { request } from '../../services/request';
import { Utils } from '../../utils';

export default function NewReproduction({ match }: { match: any }) {
  const formRef = useRef<any>(null);
  const history = useHistory();

  async function handleSubmit() {
    let data = formRef.current.getData();

    const res = Utils.changeEmptyValueToNull(
      await request({
        method: 'POST',
        path: 'reproduction',
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
              <h4 className="card-title"> Criar novo Animal</h4>
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
                      <label htmlFor="insemination">Inseminação</label>
                      <Input
                        id="insemination"
                        name="insemination"
                        className="form-control"
                        placeholder="Inseminação"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="winDate">Previsão Nascimento</label>
                      <Input
                        id="winDate"
                        name="winDate"
                        className="form-control"
                        placeholder="Previsão Nascimento"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="ride">Monta</label>
                    <Input
                      id="ride"
                      name="ride"
                      type="text"
                      className="form-control"
                      placeholder="Monta"
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
