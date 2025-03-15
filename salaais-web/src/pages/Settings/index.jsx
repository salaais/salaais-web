import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  TitlePage,
  Menu,
  Button,
  Switch,
  TextIcon,
} from "../../components/index";
import { BackgroundCard, Gap, StyledContentLogged } from "../../style";

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Menu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <div className={isOpen ? "contentClose" : "contentOpen"}>
        <TitlePage text={"Configurações"} />
        <StyledContentLogged>
          <BackgroundCard>
            <NavLink to={"/plans"}>
              <Button
                text="Ver todos os planos"
                solid
                style={{ width: "100%", padding: "10px" }}
              />
            </NavLink>
            <Switch enabled={["Notificações site"]} />
            <Switch enabled={["Notificações email"]} />
            <Switch enabled={["White mode", "Dark mode"]} />
            <Switch enabled={["Usar Geolocalização"]} />
            <TextIcon text={"Deletar conta"} type={"delete"} align={"center"} />
            <Gap>
              <Button text="Cancelar" />
              <Button text="Salvar" solid />
            </Gap>
          </BackgroundCard>
        </StyledContentLogged>
      </div>
    </>
  );
}
