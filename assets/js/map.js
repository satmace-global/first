mapboxgl.accessToken = 'pk.eyJ1Ijoic2F0bWFjZSIsImEiOiJjbGdrb281bDQwYXM3M2pwcGxhOWt2bTJ3In0.bHEg6Y0rVuU1eoGLX3hLWg';

var mapContainer = document.getElementById("mapbox1");
var map = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [73.856255, 21.516726],
    zoom: 5
});

var markers = [
    {
        lngLat: [73.293191, 22.257008], // [longitude, latitude] of the marker position
        popupContent: '<img src="https://ychef.files.bbci.co.uk/976x549/p09h83yc.jpg"><h3>Vadodara</h3><p>Collection centre of Shrink Bag</p>'
    },
    {
        lngLat: [75.478192, 23.597970], // [longitude, latitude] of the marker position
        popupContent: '<img src="https://im.indiatimes.in/media/content/2019/Mar/global_recycling_day_1552985398_725x725.jpg"><h3> Madhya Pradesh</h3><p>Collection centre of Shrink Bag</p>'
    },

    {
        lngLat: [72.493950, 24.110878], // [longitude, latitude] of the marker position
        popupContent: '<img src="https://im.indiatimes.in/media/content/2018/Apr/plastic_1523957599.jpg"><h3>Vadgam, Gujarat</h3><p>Collection centre of Shrink Bag</p>'
    },

    {
        lngLat: [74.516593, 21.831092], // [longitude, latitude] of the marker position
        popupContent: '<img src="https://en-media.thebetterindia.com/uploads/2019/04/IMG_7020.jpg"><h3>Pati, Madhya Pradesh</h3><p>Collection centre of Shrink Bag</p>'
    },

    {
        lngLat: [74.832818, 20.867474], // [longitude, latitude] of the marker position
        popupContent: '<img src="https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/article5615.jpg"><h3>Dhule , Maharashtra</h3><p>Collection centre of Shrink Bag</p>'
    },

    {
        lngLat: [73.843388, 19.920099], // [longitude, latitude] of the marker position
        popupContent: '<img src="https://images.yourstory.com/cs/5/571d59d0-2d6c-11e9-aa97-9329348d4c3e/Untitled_design-81559651782782.png"><h3>Nashik, Maharashtra</h3><p>Collection centre of Shrink Bag</p>'
    }
    // Add more markers here if needed
];

// Create markers and popups dynamically
markers.forEach(function (markerInfo) {
    var marker = new mapboxgl.Marker()
        .setLngLat(markerInfo.lngLat)
        .addTo(map);

    var popup = new mapboxgl.Popup({ className: 'marker-popup' }).setHTML(markerInfo.popupContent);

    marker.getElement().addEventListener('click', function () {
        if (marker.getPopup()) {
            marker.setPopup(null);
        } else {
            marker.setPopup(popup);
        }
    });
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

var mapContainer2 = document.getElementById("mapbox2");
var map2 = new mapboxgl.Map({
    container: mapContainer2,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [75.856255, 20.516726],
    zoom: 6
});

map2.on('load', function () {
    var start = [72.877655, 19.075983];
    var destinations = [
        [74.7749, 20.9042],
        [74.173257, 21.975842],
        [73.243896, 22.264793],
        // Add more destination points as needed
    ];

    var coordinates = [];
    destinations.forEach(function (destination) {
        coordinates.push(start);
        coordinates.push(destination);
    });

    // Get route from Mapbox Directions API
    var apiUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
    apiUrl += coordinates.join(';');
    apiUrl += '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var route = data.routes[0].geometry;

            map2.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: route
                    }
                },
                paint: {
                    'line-color': '#55d5a5',
                    'line-width': 4
                }
            });

            // Add marker at start point
            var startMarker = new mapboxgl.Marker()
                .setLngLat(start)
                .addTo(map2);

            // Add markers at destination points
            destinations.forEach(function (destination) {
                var marker = new mapboxgl.Marker()
                    .setLngLat(destination)
                    .addTo(map2);
            });

            var bounds = new mapboxgl.LngLatBounds();
            coordinates.forEach(function (coord) {
                bounds.extend(coord);
            });
            map2.fitBounds(bounds, { padding: 40 });
        });
});

map2.addControl(new mapboxgl.NavigationControl());
map2.addControl(new mapboxgl.FullscreenControl());

var mapContainer3 = document.getElementById("mapbox3");
var map3 = new mapboxgl.Map({
    container: mapContainer3,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [72.9968, 20.50095],
    zoom: 6
});

map3.on('load', function () {
    var points = [
        { name: 'A', coordinates: [72.877655, 19.075983] },
        { name: 'B', coordinates: [74.7749, 20.9042] },
        { name: 'C', coordinates: [73.8567, 18.5204] }
        // Add more points as needed
    ];

    var coordinatesAB = [points[0].coordinates, points[1].coordinates];
    var coordinatesBC = [points[0].coordinates, points[2].coordinates];

    // Get route from Mapbox Directions API (A to B)
    var apiUrlAB = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
    apiUrlAB += coordinatesAB.join(';');
    apiUrlAB += '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

    // Get route from Mapbox Directions API (B to C)
    var apiUrlBC = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
    apiUrlBC += coordinatesBC.join(';');
    apiUrlBC += '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

    // Fetch A to B route
    fetch(apiUrlAB)
        .then(function (responseAB) {
            return responseAB.json();
        })
        .then(function (dataAB) {
            var routeAB = dataAB.routes[0].geometry;

            map3.addLayer({
                id: 'routeAB',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: routeAB
                    }
                },
                paint: {
                    'line-color': '#55d5a5',
                    'line-width': 4
                }
            });

            // Fetch B to C route
            fetch(apiUrlBC)
                .then(function (responseBC) {
                    return responseBC.json();
                })
                .then(function (dataBC) {
                    var routeBC = dataBC.routes[0].geometry;

                    map3.addLayer({
                        id: 'routeBC',
                        type: 'line',
                        source: {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                geometry: routeBC
                            }
                        },
                        paint: {
                            'line-color': '#55d5a5',
                            'line-width': 4
                        }
                    });

                    // Add markers at points
                    points.forEach(function (point) {
                        var marker = new mapboxgl.Marker()
                            .setLngLat(point.coordinates)
                            .addTo(map3);
                    });

                    var bounds = new mapboxgl.LngLatBounds();
                    points.forEach(function (point) {
                        bounds.extend(point.coordinates);
                    });
                    map3.fitBounds(bounds, { padding: 40 });
                });
        });
});

map3.addControl(new mapboxgl.NavigationControl());
map3.addControl(new mapboxgl.FullscreenControl());

var mapContainer4 = document.getElementById("mapbox4");
var map4 = new mapboxgl.Map({
    container: mapContainer4,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [74.7474142, 21.1924098],
    zoom: 5.7
});

const start = [72.593099, 23.012026];
const end = [73.856743, 18.520430];

const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

map4.on('load', async () => {
    const response = await fetch(directionsRequest);
    const data = await response.json();

    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {},
                geometry: data.routes[0].geometry
            }
        ]
    };

    map4.addSource('line', {
        type: 'geojson',
        data: geojson
    });

    // Add line layer
    map4.addLayer({
        type: 'line',
        source: 'line',
        id: 'line-layer',
        paint: {
            'line-color': '#55d5a5',
            'line-width': 4,
        }
    });

    new mapboxgl.Marker({ color: '#13BEE1' })
        .setLngLat(start)
        .addTo(map4);

    new mapboxgl.Marker({ color: '#13BEE1' })
        .setLngLat(end)
        .addTo(map4);

    // Add a moving object with a car icon 
    const objectMarker = new mapboxgl.Marker({
        element: createMarkerElement("./assets/images/truck.png"), // Replace 'car-icon.png' with your custom car icon image path
        anchor: 'bottom',
        rotationAlignment: 'map'
    })
        .setLngLat(start)
        .addTo(map4);

    let currentCoordinateIndex = 0;
    const coordinates = data.routes[0].geometry.coordinates;
    const totalDistance = data.routes[0].distance / 1000; // Convert distance to kilometers

    const distanceElement = document.createElement('div');
    distanceElement.className = 'distance';
    distanceElement.innerText = totalDistance.toFixed(2) + 'km';
    objectMarker.getElement().appendChild(distanceElement);

    function moveObject() {
        const startPoint = coordinates[currentCoordinateIndex];
        const endPoint = coordinates[currentCoordinateIndex + 1];

        const startTime = new Date().getTime();
        const duration = 300; // Animation duration in milliseconds

        function animateMarker() {
            const currentTime = new Date().getTime();
            const elapsed = currentTime - startTime;
            const progress = elapsed / duration;

            const lng = startPoint[0] + (endPoint[0] - startPoint[0]) * progress;
            const lat = startPoint[1] + (endPoint[1] - startPoint[1]) * progress;

            objectMarker.setLngLat([lng, lat]);

            if (progress < 1) {
                requestAnimationFrame(animateMarker);
            } else {
                currentCoordinateIndex++;

                if (currentCoordinateIndex >= coordinates.length - 1) {
                    currentCoordinateIndex = 0; // Reset to start point to start the loop again
                }

                distanceElement.innerText = ((currentCoordinateIndex * totalDistance) / (coordinates.length - 1)).toFixed(2) + ' km'; // Update distance above the truck icon
                moveObject(); // Move to the next segment of the line
            }
        }
        animateMarker();
    }

    moveObject();
});

// Helper function to create a custom marker element
function createMarkerElement(iconUrl) {
    const marker = document.createElement('div');
    marker.className = 'custom-marker';
    marker.style.backgroundImage = `url(${iconUrl})`;
    marker.style.width = '40px';
    marker.style.height = '40px';
    marker.style.backgroundSize = 'cover';

    return marker;
}

map4.addControl(new mapboxgl.NavigationControl());
map4.addControl(new mapboxgl.FullscreenControl());
