
import Employee from './shared/models/Employee'
import { useAllEmployeesQuery } from './shared/services/employeeService'
import {Table} from '../../components/Table'
import { LoadingSpinner } from '../../components/LoadingSpinner'

import { useNavigate } from 'react-router-dom'


export const Directory = () => {

    const columns = [
        // {
        //     Header: 'ID',
        //     accessor: (employee: Employee, _rowIndex: any) => employee.id,
        // },
        {
            Header: 'Name',
            accessor: (employee: Employee, _rowIndex: any) => employee.fullDisplayName,
        },
        {
            Header: 'Email',
            accessor: (employee: Employee, _rowIndex: any) => employee.snowEmail,
            Cell: ({ cell: { value }}: any) => value || Employee.undefinedPropertyFallback
        },
        {
            Header: 'Position',
            accessor: (employee: Employee, _rowIndex: any) => employee.position,
            Cell: ({ cell: { value }}: any) => value || Employee.undefinedPropertyFallback
        },
        {
            Header: 'Department',
            accessor: (employee: Employee, _rowIndex: any) => employee.department,
            Cell: ({ cell: { value }}: any) => value || Employee.undefinedPropertyFallback
        },
        {
            Header: 'Campus',
            accessor: (employee: Employee, _rowIndex: any) => employee.campus,
            Cell: ({ cell: { value }}: any) => value || Employee.undefinedPropertyFallback
        },
        {
            Header: 'Office Building',
            accessor: (employee: Employee, _rowIndex: any) => employee.building,
            Cell: ({ cell: { value }}: any) => value || Employee.undefinedPropertyFallback
        },
    ]

    const hiddenColumns = [
        // 'ID',
        'Department',
        'Building',
    ]


    const navigate = useNavigate();

    const navToDetail = (employee: Employee) => {
        navigate(`/directory/detail/${employee.id}`)
    }

    const employeeQueryResult = useAllEmployeesQuery()

    if (employeeQueryResult.isLoading || employeeQueryResult.isIdle) {
        return ( 
            <div className='d-flex justify-content-center align-items-center'>
                <LoadingSpinner /> 
            </div>
        )
    }
    
    if (employeeQueryResult.isError) {
        return ( <div><h1>{`Error fetching employees: ${employeeQueryResult.error}`}</h1></div> )
    }


    return (
        <div className='container'>
            <h1 className='text-center display-3'>Snow College Directory</h1>

            <Table columns={columns}
                   data={employeeQueryResult.data} 
                   hiddenColumns={hiddenColumns}
                   rowClick={navToDetail}
                   filterPlaceholderText='Search by name, department, building, etc.'/>
        </div>
    )

}