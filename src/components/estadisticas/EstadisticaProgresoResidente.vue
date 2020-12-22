<template>
  <v-card elevation="0">
    <div class="progress" v-show="loadingChart">
      <v-progress-circular
        size="80"
        width="10"
        color="red"
        indeterminate
      ></v-progress-circular>
    </div>
    <div
      ref="grantProgressResident"
      class="grant-progress-resident"
      v-show="!loadingChart"
    ></div>
  </v-card>
</template>

<script>
/* Imports the library grant */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import axios from "axios";

export default {
  name: "estadistica-progreso-residente",
  data() {
    return {
      chartData: null,
      loadingChart: true,
    };
  },
  methods: {
    createdStadisticsProgressByFase() {
      axios
        .get(
          "/estadisticas/residente/" + this.residente.id + "/area/" + this.area
        )
        .then((res) => {
          this.createdStadisticsFases(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    createdStadisticsFases(progressFaseResident) {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create(
        this.$refs.grantProgressResident,
        am4charts.XYChart
      );

      chart.hiddenState.properties.opacity = 0;

      chart.paddingRight = 30;
      chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

      let colorSet = new am4core.ColorSet();
      colorSet.saturation = 0.4;

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

      let dataProgress = {
        fasename: "",
        typeDocument: "",
        fromDate: "",
        toDate: "",
        color: null,
      };

      let indexColor = 0;

      chartDataFase.forEach((fase) => {
        let progressResident = progressFaseResident.progreso.find(
          (p) => p.fase == fase.fase
        );

        if (progressResident !== undefined) {
          initDateDocument = this.$moment(
            new Date(progressResident.fechaingreso)
          ).format("YYYY-MM-DD HH:mm");

          let faseResident = progressFaseResident.fases.find(
            (f) => f.fase == progressResident.fase
          );

          let colorIntensity = 0.3;

          faseResident.documentos.forEach((document) => {
            if (document.tipo != undefined) {
              dataProgress = this.setDataProgress(
                fase.tipo,
                document.tipo,
                initDateDocument,
                this.$moment(new Date(document.fechaCreacion)).format(
                  "YYYY-MM-DD HH:mm"
                ),
                colorSet.getIndex(indexColor).brighten(colorIntensity)
              );

              colorIntensity += 0.4;
              initDateDocument = dataProgress.toDate;
            }

            chartDataFinal.push(dataProgress);

            dataProgress = this.setDataProgress("", "", "", "");
          });

          indexColor += 2;
        } else {
          const DATENOW = new Date();

          dataProgress = this.setDataProgress(
            fase.tipo,
            fase.tipo,
            this.$moment(DATENOW).format("YYYY-MM-DD HH:mm"),
            this.$moment(DATENOW).format("YYYY-MM-DD HH:mm"),
            colorSet.getIndex(indexColor).brighten(0)
          );

          indexColor += 2;

          chartDataFinal.push(dataProgress);

          dataProgress = this.setDataProgress("", "", "", "");
        }
      });

      chart.data = chartDataFinal;

      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "faseName";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.inversed = true;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm";
      dateAxis.renderer.minGridDistance = 70;
      dateAxis.baseInterval = { count: 1, timeUnit: "minute" };
      dateAxis.max = new Date(
        chart.data[chart.data.length - 1].toDate
      ).getTime();
      dateAxis.strictMinMax = true;
      dateAxis.renderer.tooltipLocation = 0;

      let series1 = chart.series.push(new am4charts.ColumnSeries());
      series1.columns.template.width = am4core.percent(80);
      series1.columns.template.tooltipText =
        "{typeDocument}: {openDateX} - {dateX}";

      series1.dataFields.openDateX = "fromDate";
      series1.dataFields.dateX = "toDate";
      series1.dataFields.categoryY = "faseName";
      series1.columns.template.propertyFields.fill = "color";
      series1.columns.template.propertyFields.stroke = "color";
      series1.columns.template.strokeOpacity = 1;

      chart.scrollbarX = new am4core.Scrollbar();

      this.chartData = chart;
      this.loadingChart = false;
    },
    setDataProgress(faseName, typeDocument, fromDate, toDate, color) {
      return {
        faseName,
        typeDocument,
        fromDate,
        toDate,
        color,
      };
    },
  },
  props: {
    residente: {
      type: Object,
    },
    area: {
      type: String,
    },
  },
  mounted() {
    this.createdStadisticsProgressByFase();
  },
  beforeDestroy() {
    if (this.chartData) {
      this.chartData.dispose();
    }
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

.grant-progress-resident {
  width: 100%;
  height: 500px;
}
</style>