import useTimer from '../hooks/use-timer';

interface TimerProps {
  startTime: number;
}

function Timer({ startTime }: TimerProps) {
  const elapsedTime = useTimer(startTime);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  return (
    <div className="text-xl font-mono bg-gray-100 p-2 rounded">
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}

export default Timer;