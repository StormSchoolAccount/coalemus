import { camera } from "./tgobs/camera";
import { gob } from "./gob";
import { tgob } from "./tgobs/tgob";
import * as THREE from "three";
import { script } from "./script";

export class scene extends gob {
    object: THREE.Scene = new THREE.Scene();
    currentCamera: camera | undefined;

    private scripts: script[] = [];
    public update(dt: number) {
        this.scripts.forEach(script => {
            script.__update(dt);
        });
    }

    constructor() {
        super();

        this.descendantAdded.connect((child) => {
            if (child instanceof tgob) {
                this.object.add((child as tgob).object);
            }
            else if (child instanceof script) {
                this.scripts.push(child);
            }
        });

        this.descendantRemoved.connect((child) => {
            if (child instanceof tgob) {
                this.object.remove((child as tgob).object);
            }
            else if (child instanceof script) {
                this.scripts = this.scripts.filter(c => c !== child);
            }
        });
    }
}