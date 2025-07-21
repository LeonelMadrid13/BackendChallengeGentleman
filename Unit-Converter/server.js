const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.redirect('/length');
});



app.use('/length', (req, res, next) => {
  res.sendFile(__dirname + '/public/length.html');
});

app.use('/weight', (req, res, next) => {
  res.sendFile(__dirname + '/public/weight.html');
});

app.use('/temperature', (req, res, next) => {
  res.sendFile(__dirname + '/public/temperature.html');
});

app.post('/convert', (req, res) => {
  const { value, fromUnit, toUnit } = req.body;
  const convertedValue = convertUnits(value, fromUnit, toUnit);
  res.json({
    success: true,
    data: {
      value: convertedValue,
      fromUnit,
      toUnit
    }
  });
});

function convertUnits(value, fromUnit, toUnit) {
    const conversionRates = {
        length: {
            millimeter: 1000,
            centimeter: 10,
            meter: 1,
            kilometer: 0.001,
            mile: 0.000621371,
            foot: 3.28084,
            inch: 39.3701,
            yard: 1.09361,
        },
        weight: {
            milligram: 1000,
            gram: 1,
            kilogram: 0.001,
            pound: 0.00220462,
            ounce: 0.035274
        },
        temperature: {
            celsius: 1,
            fahrenheit: 9/5,
            kelvin: 1
        }
    };

    if (fromUnit === toUnit) {
        return value;
    }

    // Length conversion
    if (conversionRates.length[fromUnit] && conversionRates.length[toUnit]) {
        return value * conversionRates.length[toUnit] / conversionRates.length[fromUnit];
    }

    // Weight conversion
    if (conversionRates.weight[fromUnit] && conversionRates.weight[toUnit]) {
        return value * conversionRates.weight[toUnit] / conversionRates.weight[fromUnit];
    }
        // Temperature conversion
    if(conversionRates.temperature[fromUnit] && conversionRates.temperature[toUnit]) {
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        return (value * conversionRates.temperature.fahrenheit) + 32;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        return (value - 32) / conversionRates.temperature.fahrenheit;
        } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        return value + 273.15;
        } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        return value - 273.15;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        return ((value - 32) * 5/9) + 273.15;
        } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        return ((value - 273.15) * 9/5) + 32;
        }
        return value; // Default case, no conversion
    }
    return value; // Default case, no conversion
}

app.use((req, res, next) => {
  res.status(404).send({
    success: false,
    message: 'Route not found'
  });
});

