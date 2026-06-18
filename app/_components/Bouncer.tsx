type BouncerProps = {
  classNames?: string;
};

const Bouncer = ({ classNames }: BouncerProps) => (
  <div
    className={`mt-9 sm:mt-7 flex justify-center animate-pulse ${classNames}`}
  >
    <div className="flex space-x-2">
      <div className="rounded-full h-2 w-2 bg-[rgb(234,65,49)] animate-bounce [animation-delay:-0.3s]" />

      <div className="rounded-full h-2 w-2 bg-[rgb(244,208,76)] animate-bounce [animation-delay:-0.15s]" />

      <div className="rounded-full h-2 w-2 bg-[rgb(117,168,67)] animate-bounce" />
    </div>
  </div>
);

export default Bouncer;
