import React, { useState } from "react";
import { StyledContentLogged, Gap, BackgroundCard } from "../../style";
import { Menu, Input, Button, TitlePage, Text } from "../../components/index";
import apiSalaAis from "../../services/apiSalaAis";
import { getCookie } from "../../utils/utils";

export default function Admin() {
  const [isOpen, setIsOpen] = useState(false);
  const [tsvValuesTitle, setTsvValuesTitle] = useState("");
  const [tsvValuesData, setTsvValuesData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [responseDetails, setResponseDetails] = useState(null)

  const registerQuestions = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setResponseDetails(null)
    const authToken = getCookie("authToken");

    try {

      const response = await apiSalaAis.post(
        "/questao/tsv",
        { tsv_values: `${tsvValuesTitle}\n${tsvValuesData}`.replace(/\t/g, '\t').replace(/\n/g, '\n')}, // Enviar o valor formatado
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Passando o token no header Authorization
          },
        }
      );

      // Handle success
      setSuccess(true);
      setResponseDetails(response.data)
      console.log("Successfully registered questions:", response.data);
    } catch (error) {
      // Handle error
      setError(error.response?.data?.message || "An error occurred");
      console.error("Failed to register questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Menu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <div className={isOpen ? "contentClose" : "contentOpen"}>
        <TitlePage text={"Admin"} />

        <StyledContentLogged>
          <BackgroundCard>
            <Text text={"Cadastro De Questões Ctrl+V Excel"} size={"lg"} />
            <Input
              text={"Títulos"}
              value={tsvValuesTitle}
              onChange={(e) => setTsvValuesTitle(e.target.value)}
            />
            <Input
              type={'textarea'}
              text={"Data"}
              value={tsvValuesData}
              onChange={(e) => setTsvValuesData(e.target.value)}
            />

            <Gap>
              <Button text="Cancelar" />
              <Button
                text={loading ? "Salvando..." : "Salvar"}
                solid
                onClick={registerQuestions}
                disabled={loading} // Disable button while loading
              />
            </Gap>

            {success && responseDetails && (
              <div>
                <Text text={"Questões cadastradas com sucesso!"} />
                <Text text={`Número adicionadas: ${responseDetails.numero_adicionadas}`} />
                <Text text={`Número alteradas: ${responseDetails.numero_alteradas}`} />
                <Text text={`Questões adicionadas: ${responseDetails.questoes_adicionadas.join(", ")}`} />
                <Text text={`Questões alteradas: ${responseDetails.questoes_alteradas.join(", ")}`} />
              </div>
            )}
            {error && <Text text={`Erro: ${error}`} />}
          </BackgroundCard>
        </StyledContentLogged>
      </div>
    </>
  );
}
