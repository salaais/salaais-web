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

  const planColors = {
    BRONZE: "#CD7F32",
    PRATA: "#999B9B",
    OURO: "#FFD700",
    PREMIUM: "#FF5722",
  };

  const planType = {
    BRONZE: "BRONZE",
    PRATA: "PRATA",
    OURO: "OURO",
    PREMIUM: "PREMIUM",
  };

  const AllPlans = [
    {
      "ativo": true,
      "descricao": "Acesso aos simulados da ANAC e simulados de estudos divididos por blocos e matérias durante 30 dias corridos.",
      "link_imagens": [],
      "nome": "BRONZE",
      "permission_key": planType.BRONZE,
      "price": 2590,
      "currency": "brl",
      "key": "BRONZE_4907",
      "duracao_plano_em_dias": 30,
      // "price_id": "price_1QED0wFV7hxmxPWqxAM5DveM", testmode stripe
      "price_id": "price_1RWJlgFV7hxmxPWqNSnz9Q8T",
    },
    {
      "ativo": true,
      "descricao": "Acesso aos simulados da ANAC e simulados de estudos divididos por blocos e matérias durante 90 dias corridos.",
      "link_imagens": [],
      "nome": "PRATA",
      "permission_key": planType.PRATA,
      "price": 4990,
      "currency": "brl",
      "key": "OURO_1903",
      "duracao_plano_em_dias": 90,
      // "price_id": "price_1QEDFJFV7hxmxPWqDCD1UYDU", testmode stripe
      "price_id": "price_1RUDCQFV7hxmxPWqp4DNxbS9",
    },
    {
      "ativo": true,
      "descricao": "Acesso aos simulados da ANAC e simulados de estudos divididos por blocos e matérias durante 90 dias corridos.",
      "link_imagens": [],
      "nome": "OURO",
      "permission_key": planType.OURO,
      "price": 5990,
      "currency": "brl",
      "key": "OURO_1903",
      "duracao_plano_em_dias": 90,
      // "price_id": "price_1QEDGdFV7hxmxPWqcxyw7CEr", testmode stripe
      "price_id": "price_1RWJowFV7hxmxPWqEJgcD44v",
    },
    {
      "ativo": true,
      "descricao": "Acesso aos simulados da ANAC e simulados de estudos divididos por blocos e matérias durante 120 dias corridos.",
      "link_imagens": [],
      "nome": "PREMIUM",
      "permission_key": planType.PREMIUM,
      "price": 7690,
      "currency": "brl",
      "key": "PREMIUM_9095",
      "duracao_plano_em_dias": 120,
      // "price_id": "price_1QEDIFFV7hxmxPWqqc7z6umF", testmode stripe
      "price_id": "price_1RWKTZFV7hxmxPWqVy7c8tNV",
    }
  ]

  const payment = async (priceId, permissionKey) => {
    try {
      const accessToken = tokenUserMobile || "";
      const response = await paymentPlan(accessToken, priceId, permissionKey);

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
    setPlansList(AllPlans);
  }, []);

  return (
    <>
      <Menu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <div className={isOpen ? "contentClose" : "contentOpen"}>
        <TitlePage text={"Planos"} />
        <StyledContentLogged>
          <Grid>
            {plansList.length === 0 ? (
              <p style={{ display: "flex", justifyContent: "center" }}>Carregando planos...</p>
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
                      onClick={() => payment(plan.price_id, plan.permission_key)}
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
