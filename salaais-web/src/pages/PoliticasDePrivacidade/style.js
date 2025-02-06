import styled from "styled-components";

export const Content = styled.div`
    display:flex;
    justify-content:center;
    width:100%;
`

export const Card = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    max-width:550px;
    background: var(--bg-secondary);
    padding:30px;
    border-radius:20px;
`

export const Text = styled.p`
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
    font-size: 18px;
    font-weight: normal;
    color: var(--txt-secondary);
    max-width: 100%;
    width: 100%;
    text-align:center;
`
export const Title = styled.h1`
    color: var(--txt-title);
    padding: 0 0 20px 0;
    font-size:25px;
    text-align:center;
    font-weight:700;
`