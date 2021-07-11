import { Alert } from '../utils';
import { Dispatch } from '../redux/store';
import axios, { AxiosRequestConfig } from 'axios';

interface IRequest {
  showLoading?: Boolean;
  loadingMessage?: string;
  timeout?: number;
  showSuccessMessage?: Boolean;
  showErrorMessage?: Boolean;
  method:
    | 'get'
    | 'GET'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'
    | 'purge'
    | 'PURGE'
    | 'link'
    | 'LINK'
    | 'unlink'
    | 'UNLINK'
    | undefined;
  path: string;
  baseUrl?: string;
  data?: any;
}

export const request = (params: IRequest): Promise<any> => {
  const showLoading =
    params.showLoading !== undefined ? params.showLoading : true;
  const loadingMessage =
    params.loadingMessage !== undefined ? params.loadingMessage : 'Carregando';
  const timeout = params.timeout !== undefined ? params.timeout : 10000;
  const showSuccessMessage =
    params.showSuccessMessage !== undefined ? params.showSuccessMessage : true;
  const showErrorMessage =
    params.showErrorMessage !== undefined ? params.showErrorMessage : true;
  const method = params.method;
  const path = params.path;
  const baseUrl = params.baseUrl;
  let data = params.data;

  let showLoadingTimout: any = null;
  if (showLoading) {
    showLoadingTimout = setTimeout(function () {
      Dispatch({
        type: 'show_loader',
        show: true,
      });
      Dispatch({
        type: 'loader_set_message',
        message: loadingMessage,
      });
    }, 1000);
  }

  const base_url = !baseUrl ? process.env.REACT_APP_BASE_API_URL : baseUrl;
  return new Promise(async (resolve, reject) => {
    let config: AxiosRequestConfig = {
      method: method,
      url: `${base_url}/${path}`,
      timeout: timeout,
    };

    let token = localStorage.getItem(process.env.REACT_APP_KEY_TOKEN ?? '');
    config.headers = {};
    if (token) {
      config.headers = {
        Authorization: token,
      };
    }

    if (data) {
      config.data = data;
    }

    return axios(config)
      .then(response => {
        clearTimeout(showLoadingTimout);
        Dispatch({
          type: 'show_loader',
          show: false,
        });
        if (showSuccessMessage) {
          Alert.success(response.data.msg);
        }
        resolve(response.data);
      })
      .catch(error => {
        clearTimeout(showLoadingTimout);
        Dispatch({
          type: 'show_loader',
          show: false,
        });
        if (showErrorMessage) {
          if (error.response && error.response.data) {
            if (error.response.data.errors) {
              Alert.html(
                'Oops',
                error.response.data.errors.join('<br />'),
                'error',
              );
            } else {
              Alert.error(error.response.data.msg);
            }
          }
        }
        resolve({
          error: error.response ? error.response.data : 'timeout',
        });
      });
  });
};

export function getPayload() {
  const token = localStorage.getItem(process.env.REACT_APP_KEY_TOKEN ?? '');

  if (!token) {
    return {};
  }
  return JSON.parse(atob(token.split('.')[1]));
}
