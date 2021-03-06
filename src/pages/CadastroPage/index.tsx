import { Link, useNavigate } from "react-router-dom";
import { version as uuidVersion } from "uuid";
import { validate as uuidValidate } from "uuid";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Titulo } from "../../components/Titulo";
import arrowBack from "../../assets/icons/elements/arrow-back.svg";
import { HeaderForm } from "../../components/HeaderForm";
import iconOffHidePassword from "../../assets/icons/elements/senha-exibir.svg";
import iconOnHidePassword from "../../assets/icons/elements/senha-esconder.svg";
import { useState } from "react";
import "./CadastroPage.css";
import apiClient from "../../services/api-client";

export const CadastroPage = () => {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [codigoAcesso, setCodigoAcesso] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onChangeSetNome = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setNome(e.target.value);
  };

  const onChangeSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setEmail(e.target.value);
  };

  const onChangeSetSenha = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSenha(e.target.value);
  };

  const onChangeSetCodigoAcesso = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setCodigoAcesso(e.target.value);
  };

  const hidePassword = () => {
    setShowPassword(!showPassword);
  };

  const [showPassword, setShowPassword] = useState(false);

  function uuidValidateV4(uuid: string) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
  }

  const registerNewUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setErro("");
    setMensagem("");

    if (uuidValidateV4(codigoAcesso)) {
      try {
        const url = `/auth/cadastrar`;
        const response = await apiClient.post(url, {
          nome,
          email,
          senha,
          codigoAcesso,
        });
        if (response.status === 201) {
          setMensagem("Conta criada com sucesso!");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error: any) {
        console.log(error);
      }
    } else {
      setErro("C??digo de acesso inv??lido!");
    }
    setLoading(false);
  };

  return (
    <Container>
      <HeaderForm />
      <form className="containerCadastro" onSubmit={registerNewUser}>
        <div className="cadastroHeader">
          <Titulo title="Cadastro" />
          <p>Desenvolva e amplie seu potencial na tecnologia.</p>
        </div>
        <div className="cadastroInputField">
          <div>
            <label>
              Nome
              <input
                type="text"
                required
                onChange={(e) => onChangeSetNome(e)}
              />
            </label>
          </div>
          <div>
            <label>
              E-mail
              <input
                type="email"
                required
                onChange={(e) => onChangeSetEmail(e)}
              />
            </label>
          </div>
          <div>
            <label>
              Senha
              <div className="iconHidePassword">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={(e) => onChangeSetSenha(e)}
                />
                <button type="button" onClick={hidePassword}>
                  <img
                    src={
                      showPassword ? iconOffHidePassword : iconOnHidePassword
                    }
                    alt="icon olho"
                  />
                </button>
              </div>
            </label>
          </div>
          <div>
            <label>
              C??digo de acesso (ID da turma)
              <input
                type="text"
                required
                onChange={(e) => onChangeSetCodigoAcesso(e)}
              />
            </label>
          </div>
        </div>
        <div className="cadastroFooter">
          <p className="cadastroFooterText">
            Ao se registrar, voc?? aceita nossos <span>termos de uso </span>e a
            nossa <span>pol??tica de privacidade.</span>
          </p>
          <Button type="submit">
            {loading ? "Carregando..." : "Cadastrar"}
          </Button>
          <Link to="/login">
            <img alt="icon arrow back" src={arrowBack} /> Voltar para login
          </Link>
        </div>
        {erro ? (
          <p className="error">{erro}</p>
        ) : (
          <p className="mensagem">{mensagem}</p>
        )}
      </form>
    </Container>
  );
};
