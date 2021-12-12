import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home  from './screens/home'

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Welcome' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
