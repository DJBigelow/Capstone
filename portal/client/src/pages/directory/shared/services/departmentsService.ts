import axios from 'axios';
import { useQuery } from 'react-query';
import { getQueryClient } from '../../../../services/queryClient';
import Department from '../models/Department';

const departmentsKey = "departments";

const queryClient = getQueryClient();
queryClient.invalidateQueries(departmentsKey);


export const useDepartmentsQuery = () => {
    return useQuery<string[]>(departmentsKey, async () => {
        const url = `/api/departments/get-all`;
        const options = {

        }

        const response = await axios.get(url, options);

        if (response.data.success === false) {
            throw Error(`Error getting departments: "${response.data.message}"`)
        }

        return response.data.departments;
    })
}
