import React from "react";
import {TitleApresentation, FormSignUp, AirplaneAnimation} from "../../../components/index";
import * as Styled from '../style'

export default function SignUp(){
    return(
        <Styled.Content>
            <Styled.Apresentation>
                <div>
                    <AirplaneAnimation width={400}/>
                    <TitleApresentation/>
                </div>
            </Styled.Apresentation>
            <FormSignUp/>
        </Styled.Content>
    )
}