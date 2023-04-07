
var time = [];
var voltage = [];
var current = [];
var soc = [];
var speed = [];
var rpm = [];
var distance = [];
var slope = [];
var c_temp = [];
var m_temp = [];
var pin_val = [65,656,454,34,6,7,5,4,3,3,2,3];
let temperature;
let humidity;
let getData;

function dd(){
fetch('/route/dashboardd')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    getData = data;
    console.log(getData);
    console.log(getData.value8);
    
  })
  .catch(error => console.error(error));
}






var ctx_full = document.getElementById('current').getContext('2d');
var myChart_full = new Chart(ctx_full, {
  type: 'line',
  data: {
    labels: time,
    datasets: [

      {
        label: 'current',

        backgroundColor: 'rgba(109, 0, 251, 0.1)',
        borderColor: 'rgba(109, 0, 251, 1)',
        borderWidth: 2,
        fill: 'origin',
        data: current,
        pointRadius: 0,

      },
    ],
  },
  options: {
    title: {
      display: true,
      text: '',
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time',
          weight: 'bold',
        },

        type: 'time',
        time: {
          unit: 'second',
          displayFormats: {
            second: 'h:mm:ss'
          },
          tooltipFormat: 'h:mm:ss',
        }
      }],

      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: '',

        },

        ticks: {
          suggestedMin: -40,
          suggestedMax: 1000,

        }
      }]
    },

  },
});

var ctx_fulll = document.getElementById('voltage').getContext('2d');
var myChart_fulll = new Chart(ctx_fulll, {
  type: 'line',
  data: {
    labels: time,
    datasets: [

      {
        label: 'voltage',

        backgroundColor: 'rgba(109, 0, 251, 0.1)',
        borderColor: 'rgba(109, 0, 251, 1)',
        borderWidth: 2,
        fill: 'origin',
        data: voltage,
        pointRadius: 0,

      },
    ],
  },
  options: {
    title: {
      display: true,
      text: '',
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time',
          weight: 'bold',
        },

        type: 'time',
        time: {
          unit: 'second',
          displayFormats: {
            second: 'h:mm:ss'
          },
          tooltipFormat: 'h:mm:ss',
        }
      }],

      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: '',

        },

        ticks: {
          suggestedMin: -40,
          suggestedMax: 1000,

        }
      }]
    },

  },
});

var ctx_slope = document.getElementById('myChart-slope').getContext('2d');
var myChart_slope = new Chart(ctx_slope, {
  type: 'line',
  data: {
    labels: time,
    datasets: [
      {
        label: 'rpm',

        backgroundColor: 'rgba(109, 0, 251, 0.1)',
        borderColor: 'rgba(109, 0, 251, 1)',
        borderWidth: 2,
        fill: 'origin',
        data: rpm,
        pointRadius: 0,

      },
    ],
  },
  options: {
    title: {
      display: true,
      text: '',
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time',
          weight: 'bold',
        },

        type: 'time',
        time: {
          unit: 'second',
          displayFormats: {
            second: 'h:mm:ss'
          },
          tooltipFormat: 'h:mm:ss',
        }
      }],

      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: '',

        },

        ticks: {
          suggestedMin: -90,
          suggestedMax: 90,

        }
      }]
    },

  },
});

var ctx_speedDist = document.getElementById('myChart-speedDist').getContext('2d');
var myChart_speedDist = new Chart(ctx_speedDist, {
  type: 'line',
  data: {
    labels: time,
    datasets: [
      {
        label: 'speed',

        backgroundColor: 'rgba(109, 0, 251, 0.1)',
        borderColor: 'rgba(109, 0, 251, 1)',
        borderWidth: 2,
        fill: 'origin',
        data: speed,
        pointRadius: 0,

      },
    ],
  },
  options: {
    title: {
      display: true,
      text: '',
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time',
          weight: 'bold',
        },

        type: 'time',
        time: {
          unit: 'second',
          displayFormats: {
            second: 'h:mm:ss'
          },
          tooltipFormat: 'h:mm:ss',
        }
      }],

      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: '',

        },

        ticks: {
          suggestedMin: 0,
          suggestedMax: 50,

        }
      }]
    },
  },
});

function updateChart(timeValue, voltageValue, currentValue, socValue, speedValue, distanceValue, slopeValue, controllerValue, motorValue, rpmValue) {
  time.push(timeValue);
  voltage.push(voltageValue);
  current.push(currentValue);
  soc.push(socValue);
  speed.push(speedValue);
  rpm.push(rpmValue);
  slope.push(slopeValue);
  distance.push(distanceValue);
  c_temp.push(controllerValue);
  m_temp.push(motorValue);

  myChart_full.update();
  myChart_fulll.update();
  myChart_slope.update();
  myChart_speedDist.update();
}

function handleNewData(timeValue, voltageValue, currentValue, socValue, speedValue, distanceValue, slopeValue, controllerValue, motorValue, rpmValue) {
  updateChart(timeValue, voltageValue, currentValue, socValue, speedValue, distanceValue, slopeValue, controllerValue, motorValue, rpmValue);

  if (time.length > 150) {
    time.shift();
    voltage.shift();
    current.shift();
    soc.shift();
    speed.shift();
    distance.shift();
    slope.shift();
    c_temp.shift();
    m_temp.shift();
    rpm.shift();
  }
}
var gauge2 = new JustGage({
  id: "value-v67",
  value: 0,
  min: 0,
  max: 50,
  gaugeWidthScale: 1,
  counter: true,
  valueFontColor: "#000000",
  levelColors: ["#7124ff", "#7124ff", "#7124ff"],

});
var gauge3 = new JustGage({
  id: "value-v317",
  value: 0,
  min: 0,
  max: 4200,
  gaugeWidthScale: 1,
  counter: true,
  valueFontColor: "#000000",
  levelColors: ["#7124ff", "#7124ff", "#7124ff"],
});
var gauge1 = new JustGage({
  id: "gauge",
  value:0,
  min: 0,
  max: 100,
  // title: "Circular Gauge Example",
  label: "%",
  levelColors: ["#6d00fb", "#6d00fb", "#6d00fb"],
  gaugeWidthScale: 1,
  hideMinMax: true,
  valueFontColor: "#000000",
  valueMinFontSize: 36,
  valueMaxFontSize: 36,
  labelFontColor: "#000000",
  labelFontSize: 24,
  titleFontColor: "#000000",
  titleFontSize: 18,
  shadowOpacity: 0.8,
  shadowSize: 12,
  shadowVerticalOffset: 6,
  counter: true,
  // animationDuration: 2500,
  donut: true,
  pointer: true,
  pointerOptions: {
    color: '#000000',
    strokeWidth: 4,
    length: 0.8,
    iconSize: 12,
    iconScale: 1.5
  },
  startAnimationType: 'bounce',
  refreshAnimationType: 'bounce'
});
setInterval(function () {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var nowtime = hours + ":" + minutes + ":" + seconds;
  dd();
  handleNewData(nowtime, pin_val[0], pin_val[1], pin_val[2], pin_val[6], pin_val[7], pin_val[9], pin_val[3], pin_val[4], pin_val[8]);
  gauge2.refresh(getData.value5);
  gauge3.refresh(getData.value6);
  gauge1.refresh(getData.value3);
}, 1000);
// }
// setInterval(dd, 10);
