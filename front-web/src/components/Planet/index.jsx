import React from "react";
import PlanetImg from '../../img/airplane1.png'
import * as Styled from './style.jsx';


export function AirplaneAnimation({width=400}){
  return(
    <Styled.Content width={width} height={width}>
        <Styled.Planet src={PlanetImg} width={width} />
    </Styled.Content>
  )
}