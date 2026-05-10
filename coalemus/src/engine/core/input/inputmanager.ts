import { signal } from "../signal";
import * as THREE from "three";
import { inputType, type keyEvent, type mouseEvent } from "./inputevent";

export class input {
    private downKeys: Set<string> = new Set<string>();

    public readonly onKeyDown: signal<keyEvent> = new signal<keyEvent>();
    public readonly onKeyPress: signal<keyEvent> = new signal<keyEvent>();
    public readonly onKeyUp: signal<keyEvent> = new signal<keyEvent>();

    public readonly onMouseMove: signal<mouseEvent> = new signal<mouseEvent>();
    public readonly onMouseDown: signal<mouseEvent> = new signal<mouseEvent>();
    public readonly onMouseUp: signal<mouseEvent> = new signal<mouseEvent>();

    constructor() {
        window.addEventListener("keydown", (e) => {
            this.downKeys.add(e.key);
            this.onKeyDown.fire({type: inputType.key, key: e.key});
        })
        
        window.addEventListener("keypress", (e) => {
            this.onKeyPress.fire({type: inputType.key, key: e.key});
        })
        
        window.addEventListener("keyup", (e) => {
            this.downKeys.delete(e.key);
            this.onKeyUp.fire({type: inputType.key, key: e.key});
        })
        
        window.addEventListener("mousemove", (e) => {
            this.onMouseMove.fire({type: inputType.mouse, button: e.button, position: new THREE.Vector2(e.clientX, e.clientY), delta: new THREE.Vector2(e.movementX, e.movementY)});
        });
        
        window.addEventListener("mousedown", (e) => {
            this.onMouseDown.fire({type: inputType.mouse, button: e.button, position: new THREE.Vector2(e.clientX, e.clientY), delta: new THREE.Vector2(e.movementX, e.movementY)});
        })
        
        window.addEventListener("mouseup", (e) => {
            this.onMouseUp.fire({type: inputType.mouse, button: e.button, position: new THREE.Vector2(e.clientX, e.clientY), delta: new THREE.Vector2(e.movementX, e.movementY)});
        })
    }

    public isKeyDown(input: string) {
        return this.downKeys.has(input);
    }

    public lockPointer() {
        if (document.body.requestPointerLock) {
            document.body.requestPointerLock();
        }
    }
}