import { signal } from "../signal";

export class input {
    private downKeys: Set<string> = new Set<string>();

    public readonly onKeyDown: signal<string> = new signal<string>();
    public readonly onKeyPress: signal<string> = new signal<string>();
    public readonly onKeyUp: signal<string> = new signal<string>();

    constructor() {
        window.addEventListener("keydown", (e) => {
            this.downKeys.add(e.key);
            this.onKeyDown.fire(e.key);
        })
        
        window.addEventListener("keypress", (e) => {
            this.onKeyPress.fire(e.key);
        })
        
        window.addEventListener("keyup", (e) => {
            this.downKeys.delete(e.key);
            this.onKeyUp.fire(e.key);
        })
    }

    public isDown(input: string) {
        return this.downKeys.has(input);
    }
}