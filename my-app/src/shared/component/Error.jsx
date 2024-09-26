import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorHandler = () => {
  const errData = useRouteError();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">
        {errData.data.message || "  Oops! Something went wrong."}
      </h1>
      <p className="text-lg text-gray-600 mt-4">
        We're working on fixing this issue.
      </p>
      <p className="text-lg text-gray-600 mt-4">
        status code: {errData.status}
      </p>
    </div>
  );
};

export default ErrorHandler;
