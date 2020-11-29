<template>
  <v-card>
    <v-card-title class="justify-center"
      >Actualizar Acta de Externamiento</v-card-title
    >

    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1"> Datos Generales </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">
          Aspectos de Acta
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-planI">
            <form>
              <v-text-field
                v-model="planI.nombreplan"
                label="Ingrese el nombre del plan"
                outlined
                color="#009900"
              ></v-text-field>

              <v-autocomplete
                dense
                filled
                rounded
                v-model="planI.nombreusuaria"
                :items="listResidentes"
              >
              </v-autocomplete>

              <v-text-field
                v-model="planI.objetivogeneral"
                label="Ingrese el objetivo general"
                outlined
                color="#009900"
              ></v-text-field>


              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs10>
                    <v-text-field
                      v-model="objetivoespecificoAux"
                      label="Ingrese los objetivos específicos"
                      outlined
                      color="#009900"
                      shaped
                    ></v-text-field>

                    
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click="addObjEspecifico">Añadir</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-list flat>
                <v-list-item
                  v-for="(item, i) in planI.objetivoespecifico"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon
                      @click="deleteItemObjEspecificios(i)"
                      left
                      color="red"
                      >mdi-minus-circle</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">
                  Cerrar
                </v-btn>
                <v-btn block @click="step = 2" color="primary">
                  <v-icon left>mdi-page-next-outline</v-icon>
                  <span>Continuar</span>
                </v-btn>
              </v-card-actions>
            </form>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div class="container-user">
            <form>
              <br />

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs10>
                    <v-text-field
                      v-model="casoAux"
                      label="Casos/Problemas"
                      outlined
                      color="#009900"
                      shaped
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click="addCaso">Añadir</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-list flat>
                <v-list-item
                  v-for="(item, i) in planI.casos_problemas"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon @click="deleteItemCasos(i)" left color="red"
                      >mdi-minus-circle</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs10>
                    <v-text-field
                      v-model="actividadAux"
                      label="Actividades/estrategias"
                      auto-grow
                      outlined
                      rows="2"
                      row-height="25"
                      color="#009900"
                      shaped
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click="addActividad">Añadir</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-list flat>
                <v-list-item
                  v-for="(item, i) in planI.actividades_estrategias"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon @click="deleteItemActividades(i)" left color="red"
                      >mdi-minus-circle</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs10>
                    <v-text-field
                      v-model="indicadorAux"
                      label="Indicadores"
                      outlined
                      color="#009900"
                      shaped
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click="addIndicador">Añadir</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-list flat>
                <v-list-item v-for="(item, i) in planI.indicadores" :key="i">
                  <v-list-item-icon>
                    <v-icon @click="deleteItemIndicadores(i)" left color="red"
                      >mdi-minus-circle</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-textarea
                v-model="planI.meta"
                label="Meta"
                outlined
                color="#009900"
                shaped
              ></v-textarea>

              <div>
                <vue-dropzone
                  ref="myVueDropzone"
                  @vdropzone-success="afterSuccess"
                  @vdropzone-removed-file="afterRemoved"
                  id="dropzone"
                  :options="dropzoneOptions"
                >
                </vue-dropzone>
              </div>
              <v-divider class="divider-custom"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">
                  Cerrar
                </v-btn>
                <v-btn block color="accent">
                  <v-icon left>mdi-mdi-content-save-all-outline</v-icon>
                  <span>Actualizar Plan</span>
                </v-btn>
              </v-card-actions>
              
            </form>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>
<script>
import axios from 'axios';
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  props:["planA"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      planI: {
        nombreusuaria: "",
        nombreplan: "",
        objetivogeneral: "",
        objetivoespecifico: [],
        casos_problemas: [],
        actividades_estrategias: [],
        indicadores: [],
        meta: [],
        firma: null,
      },
      datemenu: false,
      step: 1,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 1,
        acceptedFiles: ".jpg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione la firma del responsable o Arrastrela Aqui",
      },
      objetivoespecificoAux: "",
      casoAux: "",
      actividadAux: "",
      indicadorAux: "",
      listResidentes: ["pollo", "choclo", "tamalito"],
    };
  },
  methods: {
     async actualizarUsuario(){
       this.$v.$touch();
      if (this.$v.$invalid) {
        console.log('hay errores');
        this.mensaje('error','..Oops','Se encontraron errores en el formulario',"<strong>Verifique los campos Ingresados<strong>");
      } else {
        console.log('no hay errores');
        await axios.put("/usuario?tipo="+this.imagen.tipo+"&modificado="+this.imagen.modificado,this.usuario)
          .then(res => {
            var resultado = res.data;
            this.replaceUsuario(resultado);
            this.cerrarDialogo();
          }).catch(err => console.log(err));
          await this.mensaje('success','listo','Usuario Actualizado Satisfactoriamente',"<strong>Se redirigira a la Interfaz de Gestion<strong>");
      }
    },
    afterSuccess(file, response) {
      this.planI.firma = file.dataURL;
      console.log(this.planI);
      //this.$v.planI.firma.$model = file.dataURL;
    },
    afterRemoved(file, error, xhr) {
      this.planI.firma.imagen = "";
      //this.$v.planI.firma.$model = "";
    },
    mensaje(icono, titulo, texto, footer) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    deleteItemObjEspecificios(index) {
      this.planI.objetivoespecifico.splice(index, 1);
    },
    deleteItemCasos(index) {
      this.planI.casos_problemas.splice(index, 1);
    },
    deleteItemActividades(index) {
      this.planI.actividades_estrategias.splice(index, 1);
    },
    deleteItemIndicadores(index) {
      this.planI.indicadores.splice(index, 1);
    },
    addObjEspecifico() {
      this.planI.objetivoespecifico.push(this.objetivoespecificoAux);
      this.objetivoespecificoAux = "";
    },
    addCaso() {
      this.planI.casos_problemas.push(this.casoAux);
      this.casoAux = "";
    },
    addActividad() {
      this.planI.actividades_estrategias.push(this.actividadAux);
      this.actividadAux = "";
    },
    addIndicador() {
      this.planI.indicadores.push(this.indicadorAux);
      this.indicadorAux = "";
    },
    closeDialog() {
      this.$emit("close-dialog-detail");
    },
  },
  computed: {},
};
</script>
<style  scoped>
.container-planI {
  margin: 15px;
}

.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
.divider-custom {
  margin-top: 7px;
  margin-bottom: 7px;
}

.inputTextField {
  border-color: green;
}
</style>