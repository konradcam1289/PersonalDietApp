import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

class BMICalculatorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: '',
      height: '',
      bmi: '',
      resultText: '',
    };
  }

  calculateBMI = () => {
    const { weight, height } = this.state;

    if (weight === '' || height === '') {
      this.setState({ bmi: '', resultText: 'Proszę podać wagę i wzrost.' });
      return;
    }

    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height) / 100;
    const bmiValue = weightKg / (heightCm * heightCm);
    const roundedBMI = bmiValue.toFixed(2);

    let result = '';

    if (bmiValue < 18.5) {
      result = 'Niedowaga';
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      result = 'Prawidłowa waga';
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      result = 'Nadwaga';
    } else {
      result = 'Otyłość';
    }

    this.setState({ bmi: roundedBMI, resultText: result });
  };

  render() {
    return (
      <ImageBackground source={require('../Image/obraz1.png')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <View style={styles.container}>
          <Text style={styles.title}>Kalkulator BMI</Text>
          <TextInput
            style={styles.input}
            placeholder="Waga (kg)"
            placeholderTextColor={'black'}
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ weight: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Wzrost (cm)"
            placeholderTextColor={'black'}
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ height: text })}
          />
          <Button title="Oblicz BMI" onPress={this.calculateBMI} />
          <Text style={styles.result}>{this.state.bmi}</Text>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  result: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
  },
  resultText: {
    fontSize: 20,
    marginTop: 10,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BMICalculatorScreen;
