import React, { useRef } from 'react';
import { mdiAccountOutline, mdiLockOutline } from '@mdi/js';

import Icon from '@mdi/react';
import { Form, Input } from '../../components/form';
import { request } from '../../services/request';
import { useHistory } from 'react-router-dom';
import { Alert } from '../../utils';

const Login = () => {
  const loginForm = useRef<any>(null);
  const history = useHistory();
  async function login() {
    let data = loginForm.current.getData();

    console.log(data);
    let response = await request({
      showSuccessMessage: false,
      method: 'POST',
      path: 'auth',
      data,
    });
    if (!response.error) {
      if (!response.token) {
        Alert.success(response.msg);
        return;
      }
      localStorage.setItem(
        process.env.REACT_APP_KEY_TOKEN ?? '',
        response.token,
      );
      history.push('/');
    }
    console.log(response);
  }

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-stretch auth auth-img-bg">
          <div className="row flex-grow">
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <div className="auth-form-transparent text-left p-3">
                <div className="brand-logo">
                  <span>FAZENDA DONIDA</span>
                </div>
                <Form className="pt-3" ref={loginForm} onSubmit={login}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail">Login</label>
                    <div className="input-group">
                      <div className="input-group-prepend bg-transparent">
                        <span className="input-group-text bg-transparent border-right-0">
                          <Icon
                            path={mdiAccountOutline}
                            title="Usuário"
                            size={1}
                          />
                        </span>
                      </div>
                      <Input
                        type="text"
                        name="login"
                        className="form-control form-control-lg border-left-0"
                        placeholder="Login"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword">Senha</label>
                    <div className="input-group">
                      <div className="input-group-prepend bg-transparent">
                        <span className="input-group-text bg-transparent border-right-0">
                          <Icon path={mdiLockOutline} title="Senha" size={1} />
                        </span>
                      </div>
                      <Input
                        type="password"
                        name="password"
                        className="form-control form-control-lg border-left-0"
                        placeholder="Senha"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    >
                      Entrar
                    </button>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-lg-6 login-half-bg d-flex flex-row">
              <p className="text-white font-weight-medium text-center flex-grow align-self-end">
                Copyright © 2020 Todos os direitos reservados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
