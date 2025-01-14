import Image from "next/image";
const GradientBackground = () => {
  return (
    <>
      <Image
        width={1512}
        height={550}
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2"
        src="/gradient-background-top.png"
        alt=""
        role="presentation"
        priority
      />
      <Image
        width={1512}
        height={447}
        className="absolute -bottom-6 left-1/2 -z-10 -translate-x-1/2"
        src="/gradient-background-bottom.png"
        alt=""
        role="presentation"
        priority
      />
    </>
  );
};

export default GradientBackground;
