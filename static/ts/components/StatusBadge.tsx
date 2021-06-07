import * as React from "react";

interface Props {
  status: "SUCCESS" | "FAIL" | "PENDING";
  message: string;
}

export const StatusBadge: React.FC<Props> = ({ status, message }) => {
  const statusToClassMapping = {
    SUCCESS: "badge badge-pill badge-success",
    FAIL: "badge badge-pill badge-danger",
    PENDING: "badge badge-pill badge-warning",
  };

  return (
    <p>
      <span className={statusToClassMapping[status]}>{status}</span>
      {"   "}
      <small>{message}</small>
    </p>
  );
};
