import { useState } from "react";
import { Button, Menu, TitlePage } from "../../components";
import { BackgroundCard, StyledContentLogged } from "../../style";
import { Grid, Row } from "./style";
import { faMoneyBill, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { paymentPlan } from "../../services/apiSalaAis";
import * as Styled from "./style";
import { useEffect } from "react";
import { getCookie } from "../../utils/Cookie/cookie";

export default function Plans() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [tokenUserMobile, setTokenUserMobile] = useState(null);

  const payment = async (plan) => {
    try {
      const accessToken = tokenUserMobile || "";
      const response = await paymentPlan(accessToken, plan);
      
      if (response && response?.url) {
        setSuccess(
          <>
            Redirecionado para o pagamento. Caso não tenha aberto o link de pagamento,{" "}
            <a
              href={response.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline' }}
            >
              Clique Aqui
            </a>

          </>
        );
  
        // Tenta abrir a URL do pagamento em uma nova aba
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
    const tokenFromCookie = getCookie('token-user-mobile');
    if (tokenFromCookie) {
      setTokenUserMobile(tokenFromCookie);
    }
  }, []);

  const dataPlans = [
    {
      color: "#FF5722",
      plan: "Premium",
      price: "93,90",
      description:
        "Acesso aos simulados da ANAC, simulados de estudos dividos por blocos e matérias durante 120 dias",
    },
    {
      color: "#FFD700",
      plan: "Ouro",
      price: "73,90",
      description:
        "Acesso aos simulados da ANAC, simulados de estudos dividos por blocos e matérias durante 90 dias",
    },
    {
      color: "#999B9B",
      plan: "Prata",
      price: "53,90",
      description:
        "Acesso aos simulados da ANAC, simulados de estudos dividos por blocos e matérias durante 60 dias",
    },
    {
      color: "#CD7F32",
      plan: "Bronze",
      price: "35,50",
      description:
        "Acesso aos simulados da ANAC, simulados de estudos dividos por blocos e matérias durante 30 dias",
    },
  ];

  return (
    <>
      <Menu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <div className={isOpen ? "contentClose" : "contentOpen"}>
        <TitlePage text={"Planos"} />
        <StyledContentLogged>
          <Grid>
            {dataPlans.map((plan) => (
              <BackgroundCard key={plan.plan}>
                <Row>
                  <FontAwesomeIcon icon={faTrophy} color={plan.color} />
                  <h2>{plan.plan}</h2>
                </Row>
                <p>{plan.description}</p>
                <Styled.AlignButton>
                  <Button
                    text={`R$${plan.price} - Contratar`}
                    solid
                    style={{
                      justifyContent: "center",
                      width: "100%",
                    }}
                    icon={faMoneyBill}
                    onClick={() => payment(String(plan.plan).toUpperCase())}
                  />
                  {error && <Styled.ErrorText>{error}</Styled.ErrorText>}
                  {success && <Styled.SuccessText>{success}</Styled.SuccessText>}
                </Styled.AlignButton>
              </BackgroundCard>
            ))}
          </Grid>
        </StyledContentLogged>
      </div>
    </>
  );
}
