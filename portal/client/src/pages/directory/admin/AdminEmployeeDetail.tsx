import Employee from "../shared/models/Employee";
import { useNavigate, useParams } from "react-router-dom";
import { useSingleEmployeeQuery } from "../shared/services/employeeService";
import { useState } from "react";
import { EmployeeEditForm } from "./components/EmployeeEditForm";
import { EmployeeCard } from "../shared/components/EmployeeCard";

export const AdminEmployeeDetail = () => {
    const [ editMode, setEditMode ] = useState(false);

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


    if (editMode) {
        return <EmployeeEditForm employee={employee} />
    }

    else {
        return (
            <div className="container">

                <div className="row">
                    <EmployeeCard employee={employee} admin={true}/>
                </div>
                <div className="row">
                    <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit</button>
                </div>
            </div>
        )
    }

}