export type VideoFavoritedProps = {
  handleRemoveAFavorite: (videoId: string) => Promise<void>;
  video: {
    nome: string;
    id: string;
    dataPublicacao: string;
    createdAt: string;
    thumbUrl: string;
  };
};
