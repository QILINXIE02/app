import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

const ColorPalettePicker = ({ onColorsSelected }) => {
  const [selectedColors, setSelectedColors] = useState([]);

  const handleColorSelect = (color) => {
    if (selectedColors.length < 7) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleSubmit = () => {
    if (selectedColors.length >= 3) {
      onColorsSelected(selectedColors);
    } else {
      alert("Please select at least 3 colors.");
    }
  };

  return (
    <View>
      <ColorPicker onColorSelected={handleColorSelect} style={{ flex: 1, height: 200 }} />
      <Button title="Generate Bouquet" onPress={handleSubmit} />
    </View>
  );
};

export default ColorPalettePicker;
