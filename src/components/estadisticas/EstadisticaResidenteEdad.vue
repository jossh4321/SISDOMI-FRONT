<template>
  <v-card elevation="0">
    <template v-if="loadingChart">
      <div class="progress">
        <v-progress-circular
          size="80"
          width="10"
          color="red"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    <template v-else>
      <GChart
        :settings="{ packages: ['bar'] }"
        :data="chartData"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Bar(el)"
        class="chart"
      >
      </GChart>
    </template>
  </v-card>
</template>

<script>
import { GChart } from "vue-google-charts";
import axios from "axios";

export default {
  name: "estadistica-residente-fase",
  data() {
    return {
      chartData: [],
      chartOptions: {
        chart: {
          title: "Cantidad de residentes por rango de edad",
          subtitle:
            "Total de residente que están actualmente en una de los 4 rangos de edades",
        },
        bars: "vertical",
        vAxis: { format: 'number' },
        colors: ['#EF474E'],
        height: 500
      },
      loadingChart: true,
    };
  },
  methods: {
    getStadisticsResidentByFase() {
      axios
        .get("/estadisticas/residentes/edad")
        .then((res) => {
          let chartDataFinal = [];
          let chartDataFase = [
              {
                  tipo: "0-5",
                  color: '#7570b3'
              },
              {
                  tipo:"6-11",
                  color: '#4285F4'
              },
              {
                  tipo: "12-17",
                  color: '#1b9e77'
              },
              {
                  tipo: ">=18",
                  color: '#1b9e77'
              }
          ];
          
        
          let datasFase = [];

          chartDataFinal.push(["Rango de Edades(Años)", "Residentes"]);

          chartDataFase.forEach((fase) => {
            datasFase = [];

            let dataQuantityResident = res.data.find(
              (x) => x.tipo == fase.tipo.toLowerCase()
            );

            datasFase.push(fase.tipo);

            if (dataQuantityResident != null) {
              datasFase.push(dataQuantityResident.cantidad);
            } else {
              datasFase.push(0);
            }

            chartDataFinal.push(datasFase);
          });

          this.chartData = chartDataFinal;
          this.loadingChart = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  components: {
    GChart,
  },
  created() {
    this.getStadisticsResidentByFase();
  },
};
</script>

<style lang="scss" scoped>
.progress {
  width: 50%;
  margin: 0px auto;
  text-align: center;
  padding-top: 15px;
}

.chart {
  height: 500px;
}
</style>