

export class SelectedTextModel {
    lineStart: number;
    lineEnd: number;
    indexStart: number;
    indexEnd: number;
    constructor(Obj: object) {
        this.lineStart = Obj['start']['line'];
        this.lineEnd = Obj['end']['line'];
        this.indexStart = Obj['start']['character'];
        this.indexEnd = Obj['end']['character'];
    }
}
