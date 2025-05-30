import { useState, useEffect } from "react";
import { Button, Menu, TitlePage } from "../../components";
import { BackgroundCard, StyledContentLogged } from "../../style";
import { Grid, Row } from "./style";
import { faMoneyBill, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { paymentPlan } from "../../services/apiSalaAis";
import * as Styled from "./style";
import { getCookie } from "../../utils/Cookie/cookie";
import api from "../../services/apiSalaAis";

export default function Plans() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [tokenUserMobile, setTokenUserMobile] = useState(null);
  const [plansList, setPlansList] = useState([]);

  const getAllPlans = async () => {
    try {
      const response = await api.get("/stripe/produtos-dados-publicos");
      console.log("Resposta completa da API:", response);
      console.log("response.data:", response.data);
      setPlansList(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error making the API request:", error);
      setPlansList([]);
    }
  };


  const payment = async (priceId) => {
    try {
      const accessToken = tokenUserMobile || "";
      const response = await paymentPlan(accessToken, priceId);

      if (response && response.url) {
        setSuccess(
          <>
            Redirecionado para o pagamento. Caso não tenha aberto o link de pagamento,{" "}
            <a
              href={response.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              Clique Aqui
            </a>
          </>
        );

        const newWindow = window.open(response.url, "_blank");
        if (!newWindow) {
          throw new Error("A nova aba foi bloqueada.");
        }
      } else {
        throw new Error("A URL de pagamento não foi retornada.");
      }

      setTimeout(() => setSuccess(null), 8000);
    } catch (err) {
      setError("Erro ao processar o pagamento. Faça login no app e tente novamente.");
      setTimeout(() => setError(null), 8000);
    }
  };

  useEffect(() => {
    const tokenFromCookie = getCookie("token-user-mobile");
    if (tokenFromCookie) {
      setTokenUserMobile(tokenFromCookie);
    }
    getAllPlans();
  }, []);

  const planColors = {
    BRONZE: "#CD7F32",
    PRATA: "#999B9B",
    OURO: "#FFD700",
    PREMIUM: "#FF5722",
  };

  return (
    <>
      <Menu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <div className={isOpen ? "contentClose" : "contentOpen"}>
        <TitlePage text={"Planos"} />
        <StyledContentLogged>
          <Grid>
            {plansList.length === 0 ? (
              <p  style={{ display:"flex", justifyContent:"center" }}>Carregando planos...</p>
            ) : (
              plansList.map((plan) => (
                <BackgroundCard key={plan.key}>
                  <Row>
                    <FontAwesomeIcon icon={faTrophy} color={planColors[plan.nome]} size="2x" />
                    <h2 style={{ color: planColors[plan.nome] }}>{plan.nome}</h2>
                  </Row>
                  <p>{plan.descricao}</p>
                  <Styled.AlignButton>
                    <Button
                      text={`R$${(plan.price / 100).toFixed(2).replace(".", ",")} - Contratar`}
                      solid
                      style={{ justifyContent: "center", width: "100%" }}
                      icon={faMoneyBill}
                      onClick={() => payment(plan.price_id)}
                    />
                    {error && <Styled.ErrorText>{error}</Styled.ErrorText>}
                    {success && <Styled.SuccessText>{success}</Styled.SuccessText>}
                  </Styled.AlignButton>
                </BackgroundCard>
              ))
            )}
          </Grid>
        </StyledContentLogged>
      </div>
    </>
  );
}
