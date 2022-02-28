import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { StackParams } from './App';
import { styles } from './Style';

type CityProps = NativeStackScreenProps<StackParams, "CityPage">
type CountryProps = NativeStackScreenProps<StackParams, "CountryPage">

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
        onPress={() => navigation.navigate("CityPage", {name: "Stad 1", pop:123456})}
      />
    </View>
  );
};

const CountrySearchScreen: React.FC<{}> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  if(!isLoading && error == "") { return (
    <View style={styles.container}>
      <Text>Välkommen till sökskärmen för länder</Text>
      <TextInput style={styles.input}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button
        title="Search"
        onPress={() => {
          fetch('http://api.geonames.org/searchJSON?name_equals=' + searchTerm + '&featureClass=A&username=weknowit') // Make an API call for the search term.
            .then((response) => response.json())
            .then((json) => {console.log(json);
              if (json.geonames.length != 0) {
                fetch('http://api.geonames.org/searchJSON?q=' + json.geonames[0].countryName + '&country=' + json.geonames[0].countryCode + '&cities=cities15000&username=weknowit')
                .then((response) => response.json()) // Searches for large cities in the searched country.
                .then((json) => {json.geonames.length > 5 ? 
                  navigation.navigate("CountryPage", {name: json.geonames[0].countryName, cities: json.geonames.slice(0, 5)}) : 
                  navigation.navigate("CountryPage", {name: json.geonames[0].countryName, cities: json.geonames});
                });
              }
              else setError("Could not find a country with that name! Please try again.")}) // TODO: turn the resulting JSON to props for the country page.
            .finally(() => setIsLoading(false));
          setIsLoading(true);
        }}
      />
    </View>
  );}
  else if (error != "") { return (
    <View style={styles.container}> 
      <Text>{error}</Text>
      <Button
        title="Återvänd"
        onPress={() => setError("")}
      />
    </View>
  );}
  else return ( // If the API results are pending, show a loading screen.
    <View style={styles.container}> 
      <Text>Laddar resultat...</Text>
    </View>
  );
};
  
const CityScreen: React.FC<CityProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Välkommen till stadsskärmen för {props.route.params.name}</Text>
      <Button // TODO: Add text and make button return user to home screen.
        title={props.route.params.pop.toString()} // Quick test of parameter implementation
        onPress={() => console.log("Tja")}
      />
    </View>
  );
};
  
const CountryScreen: React.FC<CountryProps> = (props) => { // TODO: Procedurally make buttons from props containing search results.
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  console.log(props.route.params.cities);
  return (
    <View style={styles.container}>
      <Text>Välkommen till landsskärmen för {props.route.params.name}</Text>
      <Button
        title="Stad 1"
        onPress={() => navigation.navigate("CityPage", {name: "Stad 1", pop:123456})}
      />
      <Button
        title="Stad 2"
        onPress={() => navigation.navigate("CityPage", {name: "Stad 2", pop:12345})}
      />
      <Button
        title="Stad 3"
        onPress={() => navigation.navigate("CityPage", {name: "Stad 3", pop:1234567})}
      />
    </View>
  );
};

export { HomeScreen, CitySearchScreen, CountrySearchScreen, CityScreen, CountryScreen }