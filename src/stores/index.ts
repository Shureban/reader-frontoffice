import {makeAutoObservable} from "mobx";
import AppStore from "stores/AppStore";

class RootStore {
    appStore: AppStore;

    constructor() {
        this.appStore = new AppStore();

        makeAutoObservable(this);
    }
}

export const rootStore = new RootStore();
