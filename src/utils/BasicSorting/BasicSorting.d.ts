export interface LogStep {
  index1: number;
  index2: number;
  sign: string;
  swap: boolean;
  result: number[];
  initial: number[];
}

export interface Step {
  type: StepType;
  value: StepValue;
}

export type StepType = 'state' | 'index1' | 'index2' | 'compare' | 'swap';
export type StepValue = string | number[] | boolean | number;
