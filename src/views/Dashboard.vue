<template>
    <div>
        <v-row style="width: 94%;margin: 0px 3%;">
            <v-col col="4">
                <v-card class="card-litle" color="#008000" >
                    <v-card color="#262626" outlined>
                        <v-card-title class="justify-center" style="color:#f2f2f2;">
                        <v-icon color="white">mdi-account-box</v-icon>
                        <span>Usuarias en Fase I</span>
                        </v-card-title>
                    </v-card>
                    <v-divider  dark light></v-divider>
                    <v-card-subtitle style="font-size:6rem;color:#f2f2f2;display:block;margin-top:23px;text-align:center">
                        45% 
                    </v-card-subtitle>
                    <v-card-subtitle style="text-align:right;color:#f2f2f2;font-weight:bold">de las residentes</v-card-subtitle>
                    <v-card color="#f2f2f2" elevation="0"  style="margin:10px">
                        <v-card-subtitle style="font-size:16px;text-align:center;color:#0d0d0d;">45 residentes  de 100 en acogida</v-card-subtitle>
                    </v-card>
                </v-card>
            </v-col>
            <v-col col="4">
                    <v-card class="card-litle" color="#e6b800" >
                    <v-card color="#262626" outlined>
                        <v-card-title class="justify-center" style="color:#f2f2f2;">
                        <v-icon color="white">mdi-account-box</v-icon>
                        <span>Usuarias en Fase II</span>
                        </v-card-title>
                    </v-card>
                    <v-divider  dark light></v-divider>
                    <v-card-subtitle style="font-size:6rem;color:#f2f2f2;display:block;margin-top:23px;text-align:center">
                        25% 
                    </v-card-subtitle>
                    <v-card-subtitle style="text-align:right;color:#f2f2f2;font-weight:bold">de las residentes</v-card-subtitle>
                    <v-card color="#f2f2f2" elevation="0"  style="margin:10px">
                        <v-card-subtitle style="font-size:16px;text-align:center;color:#0d0d0d;">25 residentes  de 100 en desarrollo</v-card-subtitle>
                    </v-card>
                </v-card>
            </v-col>
            <v-col col="4">
                <v-card class="card-litle" color="#1a1aff" >
                    <v-card color="#262626" outlined>
                        <v-card-title class="justify-center" style="color:#f2f2f2;">
                        <v-icon color="white">mdi-account-box</v-icon>
                        <span>Usuarias en Fase III</span>
                        </v-card-title>
                    </v-card>
                    <v-divider  dark light></v-divider>
                    <v-card-subtitle style="font-size:6rem;color:#f2f2f2;display:block;margin-top:23px;text-align:center">
                        30% 
                    </v-card-subtitle>
                    <v-card-subtitle style="text-align:right;color:#f2f2f2;font-weight:bold">de las residentes</v-card-subtitle>
                    <v-card color="#f2f2f2" elevation="0"  style="margin:10px">
                        <v-card-subtitle style="font-size:16px;text-align:center;color:#0d0d0d;">30 residentes  de 100 en acogida</v-card-subtitle>
                    </v-card>
                </v-card>
            </v-col>
        </v-row>
        <v-row style="width: 94%;margin: 0px 3%;">
            <v-col cols="5">
                <v-card>
                    <v-card color="#262626" outlined>
                        <v-card-title class="justify-center" style="color:#f2f2f2;">
                         Documentos Pendientes Hoy
                        </v-card-title>
                    </v-card>
                    <v-tabs
                        v-model="tab"
                        background-color="transparent"
                        color="basil"
                        grow
                        >
                        <v-tab
                            v-for="area in areas"
                            :key="area.id"
                        >
                            {{ area.titulo }}
                        </v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="tab">
                        <v-tab-item
                            v-for="area in areas"
                            :key="area.id"
                        >
                            <v-card
                            color="basil"
                            flat
                            >
                                <v-list three-line>
                                <template v-for="tarea in area.items" >
                                    <div :key="tarea">
                                        <v-divider></v-divider>
                                        <v-list-item
                                        >
                                        <v-list-item-avatar>
                                            <v-icon>mdi-folder-alert</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title >{{tarea}}</v-list-item-title>
                                            <v-list-item-subtitle>Pendiente</v-list-item-subtitle>
                                        </v-list-item-content>
                                        </v-list-item>
                                    </div>
                                </template>
                            </v-list>
                            </v-card>
                        </v-tab-item>
                        </v-tabs-items>
                </v-card>
            </v-col>
            <v-col cols="7">
                        <v-card>
                            <v-card color="#262626" outlined>
                                <v-card-title class="justify-center" style="color:#f2f2f2;">
                                N° Residentes por Mes
                                </v-card-title>
                            </v-card>
                            <div class="dashbord-chart2"  ref="chartdivline" style="width: 100%;">
                            </div>
                        </v-card>
            </v-col>
        </v-row>
        <v-card class="contenedor-chart">
            <v-card color="#262626" outlined>
                        <v-card-title class="justify-center" style="color:#f2f2f2;">
                        DOCUMENTOS ATRASADOS
                        </v-card-title>
            </v-card>
            <div class="dashbord-chart" ref="chartdiv" style="width: 100%;height: 500px;">
            </div>
        </v-card>
    </div>
</template>
<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
/* Chart code */
// Themes begin
am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);
export default {
    data(){
        return{
            areas:[
                {id:1,titulo: "Area Educativa",
                 items:[
                    "5 Fichas Educativas de Iniciales", "3 Informes Educativos Iniciales",
                    "4 Informes Evolutivos Educativos", "3 Informes de Seguimiento", "2 Planes de Intervencion Educativos"
                 ]},
                {id:2,titulo: "Area Social",
                 items:[
                    "5 Fichas Sociales de Iniciales", "3 Informes Sociales Iniciales",
                    "4 Informes Evolutivos Sociales", "3 Actas de Externamiento", "2 Planes de Intervencion Sociales"
                 ]},
                {id:3,titulo: "Area Psicologico",
                items:[
                    "5 Fichas Psicologicos de Iniciales", "3 Informes Psicologicos Iniciales",
                    "4 Informes Evolutivos Psicologicos", "1 Informe Psicologico Final", "2 Planes de Intervencion Psicologicos"
                 ]}
            ],tab:null
        }
    },mounted(){
        
        this.generarLineChart();
        this.generarPieChart();
    },beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },methods:{
      generarPieChart(){
          let chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = [
             {
            country: "Acta de Externamiento",
            value: 128
        },
        {
            country: "Ficha Educativa de Ingreso",
            value: 401
        },
        {
            country: "Ficha Social de Ingreso",
            value: 300
        },
        {
            country: "Ficha Psicologica de Ingreso",
            value: 200
        },
        {
            country: "Informe Psicologico Evolutivo",
            value: 165
        },{
            country: "Informe de Seguimiento Educativo",
            value: 215
        },
        {
            country: "Informe Social Final",
            value: 139
        }
        ];
        chart.radius = am4core.percent(70);
        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;  

        let series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "country";

        series.slices.template.cornerRadius = 10;
        series.slices.template.innerCornerRadius = 7;
        series.slices.template.draggable = true;
        series.slices.template.inert = true;
        series.alignLabels = false;

        series.hiddenState.properties.startAngle = 90;
        series.hiddenState.properties.endAngle = 90;

        chart.legend = new am4charts.Legend();
      },generarLineChart(){
          let chart = am4core.create(this.$refs.chartdivline, am4charts.XYChart);
        // Add data
        chart.data = [{
        "date": "2012-03-01",
        "price": 20
        }, {
        "date": "2012-03-02",
        "price": 75
        }, {
        "date": "2012-03-03",
        "price": 15
        }, {
        "date": "2012-03-04",
        "price": 75
        }, {
        "date": "2012-03-05",
        "price": 158
        }, {
        "date": "2012-03-06",
        "price": 57
        }, {
        "date": "2012-03-07",
        "price": 107
        }, {
        "date": "2012-03-08",
        "price": 89
        }, {
        "date": "2012-03-09",
        "price": 75
        }, {
        "date": "2012-03-10",
        "price": 132
        }, {
        "date": "2012-03-11",
        "price": 380
        }, {
        "date": "2012-03-12",
        "price": 56
        }, {
        "date": "2012-03-13",
        "price": 169
        }, {
        "date": "2012-03-14",
        "price": 24
        }, {
        "date": "2012-03-15",
        "price": 147
        }];

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 50;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.logarithmic = true;
        valueAxis.renderer.minGridDistance = 20;

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "price";
        series.dataFields.dateX = "date";
        series.tensionX = 0.8;
        series.strokeWidth = 3;

        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.fill = am4core.color("#fff");
        bullet.circle.strokeWidth = 3;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.fullWidthLineX = true;
        chart.cursor.xAxis = dateAxis;
        chart.cursor.lineX.strokeWidth = 0;
        chart.cursor.lineX.fill = am4core.color("#000");
        chart.cursor.lineX.fillOpacity = 0.1;

        // Add scrollbar
        chart.scrollbarX = new am4core.Scrollbar();

        // Add a guide
        let range = valueAxis.axisRanges.create();
        range.value = 90.4;
        range.grid.stroke = am4core.color("#396478");
        range.grid.strokeWidth = 1;
        range.grid.strokeOpacity = 1;
        range.grid.strokeDasharray = "3,3";
        range.label.inside = true;
        range.label.text = "Average";
        range.label.fill = range.grid.stroke;
        range.label.verticalCenter = "bottom";
      }

    },computed:{

    }
}
</script>
<style>
.dashbord-chart{
    width: 94%;
    margin: 0px 3%;
    height: 400px;
}
.dashbord-chart2{
    width: 94%;
    margin: 0px 3%;
    height: 510px;
}
.contenedor-chart{
    width: 92%;
    margin: 0px 4%;
    border: 1px solid #333;
}
.card-litle{
    /*border: 1px solid #333;*/
    width: 99%;
    margin: 0px 0.5%;
    color:#f2f2f2;
    padding-bottom: 7px;
}    
</style>