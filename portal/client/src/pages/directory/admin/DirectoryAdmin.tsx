import { useAllEmployeesQuery } from "../shared/services/employeeService";

import Employee from "../shared/models/Employee";

import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { Table } from "../../../components/Table";

export const DirectoryAdmin = () => {

    const columns = [
        {
            Header: 'ID',
            accessor: (employee: Employee, _rowIndex: any) => employee.id,
        },
        {
            Header: 'Name',
            accessor: (employee: Employee, _rowIndex: any) => employee.fullDisplayName,
        },
        {
            Header: 'Email',
            accessor: (employee: Employee, _rowIndex: any) => employee.snowEmail,
        },
        {
            Header: 'Position',
            accessor: (employee: Employee, _rowIndex: any) => employee.position,
        },
        {
            Header: 'Department',
            accessor: (employee: Employee, _rowIndex: any) => employee.department,
        },
        {
            Header: 'Campus',
            accessor: (employee: Employee, _rowIndex: any) => employee.campus,
        },
        {
            Header: 'Office Building',
            accessor: (employee: Employee, _rowIndex: any) => employee.building,
        }
    ]

    

    const navigate = useNavigate()

    const navToEmployeeDetail = (employee: Employee) => {
        navigate(`/directory/admin/detail/${employee.id}`)
    }

    const employeeQueryResult = useAllEmployeesQuery()

    if (employeeQueryResult.isLoading || employeeQueryResult.isIdle)
        return ( 
            <div className='d-flex justify-content-center align-items-center'>
                <LoadingSpinner /> 
            </div>
        )
    
    if (employeeQueryResult.isError)
        return ( <div><h1>{`Error fetching employees: ${employeeQueryResult.error}`}</h1></div> )


    return (
        <div>
            <h1 className="text-center display-3">Snow Directory Administration</h1>

            <Table columns={columns}
                   data={employeeQueryResult.data}
                   rowClick={navToEmployeeDetail}
                   filterPlaceholderText='Search by Badger ID, name, department, etc...'
            />
        </div>
    )
}