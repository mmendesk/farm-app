import React, { useRef, useState } from 'react';

import { Select, Checkbox, Form, Input } from '../../components/form';
import { Utils } from '../../utils';
import { request } from '../../services/request';
import { useParams } from 'react-router-dom';

export default function EditUser() {
  const formRef = useRef<any>(null);
  const { _id }: { _id: string } = useParams();
  const [userTypes, setUserTypes] = useState([]);

  const handleSubmit = async () => {
    let data = Utils.changeEmptyValueToNull(formRef.current.getData());
    await request({
      method: 'PUT',
      path: `user/${_id}`,
      data,
    });
  };

  // const getData = useCallback(async () => {
  //   const res = await request({
  //     method: 'GET',
  //     path: `user/${_id}`,
  //     showSuccessMessage: false,
  //   });

  //   if (!res.error) {
  //     setUserTypes(
  //       res.userTypes.map((type: any) => {
  //         return {
  //           label: type.name,
  //           value: type._id,
  //         };
  //       }),
  //     );

  //     formRef.current.setData({
  //       name: res.user.name,
  //       login: res.user.login,
  //       userTypeId: res.user.userTypeId,
  //       active: res.user.active,
  //     });
  //   }
  // }, [_id]);

  // useEffect(() => {
  //   console.log(formRef);
  //   getData();
  // }, [getData]);

  return (
    <div className="row mb-4">
      <div className="col-md-8 m-auto">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Editar usuário</h4>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="Digite o nome"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="email">Login</label>
                    <Input
                      id="login"
                      name="login"
                      type="text"
                      className="form-control"
                      placeholder="Digite o login"
                    />
                  </div>
                </div>
                {/* <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="userTypeId">Tipo do usuário</label>
                    <Select
                      name="userTypeId"
                      id="userTypeId"
                      options={userTypes}
                      placeholder="Selecione um tipo"
                    />
                  </div>
                </div> */}
              </div>

              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Senha</label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Digite a senha"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="passwordRepeat">Repita a senha</label>
                    <Input
                      id="passwordRepeat"
                      name="passwordRepeat"
                      type="password"
                      className="form-control"
                      placeholder="Repita a senha"
                    />
                  </div>
                </div>
                <Checkbox
                  name="active"
                  options={[{ id: 'true', value: true, label: 'Ativo' }]}
                />
              </div>
              <button className="btn btn-primary float-right">Editar</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
