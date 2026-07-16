const Loading = () => {
  return (
    <div className="flex min-h-[70dvh] items-center justify-center" role="status" aria-label="Načítání">
      <span className="size-7 animate-spin rounded-full border-2 border-border border-t-ink" />
    </div>
  );
};
export default Loading;