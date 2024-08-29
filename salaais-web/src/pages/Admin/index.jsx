import React, { useState, useCallback } from "react"
import { StyledContentLogged, Gap, BackgroundCard } from "../../style"
import { Menu, Input, Button, TitlePage, Text } from "../../components/index"
import apiSalaAis from "../../services/apiSalaAis"
import { getCookie } from "../../utils/utils"
import * as Styled from "./style"

const ErrorTable = ({ error }) => {
  if (!error) return null

  const errorData = {
    message: error.message || "No message",
    code: error.code || "No status",
    status: error.response?.status || "No status",
    baseURL: error.response?.config?.baseURL || "No BaseURL",
   "data.message": error.response?.data?.message || "data.message",
    statusText: error.response?.statusText || "No status text",
    method: error.response?.config?.method || "no method",
    data: error.response?.data || "No data",
  }
  console.log(error)

  return (
    <Styled.ScrollX>
      <Styled.Table type={"error"}>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(errorData).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{JSON.stringify(value, null, 2)}</td>
            </tr>
          ))}
        </tbody>
      </Styled.Table>
    </Styled.ScrollX>
  )
}

const SuccessTable = ({ responseDetails }) => {
  if (!responseDetails) return null

  const successData = {
    "Número adicionadas": responseDetails.numero_adicionadas,
    "Número alteradas": responseDetails.numero_alteradas,
    "Questões adicionadas": responseDetails.questoes_adicionadas.join("     "),
    "Questões alteradas": responseDetails.questoes_alteradas.join("     "),
  }

  return (
    <Styled.ScrollX>
      <Styled.Table type={"success"}>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(successData).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </Styled.Table>
    </Styled.ScrollX>
  )
}

export default function Admin() {
  const [isOpen, setIsOpen] = useState(false)
  const [tsvValuesTitle, setTsvValuesTitle] = useState("")
  const [tsvValuesData, setTsvValuesData] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [responseDetails, setResponseDetails] = useState(null)

  const registerQuestions = useCallback(async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    setResponseDetails(null)

    const authToken = getCookie("authToken")

    try {
      const response = await apiSalaAis.post(
        "/questao/tsv",
        {
          tsv_values: `${tsvValuesTitle}\n${tsvValuesData}`
            .replace(/\t/g, "\t")
            .replace(/\n/g, "\n"),
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )

      setSuccess(true)
      setResponseDetails(response.data)
      console.log("Successfully registered questions:", response.data)
    } catch (error) {
      setError(error)
      console.error("Failed to register questions:", error)
    } finally {
      setLoading(false)
    }
  }, [tsvValuesTitle, tsvValuesData])

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
              type={"textarea"}
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
                disabled={loading}
              />
            </Gap>

            {success && responseDetails && (
              <div>
                <Text text={"🎉Sucesso!"} />
                <SuccessTable responseDetails={responseDetails} />
              </div>
            )}
            {error && (
              <div>
                <Text text={"☹️Erro"} />
                <ErrorTable error={error} />
              </div>
            )}
          </BackgroundCard>
        </StyledContentLogged>
      </div>
    </>
  )
}
