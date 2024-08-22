import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../img/logo-amarelo.png"
import { Button, Input, TitleCard } from '../index';
import * as Styled from '../FormSignIn/style';
import { BackgroundCard } from "../../style";
import axios from "axios";

const api = axios.create({ baseURL: "https://wheretogoapplication.azurewebsites.net",  timeout: 10000, });

export function FormSignUp() {
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // const signUpApplication = async () => {
    //     setNickname('');
    //     setName('');
    //     setEmail('');
    //     setPassword('');

    //     try {
    //         const requestData = {
    //             "name": name,
    //             "email": email,
    //             "password": password,
    //             "nickname": nickname,
    //         };

    //         const response = await api.post("user/register", requestData);

    //         if (response.status === 200) {
    //             // Registro bem-sucedido, redirecione o usuário para a página de login
    //             navigate('/sign-in');
    //         } else {
    //             // Outro status, trate como erro
    //             console.error("Erro no registro. Status: " + response.status);
    //         }
    //     } catch (error) {
    //         console.error("Error making the API request:", error);
    //     }
    // };

    return (
        <Styled.All>
            <TitleCard text={'Cadastro'} />
            <BackgroundCard mobile>
            <Styled.ImgContent>
          <Styled.Img src={Logo} />
        </Styled.ImgContent>
                <Input text="Nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                <Input text="Nome" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <Input text="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input text="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div>
                    <p>Ao se registrar, você aceita nossos
                    <Styled.A target="_blank" rel="noopener noreferrer" href="https://google.com.br/terms"> termos de uso </Styled.A>
                        e a nossa
                        <Styled.A target="_blank" rel="noopener noreferrer" href="https://google.com.br/terms"> política de privacidade</Styled.A>
                    .</p>
                </div>
                <div>
                    <Styled.Text>Já tem uma conta?</Styled.Text>
                    <Styled.TextBold><Link to="/sign-in">Login</Link></Styled.TextBold>
                </div>
                <Button text="Cadastrar" size="md" solid />
            </BackgroundCard>
        </Styled.All>
    );
}
