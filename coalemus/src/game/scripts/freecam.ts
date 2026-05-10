import { script } from "../../engine/core/script";
import { camera } from "../../engine/core/tgobs/camera";
import * as THREE from "three";

export class freecam extends script {
    camera: camera | undefined;
    input = this.engine?.input;

    yaw = 0;
    pitch = 0;

    speed = 5;
    sensitivity = 0.002;

    // Reusable objects
    private euler = new THREE.Euler(0, 0, 0, "YXZ");

    private forward = new THREE.Vector3();
    private right = new THREE.Vector3();
    private up = new THREE.Vector3(0, 1, 0);

    override start(): void {
        console.log("Freecam script started");

        this.input = this.engine?.input;

        this.input?.onMouseMove.connect((event) => {
            // Mouse look
            this.yaw -= event.delta.x * this.sensitivity;
            this.pitch -= event.delta.y * this.sensitivity;

            // Clamp vertical look
            const maxPitch = Math.PI / 2 - 0.01;

            this.pitch = Math.max(
                -maxPitch,
                Math.min(maxPitch, this.pitch)
            );

            // Optional: keep yaw small
            this.yaw %= Math.PI * 2;
        });

        this.input?.onMouseDown.connect(() => {
            console.log("Mouse down, locking pointer");
            this.input?.lockPointer();
        });
    }

    override update(dt: number): void {
        // Get camera reference
        if (!this.camera) {
            if (this.parent instanceof camera) {
                this.camera = this.parent;
            } else {
                return;
            }
        }

        // FPS rotation order
        this.euler.set(this.pitch, this.yaw, 0);

        // Apply camera rotation
        this.camera.rotation.set(
            this.pitch,
            this.yaw,
            0,
            "YXZ"
        );

        // Forward vector (affected by pitch + yaw)
        this.forward
            .set(0, 0, -1)
            .applyEuler(this.euler)
            .normalize();

        // Right vector (yaw only)
        this.right
            .set(1, 0, 0)
            .applyAxisAngle(
                this.up,
                this.yaw
            )
            .normalize();

        // Movement
        const velocity = this.speed * dt;

        if (this.input?.isKeyDown("w")) {
            this.camera.position.addScaledVector(
                this.forward,
                velocity
            );
        }

        if (this.input?.isKeyDown("s")) {
            this.camera.position.addScaledVector(
                this.forward,
                -velocity
            );
        }

        if (this.input?.isKeyDown("a")) {
            this.camera.position.addScaledVector(
                this.right,
                -velocity
            );
        }

        if (this.input?.isKeyDown("d")) {
            this.camera.position.addScaledVector(
                this.right,
                velocity
            );
        }

        // Vertical movement
        if (this.input?.isKeyDown(" ")) {
            this.camera.position.addScaledVector(
                this.up,
                velocity
            );
        }

        if (this.input?.isKeyDown("Shift")) {
            this.camera.position.addScaledVector(
                this.up,
                -velocity
            );
        }
    }
}