/** @file - module for performing signal processing on streams */
import { min as d3min, max as d3max } from 'd3';
import { scaleLinear } from 'd3-scale';
import { zonesValuesPower } from '../vm-athletes/vm-athlete.js';
import { CHART_PROPS } from '../../ui/styles/chart-props.js';

/*

time:	integer seconds
latlng:	floats [latitude, longitude]
distance:	float meters
altitude:	float meters
velocity_smooth:	float meters per second
heartrate:	integer BPM
cadence:	integer RPM
watts:	integer watts
temp:	integer degrees Celsius
moving:	boolean
grade_smooth:	float percent
*/
