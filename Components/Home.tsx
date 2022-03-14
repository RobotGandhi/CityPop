import { StackParams } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../Style';

export const HomeScreen: React.FC<{}> = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>CityPop</Text>
        </View>
        <View style={styles.top_container}>
          <View style={{margin: 10}}>
            <Button
              title="Search by City"
              onPress={() => navigation.navigate("CitySearch")} // Adds another screen to the stack.
            />
          </View>
          <View style={{margin: 10}}>
            <Button 
              title="Search by Country"
              onPress={() => navigation.navigate("CountrySearch")}
            />
          </View>
        </View>
      </View>
    );
};