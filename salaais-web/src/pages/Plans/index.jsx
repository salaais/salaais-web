import { useState } from "react";
import { Button, Menu, TitlePage } from "../../components";
import { BackgroundCard, StyledContentLogged } from "../../style";
import { Grid, Row } from "./style";
import { faMoneyBill, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { paymentPlan } from "../../services/apiSalaAis";
import * as Styled from "./style";

export default function Plans() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const payment = async (plan) => {
    try {
      const accessToken = "123";
      await paymentPlan(accessToken ?? "", plan);
      setSuccess("Redirecionado para o pagamento.");
      setTimeout(() => setSuccess(null), 8000);
    } catch (err) {
      setError("Erro ao processar o pagamento. Faça login no app e tente novamente.");
      setTimeout(() => setError(null), 8000);
    }
  };

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
                <div>
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
                </div>
              </BackgroundCard>
            ))}
          </Grid>
        </StyledContentLogged>
      </div>
    </>
  );
}