// <block:setup:1>
//  Valeurs des points du graph en brut
let datapoints = [20000, 20450, 22475];

// Verif' du local Storage, vide ou non
let datapointsLs = JSON.parse(localStorage.getItem("datapoints"));

// Redéfinition de datapoints
if (localStorage.getItem("valeurAjout") !== null){
  datapoints= datapointsLs;
}

let DATA_COUNT = datapoints.length +2 ;
let labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
  labels.push(DATA_COUNT.toString());
}



const data = {
  labels: labels,
  datasets: [
    {
      label: "Compte",
      data: datapoints,
      borderColor: "purple",
        // fill: true,
      cubicInterpolationMode: "monotone",
    },
  ],
};
// </block:setup>

// <block:config:0>
const config = {
  type: "line",
  data: data,
  options: {
    elements: {
      point: {
        radius: 0,
      },
    },
    responsive: true,
    plugins: {
      legend: false,
      //   title: {
      //     display: true,
      //     text: "Chart.js Line Chart - Cubic interpolation mode",
      //   },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  },
};

/*Le contexte du canevas HTML */
context = document.getElementById("myChart").getContext("2d");
/* Création du graphique */
chart = new Chart(context, config);

/* Générer des données aléatoires */
function generateData() {
  randomTemperature = (Math.random() * Math.floor(50)).toFixed(2); // Deux chiffres après la virgule
  addTemperature(new Date().toLocaleTimeString(), randomTemperature);
}

function addTemperature(time, temperature) {
  /* Ajoute la valeur en X */
  config.data.labels.push(time);

  /* Ajoute la valeur */
  config.data.datasets[0].data.push(temperature);

  /* Rafraichir le graphique */
  chart.update();
}

// mise en place d'une fonction qui met à jour le graphique et les valeurs de datapoints au click submit
  function updateGraph (){
    datapoints.push(parseFloat(localStorage.getItem("valeurAjout")));
    chart.update();
    localStorage.setItem("datapoints", JSON.stringify(datapoints));

DATA_COUNT = datapoints.length ;
labels.push(DATA_COUNT.toString());
}