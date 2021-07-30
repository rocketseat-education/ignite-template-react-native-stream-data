import { MotiView } from 'moti';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled(MotiView)`
  flex: 1;
  background-color: ${props => props.theme.colors.black};
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight(true) + 10}px 12px 24px 24px;
  background-color: ${props => props.theme.colors.purple};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;

  align-items: center;
`;

export const Avatar = styled.Image`
  margin-right: 16px;

  width: 48px;
  height: 48px;
  border-radius: 5px;
`;

export const UserInfoText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 20px;
  font-family: ${props => props.theme.fonts.regular};
`;

export const SignOutButton = styled(RectButton)`
  justify-content: center;

  align-items: center;
  flex-direction: row;

  padding: 12px;
  border-radius: 5px;
`;

export const UserFollowedStreams = styled.View`
  margin-top: 32px;
`;

export const UserFollowedStreamsTitle = styled.Text`
  margin-bottom: 24px;
  margin-left: 24px;

  color: ${props => props.theme.colors.white};
  font-size: 20px;
  font-family: ${props => props.theme.fonts.bold};
`;

export const TopGames = styled.View`
  margin-top: 48px;
`;

export const TopGamesTitle = styled.Text`
  margin-bottom: 24px;
  margin-left: 24px;

  color: ${props => props.theme.colors.white};
  font-size: 20px;
  font-family: ${props => props.theme.fonts.bold};
`;
