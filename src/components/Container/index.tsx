import "./container.css";
import { ContainerProps } from "./ContainerTypes";

export const Container = ({ children }: ContainerProps) => {
  return <div className="container">{children}</div>;
};
