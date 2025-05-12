import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

// Importa i componenti dei singoli sensori
import Speedometer from '@/components/Speedometer';
import DistanceSensor from '@/components/DistanceSensor';
import ParkingSensors from '@/components/ParkingSensors';




const DashboardScreen = () => {

  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
       <Image
        source={{ uri: 'https://cdn-datak.motork.net/configurator-imgs/cars/it/800/FIAT/PANDA/40029_BERLINA-5-PORTE/fiat-panda.png' }}
        style={styles.carImage}
      />
      <Text style={styles.title}>Dashboard Auto</Text>

      <View style={styles.sensorRow}>
        <Speedometer />
      </View>

      <View style={styles.sensorRow}>
        <DistanceSensor />
      </View>

      <View style={styles.sensorRow}>
        <ParkingSensors />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  carImage: {
    width: '100%',
    height: 200, // Regola l'altezza a tuo piacimento
    resizeMode: 'contain', // Assicura che l'immagine si adatti senza distorsioni
    marginBottom: 20,
  },
  // ... il resto dei tuoi stili
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    backgroundColor: 'none',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sensorRow: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    elevation: 3, // Per un leggero effetto ombra su Android
    shadowColor: '#000', // Per un leggero effetto ombra su iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default DashboardScreen;

