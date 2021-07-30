import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from 'styled-components';
import { View } from 'react-native';

import { useAuth } from '../src/hooks/useAuth';

import { SignIn } from '../src/screens/SignIn';
import { Home } from '../src/screens/Home';

export function Routes() {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <View style={{ backgroundColor: theme.colors.black, flex: 1 }}>
      <AnimatePresence exitBeforeEnter>
        { user.id ? <Home key="home" /> : <SignIn key="signIn" /> }
      </AnimatePresence>
    </View>
  )
}