import axios from 'axios';
import { useQuery } from 'react-query';
import { getQueryClient } from '../../../../services/queryClient';
import Building from '../models/Building';

const buildingsKey = "buildings";


const queryClient = getQueryClient();
queryClient.invalidateQueries(buildingsKey);

export const useBuildingsQuery = () => {
    return useQuery<string[]>(buildingsKey, async () => {
        const url = '/api/buildings/get-all';
        const options = {

        }

        const response = await axios.get(url, options);

        if (response.data.success === false) {
            throw Error(`Error getting buildings: "${response.data.message}"`)
        }

        return response.data.buildings;
    })
}
