String.prototype.capitalize = function() {
  return this.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}

var prototype = {
  defaultTileLayer: function() {
    return L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: 'Mapa por \u0026copy; \<a href=\"http://openstreetmap.org\"\> OpenStreetMap',
        detectRetina: true,
        maxNativeZoom: 18,
        maxZoom: 21,
        minZoom: 0,
        subdomains: 'abc'
      }
    )
  },

  initMapWater: function() {
    // geodesic center of paraná
    // center: [-24.7574861, -51.7596274],
    var map = L.map('map', {
      center: [-25.496, -49.286],
      zoom: 10,
      attributionControl: false
    });

    var tile_layer = this.defaultTileLayer().addTo(map);

    L.control.attribution({ prefix: '<a href="https://leafletjs.com/">Leaflet</a>' }).addTo(map);

    var
      red_objects_ids = [8, 20, 30],
      yellow_objects_ids = [10, 19, 21]
    ;

    var stations = [
      { lat: -25.38699, lng: -49.26674, name: 'Rio Belém - Estação São Lourenço', color: 'green', risk: 'Baixo', level: 10, ph: 7.4, orp: 12.6, temp: 28 },
      { lat: -25.39875, lng: -49.27065, name: 'Rio Belém - Estação Nelson de Souza', color: 'green', risk: 'Baixo', level: 12, ph: 6.3, orp: 11.7, temp: 26 },
      { lat: -25.40165, lng: -49.26997, name: 'Rio Belém - Estação OAB', color: 'green', risk: 'Baixo', level: 16, ph: 7.8, orp: 10.3, temp: 29 },
      { lat: -25.40636, lng: -49.27002, name: 'Rio Belém - Estação Celeste Santi', color: 'green', risk: 'Baixo', level: 15, ph: 5.4, orp: 10.2, temp: 26 },
      { lat: -25.41862, lng: -49.27064, name: 'Rio Belém - Estação Cândido de Abreu', color: 'green', risk: 'Baixo', level: 13, ph: 6.3, orp: 11.5, temp: 27 },

      { lat: -25.4853, lng: -49.17603, name: 'Rio Pequeno - Estação 1', color: 'yellow', risk: 'Médio', level: 20, ph: 7.3, orp: 11.8, temp: 25 },
      { lat: -25.49754, lng: -49.15766, name: 'Rio Pequeno - Estação 2', color: 'yellow', risk: 'Médio', level: 17, ph: 8.2, orp: 16.1, temp: 29 },
      { lat: -25.51982, lng: -49.14433, name: 'Rio Pequeno - Estação 3', color: 'yellow', risk: 'Médio', level: 21, ph: 5.7, orp: 10.2, temp: 26 },
      { lat: -25.54166, lng: -49.12717, name: 'Rio Pequeno - Estação 4', color: 'green', risk: 'Baixo', level: 8, ph: 6.9, orp: 11.5, temp: 27 },

      { lat: -25.43261, lng: -49.1708, name: 'Rio Palmital - Estação 1', color: 'red', risk: 'Alto', level: 31, ph: 7.1, orp: 18.1, temp: 26 },
      { lat: -25.39762, lng: -49.17424, name: 'Rio Palmital - Estação 2', color: 'red', risk: 'Alto', level: 34, ph: 6.6, orp: 11.3, temp: 28 },
      { lat: -25.36878, lng: -49.17189, name: 'Rio Palmital - Estação 3', color: 'red', risk: 'Alto', level: 35, ph: 8.4, orp: 12.1, temp: 29 },
      { lat: -25.34672, lng: -49.16877, name: 'Rio Palmital - Estação 4', color: 'yellow', risk: 'Médio', level: 21, ph: 6.3, orp: 13.9, temp: 27 }
    ];

    var color_to_class = {
      'green': 'success',
      'yellow': 'warning',
      'red': 'danger'
    }

    // points
    // $.ajax({
    //   url: "./data/sub_bacias_altoiguacu_ponto.json"
    // }).done(function(data) {
    //   L.geoJSON(data, {}).addTo(map);
    // });

    // poligons
    $.ajax({
      url: "./data/sub_bacias_altoiguacupoligono.json"
    }).done(function(data) {
      L.geoJSON(data, {
        style: {
          fillOpacity: 0.1,
          color: 'green',
          weight: 1,
          opacity: 0.5
        },
        onEachFeature: function(feature, layer) {

          // console.log(red_objects_ids.indexOf(feature.properties.OBJECTID));

          if (red_objects_ids.indexOf(feature.properties.OBJECTID) >= 0) {
            layer.setStyle({
              color: 'red',
              fillColor: 'red'
            });
          }

          if (yellow_objects_ids.indexOf(feature.properties.OBJECTID) >= 0) {
            layer.setStyle({
              color: 'yellow',
              fillColor: 'yellow'
            });
          }
        
          layer.on('mouseover', function() {
              this.setStyle({
                opacity: 0.8,
                weight: 3
              });
          });

          layer.on('mouseout', function() {
            this.setStyle({
              opacity: 0.5,
              weight: 1
            });
          });

          layer.bindTooltip(
            '<div class="water-tooltip"><h4 class="no-margin">Bacia do ' + feature.properties.SUBNOME.toLowerCase().capitalize() + '</h4></div>',
            { sticky: true }
          );
          
          // layer.on('click', function () {
          //     // Let's say you've got a property called url in your geojsonfeature:
          //     window.location = feature.properties.url;
          // });
        }
      }).addTo(map);

      // after xhr loaded
      for (var station in stations) {
        var circle = L.circleMarker(
          [stations[station].lat, stations[station].lng], {
            color: '#000',
            fillColor: stations[station].color,
            weight: 1,
            radius: 5,
            fillOpacity: 1
          }
        ).addTo(map);

        circle.bindTooltip(
          [
            '<div class="water-tooltip">',
            '<h4>', stations[station].name, '</h4>',
            '<div class="text-', color_to_class[stations[station].color], '">Risco ', stations[station].risk, '</div>',
            '<div>Nível: ', stations[station].level, ' cm<div>',
            '<div>pH: ', stations[station].ph.toLocaleString('pt-BR'), '</div>',
            '<div>ORP: ', stations[station].orp.toLocaleString('pt-BR'), '</div>',
            '<div>Temperatura da água: ', stations[station].temp, '˚</div>',
            '</div>'
          ].join(''),
          { sticky: true }
        );
      }
    });

  },

  initMapAir: function() {

    google.charts.load('current', { 'packages': ['annotationchart'], 'language': 'pt-BR' });

    var stations = [
      { code: 'PR02', name: 'Cidade Industrial', lat_lgn: [-25.508000, -49.337186], available_data: ['CO', 'NO2'] },
      { code: 'PR03', name: 'CSN', lat_lgn: [-25.5718755, -49.3879971], available_data: ['NO2', 'O3', 'PTS', 'SO2'] },
      { code: 'PR06', name: 'REPAR', lat_lgn: [-25.5658911, -49.3716738], available_data: ['CO', 'MP10', 'NO2', 'O3', 'PTS', 'SO2'] },
      { code: 'PR08', name: 'Assis', lat_lgn: [-24.3998019, -53.5337091], available_data: ['NO2', 'O3', 'PTS', 'SO2'] },
      { code: 'PR09', name: 'PETROSIX', lat_lgn: [-25.861061, -50.9571824], available_data: ['CO', 'NO2', 'O3', 'PTS', 'SO2'] },
      { code: 'PR14', name: 'Ponta Grossa', lat_lgn: [-25.1388653, -50.3493838], available_data: ['CO', 'MP10', 'NO2', 'O3', 'PTS'] },
      { code: 'PR15', name: 'Cascavel', lat_lgn: [-24.9637544, -53.5423919], available_data: ['CO', 'MP10', 'NO2', 'O3', 'PTS', 'SO2'] },
      { code: 'PR16', name: 'Londrina', lat_lgn: [-23.321264, -51.2358033], available_data: ['CO', 'MP10', 'NO2', 'O3', 'PTS', 'SO2'] },
    ];

    // TODO:
    // - cor do marker de acordo com índice de qualidade do conama

    var data_to_units = {
      'CO': 'ppm',
      'NO2': 'ppb',
      'O3': 'ppb',
      'SO2': 'ppb',
      'MP10': 'µg/m3',
      'PTS': 'µg/m3'
    };

    // geodesic center of paraná
    // center: [-24.7574861, -51.7596274],
    var map = L.map('map', {
      center: [-24.7574861, -51.7596274],
      zoom: 8,
      attributionControl: false
    });

    var tile_layer = this.defaultTileLayer().addTo(map);

    L.control.scale({ position: 'bottomleft' }).addTo(map);
    L.control.attribution({ prefix: '<a href="https://leafletjs.com/">Leaflet</a>' }).addTo(map);

    for (var station in stations) {
      var
        marker = L.marker(stations[station].lat_lgn, { index: station }).addTo(map),
        popup = marker.bindPopup('', { maxWidth: 320 })
      ;

      popup.on('popupopen', function() {
        var
          index = this.options.index,
          available_data = stations[index].available_data,
          code = stations[index].code,
          available_data_html = []
        ;

        for (var data in available_data) {
          available_data_html.push(
            "<a href=\"#\" onclick=\"return prototype.openChart(this, '", index, "', '", code, "', '", available_data[data], "')\">",
              available_data[data], "</a>"
          );
        }

        this.setPopupContent(
          "<div class='popup_div'>" +
            available_data_html.join("") +
            "<div class='popup_chart' id='chart_" + index + "'></div></div>"
        );
        
        // open first type
        $('.popup_div a:first-child').click();
      });
    }

  },

  initMapsLevel: function() {
    // Centro Cívico
    var map1_lat_lgn = [-25.414077, -49.270353];
    var map1 = L.map('map1', {
      center: map1_lat_lgn,
      zoom: 17,
      attributionControl: false
    });

    var tile_layer1 = this.defaultTileLayer().addTo(map1);
    var marker1 = L.marker(map1_lat_lgn).addTo(map1);

    // Itupava
    var map2_lat_lgn = [-25.422449, -49.251960];
    var map2 = L.map('map2', {
      center: map2_lat_lgn,
      zoom: 17,
      attributionControl: false
    });

    var tile_layer2 = this.defaultTileLayer().addTo(map2);
    var marker2 = L.marker(map2_lat_lgn).addTo(map2);

    // PUCPR
    var map3_lat_lgn = [-25.450110, -49.249865];
    var map3 = L.map('map3', {
      center: map3_lat_lgn,
      zoom: 17,
      attributionControl: false
    });

    var tile_layer3 = this.defaultTileLayer().addTo(map3);
    var marker3 = L.marker(map3_lat_lgn).addTo(map3);

    // Parque Náutico
    var map4_lat_lgn = [-25.5250071, -49.2238426];
    var map4 = L.map('map4', {
      center: map4_lat_lgn,
      zoom: 17,
      attributionControl: false
    });

    var tile_layer4 = this.defaultTileLayer().addTo(map4);
    var marker4 = L.marker(map4_lat_lgn).addTo(map4);
  },

  openChart: function(a_element, index, code, data_type) {
    $(a_element).siblings().removeClass('selected');
    $(a_element).addClass('selected');

    $.ajax({
      url: "./data/" + code + "_" + data_type + ".json"
    }).done(function(data) {
      // Transform Data ([[parsed datetime, data point],...])
      var parsed_data = [];

      for (var point in data) {
        parsed_data.push([new Date(data[point][0]), data[point][1]]);
      }
      
      // loaded callback
      google.charts.setOnLoadCallback(function() {

        var data = new google.visualization.DataTable();

        data.addColumn('date', 'Date');
        data.addColumn('number', data_type);
        data.addRows(parsed_data);

        var chart = new google.visualization.AnnotationChart(document.getElementById('chart_' + index));
        
        chart.draw(data, {
          displayAnnotations: false,
          width: 322,
          height: 197
        });

      });
    });

    return false;
  }
}
