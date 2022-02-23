import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { StackParams } from './App';
import { styles } from './Style';


const HomeScreen: React.FC<{}> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  return (
    <View style={styles.container}>
      <Text>Hello, World!</Text>
      <Button
        title="City Search"
        onPress={() => navigation.navigate("CitySearch")} // Adds another screen to the stack.
      />
      <Button 
        title="Country Search"
        onPress={() => navigation.navigate("CountrySearch")}
      />
    </View>
  );
};
  
const CitySearchScreen: React.FC<{}> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  return (
    <View style={styles.container}>
      <Text>Välkommen till sökskärmen för städer</Text>
      <Button
        title="Search"
        onPress={() => navigation.navigate("CityPage")}
      />
    </View>
  );
};

const CountrySearchScreen: React.FC<{}> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [searchTerm, setSearchTerm] = React.useState("");
  return (
    <View style={styles.container}>
      <Text>Välkommen till sökskärmen för länder</Text>
      <TextInput
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button
        title="Search"
        onPress={() => {
          fetch('http://api.geonames.org/searchJSON?q=london&maxRows=10&username=weknowit')
            .then((response) => response.json())
            .then((json) => console.log(json));
          navigation.navigate("CountryPage");
        }}
      />
    </View>
  );
};
  
const CityScreen: React.FC<{}> = () => {
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
  
const CountryScreen: React.FC<{}> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  return (
    <View style={styles.container}>
      <Text>Välkommen till landsskärmen</Text>
      <Button
        title="Stad 1"
        onPress={() => navigation.navigate("CityPage")}
      />
      <Button
        title="Stad 2"
        onPress={() => navigation.navigate("CityPage")}
      />
      <Button
        title="Stad 3"
        onPress={() => navigation.navigate("CityPage")}
      />
    </View>
  );
};

export { HomeScreen, CitySearchScreen, CountrySearchScreen, CityScreen, CountryScreen }