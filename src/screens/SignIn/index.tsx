import React from 'react';
import { useTheme } from 'styled-components';
import { Fontisto } from '@expo/vector-icons'
import { ActivityIndicator, Alert, Modal, View } from 'react-native';

import { useAuth } from '../../hooks/useAuth';

import LoginBannerImg from '../../assets/images/login.svg';
import LogoImg from '../../assets/images/logo.svg';

import { 
  Container,
  Content,
  LoginBanner, 
  LoginInfo, 
  Header, 
  Partner, 
  Description, 
  SignInButton,
  SignInButtonIcon,
  SignInButtonText 
} from './styles';

export function SignIn() {
  const { signIn, isLoggingIn } = useAuth();
  const theme = useTheme();

  // creates a function to handle sign in
    // try to call and wait signIn
    // if fails, display an Alert with the title "Erro SignIn" and message "Ocorreu um erro ao tentar logar no app"

    // const signInButtonProps = {
    //   onPress: your-signIn-function
    // }

  return (
    <Container
      from={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    >
      <Content>
        <LoginBanner>
          <LoginBannerImg width="100%" />
        </LoginBanner>

        <LoginInfo>
          <Header>
            <LogoImg />
            <Partner>by twitch</Partner>
          </Header>

          <Description>
            Veja dados{'\n'}
            interessantes sobre{'\n'}
            o mundo da Twitch
          </Description>

          {/* <SignInButton {...signInButtonProps}>
            <SignInButtonIcon>
              Verify if isLoggingIn is true
              If it is, show an ActivityIndicator
              Otherwise, show Fontisto's twitch icon
            </SignInButtonIcon>

            <SignInButtonText>
              Verify if isLoggingIn is true
              If it is, show "Entrando..."
              Otherwise, show "Entrar com Twitch"
            </SignInButtonText>
          </SignInButton> */}
        </LoginInfo>
      </Content>

      <Modal 
        animationType="fade"
        visible={isLoggingIn}
        statusBarTranslucent
        transparent
      >
        <View
          style={{ flex: 1, backgroundColor: 'rgba(14, 14, 16, 0.5)' }}
        />
      </Modal>
    </Container>
  );
}