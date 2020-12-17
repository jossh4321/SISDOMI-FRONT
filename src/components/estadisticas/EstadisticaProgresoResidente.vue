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
        :settings="{ packages: ['timeline'] }"
        :data="chartData"
        :options="chartOptions"
        :createChart="(el, google) => new google.visualization.Timeline(el)"
        class="chart"
      >
      </GChart>
    </template>
  </v-card>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
  name: "estadistica-progreso-residente",
  data() {
    return {
      chartData: [],
      chartOptions: {
        chart: {
          title: "Cantidad de residente por grado académico",
          subtitle:
            "Total de residentes por grado académico y dividido según su modalidad",
        },
      },
      loadingChart: true,
    };
  },
  methods: {
    createdStadisticsFases() {
      let chartDataFinal = [];

      let chartDataFase = [
        {
          tipo: "Acogida",
          color: "#7570b3",
        },
        {
          tipo: "Desarrollo",
          color: "#4285F4",
        },
        {
          tipo: "Reinsercion",
          color: "#1b9e77",
        },
        {
          tipo: "Seguimiento",
          color: "#1b9e77",
        },
      ];

      let datasFase = [];

      chartDataFinal.push(["Fases", "Inicio", "Fin"]);

      chartDataFase.forEach((fase) => {
        datasFase = [];

        let dataQuantityFase = this.residente.progreso.find(
          (x) => x.nombre == fase.tipo.toLowerCase()
        );

        datasFase.push(fase.tipo);

        if (dataQuantityFase != null) {
          datasFase.push(new Date(dataQuantityFase.fechaingreso));
          datasFase.push(new Date(dataQuantityFase.fechafinalizacion));
        } else {
          datasFase.push(new Date());
          datasFase.push(new Date());
        }
        chartDataFinal.push(datasFase);
      });
      this.chartData = chartDataFinal;
      this.loadingChart = false;
    },
  },
  props: {
    residente: {
      type: Object,
    },
  },
  components: {
    GChart,
  },
  created() {
    this.createdStadisticsFases();
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