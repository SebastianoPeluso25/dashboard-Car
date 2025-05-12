import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const DistanceSensor = () => {
  // In uno scenario reale, questo stato verrebbe aggiornato dai dati del sensore
  const [distance, setDistance] = useState(15); // Distanza in metri

  useEffect(() => {
    // Simula l'aggiornamento della distanza ogni 1.5 secondi
    const intervalId = setInterval(() => {
      const newDistance = Math.max(0, Math.floor(Math.random() * 30)); // Distanza casuale tra 0 e 30 metri
      setDistance(newDistance);
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  const getDistanceColor = () => {
    if (distance < 5) {
      return 'red';
    } else if (distance < 10) {
      return 'orange';
    } else {
      return 'green';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Distanza dalla macchina di fronte</Text>
      <Text style={[styles.value, { color: getDistanceColor() }]}>{distance} m</Text>
      {distance < 5 && <Text style={styles.warning}>Attenzione: Distanza critica!</Text>}
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
    fontSize: 28,
    fontWeight: 'bold',
  },
  warning: {
    color: 'red',
    marginTop: 5,
    fontWeight: 'bold',
  },
});

export default DistanceSensor;