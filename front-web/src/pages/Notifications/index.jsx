import React, { useState } from "react"
import { Menu, TitlePage, NotificationCardList } from "../../components/index"
// import * as Styled from './style.jsx'
import { StyledContentLogged } from "../../style"

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false)

  const alertList = [
    {
      cardIndex: 4,
      title: "Bem vindo",
      date: "28/10/2023",
      description: "Seja bem vindo Piloto!",
    },
    {
      cardIndex: 1,
      title: "Explore o SalaAis",
      date: "28/10/2023",
      description:
        "Prepare-se para decolar! Explore o painel administrativo e navegue pelo conhecimento que fará você voar mais alto na aviação.",
    },
  ]

  return (
    <>
      <Menu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <div className={isOpen ? "contentClose" : "contentOpen"}>
        <TitlePage text={"Notificações"} />
        <StyledContentLogged>
          <NotificationCardList list={alertList} />
        </StyledContentLogged>
      </div>
    </>
  )
}
