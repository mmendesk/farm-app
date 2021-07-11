import React, { useRef } from 'react';
import { request } from '../../services/request';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { Form, Select, TextArea } from '../../components/form';
import { statusTranslater, scoreTranslater } from '../../utils/utilsFunction';
import { sex, status } from '../../types';

interface IPatientDTO {
  _id: string;
  name: string;
  email: string;
  cpf: string;
  cep: string;
  phone: string;
  sex: sex;
  birthday: Date;
  age: number;
}

const PatientSideContent = (props: {
  patient: IPatientDTO | null;
  status: status | null;
  telesubscriptionFormRef?: any;
  questionsStatic?: any;
  score?: Float32Array | null;
}) => {
  const history = useHistory();
  const statusForm = useRef<any>(null);
  const { _id }: { _id: string } = useParams();

  const handleSubmit = async () => {
    const questions = [];
    if (props.questionsStatic) {
      for (const quest of props.questionsStatic) {
        const data = {
          questionTitle: quest.title,
          answer: props.telesubscriptionFormRef.current.getData()[quest.id],
        };
        questions.push(data);
      }
    }
    const formData = {
      questions: questions,
      status: statusForm.current.getData().status,
      obs: statusForm.current.getData().obs,
    };
    const update = await request({
      showSuccessMessage: false,
      method: 'PUT',
      path: props.questionsStatic ? `telesubscription/${_id}` : `dps/${_id}`,
      data: formData,
    });

    if (!update.error) {
      history.push(`/${props.questionsStatic ? 'telesubscription' : ''}`);
    }
  };

  return (
    <div className="col-md-4 col-xs-5 col-sm-6 grid-margin ">
      <div className="card">
        {props.score && (
          <div className="card-header score">
            <h2>Score</h2>
            <h2>
              <b>{!!props.score ? scoreTranslater(props.score) : null}</b>
            </h2>
          </div>
        )}

        <div className="card-body">
          <p>
            <b>Nome:</b> {!!props.patient ? props.patient.name : null}
          </p>

          <p>
            <b>Email:</b> {!!props.patient ? props.patient.email : null}
          </p>

          <p>
            <b>Cpf:</b> {!!props.patient ? props.patient.cpf : null}
          </p>

          <p>
            <b>Cep:</b> {!!props.patient ? props.patient.cep : null}
          </p>

          <p>
            <b>Telefone:</b> {!!props.patient ? props.patient.phone : null}
          </p>

          <p>
            <b>Data de Nascimento:</b>
            {moment(!!props.patient ? props.patient.birthday : null).format(
              'DD/MM/YYYY',
            )}
          </p>

          <p>
            <b>Gênero:</b> {!!props.patient ? props.patient.sex : null}
          </p>

          <p>
            <b>Idade:</b> {!!props.patient ? props.patient.age : null}
          </p>
          <p>
            <b>Status:</b>{' '}
            {!!props.status ? statusTranslater(props.status) : null}
          </p>
          {(props.status === 'PENDING' ||
            props.status === 'MANUAL_APPROVE') && (
            <Form onSubmit={handleSubmit} ref={statusForm}>
              <Select
                placeholder="Selecione Status"
                name="status"
                options={[
                  {
                    options: [
                      {
                        label: 'Aprovar',
                        value: 'MANUAL_APPROVED',
                      },
                      {
                        label: 'Reprovar',
                        value: 'MANUAL_REPROVED',
                      },
                    ],
                  },
                ]}
              />
              <TextArea
                name="obs"
                style={{ marginTop: '8px', width: '100%' }}
              />
              <button type="submit" className="btn btn-info btn-lg btn-block">
                Enviar
              </button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientSideContent;
