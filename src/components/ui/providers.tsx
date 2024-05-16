
'use client';
import { Next13ProgressBar } from 'next13-progressbar';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar height="4px" color="#614185" options={{ showSpinner: true }} showOnShallow  startPosition={0.3} stopDelayMs={200} />
    </>
  );
};

export default Providers;