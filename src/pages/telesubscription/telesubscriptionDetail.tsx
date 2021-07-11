import React, { useState, useEffect, useRef } from 'react';
import { request } from '../../services/request';
import { useParams } from 'react-router-dom';
import { Form, Radio, TextArea } from '../../components/form';
import PatientSideContent from '../../components/patient/patientSideContent';
import { sex, status } from '../../types';

interface IQuestionDTO {
  _id: string;
  questionTitle: string;
  answer: string;
}
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

interface ITelesubscription {
  _id: string;
  patient: IPatientDTO | null;
  questions: [IQuestionDTO];
  status: status;
  obs: string;
  url: string;
}
const questionsStatic = [
  {
    id: 'question1',
    type: 'oneChoice',
    title:
      'Realizou consultas médicas ou sofreu internações hospitalares, decorrentes de doenças graves nos últimos 5 anos?',
    choices: ['Sim', 'Não'],
  },
  {
    id: 'question2',
    type: 'oneChoice',
    title:
      'Possui(u) tumor,câncer,doença coronária, AVC, diabetes, doença respiratória, hepatites, colesterol elevado ou triglicerídeos elevados?',
    choices: ['Sim', 'Não'],
  },
  {
    id: 'question3',
    type: 'oneChoice',
    title:
      'Faz ou Fez uso reiterado rotineiro nos últimos 5 anos de algum medicamento?',
    choices: ['Sim', 'Não'],
  },
  {
    id: 'question4',
    type: 'oneChoice',
    title: 'Profissão?',
    choices: [
      'acrobata',
      'atleta profissional de lutas',
      'boiadeiro',
      'detonador',
      'equilibrista',
      'escorador de minas',
      'garimpeiro',
      'instrutor de voo',
      'jóquei',
      'mergulhador profissional',
      'mineiro',
      'piloto agrícola',
      'piloto de competição automobilística',
      'pirotécnico',
      'pugilista',
      'trabalhador da fabricação de munição e explosivos',
      'trapezista',
      'tropeiro',
      'vigilante',
      'Outros',
    ],
  },
  {
    id: 'question5',
    type: 'oneChoice',
    title: 'Possui diagnóstico de alguma doença?',
    choices: ['Sim', 'Não'],
  },
  {
    id: 'question6',
    type: 'simpleText',
    title: 'Qual?',
    choices: [],
  },
  {
    id: 'question7',
    type: 'oneChoice',
    title: 'Tem qualquer deficiência de orgãos, membros ou sentidos?',
    choices: ['Sim', 'Não'],
  },
  {
    id: 'question8',
    type: 'oneChoice',
    title: 'É Fumante ou fumou por um período maior que 10 anos?',
    choices: ['Sim', 'Não'],
  },
];

const TelesubscriptionDetail = () => {
  const [telesubscrition, setTelesubscrition] =
    useState<ITelesubscription | null>(null);

  const telesubscriptionForm = useRef<any>(null);
  const { _id }: { _id: string } = useParams();

  async function getTelesubscrition() {
    let response = await request({
      showSuccessMessage: false,
      method: 'GET',
      path: `telesubscription/${_id}`,
    });
    setTelesubscrition(response);
  }

  useEffect(() => {
    getTelesubscrition();
  }, []);

  return (
    <div className="row">
      <PatientSideContent
        patient={!!telesubscrition?.patient ? telesubscrition?.patient : null}
        questionsStatic={questionsStatic}
        telesubscriptionFormRef={telesubscriptionForm}
        status={!!telesubscrition?.status ? telesubscrition?.status : null}
      />
      <div className="col-md-8 grid-margin stretch-card">
        <div className="card">
          <div className="card-body row ">
            <div className="col-md-6">
              <h5>
                <b>Perguntas ja respondidas:</b>
              </h5>

              {telesubscrition?.questions.map(question => (
                <div key={question._id}>
                  <p>
                    <b>{question.questionTitle}</b>
                  </p>
                  <p>{question.answer}</p>
                </div>
              ))}
            </div>
            {telesubscrition?.status === 'PENDING' && (
              <div className="col-md-6">
                <h5>
                  <b>Perguntas que precisam ser respondidas:</b>
                </h5>

                <Form onSubmit={() => {}} ref={telesubscriptionForm}>
                  {questionsStatic.map(question => (
                    <div key={question.id}>
                      {question.type === 'oneChoice' && (
                        <div>
                          <label className="mb-4 ">
                            <b>{question.title}</b>
                          </label>
                          <Radio
                            name={question.id}
                            options={question.choices.map(choice => {
                              return {
                                id: choice,
                                value: choice,
                                label: choice,
                              };
                            })}
                          />
                        </div>
                      )}
                      {question.type === 'simpleText' && (
                        <>
                          <label>
                            <b>{question.title}</b>
                          </label>
                          <TextArea
                            name={question.id}
                            style={{ width: '100%' }}
                          ></TextArea>
                        </>
                      )}
                    </div>
                  ))}
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelesubscriptionDetail;
