export class TableColumn {
    constructor(header: string, property: string, columnWidth: string) {
        this.header = header;
        this.property = property;
        this.columnWidth = columnWidth;
    }

    header: string;
    property: string;
    columnWidth: string;
}
