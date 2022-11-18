import { PendingChange } from '../models/PendingChange';
import { usePendingChangeMutation } from '../services/PendingChangeService';

type ChangeApprovalProps = {
    pendingChange: PendingChange;
    employeeDisplayName: string;
}

export const ChangeApprovalCard = ({ pendingChange, employeeDisplayName } : ChangeApprovalProps) => {
    const approveChangeMutation = usePendingChangeMutation();
    
    const commitChange = async (approved: boolean) => {
        await approveChangeMutation.mutateAsync({approved, pendingChangeId: pendingChange.id})
    }

    return (
        <div className='card'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col my-auto'>
                        <p className='card-title'><b>Badger ID:</b> {pendingChange.badgerId}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <p><b>Name:</b> {employeeDisplayName}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <p><b>Changed Property:</b> {pendingChange.portalColumn}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <p><b>Original:</b> {pendingChange.bannerValue}</p>
                    </div>
                    <div className='col'>
                        <p><b>New:</b> {pendingChange.portalValue}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <button className='btn btn-danger' onClick={async () => await commitChange(false)}>Discard Change</button>
                    </div>
                    <div className='col'>
                        <button className='btn btn-primary' onClick={async () => await commitChange(true)}>Keep Change</button>
                    </div>
                </div>
            </div>
        </div>
    )
}