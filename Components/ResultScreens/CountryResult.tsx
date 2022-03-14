import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { StackParams } from '../../App';
import { styles } from '../../Style';
type CountryProps = NativeStackScreenProps<StackParams, "CountryPage">
 
export const CountryScreen: React.FC<CountryProps> = (props) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    return ( // A simple screen showing the top city results for a country
        <View style={styles.container}>
        <View style={styles.container}>
            <Text>{props.route.params.name}</Text>
        </View>
        <View style={styles.top_container}>
            {props.route.params.cities.map((item) => { // Every result gets its own button, navigating to its respective city
            return (
                <View style={{margin: 5}} key={item.toponymName}>
                <Button
                    title={item.toponymName}
                    onPress={() => navigation.navigate("CityPage", {name: item.toponymName, pop:item.population})}
                />
                </View>
            )})}
        </View>
        </View>
    );
};