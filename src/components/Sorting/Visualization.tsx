import { useEffect, useState } from 'react';
import { Step } from '../../utils/BasicSorting/BasicSorting';
import { Button } from '@mui/material';

export interface BasicSortingVisualizationProps {
  data: number[];
  sortFunction: (arr: number[]) => { sorted: number[]; steps: Step[][] };
}

export const BasiSortingVisualization = ({
  data,
  sortFunction,
}: BasicSortingVisualizationProps) => {
  const [steps, setSteps] = useState<Step[][]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentSubstep, setCurrentSubstep] = useState<number>(0);
  const [currentIndex1, setCurrentIndex1] = useState<number | null>(null);
  const [currentIndex2, setCurrentIndex2] = useState<number | null>(null);
  const [currentCompare, setCurrentCompare] = useState<string | null>(null);
  const [isSwap, setIsSwap] = useState<boolean | null>(null);
  const [currentState, setCurrentState] = useState<number[]>(data);

  useEffect(() => {
    const { steps, sorted } = sortFunction(data);
    setSteps(steps);
    console.log('steps', steps);
  }, [sortFunction, data]);

  useEffect(() => {
    setCurrentSubstep(0);
  }, [currentStep]);

  useEffect(() => {
    if (!steps || !steps[currentStep]) {
      return;
    }
    const interval = setInterval(
      () => {
        if (currentSubstep === steps[currentStep].length - 1) {
          setCurrentSubstep(0);
        } else {
          setCurrentSubstep(currentSubstep + 1);
        }
      },
      currentSubstep === steps[currentStep].length - 1 ? 10000 : 1000
    );

    return () => clearInterval(interval);
  }, [currentSubstep, currentStep, steps]);

  useEffect(() => {
    if (!steps || !steps[currentStep]) {
      return;
    }
    if (!steps[currentStep][currentSubstep]) {
      return;
    }
    const { type, value } = steps[currentStep][currentSubstep];

    switch (type) {
      case 'state':
        setCurrentIndex1(null);
        setCurrentIndex2(null);
        setCurrentCompare(null);
        setIsSwap(null);
        setCurrentState(value as number[]);
        break;
      case 'index1':
        setCurrentIndex1(value as number);
        break;
      case 'index2':
        setCurrentIndex2(value as number);
        break;
      case 'swap':
        setIsSwap(value as boolean);
        break;
      case 'compare':
        setCurrentCompare(value as string);
        break;
    }
  }, [steps, currentStep, currentSubstep]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 10,
      }}
    >
      {currentState ? (
        currentState.map((element: number, index: number) => {
          return (
            <div
              key={element}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
              }}
            >
              <div
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '30px',
                  height: `${element * 15}px`,
                  fontSize: '10px',
                  border:
                    index === currentIndex1
                      ? '2px solid blue'
                      : index === currentIndex2
                      ? '2px solid green'
                      : undefined,
                }}
              >
                {element}
              </div>
              <div
                style={{
                  display: 'flex',
                  color: 'black',
                  justifyContent: 'center',
                }}
              >
                {currentIndex1 === index ? index + ' ' + currentCompare : index}
              </div>
            </div>
          );
        })
      ) : (
        <>Calculating</>
      )}
      <Button
        disabled={currentStep === 0}
        onClick={() => {
          setCurrentStep(currentStep - 1);
        }}
      >
        Previous
      </Button>
      <Button
        disabled={currentStep === steps.length - 1}
        onClick={() => {
          setCurrentStep(currentStep + 1);
        }}
      >
        Next
      </Button>
    </div>
  );
};
