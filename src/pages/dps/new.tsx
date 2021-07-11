import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { Input, Form, Select, Checkbox } from '../../components/form';
import { request } from '../../services/request';
import { Utils } from '../../utils';

export default function NewCalf({ match }: { match: any }) {
  const formRef = useRef<any>(null);
  const history = useHistory();

  async function handleSubmit() {
    let data = formRef.current.getData();

    const res = Utils.changeEmptyValueToNull(
      await request({
        method: 'POST',
        path: 'calf',
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
                    <label htmlFor="sex">Sexo</label>
                    <Input
                      id="sex"
                      name="sex"
                      className="form-control"
                      placeholder="Sexo"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="weightOne">Pesagem 1</label>
                      <Input
                        id="weightOne"
                        name="weightOne"
                        className="form-control"
                        placeholder="Digite o peso"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="weightTwo">Pesagem 2</label>
                      <Input
                        id="weightTwo"
                        name="weightTwo"
                        className="form-control"
                        placeholder="Digite o peso"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="weightThree">Pesagem 3</label>
                      <Input
                        id="weightThree"
                        name="weightThree"
                        className="form-control"
                        placeholder="Digite o peso"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="dateWeightOne">Primeira Pesagem</label>
                    <Input
                      id="dateWeightOne"
                      name="dateWeightOne"
                      type="text"
                      className="form-control"
                      placeholder="Data da Primeira Pesagem"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="dateWeightTwo">Segunda Pesagem</label>
                    <Input
                      id="dateWeightTwo"
                      name="dateWeightTwo"
                      type="text"
                      className="form-control"
                      placeholder="Data da Segunda Pesagem"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="dateWeightThree">Terceira Pesagem</label>
                    <Input
                      id="dateWeightThree"
                      name="dateWeightThree"
                      type="text"
                      className="form-control"
                      placeholder="Data da Terceira Pesagem"
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
