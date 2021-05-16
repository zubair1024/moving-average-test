const fetchData = function (type) {
  return new Promise((resolve) => {
    const url = type
      ? `http://localhost:3000/data/${type}`
      : "http://localhost:3000/data";
    return fetch(url)
      .then((response) => response.json())
      .then((response) => resolve(response?.data || []));
  });
};
w;
const drawGraph = function ({ realData, maData, smaData, wmaData, emaData }) {
  Highcharts.chart("container", {
    chart: {
      type: "line",
      zoomType: "xy",
    },
    title: {
      text: "Data",
    },

    subtitle: {},

    yAxis: {
      title: {
        text: "",
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 0,
      },
    },

    series: [
      {
        name: "Real",
        data: realData,
      },
      {
        name: "Moving Average",
        data: maData,
      },
      {
        name: "Smooth Moving Average",
        data: smaData,
      },

      {
        name: "Exponential Moving Average",
        data: emaData,
      },
      {
        name: "Weighed Moving Average",
        data: wmaData,
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });
};

(async () => {
  const data = await fetchData();
  const maData = await fetchData("ma");
  const emaData = await fetchData("ema");
  const smaData = await fetchData("sma");
  const wmaData = await fetchData("wma");
  debugger;
  drawGraph({ realData: data, maData, smaData, wmaData, emaData });
})();
