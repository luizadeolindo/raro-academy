export type CommentProps = {
  comments: () => Promise<void>;
  comentario: {
    id: string;
    upVotes: string;
    downVotes: string;
    meuVote: {
      vote: string;
    };
    texto: string;
    aluno: {
      nome: string;
      id: string;
      foto: string;
    };
  };
};
