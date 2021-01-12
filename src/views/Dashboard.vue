<template>
    <div>
        <template v-if="cargaDashboard==true">
        
         <v-row style="width: 94%;margin: 0px 3%;"  v-if="cargaDashboard==true">
            <v-col col="4">
                <v-card class="card-litle" color="#008000" >
                    <v-card color="#262626" outlined>
                        <v-card-title class="justify-center" style="color:#f2f2f2;">
                        <v-icon color="white">mdi-account-box</v-icon>
                        <span>Usuarias en Fase I</span>
                        </v-card-title>
                    </v-card>
                    <v-divider  dark light></v-divider>
                    <v-card-subtitle style="font-size:5rem;color:#f2f2f2;display:block;margin-top:23px;text-align:center">
                        {{ (dashboard.residentesFase[0]["fase1"]/totalresidentes * 100).toFixed(1) }} %
                    </v-card-subtitle>
                    <v-card-subtitle style="text-align:right;color:#f2f2f2;font-weight:bold">de las residentes</v-card-subtitle>
                    <v-card color="#f2f2f2" elevation="0"  style="margin:10px">
                        <v-card-subtitle style="font-size:16px;text-align:center;color:#0d0d0d;"
                        > {{ dashboard.residentesFase[0]["fase1"] }} residentes  de {{ totalresidentes }} en acogida</v-card-subtitle>
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
                    <v-card-subtitle style="font-size:5rem;color:#f2f2f2;display:block;margin-top:23px;text-align:center">
                        {{ (dashboard.residentesFase[0]["fase2"] /totalresidentes * 100).toFixed(1)}} %
                    </v-card-subtitle>
                    <v-card-subtitle style="text-align:right;color:#f2f2f2;font-weight:bold">de las residentes</v-card-subtitle>
                    <v-card color="#f2f2f2" elevation="0"  style="margin:10px">
                        <v-card-subtitle style="font-size:16px;text-align:center;color:#0d0d0d;">
                           {{ dashboard.residentesFase[0]["fase2"] }} residentes  de {{ totalresidentes }} en desarrollo</v-card-subtitle>
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
                    <v-card-subtitle style="font-size:5rem;color:#f2f2f2;display:block;margin-top:23px;text-align:center">
                        {{ (dashboard.residentesFase[0]["fase3"] /totalresidentes * 100).toFixed(1)}} %
                    </v-card-subtitle>
                    <v-card-subtitle style="text-align:right;color:#f2f2f2;font-weight:bold">de las residentes</v-card-subtitle>
                    <v-card color="#f2f2f2" elevation="0"  style="margin:10px">
                        <v-card-subtitle style="font-size:16px;text-align:center;color:#0d0d0d;">
                            {{ dashboard.residentesFase[0]["fase3"] }} residentes  de {{ totalresidentes }} en seguimiento</v-card-subtitle>
                    </v-card>
                </v-card>
            </v-col>
        </v-row>
        </template>
        <v-row style="width: 94%;margin: 0px 3%;">
            <template v-if="cargaDashboard==true">
            <v-col cols="5">
                <v-card>
                    <v-card color="#262626" outlined>
                        <v-card-title class="justify-center" style="color:#f2f2f2;">
                         Documentos Atrazados / Pendientes
                        </v-card-title>
                    </v-card>
                    <v-tabs
                        v-model="tab"
                        background-color="transparent"
                        color="basil"
                        grow
                        >
                        <v-tab
                            v-for="(fase,i) in dashboard.documentosAtrazados"
                            :key="i"
                        >
                           Fase {{ fase._id }}
                        </v-tab>
                        <v-tab>
                            Para Hoy
                        </v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="tab">
                        <v-tab-item
                            v-for="(fase,i) in dashboard.documentosAtrazados"
                            :key="i"
                        >
                            <v-card
                            color="basil"
                            flat
                            >
                                <v-list three-line>
                                <template v-for="documento in fase.documentosAtrazados" >
                                    <div :key="documento.tipo">
                                        <v-divider></v-divider>
                                        <v-list-item
                                        >
                                        <v-list-item-avatar>
                                            <v-icon>mdi-folder-alert</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title >{{documento.tipo}}</v-list-item-title>
                                            <v-list-item-subtitle>{{documento.cantidadpendientes}} Pendientes</v-list-item-subtitle>
                                        </v-list-item-content>
                                        </v-list-item>
                                    </div>
                                </template>
                            </v-list>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card
                            color="basil"
                            flat>
                                 <template v-for="(documentoPendienteHoy,i) in dashboard.documentosPendientesHoy"
                                   >
                                   <div :key="i">
                                       <v-card style="margin:2%;color:white" color="#404040">
                                           <v-card-title>Documentos de Fase {{documentoPendienteHoy._id}}</v-card-title>
                                       </v-card>
                                       <div  v-if="documentoPendienteHoy.documentospendientes.length != 0">
                                           <v-list-item> 
                                            v-for="(pendientes,k) in documentoPendienteHoy.documentospendientes"
                                            :key="k">
                                                <v-list-item-avatar>
                                                    <v-icon>mdi-folder-alert</v-icon>
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title >{{documento.tipo}}</v-list-item-title>
                                                    <v-list-item-subtitle>{{documento.cantidadpendientes}} Pendientes</v-list-item-subtitle>
                                                </v-list-item-content>
                                                </v-list-item>
                                       </div>
                                       <div v-else style="background-color:#e6f7ff;text-align:center;margin:2%;border-radius:5px">
                                           <v-card-subtitle>No Hay Documentos Pendientes</v-card-subtitle>
                                       </div>
                                       

                                   </div>
                                 </template>
                            </v-card>
                        </v-tab-item>
                        </v-tabs-items>
                </v-card>
            </v-col>
             </template>
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
                        DOCUMENTOS PENDIENTES
                        </v-card-title>
            </v-card>
            <div class="dashbord-chart" ref="chartdiv" style="width: 100%;height: 800px;">
            </div>
        </v-card>
        
    </div>
</template>
<script>
import axios from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
/* Chart code */
// Themes begin
am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);

import moment from "moment";
moment.locale("es")
export default {
    data(){
        return{
            cargaDashboard:false,
            totalresidentes:0,
            dashboard:"",
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
    }, async mounted(){
       
       this.cargaDashboard= false
        await this.obtenerDatos();
        this.totalresidentes = 
            this.dashboard.residentesFase[0]["fase1"] +
            this.dashboard.residentesFase[0]["fase2"] +
            this.dashboard.residentesFase[0]["fase3"];  
            this.cargaDashboard = true; 
        this.generarLineChart();
        this.generarPieChart();
    },async beforeMount() {
        
    },beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },created(){
      
  },methods:{
      async obtenerDatos(){
             await axios.get("/documento/dashboard")
                    .then(res => {
                        console.log(res.data);
                        this.dashboard = res.data;
                    })
                    .catch(err => console.log(err));
      },generarPieChart(){
          let chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data  = this.dashboard.documentosPendientes;
        chart.radius = am4core.percent(70);
        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;  

        let series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "atrazados";
        series.dataFields.category = "_id";

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
          chart.data  = this.dashboard.residentesMesAño
                            .map((x) =>{
              return{
                  residentes: x.residentes,
                  fecha: `${x._id.año}-${x._id.mes}-01`
              }
          });

      

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 50;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.logarithmic = true;
        valueAxis.renderer.minGridDistance = 20;

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "residentes";
        series.dataFields.dateX = "fecha";
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
        range.label.text = "Promedio";
        range.label.fill = range.grid.stroke;
        range.label.verticalCenter = "bottom";
      }
    },filters:{
        obtenerPorcentaje: (valor) => {
            return (valor/ this.totalresidentes) * 100;
            },
        fomatoFecha: (fecha) =>{
            var formato = moment(fecha.split("T")[0]);
            return formato.format("llll");
            }
    },computed:{

    }
}
</script>
<style>
.dashbord-chart{
    width: 94%;
    /*margin: 0px 3%;*/
    height: 400px;
}
.dashbord-chart2{
    width: 100%;
    /*margin: 0px 3%;*/
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