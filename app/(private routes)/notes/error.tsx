'use client';

interface ErrorHandlerProps {
  error: Error;
}

function ErrorHandler({ error }: ErrorHandlerProps) {
  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>;
    </div>
  );
}

export default ErrorHandler;
