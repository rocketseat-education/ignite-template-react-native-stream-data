import { useTheme } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, ActivityIndicator, View } from 'react-native';
import { Feather } from '@expo/vector-icons'

import { TopGamesCard } from '../../components/TopGamesCard';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

import {
  Container, 
  Header, 
  UserInfo, 
  Avatar, 
  UserInfoText,
  SignOutButton, 
  UserFollowedStreams, 
  UserFollowedStreamsTitle, 
  TopGames, 
  TopGamesTitle
} from './styles';
import { UserFollowedStreamCard } from '../../components/UserFollowedStreamCard';

interface TopGames {
  box_art_url: string, 
  id: string, 
  name: string
}

interface UserFollowedStreams {
  id: string;
  thumbnail_url: string, 
  title: string,
  user_id: string, 
  user_login: string, 
  user_name: string,
  viewer_count: number
}

interface UserFollowedStreamsFormatted extends UserFollowedStreams {
  user_avatar_url: string;
}

export function Home() {
  const [topGames, setTopGames] = useState<TopGames[]>([]);
  const [userFollowedStreams, setUserFollowedStreams] = useState<UserFollowedStreamsFormatted[]>([]);
  const [isLoadingUserFollowedStreams, setIsLoadingUserFollowedStreams] = useState(true);
  const [isLoadingTopGames, setIsLoadingTopGames] = useState(true);
  
  const theme = useTheme();
  const { signOut, user, isLoggingOut } = useAuth();

  // creates a function to handle sign out
    // try to call and wait signOut
    // if fails, display an Alert with the title "Erro SignOut" and message "Ocorreu um erro ao tentar se deslogar do app"

  async function getTopGames() {
    try {
      const response = await api.get('/games/top');

      setTopGames(response.data.data);
      setIsLoadingTopGames(false);
    } catch (error) {
      Alert.alert('Erro Top Games', 'Ocorreu um erro ao buscar os jogos mais assistidos agora na Twitch');
    }
  }

  async function getUserFollowedStreamsAvatar(userFollowedStreamsData: UserFollowedStreams[]) {
    return Promise.all(userFollowedStreamsData.map(async (item) => {
        try {
          const response = await api.get(`/users?id=${item.user_id}`);

          return { ...item, user_avatar_url: response.data.data[0].profile_image_url }
        } catch (error) {
          return { ...item, user_avatar_url: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-300x300.png' }
        }
      })
    )
  }

  async function getUserFollowedStreams() {
    try {
      const response = await api.get<{ data: UserFollowedStreams[] }>(`/streams/followed?user_id=${user.id}`);

      const formattedResponse = await getUserFollowedStreamsAvatar(response.data.data);
      
      if (formattedResponse) {
        setUserFollowedStreams(formattedResponse);
        setIsLoadingUserFollowedStreams(false);
      }
    } catch (error) {
      Alert.alert('Erro User Followed Streams', 'Ocorreu um erro ao buscar as informações das streams ao vivo que o usuário segue');
    }
  }

  useEffect(() => {
    getTopGames();
    getUserFollowedStreams();
  }, [])

  // const signOutButtonProps = {
  //   onPress: your-signOut-function
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
      <Header>
        <UserInfo>
          <Avatar source={{ uri: user.profile_image_url }} />

          <UserInfoText>Olá, </UserInfoText>
          <UserInfoText style={{ fontFamily: theme.fonts.bold }}>{user.display_name}</UserInfoText>
        </UserInfo>

        {/* <SignOutButton onPress={}>
          Verify if isLoggingOut is true
          If it is, show an ActivityIndicator
          Otherwise, show Feather's power icon
        </SignOutButton> */}
      </Header>

      <UserFollowedStreams>
        <UserFollowedStreamsTitle>Canais que você segue</UserFollowedStreamsTitle>

        <FlatList 
          data={!isLoadingUserFollowedStreams ? userFollowedStreams : [{ id: '1' } as UserFollowedStreamsFormatted, { id: '2' } as UserFollowedStreamsFormatted]}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          maxToRenderPerBatch={4}
          initialNumToRender={4}
          getItemLayout={(_, index) => (
            { length: 276, offset: 276 * index, index }
          )}
          contentContainerStyle={{
            paddingLeft: 24,
            paddingRight: 12
          }}
          renderItem={({ item }) => (
            <UserFollowedStreamCard 
              avatarUrl={item.user_avatar_url}
              streamer_login={item.user_login}
              streamer_name={item.user_name}
              thumbnailUrl={item.thumbnail_url}
              title={item.title}
              viewersCount={item.viewer_count}
              isLoadingUserFollowedStreams={isLoadingUserFollowedStreams}
            />
          )}
        />
      </UserFollowedStreams>

      <TopGames>
        <TopGamesTitle>Mais assistidos do momento</TopGamesTitle>

        <FlatList 
          data={!isLoadingTopGames ? topGames : [{ id: '1' } as TopGames, { id: '2' } as TopGames, { id: '3' } as TopGames]}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          getItemLayout={(_, index) => (
            { length: 166, offset: 166 * index, index }
          )}
          contentContainerStyle={{
            paddingLeft: 24,
            paddingRight: 8
          }}
          renderItem={({ item }) => (
            <TopGamesCard
              key={item.id}
              url={item.box_art_url}
              name={item.name}
              isLoadingTopGames={isLoadingTopGames}
            />
          )}
        />
      </TopGames>

      <Modal 
        animationType="fade"
        visible={isLoggingOut}
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