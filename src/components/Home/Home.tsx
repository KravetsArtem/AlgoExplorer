import { bubbleSort } from '../../alghorithms/sorting/bubble-sort';
import { useEffect } from 'react';
import { BasiSortingVisualization } from '../Sorting/Visualization';

function Home() {
  useEffect(() => {
    bubbleSort([4, 3, 2, 1]);
  }, []);

  return (
    <div className="App">
      <BasiSortingVisualization
        data={[3, 4, 8, 6, 7, 2, 1, 9, 5, 10]}
        sortFunction={bubbleSort}
      />
    </div>
  );
}

export default Home;
