import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform, TextInput, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const SpeedometerGPS = () => {
  const [speed, setSpeed] = useState(0);
  const [speedLimitInput, setSpeedLimitInput] = useState('');
  const [currentSpeedLimit, setCurrentSpeedLimit] = useState('');
  const [isOverLimit, setIsOverLimit] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          setLocationPermission(true);
        }
      } else if (Platform.OS === 'android') {
        const granted = await Geolocation.requestPermissions({
          title: 'Permesso di Localizzazione',
          message: 'L\'app ha bisogno del permesso per accedere alla tua posizione.',
          buttonNeutral: 'Chiedi dopo',
          buttonNegative: 'Annulla',
          buttonPositive: 'OK',
        });
        if (granted === 'granted') {
          setLocationPermission(true);
        }
      } else {
        setLocationPermission(true);
      }
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (locationPermission) {
      const watchId = Geolocation.watchPosition(
        (position) => {
          if (position?.coords?.speed !== undefined && position.coords.speed !== null) {
            const speedInKmh = position.coords.speed * 3.6;
            const currentSpeed = parseFloat(speedInKmh.toFixed(2));
            setSpeed(currentSpeed);

            if (currentSpeedLimit !== '' && currentSpeed > parseFloat(currentSpeedLimit)) {
              setIsOverLimit(true);
            } else {
              setIsOverLimit(false);
            }
          } else {
            setSpeed(0);
            setIsOverLimit(false);
          }
        },
        (error) => {
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: true,
          distanceFilter: 1,
          interval: 1000,
          fastestInterval: 500,
        }
      );

      return () => {
        if (watchId !== null) {
          Geolocation.clearWatch(watchId);
        }
      };
    }
  }, [locationPermission, currentSpeedLimit]);

  const handleSpeedLimitInputChange = (text) => {
    setSpeedLimitInput(text);
  };

  const handleSetSpeedLimit = () => {
    if (!isNaN(parseFloat(speedLimitInput))) {
      setCurrentSpeedLimit(speedLimitInput);
    } else {
      // Potresti mostrare un messaggio di errore all'utente
      console.warn('Inserisci un valore numerico per il limite di velocità.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Velocità (GPS)</Text>
      <Text style={styles.value}>{speed}</Text>
      <Text style={styles.unita}>km/h</Text>

      <View style={styles.limitContainer}>
        <Text style={styles.limitLabel}>Limite Velocità:</Text>
        <TextInput
          style={styles.limitInput}
          keyboardType="numeric"
          placeholder="Imposta limite"
          value={speedLimitInput}
          onChangeText={handleSpeedLimitInputChange}
        />
        <Text style={styles.limitUnit}>km/h</Text>
        <Button title="Imposta Limite" onPress={handleSetSpeedLimit} />
      </View>

      {isOverLimit && <Text style={styles.warning}>ATTENZIONE! Limite superato ({currentSpeedLimit} km/h).</Text>}
      {currentSpeedLimit !== '' && !isOverLimit && (
        <Text style={styles.limitSet}>Limite impostato: {currentSpeedLimit} km/h</Text>
      )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#333',
  },
  unita: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  overLimit: {
    color: 'red',
  },
  limitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  limitLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#555',
  },
  limitInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    width: 80,
    textAlign: 'center',
    marginRight: 5,
  },
  limitUnit: {
    fontSize: 16,
    color: '#555',
    marginRight: 10,
  },
  warning: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold',
  },
  limitSet: {
    marginTop: 5,
    color: 'green',
  },
});

export default SpeedometerGPS;