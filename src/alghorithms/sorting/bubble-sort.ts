import { Step } from '../../utils/BasicSorting/BasicSorting';
import { BasicSortingLogger } from '../../utils/BasicSorting/BasicSortingLogger';

const swap = (arr: number[], index1: number, index2: number) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  return arr;
};

export const bubbleSort = (
  arr: number[]
): { sorted: number[]; steps: Step[][] } => {
  const sorted = [...arr];
  const logger = new BasicSortingLogger();
  console.log('arr', arr);
  logger.beginLogging();
  for (let i = sorted.length - 1, step = 0; i !== 0; i--, step++) {
    logger.newStep([...sorted]);
    for (let j = 0; j < i; j++) {
      logger.addMove('index1', j);
      logger.addMove('index2', j + 1);
      logger.addMove('compare', '>');
      const comparison = sorted[j] > sorted[j + 1];
      logger.addMove('swap', comparison);
      if (comparison) {
        swap(sorted, j, j + 1);
      }
      logger.addMove('state', [...sorted]);
    }
  }

  return { sorted, steps: logger.stepsLog };
};
