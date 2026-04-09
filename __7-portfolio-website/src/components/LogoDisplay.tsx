import { logoIconsList } from "../constants";

const LogoDisplay = () => {
  return (
    <div className="md:my-20 my-10 relative">
      <div className="gradient-edge" />
      <div className="gradient-edge" />
      <div className="marquee h-52">
        <div className="marquee-box md:gap-12 gap-5">
          {logoIconsList.map(({ imgPath }, index) => (
            <div key={index} className="flex-none flex-center marquee-item">
              <img src={imgPath} alt={"Company logo"} />
            </div>
          ))}
          {logoIconsList.map(({ imgPath }, index) => (
            <div key={index} className="marquee-item flex-none flex-center">
              <img src={imgPath} alt={"Company logo"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoDisplay;
