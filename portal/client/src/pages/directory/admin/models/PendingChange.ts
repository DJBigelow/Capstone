export class PendingChange {
    readonly id: number;
    readonly badgerId: string;
    readonly portalColumn: string;
    readonly bannerValue: string;
    readonly portalValue: string;

    constructor (id: number, 
                 badgerId: string, 
                 portalColumn: string, 
                 bannerValue: string,
                 portalValue: string) {
        this.id = id;
        this.badgerId = badgerId;
        this.portalColumn = portalColumn;
        this.bannerValue = bannerValue;
        this.portalValue = portalValue
    }
}