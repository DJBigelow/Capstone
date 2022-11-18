import { LoadingSpinner } from "../../../components/LoadingSpinner"
import { ChangeApprovalCard } from "./components/ChangeApprovalCard"
import { usePendingChangesQuery } from "./services/PendingChangeService"
import { useStoreDispatch } from "../../../store"
import { addAlert } from "../../../store/alertSlice"


export const ChangeApprovals = () => {

    const dispatch = useStoreDispatch();

    const pendingChangeQuery = usePendingChangesQuery();

    if (pendingChangeQuery.isLoading || pendingChangeQuery.isIdle) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (pendingChangeQuery.isError) {
        dispatch(addAlert((pendingChangeQuery.error as Error).message))
        return (<></>)
    }

    const pendingChangesData = pendingChangeQuery.data

    console.log(pendingChangesData)

    if (pendingChangesData.length === 0) {
        return <h1>No changes to approve</h1>
    }

    const changeCards = pendingChangesData.map((changeData) => {

        return (
            <li key={changeData.pendingChange.id} className='list-group-item' style={{"maxWidth": "40rem"}}>
                <ChangeApprovalCard pendingChange={changeData.pendingChange} 
                                    employeeDisplayName={changeData.employee.fullDisplayName as string} />
            </li>
        )
    })


    return (
        <div className="container justify-content-center">
            <h1>Changes Pending Approval</h1>
            <ul className="list-group">
                {changeCards} 
            </ul>
        </div>

    )
}