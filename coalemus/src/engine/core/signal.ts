type listener<T> = (arg: T) => void;

export class signal<T> {
    private listeners: listener<T>[] = [];

    connect(fn: listener<T>) {
        this.listeners.push(fn);
        return () => {
            const i = this.listeners.indexOf(fn);
            if (i !== -1) this.listeners.splice(i, 1);
        };
    }

    fire(arg: T) {
        for (const fn of this.listeners) {
            fn(arg);
        }
    }
}