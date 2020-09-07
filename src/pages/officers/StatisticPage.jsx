import React from "react";
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  VerticalBarSeries,
  HorizontalBarSeries,
} from "react-vis";
import moment from "moment";

import random from "random-seed";
import { useParams, Redirect } from "react-router-dom";
import useKppService from "../../services/useKppService";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

export default function Statisticpage() {
  const { kpp } = useParams();
  const { data, getKpp } = useKppService();

  if (!kpp) window.location.pathname = "/siap/statistik/021";

  useEffect(() => {
    if (kpp) {
      getKpp(kpp);
    }
  }, [kpp]);
  if (data)
    return (
      <>
        <h1 className="text-center text-2xl">
          STATISTIK KPP {data.data.kpp.nama}
        </h1>
        <div className="flex flex-wrap">
          <LayananPerNamaHari kpp={kpp} />
          <DurasiPerLayanan kpp={kpp} />
          <DatangTelatBatal5Hari kpp={kpp} />
        </div>
      </>
    );
  else
    return (
      <div className="flex flex-wrap">
        <div className="w-1/2 p-5">
          <Skeleton count={6} />
        </div>
        <div className="w-1/2 p-5">
          <Skeleton count={6} />
        </div>
        <div className="w-1/2 p-5">
          <Skeleton count={6} />
        </div>
        <div className="w-1/2 p-5">
          <Skeleton count={6} />
        </div>
        <div className="w-1/2 p-5">
          <Skeleton count={6} />
        </div>
      </div>
    );
}

function LayananPerNamaHari(kpp) {
  const rand = random.create(kpp);
  const data = [
    { y: rand.intBetween(100, 300), x: "Senin" },
    { y: rand.intBetween(100, 300), x: "Selasa" },
    { y: rand.intBetween(100, 300), x: "Rabu" },
    { y: rand.intBetween(100, 300), x: "Kamis" },
    { y: rand.intBetween(100, 300), x: "Jumat" },
  ];
  return (
    <div className="p-3 m-5 text-center">
      <XYPlot height={300} width={300} xType="ordinal" animation>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={data} />
      </XYPlot>
      <div>Jumlah Layanan Berdasarkan Hari</div>
    </div>
  );
}

function DatangTelatBatal5Hari(kpp) {
  const rand = random.create(kpp);
  const data = [4, 3, 2, 1, 0].map((num) => {
    return {
      x: moment().subtract(num, "days").format("DD/MM"),
      y: rand.intBetween(150, 310),
    };
  });
  return (
    <div className="p-3 m-5 text-center">
      <XYPlot height={300} width={300} xType="ordinal" animation>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={data} />
      </XYPlot>
      <div>Statistik 5 hari terakhir</div>
    </div>
  );
}

function PersentaseLayanan(kpp) {
  return null;
}

function DurasiPerLayanan(kpp) {
  const rand = random.create(kpp);
  const data = [
    { x: rand.intBetween(15, 50), y: "konsultasi perpajakan" },
    { x: rand.intBetween(30, 50), y: "konsultasi aplikasi" },
    { x: rand.intBetween(10, 35), y: "TPT" },
    { x: rand.intBetween(20, 60), y: "Janji Temu" },
    { x: rand.intBetween(10, 50), y: "Lainnya" },
  ];
  return (
    <div className="p-3 m-5 text-center">
      <XYPlot height={300} width={500} yType="ordinal" animation>
        <XAxis />
        <YAxis />
        <HorizontalBarSeries data={data} />
        <VerticalGridLines />
        <HorizontalGridLines />
      </XYPlot>
      <div>Durasi Per Layanan</div>
    </div>
  );
}
