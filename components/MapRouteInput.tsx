import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapRouteInput = () => {
  const [startCoordinate, setStartCoordinate] = useState(null);
  const [endCoordinate, setEndCoordinate] = useState(null);
  const [arrivalDistance, setArrivalDistance] = useState('');

  const handleMapPress = (event) => {
    const coordinate = event.nativeEvent.coordinate;
    if (!startCoordinate) {
      setStartCoordinate(coordinate);
    } else if (!endCoordinate) {
      setEndCoordinate(coordinate);
    }
  };

  const handleSetStart = () => {
    // Qui potresti implementare la logica per impostare la partenza tramite input testuale o altro
    console.log('Imposta partenza');
  };

  const handleSetEnd = () => {
    // Qui potresti implementare la logica per impostare l'arrivo tramite input testuale o altro
    console.log('Imposta arrivo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Imposta Percorso</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 45.0703, // Coordinate iniziali (es. Torino)
          longitude: 7.6869,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        onPress={handleMapPress}
      >
        {startCoordinate && (
          <Marker coordinate={startCoordinate} title="Partenza" pinColor="green" />
        )}
        {endCoordinate && (
          <Marker coordinate={endCoordinate} title="Arrivo" pinColor="red" />
        )}
      </MapView>

      <View style={styles.inputContainer}>
        <Text>Partenza:</Text>
        {startCoordinate ? (
          <Text>Lat: {startCoordinate.latitude.toFixed(5)}, Lon: {startCoordinate.longitude.toFixed(5)}</Text>
        ) : (
          <Text>Tocca la mappa per impostare</Text>
        )}
        {/* <Button title="Imposta Partenza" onPress={handleSetStart} /> */}
      </View>

      <View style={styles.inputContainer}>
        <Text>Arrivo:</Text>
        {endCoordinate ? (
          <Text>Lat: {endCoordinate.latitude.toFixed(5)}, Lon: {endCoordinate.longitude.toFixed(5)}</Text>
        ) : (
          <Text>Tocca la mappa per impostare</Text>
        )}
        {/* <Button title="Imposta Arrivo" onPress={handleSetEnd} /> */}
      </View>

      <View style={styles.distanceInputContainer}>
        <Text>Distanza all'arrivo:</Text>
        <TextInput
          style={styles.distanceInput}
          keyboardType="numeric"
          placeholder="Distanza (metri)"
          value={arrivalDistance}
          onChangeText={setArrivalDistance}
        />
        <Text>metri</Text>
      </View>

      <Button title="Conferma Percorso" onPress={() => console.log('Partenza:', startCoordinate, 'Arrivo:', endCoordinate, 'Distanza:', arrivalDistance)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 10,
  },
  distanceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  distanceInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    width: 120,
  },
});

export default MapRouteInput;