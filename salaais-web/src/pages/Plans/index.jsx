import { useState } from "react";
import { Button, Menu, TitlePage } from "../../components";
import { BackgroundCard, StyledContentLogged } from "../../style";
import { Grid, Row } from "./style";
import { faMoneyBill, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { paymentPlan } from "../../services/apiSalaAis";

export default function Plans() {
  const [isOpen, setIsOpen] = useState(false);

  //type 'BRONZE' | 'PRATA' | 'OURO' | 'PREMIUM'
  const payment = async (plan) => {
    const accessToken = "123";
    const {} = await paymentPlan(accessToken ?? "", plan);
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
                <Button
                  text={` R$${plan.price} - Contratar`}
                  solid
                  style={{
                    justifyContent: "center",
                    width: "100%",
                  }}
                  icon={faMoneyBill}
                  onClick={() => payment(String(plan.plan).toUpperCase())}
                />
              </BackgroundCard>
            ))}
          </Grid>
        </StyledContentLogged>
      </div>
    </>
  );
}
