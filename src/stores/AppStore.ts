import {action, makeObservable, observable} from "mobx";
import UserResource from "api/resources/user";

class AppStore {
    isReady: boolean          = false;
    pageLocks: number         = 0;
    user: UserResource | null = null;

    constructor() {
        makeObservable(this, {
            isReady: observable,
            setIsReady: action,

            pageLocks: observable,
            pageIsLocked: observable,
            lockPage: action,
            unlockPage: action,

            user: observable,
            getUser: observable,
            setUser: action,
        });
    }

    public setIsReady(status: boolean) {
        this.isReady = status;
    }

    public pageIsLocked(): boolean {
        return this.pageLocks > 0;
    }

    public lockPage() {
        this.pageLocks += 1;
    }

    public unlockPage() {
        this.pageLocks -= 1;
    }

    public getUser(): UserResource {
        if (this.user) {
            return this.user;
        }

        throw new Error('User is not set');
    }

    public setUser(user: UserResource) {
        this.user = user;
    }
}

export default AppStore;
