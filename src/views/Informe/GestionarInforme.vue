<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Informes </v-card-title>
      <v-data-table
        :headers="headers"
        :items="informes"
        :search="search"
        class="elevation-1"
        :loading="loading"
        loading-text="Cargando informes"        
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Informes de las Usuarias CAR</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <!--Dialogo de Registro-->
            <v-dialog persistent v-model="dialogoregistro" max-width="880px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>mdi-plus</v-icon>
                  <span>Registrar Informe</span>
                </v-btn>
              </template>
              <SeleccionarInforme
                :listaresidentes="listaresidentes"
                :listaeducadores="listaeducadores" 
                @close-dialog-save="closeDialogRegistrar()"
              ></SeleccionarInforme>
            </v-dialog>            
            <!---->
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
                <v-btn
                  color="warning"
                  dark
                  @click="abrirDialogoActualizar(item.id, item.tipo)"
                >
                <v-icon left>mdi-briefcase-edit</v-icon>
                  <span>Actualizar</span>
                </v-btn>
                <v-btn
                  color="info"
                  dark
                  @click="abrirDialogoDetalle(item.id, item.tipo)"
                >
                <v-icon left>mdi-file-eye</v-icon>
                  <span>Detalle</span>
                </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <v-dialog persistent
                v-model="dialogoIEIactualizacion" 
                max-width="880px">
        <ActualizarInformeEducativoInicial
          v-if="dialogoIEIactualizacion"
          :informe="informe" 
          :listaresidentes="listaresidentes"
          :listaeducadores="listaeducadores" 
          @close-dialog-update="closeDialogActualizar()">
        </ActualizarInformeEducativoInicial>
      </v-dialog>
      <v-dialog persistent
                v-model="dialogoISIactualizacion" 
                max-width="880px">
        <ActualizarInformeSocialInicial
          v-if="dialogoISIactualizacion"
          :listaresidentes="listaresidentes"
          :informe="informe" 
          @close-dialog-update="closeDialogActualizar()">
        </ActualizarInformeSocialInicial>
      </v-dialog>
      <v-dialog persistent
                v-model="dialogoIEEactualizacion" 
                max-width="880px">
        <ActualizarInformeEducativoEvolutivo
          v-if="dialogoIEEactualizacion"
          :informe="informe"
          :titulo="titulo"
          :listaresidentes="listaresidentes"
          :listaeducadores="listaeducadores"  
          @close-dialog-update="closeDialogActualizar()">
        </ActualizarInformeEducativoEvolutivo>
      </v-dialog>
      <v-dialog persistent
                v-model="dialogoISEactualizacion" 
                max-width="880px">
        <ActualizarInformeSocialEvolutivo
          v-if="dialogoISEactualizacion"
          :informe="informe"
          :titulo="titulo"
          :listaresidentes="listaresidentes"
          @close-dialog-update="closeDialogActualizar()">
        </ActualizarInformeSocialEvolutivo>
      </v-dialog>
      <v-dialog persistent
                v-model="dialogoIEIdetalle" 
                max-width="880px">
        <DetalleInformeEducativoInicial
          v-if="dialogoIEIdetalle"
          :informe="informe" 
          @close-dialog-detail="closeDialogDetalle()">
        </DetalleInformeEducativoInicial>
      </v-dialog>
      <v-dialog persistent
                v-model="dialogoIEEdetalle" 
                max-width="880px">
        <DetalleInformeEducativoEvolutivo
          v-if="dialogoIEEdetalle"
          :informe="informe"
          :titulo="titulo"  
          @close-dialog-detail="closeDialogDetalle()">
        </DetalleInformeEducativoEvolutivo>
      </v-dialog>
      <v-dialog persistent
                v-model="dialogoISIdetalle" 
                max-width="880px">
        <DetalleInformeSocialInicial
          :informe="informe"
          v-if="dialogoISIdetalle"          
          @close-dialog-detail="closeDialogDetalle()">
        </DetalleInformeSocialInicial>
      </v-dialog>
      <v-dialog persistent
                v-model="dialogoISEdetalle" 
                max-width="880px">
        <DetalleInformeSocialEvolutivo
          v-if="dialogoISEdetalle"
          :informe="informe"
          :titulo="titulo"  
          @close-dialog-detail="closeDialogDetalle()">
        </DetalleInformeSocialEvolutivo>
      </v-dialog>
      <!----->
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import SeleccionarInforme from "@/components/informes/SeleccionarInforme.vue";
import ActualizarInformeEducativoInicial from "@/components/informes/ActualizarInformeEducativoInicial.vue";
import ActualizarInformeEducativoEvolutivo from "@/components/informes/ActualizarInformeEducativoEvolutivo.vue";
import ActualizarInformeSocialInicial from "@/components/informes/ActualizarInformeSocialInicial.vue";
import ActualizarInformeSocialEvolutivo from "@/components/informes/ActualizarInformeSocialEvolutivo.vue";
import DetalleInformeEducativoInicial from "@/components/informes/DetalleInformeEducativoInicial.vue";
import DetalleInformeEducativoEvolutivo from "@/components/informes/DetalleInformeEducativoEvolutivo.vue";
import DetalleInformeSocialInicial from "@/components/informes/DetalleInformeSocialInicial.vue";
import DetalleInformeSocialEvolutivo from "@/components/informes/DetalleInformeSocialEvolutivo.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "GestionarInforme",
  components: {
    SeleccionarInforme,
    ActualizarInformeEducativoInicial,
    ActualizarInformeEducativoEvolutivo,
    ActualizarInformeSocialInicial,
    ActualizarInformeSocialEvolutivo,
    DetalleInformeEducativoInicial,
    DetalleInformeEducativoEvolutivo,
    DetalleInformeSocialInicial,
    DetalleInformeSocialEvolutivo
  },
  data() {
    return {
      search: "",
      informe: {},
      headers: [
        {
          text: "Código del Informe",
          align: "start",
          sortable: false,
          value: "codigodocumento",
        },
        { text: "Nombre del residente", value: "nombrecompleto" },
        { text: "Fecha de creación", value: "fechacreacion" },
        { text: "Tipo de Informe", value: "tipo" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      listaresidentes:[],
      titulo:"Titulo por defecto",
      listaeducadores:[],
      dialogoregistro: false,
      dialogoIEIactualizacion: false,
      dialogoIEEactualizacion: false,
      dialogoISIactualizacion: false,
      dialogoISEactualizacion: false,
      dialogoIEIdetalle:false,
      dialogoIEEdetalle:false,
      dialogoISIdetalle:false,
      dialogoISEdetalle:false,
      listaresidentes: [],
      loading:true
    };
  },
  async created() {
    this.obtenerInformes();
    this.obtenerResidentes();
    this.obtenerEducadores();
  },
  methods: {
    ...mapMutations(["setInformes"]),
    closeDialogRegistrar() {
      this.dialogoregistro = false;
    },
    closeDialogActualizar() {
      this.dialogoIEIactualizacion = false;
      this.dialogoIEEactualizacion = false;
      this.dialogoISEactualizacion = false;
      this.dialogoISIactualizacion = false;
    },
    closeDialogDetalle() {
      this.dialogoIEIdetalle = false;
      this.dialogoIEEdetalle = false;
      this.dialogoISIdetalle = false;
      this.dialogoISEdetalle = false;      
    },
    async obtenerInformes() {
      await axios
        .get("/informe/all")
        .then((res) => {
          this.loading = false;
          var info = {};
          info = res.data;
          for (var x=0;x<res.data.length;x++){
              info[x].fechacreacion = res.data[x].fechacreacion.split("T")[0];
              info[x].tipo = res.data[x].tipo.replace(/([a-z])([A-Z])/g, '$1 $2');
          }
          console.log(res.data[1].tipo);
          this.setInformes(info);
        })
        .catch((err) => console.log(err));
    },async abrirDialogoActualizar(idinforme, tipo){
        console.log("El resultado de esta cagada es:"+ idinforme + "  "+ tipo);
        this.informe = await this.loadInformeModificacion(idinforme);
        switch(tipo){
                case "Informe Educativo Inicial":
                    this.dialogoIEIactualizacion = !this.dialogoIEIactualizacion;
                    break;
                case "Informe Educativo Evolutivo":
                    this.titulo = "Modificar Informe Educativo Evolutivo";
                    this.dialogoIEEactualizacion = !this.dialogoIEEactualizacion; 
                    break;
                case "Informe Educativo Final":
                    this.titulo = "Modificar Informe Educativo Final";
                    this.dialogoIEEactualizacion = !this.dialogoIEEactualizacion;
                    break;
                case "Informe Social Inicial":                    
                    this.dialogoISIactualizacion = !this.dialogoISIactualizacion;
                    break;
                case "Informe Social Evolutivo":
                    this.titulo = "Modificar Informe Social Evolutivo";
                    this.dialogoISEactualizacion = !this.dialogoISEactualizacion;
                    break;
                case "Informe Social Final":
                    this.titulo = "Modificar Informe Social Final";
                    this.dialogoISEactualizacion = !this.dialogoISEactualizacion;
                    break;                
                default: 
                   console.log("Ayuda mi codigo no funciona :c")
        }
    },
    async abrirDialogoDetalle(idinforme, tipo){
        this.informe = await this.loadInformeModificacion(idinforme);

        switch(tipo){
                case "Informe Educativo Inicial":
                     this.dialogoIEIdetalle = !this.dialogoIEIdetalle;
                    break;
                case "Informe Educativo Evolutivo":
                    this.titulo = "Detalle del Informe Educativo Evolutivo";
                    this.dialogoIEEdetalle = !this.dialogoIEEdetalle;
                    break;
                case "Informe Educativo Final":
                    this.titulo = "Detalle del Informe Educativo Final";
                    this.dialogoIEEdetalle = !this.dialogoIEEdetalle;
                    break;
                case "Informe Social Inicial":
                    this.titulo = "Detalle del Informe Social Inicial";
                    this.dialogoISIdetalle = !this.dialogoISIdetalle;
                    break;
                case "Informe Social Evolutivo":
                    this.titulo = "Detalle del Informe Social Evolutivo";
                    this.dialogoISEdetalle = !this.dialogoISEdetalle;
                    break;
                case "Informe Social Final":
                    this.titulo = "Detalle del Informe Social Final";
                    this.dialogoISEdetalle = !this.dialogoISEdetalle;
                    break;                
                default: 
                   console.log("Ayuda mi codigo no funciona :c")
            }   
    },
    async loadInformeModificacion(idinforme){
      var info = {};
      await axios.get("/informe/id?id="+idinforme)
      .then(res => {
         info = res.data; 
         info.fechacreacion = res.data.fechacreacion.split("T")[0];
      })
      .catch(err => console.log(err));
      return info;
    },
    async obtenerResidentes(){
          await axios.get("/residente/all")
                  .then( x => {
                            this.listaresidentes = x.data;
                            console.log(this.listaresidentes);
                  }).catch(err => console.log(err));
        },
    async obtenerEducadores(){
          await axios.get("/usuario/idrol?idrol=5f73b6440a37af031f716806")
            .then(res => {
                    this.listaeducadores = res.data;
                    console.log(this.listaeducadores);
            }).catch(err => console.log(err));
    }
  },
  computed: {
    ...mapState(["informes"]),
  },
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>