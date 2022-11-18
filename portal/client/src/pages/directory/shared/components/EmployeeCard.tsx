import { useState } from "react";
import Employee from "../models/Employee";

type EmployeeCardProps = {
  employee: Employee;
  admin: boolean;
};

export const EmployeeCard = ({ employee, admin }: EmployeeCardProps) => {
  const [emailCopied, setEmailCopied] = useState(false);

  return (
    <div className="card">
      <div className="card-title mb-3 ps-3">
        <h4 className="display-4">{employee.fullDisplayName}</h4>
      </div>

      <div className="card-body pt-0">
        {/* Email + copy button */}
        <div className="row d-flex justify-content-start align-items-start">
          
          {admin && (
            <div>

              <div className="row">
                <p>
                  <b>Badger ID:</b> {employee.id}
                </p>
              </div>

              <div className="row">
                <p>
                  <b>Real First Name:</b> {employee.realFirstName}
                </p>
              </div>

              <div>
                <p>
                  <b>Preferred First Name:</b> {employee.preferredFirstName}
                </p>
              </div>
            </div>
          )}

          <p className="col-auto">
            <b>Email:</b> {`${employee.snowEmail}`}
          </p>
          <button
            disabled={
              employee.snowEmail === undefined ||
              employee.snowEmail === Employee.undefinedPropertyFallback
            }
            className="btn btn-primary btn-sm col-auto"
            onClick={() => {
              navigator.clipboard.writeText(employee.snowEmail as string);
              setEmailCopied(true);
            }}
          >
            <i
              className={
                emailCopied ? "bi bi-clipboard-check" : "bi bi-clipboard"
              }
            />
          </button>
        </div>

        <div className="row">
          <p>
            <b>Department:</b> {employee.department}
          </p>
        </div>

        <div className="row">
          <p>
            <b>Position:</b> {employee.position}
          </p>
        </div>

        <div className="row">
          <p>
            <b>Campus:</b> {employee.campus}
          </p>
        </div>

        <div className="row">
          <p>
            <b>Building:</b> {employee.building}
          </p>
        </div>

        <div className="row">
          <p>
            <b>Office Room Number:</b> {employee.roomNumber}
          </p>
        </div>

        <div className="row">
          <p>
            <b>Office Phone Number:</b> {employee.fullDisplayOfficePhone}
          </p>
        </div>
      </div>
    </div>
  );
};
