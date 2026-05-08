import * as THREE from "three";

export enum inputType {
    key,
    mouse,
    unknown
}

export type keyEvent = {
    type: typeof inputType.key;
    key: string;
}

export type mouseEvent = {
    type: typeof inputType.mouse;
    button: number;
    position: THREE.Vector2;
}