import {action, makeObservable, observable} from "mobx";

class BookReadingStore {
    private static instance: BookReadingStore;
    public num: number

    public isPlaying: boolean          = false;
    public activeSentenceIndex: number = 0;

    private constructor() {
        this.num = Math.random();

        makeObservable(this, {
            isPlaying: observable,
            setIsPlaying: action,

            activeSentenceIndex: observable,
            setActiveSentenceIndex: action,
        });
    }

    public static getInstance(): BookReadingStore {
        if (!BookReadingStore.instance) {
            BookReadingStore.instance = new BookReadingStore();
        }

        return BookReadingStore.instance
    }

    public static reinitializeInstance(): BookReadingStore {
        console.log("BookReadingStore reinitializeInstance");
        BookReadingStore.instance = new BookReadingStore();

        return BookReadingStore.instance
    }

    public setIsPlaying(status: boolean): void {
        this.isPlaying = status;
    }

    public setActiveSentenceIndex(index: number): void {
        this.activeSentenceIndex = index;
        console.log('setActiveSentenceIndex', index);
    }
}

export default BookReadingStore;