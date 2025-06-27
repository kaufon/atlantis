import { Button } from "@heroui/react";
import type { ReactNode } from "react";

type IconButtonProps = {
  children: ReactNode;
  onClick?: VoidFunction;
  onPress?: VoidFunction
};

export const IconButton = ({ children, onClick,onPress }: IconButtonProps) => {
  return (
    <Button
      isIconOnly
      onClick={onClick}
      onPress={onPress}
      className="bg-transparent hover:bg-primary text-gray-700 hover:text-white duration-1000 border-zinc-400"
    >
      {children}
    </Button>
  );
};
