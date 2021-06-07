import * as React from "react";
import { useState } from "react";
import axios from "axios";

import { peopleInitialData } from "../constants";
import { validate } from "../validators";

import { CreatePeopleForm } from "../components/PeopleForm";
import { StatusBadge } from "../components/StatusBadge";

interface Status {
  message: string;
  status: "SUCCESS" | "PENDING" | "FAIL";
}

const ws = new WebSocket("ws://localhost:8000/ws/search/");

export const CreatePeoplePage = () => {
  const [formData, setFormData] = useState<PeopleData>({
    ...peopleInitialData,
  });
  const [status, setStatus] = useState<Status>({
    message: "Pending",
    status: "PENDING",
  });
  const [formErrors, setFormErrors] = useState<PeopleData>({
    ...peopleInitialData,
  });

  ws.onopen = function (e) {
    setStatus({ status: "SUCCESS", message: "Connected to WS server" });
  };

  ws.onclose = function (e) {
    setStatus({ status: "FAIL", message: "Disconnected from WS server" });
  };

  ws.onmessage = function (e) {
    const resData = JSON.parse(e.data);
    console.log(resData);
    setStatus({ status: resData.status, message: resData.message });
    if (!resData.data) return;
    setFormData(resData.data);
  };

  const handleSearch = (name: string) => {
    if (!name) return;
    ws.send(JSON.stringify({ name: name }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validate(formData);
    setFormErrors(err);

    if (!err.name && !err.birth_year && !err.gender) {
      const axiosInstance = axios.create({
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFTOKEN",
      });

      axiosInstance
        .post("/api/create", formData)
        .then((_) => window.location.replace("/"))
        .catch((err) => err);
    }
  };

  return (
    <>
      <StatusBadge {...status} />
      <CreatePeopleForm
        name={formData.name}
        birth_year={formData.birth_year}
        gender={formData.gender}
        homeworld={formData.homeworld}
        errors={formErrors}
        handleSearch={handleSearch}
        handleChange={setFormData}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
