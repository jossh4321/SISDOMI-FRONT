<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Entrevistas Familiares </v-card-title>
      <v-data-table
        :headers="headers"
        :items="entrevistasFamiliares"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Lista de Entrevistas Familiares</v-toolbar-title>
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
                  <v-icon left>mdi-account-multiple-plus-outline</v-icon>
                  <span>Registrar nueva Entrevista</span>
                </v-btn>
              </template>
              <RegistrarEntrevistasFamiliares
                :dialogoregistro="dialogoregistro"
                @close-dialog-save="closeDialogRegistrar()"
              ></RegistrarEntrevistasFamiliares>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }"
          ><!--Abrir dialogo detalle -->
          <v-row align="center" justify="space-around">
            <!--BOTONES-->
            <v-btn color="warning" dark @click="abrirDialogoModificar(item.id)">
              <v-icon left> mdi-pencil </v-icon>
              <span>Actualizar</span>
            </v-btn>
            <v-btn color="info" dark @click="abrirDialogoDetalle(item.id)">
              <v-icon left> info </v-icon>
              <span>Visualizar</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!----->
      <!--Dialogo de Modificacion-->
      <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
        <ModificarEntrevistasFamiliares
          v-if="dialogoactualizacion"
          :entrevistaFamiliar="objEntrevistaFamiliar"                   
          @close-dialog-update="closeDialogModificar()"
        >
        </ModificarEntrevistasFamiliares>
      </v-dialog>
      <!--Dialogo de Detalle-->
      <v-dialog persistent v-model="dialogodetalle" max-width="880px">
        <ConsultarEntrevistasFamiliares
          v-if="dialogodetalle"
          :entrevistaFamiliar="objEntrevistaFamiliar"         
          @close-dialog-detail="closeDialogDetalle()"
        >
        </ConsultarEntrevistasFamiliares>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";

import ModificarEntrevistasFamiliares from "@/components/entrevistasFamiliares/ModificarEntrevistasFamiliares.vue";
import ConsultarEntrevistasFamiliares from "@/components/entrevistasFamiliares/ConsultarEntrevistasFamiliares.vue";
import RegistrarEntrevistasFamiliares from "@/components/entrevistasFamiliares/RegistrarEntrevistasFamiliares.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "GestionarEntrevistasFamiliares",
  components: {
    ModificarEntrevistasFamiliares,
    ConsultarEntrevistasFamiliares,
    RegistrarEntrevistasFamiliares
  },
  data() {
    return {
      search: "",
      objEntrevistaFamiliar: {},

      headers: [
        {
          text: "Nombre Completo del Residente ",
          align: "start",
          sortable: false,
          value: "contenido.datosresidente.nombrecompleto",
        },
        { text: "N°documento del Residente", value: "contenido.datosresidente.numerodocumento" },
        { text: "Nombre Completo del apoderado", value: "contenido.nombrecompleto" }, 
        { text: "Fecha de Entrevista", value: "contenido.fechaEntrevista" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialogoregistro: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
      dialogopromover:false,
      departamentos: [],
      provincias: [],
      distritos: [],
      idDepartamento: "",
      idProvincia: "",
      idDistrito: "",
      ubigeo:"",
    };
  },
  async created() {
    this.obtenerEntrevistas();    
  },
  methods: {
    ...mapMutations(["setEntrevistasFamiliares"]),
    editItem(item) {
      console.log(item);     
    },
    detailItem(item) {
      console.log(item);
    },
    closeDialogDetalle() {
      this.dialogodetalle = false;
    },
    closeDialogRegistrar() {
      this.dialogoregistro = false;
    },
    closeDialogModificar() {
      this.dialogoactualizacion = false;
    },
    closeDialogPromover(){
      this.dialogopromover = false;
    },
    ///abrir dialogo de detalle
    async abrirDialogoDetalle(idEntrevista) {
      this.objEntrevistaFamiliar = await this.loadsetEntrevistaFamiliarDetalle(idEntrevista);
      this.dialogodetalle = !this.dialogodetalle;
    },
    ///abrir dialogo de modificacion
    async abrirDialogoModificar(idEntrevista) {
      this.objEntrevistaFamiliar = await this.loadsetEntrevistaFamiliarDetalle(idEntrevista);
      this.dialogoactualizacion = !this.dialogoactualizacion;
    },

    async loadsetEntrevistaFamiliarDetalle(idEntrevista) {
      var user = {};
      await axios
        .get("/Documento/entrevistaFamiliar/id?id=" + idEntrevista)
        .then((res) => {
          console.log(res);
          user = res.data;
          user.contenido.fechaEntrevista = user.contenido.fechaEntrevista.split("T")[0];
        })
        .catch((err) => console.log(err));
      console.log(user);     
      return user;
    },    
    ///////////////////Consumo de  apis
    async obtenerEntrevistas() {
      await axios
        .get("/Documento/entrevistafamiliar/all")
        .then((res) => {
          var info = {};
          info = res.data;
          for (var x=0;x<res.data.length;x++){
              info[x].contenido.fechaEntrevista = res.data[x].contenido.fechaEntrevista.split("T")[0];
              var nombreCompletoResidente = info[x].contenido.datosresidente.nombre + " " + info[x].contenido.datosresidente.apellido
              const ResidenteCompleto = { nombrecompleto: nombreCompletoResidente};
              info[x].contenido.datosresidente = Object.assign(info[x].contenido.datosresidente, ResidenteCompleto);
              var nombreCompletoApoderado = info[x].contenido.nombreApoderado + " " + info[x].contenido.apellidoApoderado;
              const ApoderadoCompleto = { nombrecompleto: nombreCompletoApoderado};
              info[x].contenido = Object.assign(info[x].contenido, ApoderadoCompleto);
          }
          
          this.setEntrevistasFamiliares(info);
        })
        .catch((err) => console.log(err));
    },    
  },
  computed: {
    ...mapState(["entrevistasFamiliares"]),
  },
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>