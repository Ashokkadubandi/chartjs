import { Component } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./App.css";

ChartJS.register(ArcElement, Tooltip, Legend);

class App extends Component {
  state = { ApiStatus: false, dataSets: [], dataLabels: [] };
  componentDidMount() {
    this.callApi();
  }

  callApi = async () => {
    const options = {
      method: "GET",
    };
    const response = await fetch(
      "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
      options
    );
    const data = await response.json();
    console.log(data);
    const dataLabels = data.data.map((each) => each.Year);
    const dataSets = data.data.map((each) => each.Population);
    this.setState({ ApiStatus: true, dataSets, dataLabels });
  };

  getLoader = () => <div className="animate-loader"></div>;

  getBarData = () => {
    const { dataSets, dataLabels } = this.state;

    return (
      <div className="bar-chart">
        <Bar
          data={{
            labels: dataLabels,
            datasets: [
              {
                label: "",
                data: dataSets,
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "red",
                  "green",
                  "yellow",
                ],
                borderColor: "black",
                borderWidth: 2,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "United States Population between 2013 to 2021",
              },
              responsive: true,
              scales: {
                yAxes: [
                  {
                    stacked: true,
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            },
          }}
        />
      </div>
    );
  };

  render() {
    const { ApiStatus } = this.state;

    return (
      <div className="bar-chart-con">
        {ApiStatus === false ? this.getLoader() : this.getBarData()}
      </div>
    );
  }
}

export default App;
