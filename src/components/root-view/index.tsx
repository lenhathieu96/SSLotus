import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const RootView: FC<Props> = ({ children, className }) => {
  return <div className={`flex h-full ${className}`}>{children}</div>;
};

export default RootView;
