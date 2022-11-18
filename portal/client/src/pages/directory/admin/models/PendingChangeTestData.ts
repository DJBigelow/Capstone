import { PendingChange } from "./PendingChange";

export const testChanges: PendingChange[] = [
    {
        id: 1,
        badgerId: '00000001',
        portalColumn: 'MI',
        bannerValue: 'Dwayne',
        portalValue: 'The Rock'
    },
    {
        id: 2,
        badgerId: '00000002',
        portalColumn: `FIRST_NAME`,
        bannerValue: 'Alfred',
        portalValue: 'Weird Al'
    }
]

// export const testChangeCardProps: any[] = [
//     {
//         pendingChange: testChanges[0],
//         employeeDisplayName: `Dwayne "The Rock" Johnson`
//     },
//     {
//         pendingChange: testChanges[1],
//         employeeDisplayName: `Weird Al Yankovic`
//     }
// ]