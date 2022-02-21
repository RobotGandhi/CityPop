import { Button, Text, View } from 'react-native';
import { styles } from './Style';
const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Hello, World!</Text>
      <Button
        title="City Search"
        onPress={() => navigation.navigate("City Search")}
      />
      <Button 
        title="Country Search"
        onPress={() => navigation.navigate("Country Search")}
      />
    </View>
  );
};
  
const CitySearchScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text>Välkommen till sökskärmen för städer</Text>
      <Button
        title="Search"
        onPress={() => navigation.navigate("City Page")}
      />
    </View>
  );
};
  
const CountrySearchScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text>Välkommen till sökskärmen för länder</Text>
      <Button
        title="Search"
        onPress={() => navigation.navigate("Country Page")}
      />
    </View>
  );
};
  
const CityScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text>Välkommen till stadsskärmen</Text>
      <Button
        title="Tja"
        onPress={() => console.log("Tja")}
      />
    </View>
  );
};
  
const CountryScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text>Välkommen till landsskärmen</Text>
      <Button
        title="Stad 1"
        onPress={() => navigation.navigate("City Page")}
      />
      <Button
        title="Stad 2"
        onPress={() => navigation.navigate("City Page")}
      />
      <Button
        title="Stad 3"
        onPress={() => navigation.navigate("City Page")}
      />
    </View>
  );
};

export { HomeScreen, CitySearchScreen, CountrySearchScreen, CityScreen, CountryScreen }