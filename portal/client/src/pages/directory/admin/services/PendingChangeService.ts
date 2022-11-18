import axios from 'axios';
import { PendingChange } from '../models/PendingChange';
import { useMutation, useQuery } from 'react-query';
import { getQueryClient } from '../../../../services/queryClient';
import Employee from '../../shared/models/Employee';

const pendingChangesKey = "pending changes";

const queryClient = getQueryClient();
queryClient.invalidateQueries(pendingChangesKey);

export const usePendingChangesQuery = () => {

    return useQuery<{pendingChange: PendingChange, employee: Employee}[]>(pendingChangesKey, async () => {
        const url = '/api/pending-changes/get-all';

        const options = {

        }

        const response = await axios.get(url, options);

        if (response.data.success === false) {
            throw Error(`Error getting pending changes: ${response.data.message}`);
        }


        return response.data.changes.map((changeData: any) => formatRawPendingChangeData(changeData))
    })
}



const formatRawPendingChangeData = (changeData: any) => {
    const pendingChange = new PendingChange(
        changeData.id,
        changeData.badger_id,
        changeData.portal_column,
        changeData.banner_value,
        changeData.portal_value
    )

    const employee = new Employee(
        changeData.badger_id,
        changeData.FIRST_NAME,
        changeData.LAST_NAME,
        changeData.PREF_NAME,
        changeData.MI
    )

    return {pendingChange, employee}
}

type ChangeProcessInformation = {
    pendingChangeId: number;
    approved: boolean;
}

export const usePendingChangeMutation = () => {

    return useMutation(async ({pendingChangeId, approved}: ChangeProcessInformation) => {
        const url = `/api/pending-changes/process-change`;

        const response = await axios.post(url, {pendingChangeId, approved})

        if (response.data.success === false) {
            throw Error(`Error approving/denying pending change: ${response.data.message}`)
        }
    },
    { onSuccess: () => queryClient.invalidateQueries(pendingChangesKey)});
}