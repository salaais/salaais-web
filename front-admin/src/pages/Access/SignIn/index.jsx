import React from "react";
import {TitleApresentation, FormSignIn, AirplaneAnimation} from "../../../components/index";
import * as Styled from '../style'

export default function SignIn(){
    return(
        <Styled.Content>
            <Styled.Apresentation>
                <div>
                    <AirplaneAnimation width={400}/>
                    <TitleApresentation/>
                </div>
            </Styled.Apresentation>
            <FormSignIn/>
        </Styled.Content>
    )
}