import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="City Search"
          component={CitySearchScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Hello, World!</Text>
      <Button
        title="City Search"
        onPress={() => navigation.navigate("City Search")}
      />
      <Button 
        title="Tja2"
        onPress={() => console.log("Tja2")}
     />
    </View>
  );
};

const CitySearchScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text>Välkommen till sökskärmen</Text>
      <Button
        title="Tja"
        onPress={() => console.log("Tja")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
