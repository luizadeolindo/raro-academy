import "./comment.css";
import thumbsUpOutline from "../../assets/icons/elements/thumbs-up-outline.svg";
import thumbsUpFilled from "../../assets/icons/elements/thumbs-up-filled.svg";
import thumbsDownOutline from "../../assets/icons/elements/thumbs-down-outline.svg";
import thumbsDownFilled from "../../assets/icons/elements/thumbs-down-filled.svg";
import deleteSvg from "../../assets/icons/elements/delete.svg";
import editSvg from "../../assets/icons/elements/edit.svg";
import apiClient from "../../services/api-client";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { CommentProps } from "./CommentTypes";
import { patchCommentary } from "../../services/comments";

export const Comment = ({ comentario, comments }: CommentProps) => {
  const ID = localStorage.getItem("id");
  const { id } = useParams();

  const [edit, setEdit] = useState(false);
  const [novoTexto, setNovoTexto] = useState("");

  const onChangeNewText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setNovoTexto(e.target.value);
  };

  const curtir = async () => {
    if (comentario.meuVote?.vote === "up") {
      await apiClient.delete(
        `/videos/${id}/comentarios/${comentario.id}/votes`
      );
      return comments();
    }
    await apiClient.put(`/videos/${id}/comentarios/${comentario.id}/votes`, {
      vote: "up",
    });
    comments();
  };

  const descurtir = async () => {
    if (comentario.meuVote?.vote === "down") {
      await apiClient.delete(
        `/videos/${id}/comentarios/${comentario.id}/votes`
      );
      return comments();
    }
    await apiClient.put(`/videos/${id}/comentarios/${comentario.id}/votes`, {
      vote: "down",
    });
    comments();
  };

  const deleteComment = async () => {
    await apiClient.delete(`/videos/${id}/comentarios/${comentario.id}`);
    comments();
    setEdit(false);
  };

  const editComment = () => {
    setEdit(!edit);
  };

  const editarComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (novoTexto) {
      patchCommentary(id, comentario.id, novoTexto);
      setEdit(false);
      comments();
      setNovoTexto("");
    }
  };
  return (
    <div className="comment">
      <img src={comentario.aluno.foto} alt="foto aluno" />
      <div className="commentContainer">
        <h2>{comentario.aluno.nome}</h2>
        <div className="commentBox">
          <p className={edit ? "editable" : ""}>{comentario.texto}</p>
          <div className="editComment">
            {comentario.aluno.id === ID ? (
              <form onSubmit={editarComment}>
                <input
                  type="text"
                  value={novoTexto}
                  placeholder="Edite o seu comentário..."
                  onChange={(e) => onChangeNewText(e)}
                  className={edit ? "showEdit" : "editable"}
                />
              </form>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="thumbs">
          <div className="votes">
            <div className="voteContainer">
              <img
                src={
                  comentario.meuVote?.vote === "up"
                    ? thumbsUpFilled
                    : thumbsUpOutline
                }
                alt="icon upvote"
                onClick={curtir}
              />
              {comentario.upVotes}
            </div>
            <div className="voteContainer">
              <img
                src={
                  comentario.meuVote?.vote === "down"
                    ? thumbsDownFilled
                    : thumbsDownOutline
                }
                alt="icon downvote"
                onClick={descurtir}
              />
              {comentario.downVotes}
            </div>
          </div>
          <div className="editContainer">
            <div className="editContainer-options">
              {comentario.aluno.id === ID ? (
                <img
                  src={deleteSvg}
                  alt="icon lixeira"
                  onClick={deleteComment}
                />
              ) : (
                <></>
              )}
              {comentario.aluno.id === ID ? (
                <img src={editSvg} alt="icon editar" onClick={editComment} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
