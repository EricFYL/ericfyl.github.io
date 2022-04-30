mapboxgl.accessToken =
'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
let map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/dark-v10',
zoom: 3.5, // starting zoom
center: [-98, 39] // starting center
});

//load data to the map as new layers.
//map.on('load', function loadingData() {
map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function

// when loading a geojson, there are two steps
// add a source of the data and then add the layer out of the source
map.addSource('rates', {
    type: 'geojson',
    data: 'assets/us-covid-2020-rates.geojson'
});

map.addLayer({
        'id': 'rates-layer',
        'type': 'fill',
        'source': 'rates',
        'paint': {
            'fill-color': [
                'step',
                ['get', 'rates'],
                '#FFEDA0',   // stop_output_0
                37.05,          // stop_input_0
                '#FED976',   // stop_output_1
                57.01,          // stop_input_1
                '#FEB24C',   // stop_output_2
                75.78,          // stop_input_2
                '#FD8D3C',   // stop_output_3
                98.59,         // stop_input_3
                '#FC4E2A',   // stop_output_4
                139.38,         // stop_input_4
                '#E31A1C',   // stop_output_5
            ],
            'fill-outline-color': '#BBBBBB',
            'fill-opacity': 0.7,
        }
    },
    'waterway-label'
);


// click on tree to view magnitude in a popup
map.on('click', 'rates-layer', (event) => {
    new mapboxgl.Popup()
        .setLngLat(event.features[0].geometry.coordinates[1])
        .setHTML(`<strong>Rate:</strong> ${event.features[0].properties.rates}`)
        .addTo(map);
});

});

const layers = [
    '0-37.05',
    '37.05-57.01',
    '57.01-75.78',
    '75.78-98.59',
    '98.59-139.38',
    '139.38 and more'
];
const colors = [
    '#FFEDA070',
    '#FED97670',
    '#FEB24C70',
    '#FD8D3C70',
    '#FC4E2A70',
    '#E31A1C70'
];

// create legend
const legend = document.getElementById('legend');

//set up legend grades and labels
var labels = ['<strong>Rates</strong>'], vbreak;
//iterate through grades and create a scaled circle and label for each
for (var i = 0; i < layers.length; i++) {
vbreak = layers[i];
// you need to manually adjust the radius of each dot on the legend
// in order to make sure the legend can be properly referred to the dot on the map.
labels.push(
    '<p class="break"><i class="colorpleth" style="background:' + colors[i] + '; width: 10px; height: 10px; "></i> <span class="dot-label">' + vbreak +
    '</span></p>');

}
const source =
'<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">New York Times</a>' + '<br></br>' +
'<a href="https://data.census.gov/cedsci/table?g=0100000US%24050000&d=ACS%205-Year%20Estimates%20Data%20Profiles&tid=ACSDP5Y2018.DP05&hidePreview=true">US Census</a></p>';

legend.innerHTML = labels.join('') + source;