import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { StackParams } from '../../App';
import { styles } from '../../Style';

export const CountrySearchScreen: React.FC<{}> = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [error, setError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    if(!isLoading && error == "") { return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>Search by Country</Text>
        </View>
        <View style={styles.top_container}>
          <View style={{margin: 10}}>
            <TextInput style={styles.input}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
          </View>
          <View style={{margin: 10}}>
            <Button
              title="Search"
              onPress={() => {
                if (searchTerm != ""){
                  fetch('http://api.geonames.org/searchJSON?name_equals=' + searchTerm + '&featureClass=A&featureCode=PCLI&username=weknowit') // Make an API call for the search term.
                    .then((response) => response.json())
                    .then((json) => {
                      if (json.geonames.length != 0) {
                        fetch('http://api.geonames.org/searchJSON?q=' + json.geonames[0].countryName + '&country=' + json.geonames[0].countryCode + '&cities=cities15000&username=weknowit')
                        .then((response) => response.json()) // Searches for large cities in the searched country.
                        .then((json) => {json.geonames.length > 5 ? 
                          navigation.navigate("CountryPage", {name: json.geonames[0].countryName, cities: json.geonames.slice(0, 5)}) : 
                          navigation.navigate("CountryPage", {name: json.geonames[0].countryName, cities: json.geonames});  // Send a maximum of five cities to the country screen for rendering.
                        });
                      }
                      else setError("Could not find a country with that name! Please try again.")})
                    .catch((error) => { setError("Something went wrong when sending or receiving your request! Please try again and contact our support if the error persists.") })
                    .finally(() => setIsLoading(false));
                  setIsLoading(true);
                } else setError("You can not search for nothing! Please enter a search term.");
              }}
            />
          </View>
        </View>
        <View style={styles.container}></View>
      </View>
    );}
    else if (error != "") { return ( // If there is an error, show it to the user.
      <View style={styles.container}> 
        <Text>{error}</Text>
        <Button
          title="Return"
          onPress={() => setError("")}
        />
      </View>
    );}
    else return ( // If the API results are pending, show a loading screen.
      <View style={styles.container}> 
        <Text>Loading reults...</Text>
      </View>
    );
};