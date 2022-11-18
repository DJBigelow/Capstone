import { TextInputRow, useTextInput } from '../../../../components/forms/TextInputRow'
import { SelectInputRow, useSelectInput } from '../../../../components/forms/SelectInputRow';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';
import Employee from '../../shared/models/Employee'

// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input/input';

import { usePhoneNumberInput, PhoneNumberInputRow } from '../../../../components/forms/phoneNumberInputRow';

import { useBuildingsQuery } from '../../shared/services/buildingService';
import { useDepartmentsQuery } from '../../shared/services/departmentsService';
import  { FormEvent, useState } from 'react';
import { useUpdateEmployeeMutation } from '../../shared/services/employeeService';
import { addAlert, alertOnError } from '../../../../store/alertSlice';
import { useStoreDispatch } from '../../../../store';


type EmployeeEditFormProps = {
    employee: Employee;
}

export const EmployeeEditForm = ({ employee }: EmployeeEditFormProps) => {
    const dispatch = useStoreDispatch();
    const employeeUpdateMutation = useUpdateEmployeeMutation()

    const realFirstNameControl = useTextInput(employee.realFirstName, {max: 60, required: true})
    const preferredFirstNameControl = useTextInput(employee.preferredFirstName || '', {max: 60, required: false})
    const middleNameControl = useTextInput(employee.middleName || '', {max: 60, required: false})
    const lastNameControl = useTextInput(employee.lastName, {max: 240, required: true})
    const snowEmailControl = useTextInput(employee.snowEmail || '', {max: 128, required: false})
    const positionControl = useTextInput(employee.position || '', {max: 120, required: true})

    const roomNumberControl = useTextInput(employee.roomNumber || '', {max: 12, required: false})


    const selectCampusControl = useSelectInput<string>({
        initialValue: "Ephraim",
        options: ["Ephraim", "Richfield"],
        getKey: (campus: string) => campus,

    })

    const buildingsQueryResult = useBuildingsQuery();
    const departmentsQueryResult = useDepartmentsQuery();


    //This is my attempt at getting around the error of conditionally using these hooks depending on the status of the department/building queries
    const selectBuildingControl = useSelectInput<string>({
        options: (buildingsQueryResult.isLoading || buildingsQueryResult.isError) ? [] : buildingsQueryResult.data as string[], 
        getKey: (building: string) => building,
    })

    const selectDepartmentControl = useSelectInput<string>({
        options: (departmentsQueryResult.isLoading || departmentsQueryResult.isError) ? [] : departmentsQueryResult.data as string[],
        getKey: (department: string) => department 
    })


    const phoneNumberInputControl = usePhoneNumberInput(employee.fullDisplayOfficePhone || '')


    const formHasErrors = () => {
        // return !!realFirstNameControl.error ||
        //        !!lastNameControl.error ||
        //        !!positionControl.error ||
        //        !!phoneNumberInputControl.error

        return false
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        if (formHasErrors()) {
            dispatch(addAlert("Form has errors"))
        }
        else {

            const updatedEmployee = {
                ID: employee.id,
                FIRST_NAME: realFirstNameControl.value,
                LAST_NAME: lastNameControl.value,
                PREF_NAME: preferredFirstNameControl.value,
                MI: middleNameControl.value,
                SNOW_EMAIL: snowEmailControl.value,
                POSITION: positionControl.value,
                DEPT_DESC: selectBuildingControl.value,
                CAMPUS: selectCampusControl.value,
                BUILDING_DESC: selectBuildingControl.value,
                OFFICE_ROOM: roomNumberControl.value,
            }

            console.debug("updatedEmployee", updatedEmployee)

            employeeUpdateMutation.mutate(updatedEmployee)
        }

    }

    if (buildingsQueryResult.isLoading || buildingsQueryResult.isIdle || departmentsQueryResult.isLoading || departmentsQueryResult.isIdle) {
        return (
            <div className='d-flex justify-content-center align-items-center'>
                <LoadingSpinner />
            </div>
        )
    }

    if (buildingsQueryResult.isError || departmentsQueryResult.isError) {
        return (
            <div>
                {
                    buildingsQueryResult.isError &&
                    <h1>Error fetching buildings</h1>
                }
                {
                    departmentsQueryResult.isError &&
                    <h1>Error fetching deparments</h1>
                }
            </div>
        )
    }
   
    

    return (
        <div>
            <div className='container'>
                <form onSubmit={submitHandler}>
                   
                    <TextInputRow label='First Name' control={realFirstNameControl} />
                    <TextInputRow label='Preferred First Name' control={preferredFirstNameControl} />
                    <TextInputRow label='Middle Name' control={middleNameControl} />
                    <TextInputRow label='Last Name' control={lastNameControl} />
                    <TextInputRow label='Snow Email' control={snowEmailControl} />
                    <TextInputRow label='Position' control={positionControl} />
                    <TextInputRow label='Office Room Number' control={roomNumberControl} />

                    <SelectInputRow label='Campus' control={selectCampusControl} />
                    <SelectInputRow label='Building' control={selectBuildingControl} />
                    <SelectInputRow label='Department' control={selectDepartmentControl} />

                    <PhoneNumberInputRow label='Office Phone' control={phoneNumberInputControl} />

                    <div className='form-group row mt-2'>
                        <div className='col-md-2 my-auto' />
                        <div className='col-md-1 my-auto'>
                            <button type='submit' className='btn btn-primary'>Save</button>

                        </div>
                        <div className='col-md-2 my-auto'>
                            <button type='reset' className='btn btn-danger'>Discard Changes</button>
                        </div>
                    </div>
                    
                </form>
            </div>
        
        </div>
    )
}