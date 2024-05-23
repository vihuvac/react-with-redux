import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../state/store';
import { decrement, increment, incrementByAmount, incrementAsync } from '../state/counter/counterSlice';


export const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());
  const handleIncrementByAmount = () => dispatch(incrementByAmount(10));
  const handleIncrementAsync = () => dispatch(incrementAsync(10));

  return (
    <>
      <h2>{count}</h2>
      <div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={handleIncrementByAmount}>Increment by Amount</button>
        <button onClick={handleIncrementAsync}>Increment async</button>
      </div>
    </>
  )
};
