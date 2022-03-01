import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { StackParams } from './App';
import { styles } from './Style';

type CityProps = NativeStackScreenProps<StackParams, "CityPage">
type CountryProps = NativeStackScreenProps<StackParams, "CountryPage">

// TODO: Remove console.log calls.
// TODO: Make language consistent.

const HomeScreen: React.FC<{}> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  return (
    <View style={styles.container}>
      <Text>CityPop</Text>
      <Button
        title="Search by City"
        onPress={() => navigation.navigate("CitySearch")} // Adds another screen to the stack.
      />
      <Button 
        title="Search by Country"
        onPress={() => navigation.navigate("CountrySearch")}
      />
    </View>
  );
};
  
const CitySearchScreen: React.FC<{}> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  if(!isLoading && error == "") { return (
    <View style={styles.container}>
      <Text>Search by City</Text>
      <TextInput style={styles.input}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button
        title="Search"
        onPress={() => {
          fetch('http://api.geonames.org/searchJSON?name_equals=' + searchTerm + '&featureClass=P&username=weknowit') // Make an API call for the search term.
            // TEST: Does this have to be changed to q=searchTerm?
            .then((response) => response.json())
            .then((json) => {console.log(json);
              if (json.geonames.length != 0) {
                // TODO: Add city navigation.
                navigation.navigate("CityPage", {name: json.geonames[0].toponymName, pop:json.geonames[0].population});
              }
              else setError("Could not find a city with that name! Please try again.")})
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

const CountrySearchScreen: React.FC<{}> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  if(!isLoading && error == "") { return (
    <View style={styles.container}>
      <Text>Search by Country</Text>
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
      <Text>{props.route.params.name}</Text>
      <Button // TODO: Add text and make button return user to home screen.
        title={"Population: " + props.route.params.pop.toString()} // Quick test of parameter implementation
        disabled
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
      {props.route.params.cities.map((item) => {
        console.log(item);
        return (<Button
        title={item.toponymName}
        onPress={() => navigation.navigate("CityPage", {name: item.toponymName, pop:item.population})}
      />
      )})}
    </View>
  );
};

export { HomeScreen, CitySearchScreen, CountrySearchScreen, CityScreen, CountryScreen }