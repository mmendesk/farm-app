import React, { useState, useEffect } from 'react';
import { request } from '../../services/request';
import { useParams } from 'react-router-dom';
import PatientSideContent from '../../components/patient/patientSideContent';
import { sex, status } from '../../types';
import { parse } from 'url';

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

interface IHistoryDTO {
  questionId: string;
  questionTitle: string;
  answers: Array<IAnswersDTO>;
  allowsEditing: true;
  nuorderquestion: string;
  answerScore?: Array<number>;
}

interface IAnswersDTO {
  _id: string;
  title: string;
  nuscore: string;
  nextQuestion: string;
  text?: string;
  unit?: string;
}

interface IDps {
  dps: {
    history: Array<IHistoryDTO>;
    _id: string;
    patientId: string;
    status: status;
    scoreByAgeAndSex: string;
    scoreByAnswers: string;
    scoreByImc: string;
    scoreByProfession: string;
    scoreByZipCode: string;
    scoreTotal: Float32Array;
  };
  patient: IPatientDTO | null;
}

const DpsDetail = () => {
  const [dps, setDps] = useState<IDps>();
  const { _id }: { _id: string } = useParams();
  const [maxScore, setMaxScore] = useState<number>(0);
  const [historyQuart, setHistoryQuart] = useState<number>(0);

  async function getDps() {
    let response: IDps = await request({
      showSuccessMessage: false,
      method: 'GET',
      path: `dps/${_id}`,
    });

    response.dps.history.map((hist: any) => {
      hist.answerScore = hist.answers.map((answer: any) => {
        return parseFloat(answer.nuscore);
      });
      return hist;
    });
    response.dps.history.sort((a: any, b: any) => {
      return b.answerScore[0] - a.answerScore[0];
    });

    setHistoryQuart(Math.floor(response.dps.history.length / 4));

    setDps(response);
  }

  useEffect(() => {
    getDps();
  }, []);

  return (
    <div className="row">
      <PatientSideContent
        patient={!!dps?.patient ? dps?.patient : null}
        status={!!dps?.dps.status ? dps?.dps.status : null}
        score={!!dps?.dps.scoreTotal ? dps?.dps.scoreTotal : null}
      />
      <div className="col-md-8 grid-margin ">
        <div className="card">
          <div className="card-body">
            <div className="row">
              {dps?.dps.history.map((hist, index) => {
                console.log(historyQuart);
                return (
                  <>
                    <div
                      className="col-md-12"
                      style={
                        index < historyQuart
                          ? { color: '#ab2e46' }
                          : index < 2 * historyQuart
                          ? { color: '#f9a825' }
                          : { color: 'inherit' }
                      }
                    >
                      <p
                        className="font-weight-bold"
                        style={{ fontSize: '16px' }}
                      >
                        {hist.questionTitle}
                      </p>
                      {hist.answers.map(answer => {
                        return (
                          <>
                            <p style={{ fontSize: '15px' }}>{answer.title}</p>
                            {answer.text && (
                              <p>
                                {answer.text}
                                {answer.unit && answer.unit}
                              </p>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DpsDetail;
