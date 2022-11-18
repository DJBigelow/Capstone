export default class Employee {
    readonly id: string;
    // DISP_FIRST_NAME?: string;   
    readonly realFirstName: string;
    readonly preferredFirstName?: string;
    readonly middleName?: string;
    readonly lastName: string;
    readonly snowEmail?: string;
    readonly position?: string;
    readonly department?: string;
    readonly campus?: string;
    readonly building?: string;
    readonly roomNumber?: string;
    readonly officePhoneArea?: string;
    readonly officePhoneNumber?: string;

    readonly fullDisplayOfficePhone?: string;
    readonly fullDisplayName: string;

    public static get undefinedPropertyFallback(): string {
        return "Not Available"
    }

    constructor(id: string, 
                firstName: string, 
                lastName: string,
                preferredFirstName?: string, 
                middleName?: string,
                snowEmail?: string,
                position?: string,
                department?: string,
                campus?: string,
                building?: string,
                roomNumber?: string,
                officePhoneArea?: string,
                officePhoneNumber?: string) {

        this.id = id;
        this.realFirstName = firstName;
        this.lastName = lastName;
        this.preferredFirstName = preferredFirstName;
        this.middleName = middleName;
        this.snowEmail = snowEmail;
        this.position = position;
        this.department = department;
        this.campus = campus;
        this.building = building;
        this.roomNumber = roomNumber;
        this.officePhoneArea = officePhoneArea 

        this.fullDisplayName =  `${this.lastName}, ${this.preferredFirstName || this.realFirstName}${this.middleName ? (" " + this.middleName) : ""}`
        this.fullDisplayOfficePhone = this.formatPhoneNumber(officePhoneArea, officePhoneNumber)
    }


    private formatPhoneNumber(phoneArea?: string, phoneNumber?: string): string {
        if (!(phoneArea || phoneNumber)) {
            return 'Not Available'
        }
        return `${phoneArea}-${phoneNumber}`
    }

}