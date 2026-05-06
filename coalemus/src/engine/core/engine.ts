import { scene } from "./scene";
import * as THREE from "three";

export class engine {
    scenes: scene[] = [];
    currentScene: scene | undefined = undefined;
    view: HTMLCanvasElement | undefined;
    renderer: THREE.WebGLRenderer | undefined;

    public start() {
        if (!this.view) {
            throw new Error("No canvas attached");
        }

        this.renderer = new THREE.WebGLRenderer({ canvas: this.view });
        this.renderer.setSize(this.view.clientWidth, this.view.clientHeight, false);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.loop();
    }

    private loop = () => {
        requestAnimationFrame(this.loop);
        this.render();
    };

    public attach(view: HTMLCanvasElement) {
        this.view = view;
    }

    public onViewResize() {
        if (!this.view || !this.renderer) return;
        
        const parent = this.view.parentElement;
        const width = parent?.clientWidth ?? window.innerWidth;
        const height = parent?.clientHeight ?? window.innerHeight;

        this.renderer.setSize(width, height, false);

        const cam = this.currentScene?.currentCamera?.object;

        if (cam instanceof THREE.PerspectiveCamera) {
            cam.aspect = width / height;
            cam.updateProjectionMatrix();
        }
    }

    public render() {
        if (!this.renderer || !this.currentScene || !this.currentScene.currentCamera) return;

        this.renderer.render(
            this.currentScene.object,
            this.currentScene.currentCamera.object
        );
    }
}