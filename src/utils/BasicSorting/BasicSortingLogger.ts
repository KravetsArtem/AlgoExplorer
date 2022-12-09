import { StepType, Step, StepValue } from './BasicSorting';

export class BasicSortingLogger {
  public stepsLog: Step[][] = [];
  private currentStep = -1;

  public beginLogging() {
    this.currentStep = -1;
    this.stepsLog = [];
  }

  public newStep(stateArr: number[]) {
    this.currentStep++;
    this.stepsLog[this.currentStep] = [{ type: 'state', value: stateArr }];
  }

  public addMove(type: StepType, value: StepValue) {
    this.stepsLog[this.currentStep].push({ type, value });
  }
}
