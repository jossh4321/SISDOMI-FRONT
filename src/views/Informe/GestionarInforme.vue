<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Informe </v-card-title>
      <v-data-table
        :headers="headers"
        :items="informes"
        :search="search"
        class="elevation-1"
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
              <RegistrarInforme
                :listaresidentes="listaresidentes"
                :listaeducadores="listaeducadores" 
                @close-dialog-save="closeDialogRegistrar()"
              ></RegistrarInforme>
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
      <!----->
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import RegistrarInforme from "@/components/informes/RegistrarInforme.vue";
import ActualizarInformeEducativoInicial from "@/components/informes/ActualizarInformeEducativoInicial.vue";
import ActualizarInformeEducativoEvolutivo from "@/components/informes/ActualizarInformeEducativoEvolutivo.vue";
import DetalleInformeEducativoInicial from "@/components/informes/DetalleInformeEducativoInicial.vue";
import DetalleInformeEducativoEvolutivo from "@/components/informes/DetalleInformeEducativoEvolutivo.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "GestionarInforme",
  components: {
    RegistrarInforme,
    ActualizarInformeEducativoInicial,
    ActualizarInformeEducativoEvolutivo,
    DetalleInformeEducativoInicial,
    DetalleInformeEducativoEvolutivo
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
      dialogoIEIdetalle:false,
      dialogoIEEdetalle:false,
      listaresidentes: [],
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
    },
    closeDialogDetalle() {
      this.dialogoIEIdetalle = false;
      this.dialogoIEEdetalle = false;
    },
    async obtenerInformes() {
      await axios
        .get("/informe/all")
        .then((res) => {
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
        if(tipo === "Informe Educativo Inicial"){
            this.dialogoIEIactualizacion = !this.dialogoIEIactualizacion;
        }else if(tipo === "Informe Educativo Evolutivo"){
            this.titulo = "Modificar Informe Educativo Evolutivo";
            this.dialogoIEEactualizacion = !this.dialogoIEEactualizacion; 
        }else if(tipo === "Informe Educativo Final"){
            this.titulo = "Modificar Informe Educativo Final";
            this.dialogoIEEactualizacion = !this.dialogoIEEactualizacion;
        }else{
          console.log("Ayuda mi codigo no funciona :c")
        }
    },
    async abrirDialogoDetalle(idinforme, tipo){
        this.informe = await this.loadInformeModificacion(idinforme);
        if(tipo === "Informe Educativo Inicial"){
            this.dialogoIEIdetalle = !this.dialogoIEIdetalle;
        }else if(tipo === "Informe Educativo Evolutivo"){
            this.titulo = "Detalle del Informe Educativo Evolutivo";
            this.dialogoIEEdetalle = !this.dialogoIEEdetalle; 
        }else if(tipo === "Informe Educativo Final"){
            this.titulo = "Detalle del Informe Educativo Final";
            this.dialogoIEEdetalle = !this.dialogoIEEdetalle;
        }else{
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
