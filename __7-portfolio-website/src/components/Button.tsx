const Button = ({
  className,
  id,
  text,
}: {
  className?: string;
  id: string | number;
  text: string;
}) => {
  return (
    <a href="" className={`${className ?? ""} cta-wrapper`}>
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow down" />
        </div>
      </div>
    </a>
  );
};

export default Button;
