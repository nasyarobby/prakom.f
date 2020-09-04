import React from "react";
import Input from "./Input";
import { useState } from "react";

export default function StepIsiBiodata({
  onClickPrevStep,
  onClickNextStep,
  pengunjung,
  setPengunjung,
}) {
  const [errors, setErrors] = useState({});

  const onChangeRadio = (e) => {
    const radio = e.target;
    setPengunjung((state) => {
      return { ...state, status: radio.value };
    });
  };

  const onChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(e.target);
    setPengunjung((state) => {
      return { ...state, [name]: value };
    });
  };

  const validateInputs = (pengunjung) => {
    const errors = {};
    if (pengunjung.nama.trim() === "") {
      errors.nama = "Harus diisi";
    }
    if (pengunjung.email.trim() === "") {
      errors.email = "Harus diisi";
    }

    if (pengunjung.nik.trim() === "") {
      errors.nik = "Harus diisi.";
    }

    if (pengunjung.telp.trim() === "") {
      errors.telp = "Harus diisi.";
    }

    return errors;
  };

  const nextBtnHandler = (e) => {
    e.preventDefault();
    const errors = validateInputs(pengunjung);
    if (Object.keys(errors).length === 0 && errors.constructor === Object)
      onClickNextStep();
    else setErrors(errors);
  };

  return (
    <div className="mt-5">
      <h1 className="text-xl">Isi Biodata</h1>
      <div>
        <input
          type="radio"
          name="berlakuSebagai"
          value="pengurus"
          checked={pengunjung.status === "pengurus"}
          onChange={onChangeRadio}
        ></input>
        <label className="ml-2">Pengurus/penanggung-jawab Wajib Pajak</label>
      </div>
      <div>
        <input
          type="radio"
          name="berlakuSebagai"
          value="kuasa"
          checked={pengunjung.status === "kuasa"}
          onChange={onChangeRadio}
        ></input>
        <label className="ml-2">Kuasa wajib pajak</label>
      </div>
      <Input
        label="Nama Lengkap"
        name="nama"
        value={pengunjung.nama}
        onChange={onChangeInput}
        error={errors.nama}
        hint={errors.nama}
      />
      <Input
        label="Alamat Email"
        name="email"
        value={pengunjung.email}
        onChange={onChangeInput}
        error={errors.email}
        hint={errors.email}
      />
      <Input
        label="Nomor Identitas"
        name="nik"
        value={pengunjung.nik}
        onChange={onChangeInput}
        error={errors.nik}
        hint={errors.nik}
      />
      <Input
        label="Nomor Handphone"
        name="telp"
        value={pengunjung.telp}
        onChange={onChangeInput}
        type="number"
        error={errors.telp}
        hint={errors.telp}
      />
      <button
        className="py-2 px-4 rounded border border-gray-400"
        onClick={(e) => {
          e.preventDefault();
          onClickPrevStep();
        }}
      >
        Kembali: Pilih Layanan
      </button>
      <button
        className="py-2 ml-2 px-4 rounded bg-orange-500 text-white shadow"
        onClick={nextBtnHandler}
      >
        Selanjutnya: Isi Self-Assessment Kesehatan
      </button>
    </div>
  );
}
