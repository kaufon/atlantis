import { Image } from "@heroui/react";

export const Logo = () => {
  return (
    <>
      <div className="flex items-center">
        <Image
          src="/images/atlantis.jpg"
          className="rounded-full"
          alt="Ondas escritos atlantis"
        />
      </div>
    </>
  );
};
