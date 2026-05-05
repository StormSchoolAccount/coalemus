import { v4 as uuidv4 } from 'uuid';
import { signal } from './signal';

export class gob {
    readonly id: string = uuidv4();
    private children: gob[] = [];
    parent: gob | undefined;
    name: string = "";

    childAdded = new signal<gob>();
    childRemoved = new signal<gob>();
    descendantAdded = new signal<gob>();
    descendantRemoved = new signal<gob>();

    public addChild(child: gob) {
        this.addchild(child);
    }

    public removeChild(child: gob) {
        this.removechild(child);
    }

    public getChildren(): readonly gob[] {
        return this.children;
    }

    public isDescendantOf(target: gob): boolean {
        let current = this.parent;
        while (current) {
            if (current === target) return true;
            current = current.parent;
        }
        return false;
    }

    public getDescendants(): gob[] {
        const result: gob[] = [];
        const stack = [...this.children];

        while (stack.length > 0) {
            const current = stack.pop()!;
            result.push(current);

            for (const child of current.children) {
                stack.push(child);
            }
        }

        return result;
    }

    private addchild(child: gob) {
        if (this.isDescendantOf(child)) {
            throw new Error("Cycle detected");
        }

        if (child.parent) {
            child.parent.removeChild(child);
        }

        this.children.push(child);
        child.parent = this;

        this.childAdded.fire(child);

        const all: gob[] = [child, ...child.getDescendants()];

        let current: gob | undefined = this;
        while (current) {
            for (const gob of all) {
                current.descendantAdded.fire(gob);
            }
            current = current.parent;
        }
    }

    private removechild(child: gob) {
        if (child.parent !== this) return;

        this.children = this.children.filter(c => c !== child);
        child.parent = undefined;

        this.childRemoved.fire(child);

        const all = [child, ...child.getDescendants()];

        let current: gob | undefined = this;
        while (current) {
            for (const gob of all) {
                current.descendantRemoved.fire(gob);
            }
            current = current.parent;
        }
    }
}