import {action, makeObservable, observable} from "mobx";
import BookProgressResource from "api/resources/book-progress";
import PageResource from "api/resources/page";
import {ReadingWordMode} from "domains/cabinet/pages/book-reading/enums";

const DefaultFontSize       = 24;
const DefaultWordsPerMinute = 150;

class BookReadingStore {
    private static instance: BookReadingStore;

    public readingWordMode: ReadingWordMode          = ReadingWordMode.Karaoke;
    public fontSize: number                          = DefaultFontSize;
    public wordsPerMinute: number                    = DefaultWordsPerMinute;
    public pageTitle: string                         = '';
    public isPlaying: boolean                        = false;
    public isOverlayVisible: boolean                 = true;
    public activeSentenceNumber: number              = 0;
    public activeWordIndex: number                   = 0;
    public bookProgress: BookProgressResource | null = null;
    public pagesList: PageResource[]                 = [];
    public currentPage: PageResource | null          = null;

    private constructor() {
        makeObservable(this, {
            isPlaying: observable,
            setIsPlaying: action,

            isOverlayVisible: observable,
            setIsOverlayVisible: action,

            readingWordMode: observable,
            setReadingWordMode: action,

            fontSize: observable,
            setFontSize: action,

            wordsPerMinute: observable,
            setWordsPerMinute: action,

            bookProgress: observable,
            getBookProgress: observable,
            setBookProgress: action,

            activeSentenceNumber: observable,
            setActiveSentenceNumber: action,
            getActiveSentence: observable,
            getPrevSentence: observable,

            activeWordIndex: observable,
            setActiveWordIndex: action,

            pagesList: observable,
            setPagesList: action,

            currentPage: observable,
            getCurrentPage: observable,
            setCurrentPage: action,

            pageTitle: observable,
            setPageTitle: action,

            forcePrevSentence: action,
            forceNextSentence: action,
        });
    }

    public static getInstance(): BookReadingStore {
        if (!BookReadingStore.instance) {
            BookReadingStore.instance = new BookReadingStore();
        }

        return BookReadingStore.instance
    }

    public static reinitializeInstance(): void {
        BookReadingStore.instance = new BookReadingStore();
    }

    public setIsPlaying(status: boolean): void {
        this.isPlaying = status;
    }

    public setIsOverlayVisible(status: boolean): void {
        this.isOverlayVisible = status;
    }

    public setReadingWordMode(mode: ReadingWordMode): void {
        this.readingWordMode = mode;
    }

    public setFontSize(fontSize: number): void {
        fontSize = fontSize < 1 ? 1 : fontSize;
        fontSize = fontSize > 100 ? 100 : fontSize;

        this.fontSize = fontSize;
    }

    public setWordsPerMinute(wordsPerMinute: number): void {
        wordsPerMinute = wordsPerMinute < 1 ? 1 : wordsPerMinute;
        wordsPerMinute = wordsPerMinute > 1000 ? 1000 : wordsPerMinute;

        this.wordsPerMinute = wordsPerMinute;
    }

    public getBookProgress(): BookProgressResource {
        if (this.bookProgress) {
            return this.bookProgress;
        }

        throw new Error('Book progress did not set');
    }

    public setBookProgress(bookProgress: BookProgressResource): void {
        this.bookProgress = bookProgress;

        this.setCurrentPage(bookProgress.page);
        this.setActiveSentenceNumber(bookProgress.sentence_number);
    }

    public setPagesList(pages: PageResource[]): void {
        this.pagesList = pages;
    }

    public setActiveSentenceNumber(number: number): void {
        this.activeSentenceNumber = number;
    }

    public getPrevSentence(): string {
        return this.currentPage?.sentences[this.activeSentenceNumber - 1] || '';
    }

    public getActiveSentence(): string {
        return this.currentPage?.sentences[this.activeSentenceNumber] || '';
    }

    public setActiveWordIndex(index: number): void {
        this.activeWordIndex = index;
    }

    public getCurrentPage(): PageResource {
        if (this.currentPage) {
            return this.currentPage;
        }

        throw new Error('Current page did not set');
    }

    public setCurrentPage(page: PageResource): void {
        this.currentPage = page;

        this.setPageTitle(page.name);
    }

    public setPageTitle(title: string): void {
        const isNumber = !isNaN(Number(title));

        this.pageTitle = isNumber ? `Page ${title}` : title;
    }

    public forcePrevSentence = () => {
        let newNumber = this.activeSentenceNumber - 1;
        let page      = this.currentPage;

        if (newNumber < 0) {
            page      = this.pagesList.find((page) => page.number === this.getCurrentPage().number - 1) || null;
            newNumber = page?.sentences.length - 1;
        }

        if (page) {
            this.setCurrentPage(page);
            this.setActiveSentenceNumber(newNumber);
            this.setActiveWordIndex(0);
        }
    }

    public forceNextSentence = () => {
        let newNumber = this.activeSentenceNumber + 1;
        let page      = this.currentPage;

        if (newNumber >= this.getCurrentPage().sentences.length) {
            page      = this.pagesList.find((page) => page.number === this.getCurrentPage().number + 1) || null;
            newNumber = 0;
        }

        if (page) {
            this.setCurrentPage(page);
            this.setActiveSentenceNumber(newNumber);
            this.setActiveWordIndex(0);
        }
    }
}

export default BookReadingStore;