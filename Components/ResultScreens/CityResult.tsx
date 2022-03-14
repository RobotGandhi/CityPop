import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { StackParams } from '../../App';
import { styles } from '../../Style';

type CityProps = NativeStackScreenProps<StackParams, "CityPage">

export const CityScreen: React.FC<CityProps> = (props) => {
    return ( // A simple screen showing the city name and population
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>{props.route.params.name}</Text>
        </View>
        <View style={styles.container}>
          <Button
            title={"Population: " + props.route.params.pop.toString()}
            disabled
          />
        </View>
        <View style={styles.container}></View>
      </View>
    );
};
  