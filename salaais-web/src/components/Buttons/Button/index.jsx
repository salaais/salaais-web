import React, { useState } from "react";
import * as Styled from "./style.jsx";
import { faSpinner } from "@fortawesome/free-solid-svg-icons"; // Importe o ícone de carregamento
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Button({
  background,
  text,
  borderColor,
  size,
  solid = false,
  onClick=()=>{},
  style,
  icon,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick(); // Execute a ação do botão, por exemplo, uma requisição assíncrona
    } finally {
      // Após a ação do botão (mesmo se houver um erro), pare o carregamento
      setIsLoading(false);
    }
  };

  return (
    <Styled.Content>
      <Styled.Button
        solid={solid}
        background={background}
        borderColor={borderColor}
        size={size}
        onClick={isLoading ? null : handleClick}
        disabled={isLoading}
        style={style}
      >
        <FontAwesomeIcon icon={icon} style={{ marginRight: "10px" }}/>
        {isLoading ? (
          <>
            <Styled.ContentIcon>
              <Styled.LoadingIcon solid={solid} icon={faSpinner} />
            </Styled.ContentIcon>
          </>
        ) : (
          text
        )}
      </Styled.Button>
    </Styled.Content>
  );
}
