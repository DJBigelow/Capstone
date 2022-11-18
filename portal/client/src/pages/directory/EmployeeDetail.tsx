import { useSingleEmployeeQuery } from "./shared/services/employeeService";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeCard } from "./shared/components/EmployeeCard";

export const EmployeeDetail = () => {
  const navigate = useNavigate();

  const params = useParams();

  const id = params.id || "";
  const employeeQueryResult = useSingleEmployeeQuery(id);


  if (employeeQueryResult.isLoading || employeeQueryResult.isIdle)
    return <div className="spinner-border" role="status"></div>;

  if (employeeQueryResult.isError)
    return (
      <div>
        <h1>{`Error getting employee details: ${employeeQueryResult.error}`}</h1>
      </div>
    );

  const employee = employeeQueryResult.data;

  return (
    <div className="container mt-3 justify-content-center">
      <div className="row justify-content-center">
        <button className="btn btn-primary col-md-8" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left">
            Back
          </i>
        </button>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <EmployeeCard employee={employee} admin={false} />
        </div>
      </div>
    </div>
  );
};
