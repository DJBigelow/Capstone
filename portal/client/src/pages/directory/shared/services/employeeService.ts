import axios, { Axios, AxiosRequestConfig } from "axios";
import Employee from "../models/Employee";
import { useMutation, useQuery} from "react-query";
import { getQueryClient } from "../../../../services/queryClient";
// import getAuthHeader from "../../services/getAuthHeader";


const employeesKey = "employees"

const queryClient = getQueryClient();
queryClient.invalidateQueries(employeesKey)


export const useAllEmployeesQuery = () => {

    return useQuery<Employee[]>(employeesKey, async () => {
        const url = '/api/employees/get-all'
        const options = {
            // headers: await getAuthHeader()
        }

        const response = await axios.get(url, options)

        if (response.data.suceess === false) {
            throw Error(`Error getting employees from API: ${response.data.message}`)
        }


        return response.data.employees.map((employee: Employee) => formatResponseEmployeeData(employee))
    });
}

export const useSingleEmployeeQuery = (employeeId: string) => {
    return useQuery([employeeId, employeesKey], async () => {
        if (!employeeId)
            throw Error(`No employee specified`)

        const url = `/api/employees/get-by-id/${employeeId}`
        const options = {
            //headers: await getAuthHeader(),
            // params: {employee_id: employeeId}
        }

        const response = await axios.get(url, options)

        if (response.data.success === false) {
            throw Error(`Error getting employee by ID: ${response.data.message}`)
        }

        return formatResponseEmployeeData(response.data.employee)
    })
}

export const useUpdateEmployeeMutation = () => {
    return useMutation(async (employee: any) => {
        const url = `/api/employees/update`
        // const options = { headers: await getAuthHeader()}

        console.debug("mutation employee", employee)
        const response = await axios.post(url, { ...employee })

        if (response.data.success === false) {
            throw Error(`Error updating employee: ${response.data.message}`);
        }
    }, 
    { onSuccess: () => queryClient.invalidateQueries(employeesKey)});
}

const formatResponseEmployeeData = (responseEmployee: any): Employee => {
        return new Employee(responseEmployee.ID,
                            responseEmployee.FIRST_NAME,
                            responseEmployee.LAST_NAME,
                            responseEmployee.PREF_NAME,
                            responseEmployee.MI,
                            responseEmployee.SNOW_EMAIL,
                            responseEmployee.POSITION,
                            responseEmployee.DEPT_DESC,
                            responseEmployee.CAMPUS,
                            responseEmployee.BUILDING_DESC,
                            responseEmployee.OFFICE_ROOM,
                            responseEmployee.OFFICE_AREA,
                            responseEmployee.OFFICE_PHONE)
}


