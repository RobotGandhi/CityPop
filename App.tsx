import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, CitySearchScreen, CountrySearchScreen, CityScreen, CountryScreen } from './Components';

export type StackParams = {  // Defines which props should be sent to each screen.
  Home: undefined; 
  CitySearch: undefined; 
  CountrySearch: undefined; 
  CityPage: {
    name: string;
    pop: number;
  };
  CountryPage: {
    name: string;
    cities: Array<{
      toponymName: string;
      population: number;
    }>;
  };
};

const Stack = createNativeStackNavigator<StackParams>(); // Creates a navigator that allows for movement between multiple pages.

export default function App() { // Every screen has a component attached to it. These components are built in Components.js.
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="CitySearch"
          component={CitySearchScreen}
        />
        <Stack.Screen
          name="CountrySearch"
          component={CountrySearchScreen}
        />
        <Stack.Screen
          name="CityPage"
          component={CityScreen}
        />
        <Stack.Screen
          name="CountryPage"
          component={CountryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
