import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ParkingSensors = () => {
  // In uno scenario reale, questi stati verrebbero aggiornati dai dati dei sensori
  const [frontLeft, setFrontLeft] = useState(false);
  const [frontRight, setFrontRight] = useState(false);
  const [rearLeft, setRearLeft] = useState(false);
  const [rearRight, setRearRight] = useState(false);

  useEffect(() => {
    // Simula l'aggiornamento dei sensori di parcheggio ogni 2 secondi
    const intervalId = setInterval(() => {
      setFrontLeft(Math.random() < 0.3);
      setFrontRight(Math.random() < 0.3);
      setRearLeft(Math.random() < 0.3);
      setRearRight(Math.random() < 0.3);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const getSensorColor = (active) => {
    return active ? 'red' : 'green';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sensori di Parcheggio</Text>
      <View style={styles.sensorsContainer}>
        <View style={styles.frontSensors}>
        <Text>Anteriori</Text>
          <View style={styles.sensor}>
            <View style={[styles.sensorIndicator, { backgroundColor: getSensorColor(frontLeft) }]} />
            <View style={[styles.sensorIndicator, { backgroundColor: getSensorColor(frontRight) }]} />
          </View>
        </View>
        <View style={styles.rearSensors}>
          <Text>Posteriori</Text>
          <View style={styles.sensor}>
            <View style={[styles.sensorIndicator, { backgroundColor: getSensorColor(rearLeft) }]} />
            <View style={[styles.sensorIndicator, { backgroundColor: getSensorColor(rearRight) }]} />
          </View>
        </View>
      </View>
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
    marginBottom: 10,
  },
  sensorsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
  sensor: {
    display: 'flex',
    flexDirection: 'row'
  },
  frontSensors: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  rearSensors: {
    alignItems: 'center',
  },
  sensorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    margin: 5,
  },
});

export default ParkingSensors;