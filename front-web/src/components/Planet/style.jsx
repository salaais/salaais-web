import styled, { keyframes } from "styled-components"

const spin = keyframes`
  from {
    transform: rotate(8deg);
  }
  to {
    transform: rotate(15deg);
  }
`

const float = keyframes`
  50% {
    margin-top:40px;
  }
`

export const Planet = styled.img`
  width: ${({ width }) => width || "450px"};
  animation: ${float} 4s cubic-bezier(0.11, -0.23, 1, 1.18) infinite,
    ${spin} 2.5s
      linear(
        0 0%,
        0 1.8%,
        0.01 3.6%,
        0.03 6.35%,
        0.07 9.1%,
        0.13 11.4%,
        0.19 13.4%,
        0.27 15%,
        0.34 16.1%,
        0.54 18.35%,
        0.66 20.6%,
        0.72 22.4%,
        0.77 24.6%,
        0.81 27.3%,
        0.85 30.4%,
        0.88 35.1%,
        0.92 40.6%,
        0.94 47.2%,
        0.96 55%,
        0.98 64%,
        0.99 74.4%,
        1 86.4%,
        1 100%
      )
      infinite alternate;
  overflow: hidden;
  transform: rotate(-40deg);
`

export const Content = styled.div`
  width: ${({ width }) => `calc(${width}px + ${width * 0.1}px)` || "450px"};
  height: 300px;
  padding: 60px 0 90px 20px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`
