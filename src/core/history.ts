import { Drawing, clone, validateDrawing } from './model';
import { updateWires } from './geometry';
export class CommandStack {
  private past: { label: string; drawing: Drawing }[] = [];
  private future: { label: string; drawing: Drawing }[] = [];
  constructor(
    public drawing: Drawing,
    private changed: (d: Drawing) => void = () => {},
  ) {}
  execute(label: string, mutation: (draft: Drawing) => void): boolean {
    const draft = clone(this.drawing);
    mutation(draft);
    updateWires(draft);
    validateDrawing(draft);
    if (JSON.stringify(draft) === JSON.stringify(this.drawing)) return false;
    this.past.push({ label, drawing: this.drawing });
    if (this.past.length > 150) this.past.shift();
    this.future = [];
    this.drawing = draft;
    this.changed(draft);
    return true;
  }
  undo(): void {
    const item = this.past.pop();
    if (!item) return;
    this.future.push({ label: item.label, drawing: this.drawing });
    this.drawing = item.drawing;
    this.changed(this.drawing);
  }
  redo(): void {
    const item = this.future.pop();
    if (!item) return;
    this.past.push({ label: item.label, drawing: this.drawing });
    this.drawing = item.drawing;
    this.changed(this.drawing);
  }
  get canUndo(): boolean {
    return this.past.length > 0;
  }
  get canRedo(): boolean {
    return this.future.length > 0;
  }
}
