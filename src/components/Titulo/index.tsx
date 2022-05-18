import "./Titulo.css";

type TituloProps = {
  title: string;
};

export const Titulo: React.FC<TituloProps> = (props) => {
  return <h2 className="titulo">{props.title}</h2>;
};
