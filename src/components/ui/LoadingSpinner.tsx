const LoadingSpinner = () => {
  return (
    <div className="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner; 