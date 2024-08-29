import styled from "styled-components"

export const ImgProfile = styled.img`
  width: 130px;
`
export const Center = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`
export const Flex = styled.div`
  // display: flex;
  // gap:20px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  @media (width < 768px) {
    flex-direction: row;
    justify-content: center;
  }
`

export const ScrollX = styled.div`
  width: 100%;
  overflow-x: auto;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: separate; /* Alterado de collapse para separate para suportar border-radius */
  border-spacing: 0; /* Remove o espaço entre as células para bordas contínuas */
  margin: 20px 0 0 0;

  th,
  td {
    border: 1px solid #ffffff;
    text-align: left;
    padding: 8px;
    color: var(--txt-primary);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  td {
    cursor: pointer;
  }

  th {
    background-color: ${(props) => {
      switch (props.type) {
        case "error":
          return "var(--danger-primary)";
        case "success":
          return "var(--success-color)";
        default:
          return "var(--success-color)";
      }
    }};
    color: var(--bg-secondary);
    font-size: 17px;
  }

  tr:nth-child(even) {
    background-color: var(--bg-tartiary);
  }

  tr:nth-child(odd) {
    background-color: var(--bg-primary); /* Cor vermelha para a última linha */
  }

  tr:hover {
    background-color: var(--bg-quinary-color);
  }

  /* Border-radius para a primeira linha */
  tr:first-child th:first-child {
    border-top-left-radius: 10px; /* Ajuste o valor conforme necessário */
  }

  tr:first-child th:last-child {
    border-top-right-radius: 10px; /* Ajuste o valor conforme necessário */
  }

  /* Border-radius para a última linha */
  tr:last-child td:first-child {
    border-bottom-left-radius: 10px; /* Ajuste o valor conforme necessário */
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 10px; /* Ajuste o valor conforme necessário */
  }
`

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(70px, 1fr));
  grid-auto-rows: 70px;
  gap: 10px;
`

export const BigBox = styled.div`
  border-radius: 15px;
  background-color: var(--bg-secondary);
  grid-column: span 3; /* Span 2 columns */
  grid-row: span 3; /* Span 3 rows */
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

export const MediumBox = styled.div`
  border-radius: 15px;
  background-color: var(--bg-secondary);
  grid-column: span 2;
  grid-row: span 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

export const SmallBox = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 15px;
  background-color: var(--bg-secondary);
`
