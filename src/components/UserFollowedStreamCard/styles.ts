import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 260px;

  margin-right: 16px;
`;

export const Thumbnail = styled.ImageBackground`
  width: 260px;
  height: 145px;
  overflow: hidden;

  border-radius: 10px;

  justify-content: flex-end;
`;

export const ViewersCount = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 13px;
  font-family: ${props => props.theme.fonts.bold};
`;

export const Info = styled.View`
  margin-top: 16px;

  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;

  margin-right: 16px;
`;

export const InfoText = styled.View`
  flex: 1;
  height: 40px;

  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 15px;
  font-family: ${props => props.theme.fonts.bold};
`;

export const Streamer = styled.Text`
  color: ${props => props.theme.colors.gray};
  font-size: 13px;
  font-family: ${props => props.theme.fonts.regular};
`;
