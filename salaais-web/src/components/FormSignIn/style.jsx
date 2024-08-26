import styled from "styled-components"

export const All = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.h2`
  color: var(--txt-primary);
  padding: 0 0 3px 20px;
`

export const Text = styled.p`
  color: var(--txt-primary);
  text-align: center;
`
export const TextBold = styled.p`
  font-weight: bold;
  font-size: 18px;
  text-align: center;

  a {
    color: var(--txt-title);
  }
`

export const Img = styled.img`
  width: 50%;
  padding-bottom: 40px;
`

export const ImgContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

export const A = styled.a`
  text-decoration: none;
  color: var(--primary-color);
  font-weight: bold;
`
