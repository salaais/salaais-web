import React from "react"
// import styled from 'styled-components';

import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUserAlt,
  faChevronRight,
  faPaperPlane,
  faBell,
  faGear,
  faRightFromBracket,
  faHome,
  faMapLocationDot,
  faUserGroup,
  faCalendarDays,
  faMedal,
} from "@fortawesome/free-solid-svg-icons" //faChevronCircleRight
import "./style.css"

export function Menu(props) {
  return (
    <div>
      <div
        className="menuMobileButton"
        id={props.isOpen ? "iMenuOpen" : "iMenuClose"}
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      <ul className={props.isOpen ? "menuOpen" : "menuClose"}>
        <li onClick={props.onClick}>
          <FontAwesomeIcon
            className=" menuButton icon"
            icon={faChevronRight}
            id={props.isOpen ? "iMenuOpen" : "iMenuClose"}
          />
        </li>
        <NavLink to={"/Profile"}>
          <li>
            <FontAwesomeIcon className="icon" icon={faUserAlt} />
            <a>Perfil</a>
          </li>
        </NavLink>

        <NavLink to={"/"}>
          <li>
            <FontAwesomeIcon className="icon" icon={faHome} />
            <a>Home</a>
          </li>
        </NavLink>

        <NavLink to={"/users"}>
          <li>
            <FontAwesomeIcon className="icon" icon={faUserGroup} />
            <a>Users</a>
          </li>
        </NavLink>

        <NavLink to={"/notifications"}>
          <li>
            <FontAwesomeIcon className="icon" icon={faBell} />
            <a>Notificações</a>
          </li>
        </NavLink>

        <NavLink to={"/settings"}>
          <li>
            <FontAwesomeIcon className="icon" icon={faGear} />
            <a>Configurações</a>
          </li>
        </NavLink>

        <NavLink to={"/sign-in"}>
          <li id="logout">
            <FontAwesomeIcon className="icon" icon={faRightFromBracket} />
            <a>Sair</a>
          </li>
        </NavLink>
      </ul>
    </div>
  )
}
