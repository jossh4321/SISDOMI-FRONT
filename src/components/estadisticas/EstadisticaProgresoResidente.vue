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
import axios from "axios";

export default {
  name: "estadistica-progreso-residente",
  data() {
    return {
      chartData: [],
      chartOptions: {
        //timeline: { colorByRowLabel: true },
      },
      loadingChart: true,
    };
  },
  methods: {
    createdStadisticsProgressByFase() {
      axios
        .get(
          "/estadisticas/residente/" +
            this.residente.id +
            "/area/" +
            "educativa"
        )
        .then((res) => {
          this.createdStadisticsFases(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    createdStadisticsFases(progressFaseResident) {
      let chartDataFinal = [];

      let chartDataFase = [
        {
          tipo: "Acogida",
          color: "#7570b3",
          fase: 1,
        },
        {
          tipo: "Desarrollo",
          color: "#4285F4",
          fase: 2,
        },
        {
          tipo: "Reinsercion",
          color: "#1b9e77",
          fase: 3,
        },
        {
          tipo: "Seguimiento",
          color: "#1b9e77",
          fase: 4,
        },
      ];

      let datasFase = [];
      let initDateDocument = null;

      chartDataFinal.push(["Fases", "Tipo", "Inicio", "Fin"]);

      chartDataFase.forEach((fase) => {
        datasFase = [];

        datasFase.push(fase.tipo);

        let progressResident = progressFaseResident.progreso.find(
          (p) => p.fase == fase.fase
        );

        if (progressResident !== undefined) {
          console.log(progressResident);
          initDateDocument = new Date(progressResident.fechaingreso);

          let faseResident = progressFaseResident.fases.find(
            (f) => f.fase == progressResident.fase
          );

          faseResident.documentos.forEach((document) => {
            if (document.tipo != undefined) {
              datasFase.push(document.tipo);
              datasFase.push(initDateDocument);

              datasFase.push(new Date(document.fechaCreacion));

              initDateDocument = new Date(document.fechaCreacion);
            } else {
              datasFase.push(null);

              const DateNow = new Date();

              datasFase.push(DateNow);
              datasFase.push(DateNow);
            }
            chartDataFinal.push(datasFase);

            datasFase = [];
            datasFase.push(fase.tipo);
          });
        } else {
          const DateNow = new Date();

          datasFase.push(fase.tipo);
          datasFase.push(DateNow);
          datasFase.push(DateNow);

          chartDataFinal.push(datasFase);
        }
      });

      console.log(chartDataFinal);

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
    this.createdStadisticsProgressByFase();
    //this.createdStadisticsFases();
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