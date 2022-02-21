import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, CitySearchScreen, CountrySearchScreen, CityScreen, CountryScreen } from './Components';

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
        <Stack.Screen
          name="Country Search"
          component={CountrySearchScreen}
        />
        <Stack.Screen
          name="City Page"
          component={CityScreen}
        />
        <Stack.Screen
          name="Country Page"
          component={CountryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
