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
          title: "Cantidad de residente por grado académico",
          subtitle:
            "Total de residentes por grado académico y dividido según su modalidad",
        },
        bars: "vertical",
        vAxis: { format: "number" },
        colors: ["#DB4437","#7479BC","#EFE426"],
        height: 500,
      },
      loadingChart: true,
    };
  },
  methods: {
    getStadisticsResidentByFase() {
      axios
        .get("/estadisticas/residentes/modalidad/grado")
        .then((res) => {
            
          let chartDataFinal = [];
          let chartDataGrado = [
            {
              tipo: "1",
              modalidades: ["EBA", "EBR", "EBE"],
            },
            {
              tipo: "2",
              modalidades: ["EBA", "EBR", "EBE"],
            },
            {
              tipo: "3",
              modalidades: ["EBA", "EBR", "EBE"],
            },
            {
              tipo: "4",
              modalidades: ["EBA", "EBR", "EBE"],
            },
            {
              tipo: "5",
              modalidades: ["EBA", "EBR", "EBE"],
            },
            {
              tipo: "6",
              modalidades: ["EBA", "EBR", "EBE"],
            },
          ];

          let datasGrado = [];

          chartDataFinal.push(["Grado", "EBA", "EBR", "EBE"]);

          chartDataGrado.forEach((grado) => {
            datasGrado = [];

            let dataQuantityModality = res.data.find(
              (x) => x.tipo === grado.tipo
            );

            datasGrado.push(grado.tipo);

            if (dataQuantityModality != null) {
              grado.modalidades.forEach((modalidad) => {
                let dataModality = dataQuantityModality.modalidades.find(
                  (x) => x.modalidad == modalidad
                );

                if (dataModality != null) {
                  datasGrado.push(dataModality.cantidad);
                } else {
                  datasGrado.push(0);
                }
              });
            } else {
              datasGrado.push(0, 0, 0);
            }

            chartDataFinal.push(datasGrado);
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