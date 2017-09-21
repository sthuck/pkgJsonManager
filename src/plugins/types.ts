interface Step {
  execute: (...args: any[]) => void;
}

interface DialogStep extends Step {
  content: string;
}
