import "./Titulo.css";
import { TituloProps } from "./TituloTypes";

export const Titulo: React.FC<TituloProps> = (props) => {
  return <h2 className="titulo">{props.title}</h2>;
};
