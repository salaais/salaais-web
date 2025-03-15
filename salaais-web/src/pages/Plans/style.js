import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 colunas por padrão */
  gap: 16px; /* Espaçamento entre os itens */

  /* Responsividade para telas menores */
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 coluna em telas menores */
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
