import React, { useState } from "react";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");

const OPENING_HOURS = 7;
const OPENING_MINUTES = 30;
const CLOSING_HOURS = 17;
const CLOSING_MINUTES = 0;
const MINUTE_DURATION = 30;

export default function StepPilihTanggal({
  onClickNextStep,
  onClickPrevStep,
  setSelectedVisitTime,
  selectedVisitTime,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(false);

  function Tanggal({ label, onClick, disabled, selected, error }) {
    return (
      <div
        className={`p-2 border mb-2 ${
          selected
            ? `bg-gray-800 text-white`
            : error
            ? `border-red-600`
            : `border-gray-400`
        } ${disabled ? ` text-gray-500 ` : ` cursor-pointer `}`}
        onClick={onClick && !disabled ? onClick : () => {}}
      >
        {label}
      </div>
    );
  }
  const now = moment("2019-01-04 13:20:00");

  const _dummyData = {
    tanggal: (now = moment()) => {
      const returnedDates = [];
      let i = 0;
      while (returnedDates.filter((d) => d.selectable).length < 5) {
        const date = moment({
          years: now.toObject().years,
          months: now.toObject().months,
          dates: now.toObject().date,
        }).add(i, "days");
        returnedDates.push({
          label: date.format("dddd, DD MMMM YYYY"),
          selectable: date.day() > 0 && date.day() < 6,
          dateObj: date.toObject(),
          moment: date,
        });
        i++;
      }
      return returnedDates;
    },
    waktu: (now = moment()) => {
      const returnedTimes = [];
      let i = 0;
      const STARTING_TIME = moment({
        year: selectedDate && selectedDate.years,
        month: selectedDate && selectedDate.months,
        date: selectedDate && selectedDate.date,
        hour: OPENING_HOURS,
        minute: OPENING_MINUTES,
      });
      const CLOSING_TIME = moment({
        year: selectedDate && selectedDate.years,
        month: selectedDate && selectedDate.months,
        date: selectedDate && selectedDate.date,
        hour: CLOSING_HOURS,
        minute: CLOSING_MINUTES,
      });
      let currentTimeCursor = STARTING_TIME;
      console.log(now.toObject());
      while (currentTimeCursor.isBefore(CLOSING_TIME)) {
        const endSessionTime = currentTimeCursor
          .clone()
          .add(MINUTE_DURATION, "minutes");
        returnedTimes.push({
          label:
            currentTimeCursor.format("HH:mm") +
            " s.d. " +
            endSessionTime.format("HH:mm"),
          selectable: currentTimeCursor.isAfter(now),
          start: currentTimeCursor.toObject(),
          end: endSessionTime.toObject(),
        });
        currentTimeCursor.add(MINUTE_DURATION, "minutes");
      }
      return returnedTimes;
    },
  };

  return (
    <div className="mt-5">
      <h1 className="text-xl">Pilih Tanggal Kunjungan</h1>
      <div className="my-1">
        Waktu saat ini {now.format("dddd, DD MMMM YYYY HH:mm:ss")}
      </div>
      {error && (
        <div className="text-red-700 my-2">Anda belum melakukan pilihan</div>
      )}
      <div className="flex">
        <div className="w-2/5">
          {_dummyData.tanggal(now).map((tanggal) => {
            return (
              <Tanggal
                key={tanggal.label}
                error={error}
                label={tanggal.label}
                disabled={!tanggal.selectable}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedDate(tanggal.dateObj);
                  setSelectedVisitTime(null);
                }}
                selected={
                  selectedDate &&
                  selectedDate.years === tanggal.dateObj.years &&
                  selectedDate.months === tanggal.dateObj.months &&
                  selectedDate.date === tanggal.dateObj.date
                }
              />
            );
          })}
        </div>
        <div className="w-3/5 pl-2 flex flex-wrap">
          {selectedDate &&
            _dummyData.waktu(now).map((tanggal) => {
              return (
                <div className="ml-1" key={tanggal.label}>
                  <Tanggal
                    error={error}
                    label={tanggal.label}
                    selected={
                      selectedVisitTime &&
                      selectedVisitTime.start &&
                      selectedVisitTime.start.years === tanggal.start.years &&
                      selectedVisitTime.start.months === tanggal.start.months &&
                      selectedVisitTime.start.date === tanggal.start.date &&
                      selectedVisitTime.start.hours === tanggal.start.hours &&
                      selectedVisitTime.start.minutes === tanggal.start.minutes
                    }
                    disabled={!tanggal.selectable}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedVisitTime(tanggal);
                    }}
                  />
                </div>
              );
            })}
          {}
        </div>
      </div>
      <div className="mt-10">
        <button
          className="py-2 px-4 rounded border border-gray-400"
          onClick={(e) => {
            e.preventDefault();
            onClickPrevStep();
          }}
        >
          Kembali: Isi SAK
        </button>
        <button
          className="py-2 ml-2 px-4 rounded bg-orange-500 text-white shadow"
          onClick={(e) => {
            e.preventDefault();
            if (selectedDate === null || selectedVisitTime === null) {
              setError(true);
            } else {
              onClickNextStep();
            }
          }}
        >
          Selanjutnya: Review
        </button>
      </div>
    </div>
  );
}
