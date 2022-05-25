import React, { useEffect, useState } from 'react';
import { Alert, Linking, View, Image } from 'react-native';
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from "rn-placeholder";

import {
  Container,
  Thumbnail,
  ViewersCount,
  Info,
  Avatar,
  InfoText,
  Title,
  Streamer
} from './styles';

interface UserFollowedStreamCardProps {
  title: string;
  streamer_login: string;
  streamer_name: string;
  thumbnailUrl: string;
  avatarUrl: string;
  viewersCount: number;
  isLoadingUserFollowedStreams: boolean;
}

export function UserFollowedStreamCard({ avatarUrl, streamer_login, streamer_name, thumbnailUrl, title, viewersCount, isLoadingUserFollowedStreams }: UserFollowedStreamCardProps) {
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(true);
  const [formattedViewersCount, setFormattedViewersCount] = useState('');

  async function prefetchImages() {
    try {
      await Image.prefetch(avatarUrl);
      await Image.prefetch(thumbnailUrl.replace('{width}x{height}', '780x435'));
      
      setIsLoadingAvatar(false);
      setIsLoadingThumbnail(false);
    } catch (error) {
      Alert.alert('Erro imagem User Followed Streams');
    }
  }

  function formatViewersCount() {   
    if (viewersCount >= 1000) {
      const formattedNumber = (viewersCount/1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 });
      const formattedWord = 'mil';

      return setFormattedViewersCount(`${formattedNumber} ${formattedWord}`)
    }

    setFormattedViewersCount(viewersCount.toString());
  }

  useEffect(() => {
    if (!isLoadingUserFollowedStreams) {
      prefetchImages();
      formatViewersCount();
    }
  }, [isLoadingUserFollowedStreams, viewersCount])

  const thumbnailProps = {
    source: {
      uri: thumbnailUrl && thumbnailUrl.replace('{width}x{height}', '780x435')
    }
  }

  return (
    <Container activeOpacity={0.5} onPress={() => Linking.openURL(`https://twitch.tv/${streamer_login}`)}>
      { isLoadingThumbnail ? (
        <Placeholder
          Animation={Fade}
          style={{
            width: 260,
            height: 145,        
            opacity: 0.2
          }}
        >
          <PlaceholderMedia
            color="#828282"
            style={{ 
              flex: 1, 
              width: '100%', 
              borderRadius: 10 
            }}
          />
        </Placeholder>
      ) : (
        <Thumbnail {...thumbnailProps}>
          <View style={{ flex: 1, padding: 12, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <ViewersCount>{formattedViewersCount} espectadores</ViewersCount>
          </View>
        </Thumbnail>
      )}

      <Info>
        { isLoadingAvatar ? (
          <Placeholder
            Animation={Fade}
            style={{
              width: 40,
              height: 40,
              marginRight: 16,
              opacity: 0.2
            }}
          >
            <PlaceholderMedia
              color="#828282"
              style={{ 
                flex: 1, 
                width: '100%', 
                borderRadius: 20 
              }}
            />
          </Placeholder>
        ) : (
          <Avatar source={{ uri: avatarUrl }} />
        )}

        <InfoText>
          { isLoadingUserFollowedStreams ? (
            <Placeholder
              Animation={Fade}
              style={{
                opacity: 0.2
              }}
            >
              <PlaceholderLine color="#828282" style={{ marginTop: 4, marginBottom: 10 }} />
              <PlaceholderLine color="#828282" noMargin width={20} />
            </Placeholder>
          ) : (
            <>
              <Title numberOfLines={1}>{title}</Title>
              <Streamer>{streamer_name}</Streamer>
            </>
          )}
        </InfoText>
      </Info>
    </Container>
  );
}