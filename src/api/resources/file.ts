export type TFile = {
    download_link: string;
}

export default class FileResource implements TFile {
    public download_link: string;

    constructor(data: TFile) {
        this.download_link = data.download_link;
    }
};
