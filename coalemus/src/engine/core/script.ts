import { gob } from "./gob";

export class script extends gob {
    public enabled: boolean = true;
    private started: boolean = false;

    public start(): void {}
    public update(_dt: number): void {}

    public __update(dt: number) {
        if (!this.enabled) return;
        if (!this.started) {
            this.start();
            this.started = true;
        }

        this.update(dt);
    }

    constructor() {
        super();
    }
}