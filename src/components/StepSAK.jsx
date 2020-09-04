import React, { useState } from "react";

import pertanyaan from "./sak.json";
import { usePostAssessment } from "./../services/useAssessmentService";
import { SudahIsiSak } from "./StepSAK2";

export default function StepSAK({
  onClickPrevStep,
  onClickNextStep,
  onFillingDone,
  nik,
}) {
  const [state, setState] = useState(pertanyaan);
  const score = calculateScore(state);
  const risk = calculateRisk(state);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [error, setError] = useState(false);
  const { data: dataPostSak, post } = usePostAssessment();

  if (dataPostSak) {
    return (
      <SudahIsiSak
        onClickNextStep={onClickNextStep}
        onClickPrevStep={onClickPrevStep}
        risiko={dataPostSak.data.hasil}
      ></SudahIsiSak>
    );
  }

  const validate = (question) => {
    if (question.options.filter((opt) => opt.selected).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  function selectOption(questionId, optionId, flag) {
    function clearOtherGroup(question, groupId) {
      return {
        ...question,
        options: [
          ...question.options
            .filter((opt) => opt.group !== groupId)
            .map((option) => ({ ...option, selected: false })),
          ...question.options.filter((opt) => opt.group === groupId),
        ],
      };
    }

    return setState((state) => {
      const question = state.find((q) => q.id === questionId);

      if (question === undefined) {
        throw Error("Pertanyaan tidak ditemukan.");
      }
      const option = question.options.find((opt) => opt.id === optionId);
      if (option === undefined) {
        throw Error("Opsi tidak ditemukan.");
      }
      const _question = clearOtherGroup(question, option.group);
      option.selected = flag;

      _question.options = [
        ..._question.options.filter((opt) => opt.id !== optionId),
        option,
      ];

      const newState = [...state.filter((q) => q.id !== questionId), _question];
      return newState;
    });
  }
  return (
    <>
      <div>Score: {score > 10000 ? 100 : score / 100}%</div>
      <div>{risk}</div>
      {state
        .filter((q) => q.id === currentQuestion)
        .map((q) => {
          return (
            <Pertanyaan
              key={q.id}
              data={q}
              selectOption={selectOption}
              error={error}
            />
          );
        })}
      <div>
        <button
          className="py-2 px-4 rounded border border-gray-400 underline text-blue-800"
          onClick={(e) => {
            e.preventDefault();
            if (currentQuestion === 1) {
              onClickPrevStep();
            } else setCurrentQuestion((x) => x - 1);
          }}
        >
          Sebelumnya
        </button>
        <button
          className="py-2 ml-2 px-4 rounded bg-orange-500 text-white shadow"
          onClick={(e) => {
            e.preventDefault();
            const formIsValid = validate(
              state.find((q) => q.id === currentQuestion)
            );
            if (formIsValid) {
              setError(false);
              if (currentQuestion === state.length) {
                post(nik, state, risk);
                onFillingDone(risk, state);
              } else setCurrentQuestion((x) => x + 1);
            } else {
              setError(true);
            }
          }}
        >
          {currentQuestion === state.length
            ? "Selesai Isi SAK"
            : "Pertanyaan Selanjutnya"}
        </button>
      </div>
    </>
  );
}

function Pertanyaan({ data, selectOption, error = true }) {
  return (
    <div>
      <div className={`my-2 ${error && `text-red-700`}`}>{data.text}</div>
      <div>
        {data.options
          .sort((a, b) => a.id - b.id)
          .map((option) => (
            <div
              className={`p-2 border mb-2 ${
                option.selected
                  ? `bg-gray-800 text-white`
                  : error
                  ? `border-red-700`
                  : `border-gray-400`
              }`}
              key={option.id}
              onClick={(e) => {
                e.preventDefault();
                selectOption(data.id, option.id, !option.selected);
              }}
            >
              {option.text}
            </div>
          ))}
      </div>
    </div>
  );
}

function calculateScore(state) {
  return state.reduce((prevScore, question, index, questions) => {
    return (
      prevScore +
      question.options.reduce((prevQuestionScore, option, index, options) => {
        return (
          prevQuestionScore +
          question.weight * (option.selected && option.score ? option.score : 0)
        );
      }, 0)
    );
  }, 0);
}

function calculateRisk(state) {
  if (
    state
      .filter((q) => [6, 7, 8].includes(q.id))
      .filter(
        (q) => q.options.filter((o) => o.selected && o.group === 1).length > 0
      ).length > 0
  ) {
    return "Tinggi";
  } else if (
    state
      .filter((question) => question.id === 4 || question.id === 5)
      .filter(
        (question) =>
          question.options.filter(
            (option) => option.selected && option.group === 1
          ).length > 0
      ).length > 0
  ) {
    return "Sedang";
  } else {
    return "Rendah";
  }
}
