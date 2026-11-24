# tire-conversion-math

Zero-dependency JavaScript engineering formulas and reference tables for converting metric automotive tire designations (ISO / ETRTO) into imperial inches, flotation equivalents, speedometer calibration deltas, effective axle gear ratios, and wheel backspacing.

> **Live Interactive Visual Calculators:** [TireToInches.com](https://tiretoinches.com/)

---

## Core Engineering Formulas (TRA & ETRTO Standards)

### 1. Metric Tire Code to Inches (`W / AR R D`)
Given a metric tire code such as **`285/70R17`**:
- $W$ = Nominal Section Width in millimeters (`285 mm`)
- $AR$ = Aspect Ratio percentage (`70%`)
- $D$ = Wheel Rim Diameter in inches (`17"`)

$$\text{Section Width (in)} = \frac{W}{25.4}$$

$$\text{Sidewall Height (in)} = \frac{W \times (AR / 100)}{25.4}$$

$$\text{Overall Diameter (in)} = D + \left(2 \times \text{Sidewall Height}\right)$$

$$\text{Revolutions per Mile} = \frac{63,360}{\pi \times \text{Overall Diameter (in)}}$$

### 2. Speedometer & Ride Height Delta
Changing from factory tire diameter $D_{\text{stock}}$ to $D_{\text{new}}$ alters both axle ground clearance and speedometer calibration:

$$\text{Actual GPS Speed} = \text{Indicated Speed} \times \left(\frac{D_{\text{new}}}{D_{\text{stock}}}\right)$$

$$\text{Ground Clearance Change} = \frac{D_{\text{new}} - D_{\text{stock}}}{2}$$

### 3. Effective Axle Gear Ratio
Larger tires reduce mechanical leverage at the contact patch. To restore factory transmission shift points and engine RPM:

$$\text{Effective Ratio} = \text{Stock Ratio} \times \left(\frac{D_{\text{stock}}}{D_{\text{new}}}\right)$$

$$\text{Target Re-Gear Ratio} = \text{Stock Ratio} \times \left(\frac{D_{\text{new}}}{D_{\text{stock}}}\right)$$

### 4. Wheel Offset (ET) to Backspacing
Accounting for standard $0.5\text{"}$ outer bead flanges ($+1.0\text{"}$ total flange-to-flange width):

$$\text{Backspacing (in)} = \frac{\text{Rim Width (in)} + 1.0}{2} + \frac{\text{Offset (mm)}}{25.4}$$

---

## Quick Flotation-to-Metric Reference Table

| Flotation Class | Popular Metric Size | Overall Diameter | Section Width | Sidewall Height | Interactive Spec Sheet |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **31-Inch** | `265/70R16` | `30.6"` (`777 mm`) | `10.43"` | `7.30"` | [265/70R16 Specs](https://tiretoinches.com/265-70r16-in-inches/) |
| **32-Inch** | `265/70R17` | `31.6"` (`803 mm`) | `10.43"` | `7.30"` | [265/70R17 Specs](https://tiretoinches.com/265-70r17-in-inches/) |
| **33-Inch** | `285/70R17` | `32.7"` (`831 mm`) | `11.22"` | `7.85"` | [285/70R17 Specs](https://tiretoinches.com/285-70r17-in-inches/) |
| **33-Inch (20" Rim)** | `275/60R20` | `33.0"` (`838 mm`) | `10.83"` | `6.50"` | [275/60R20 Specs](https://tiretoinches.com/275-60r20-in-inches/) |
| **34-Inch** | `285/75R17` | `33.8"` (`859 mm`) | `11.22"` | `8.42"` | [285/75R17 Specs](https://tiretoinches.com/285-75r17-in-inches/) |
| **35-Inch** | `315/70R17` | `34.4"` (`874 mm`) | `12.40"` | `8.68"` | [315/70R17 Specs](https://tiretoinches.com/315-70r17-in-inches/) |

---

## JavaScript Usage Example

```js
import {
  metricToInches,
  calculateSpeedometerDelta,
  calculateEffectiveGearRatio,
  calculateWheelBackspacing
} from './index.js';

// 1. Convert 285/70R17 to inches
console.log(metricToInches(285, 70, 17));
// -> { widthInches: 11.22, sidewallInches: 7.85, overallDiameterInches: 32.71, revsPerMile: 617, ... }

// 2. Speedometer error upgrading from 31.6" (265/70R17) to 32.7" (285/70R17) at 65 mph
console.log(calculateSpeedometerDelta(31.6, 32.7, 65));
// -> { indicatedMph: 65, actualMph: 67.3, mphError: 2.3, rideHeightGainInches: 0.55 }

// 3. Re-gearing from 31.6" to 34.4" (35s) on a 3.73 axle
console.log(calculateEffectiveGearRatio(31.6, 34.4, 3.73));
// -> { effectiveGearRatio: 3.43, idealNewGearRatio: 4.06 }

// 4. Backspacing of a 17x9 wheel with -12mm offset
console.log(calculateWheelBackspacing(9, -12));
// -> { backspacingInches: 4.53, offsetInches: -0.47 }
```

---

## Interactive Web Tools

For visual 2D overlays, vehicle suspension clearance checks, and P-Metric to Light Truck load-inflation tables:

- [Metric to Inches Tire Size Converter](https://tiretoinches.com/)
- [2D Side-by-Side Tire Comparison Visualizer](https://tiretoinches.com/compare/)
- [Flotation (Inches) to Metric Reverse Calculator](https://tiretoinches.com/flotation-to-metric-calculator/)
- [Speedometer & Odometer Error Calculator](https://tiretoinches.com/speedometer-calculator/)
- [Wheel Offset & Scrub Radius Visualizer](https://tiretoinches.com/wheel-offset-calculator/)
- [Axle Gear Ratio & RPM Calculator](https://tiretoinches.com/gear-ratio-calculator/)
- [P-Metric to LT Tire Pressure Calculator](https://tiretoinches.com/tire-pressure-calculator/)
- [Dually Rear Tire Gap Calculator](https://tiretoinches.com/dually-wheel-spacers-calculator/)

---

## License

Released under the [MIT License](./LICENSE).
