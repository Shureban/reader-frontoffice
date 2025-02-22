export type TFile = {
    id: number;
}

export default class FileResource implements TFile {
    public id: number;

    constructor(data: TFile) {
        this.id = data.id;
    }
};
