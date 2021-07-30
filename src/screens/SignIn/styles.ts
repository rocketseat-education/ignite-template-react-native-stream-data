import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { MotiView } from 'moti';

export const Container = styled(MotiView)`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})`
  flex: 1;
  background-color: ${props => props.theme.colors.black};
`;

export const LoginBanner = styled.View`
  flex: 1;
  width: 100%;

  background-color: ${props => props.theme.colors.purple};
  padding: ${getStatusBarHeight(true) + 60}px 40px 60px;
`;

export const LoginInfo = styled.View`
  flex: 1;
  width: 100%;
  padding: 48px 32px ${getBottomSpace() + 48}px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Partner = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: 15px;
  color: ${props => props.theme.colors.gray};
`;

export const Description = styled.Text`
  font-family: ${props => props.theme.fonts.bold};
  margin-top: 48px;

  font-size: 25px;
  color: ${props => props.theme.colors.white};
`;

export const SignInButton = styled(RectButton)`
  margin-top: 40px;

  background-color: ${props => props.theme.colors.purple};
  justify-content: center;
  align-items: center;
  flex-direction: row;

  border-radius: 5px;
`;

export const SignInButtonIcon = styled.View`
  padding: 18px 16px;
  background-color: ${props => props.theme.colors.purple_darker};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const SignInButtonText = styled.Text`
  flex: 1;
  color: ${props => props.theme.colors.white};
  font-size: 15px;
  font-family: ${props => props.theme.fonts.regular};
  text-align: center;
`;
