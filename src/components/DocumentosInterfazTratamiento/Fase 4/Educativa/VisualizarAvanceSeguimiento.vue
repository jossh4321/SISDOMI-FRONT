<template>
  <v-card>
    <v-card-title class="justify-center">Registrar avance del seguimiento</v-card-title>
    <v-card-text>
      <div class="container-user">
        <form>
          <v-card class="subcard card-padre" style="margin-bottom:20px">
            <v-card class="subcard" style="margin-bottom:7px" color="#e6f3ff">
              <span>Residente: {{this.residente.nombre}} {{this.residente.apellido}}</span>
            </v-card>
            <v-card class="subcard" color="#e6f3ff">
              <span>Fecha de Ingreso: {{ this.residente.fechaingreso | fomatoFecha}}</span>
            </v-card>
          </v-card>
          <v-card class="subcard card-padre" style="margin-bottom:20px">
            <v-card class="subcard" style="margin-bottom:7px" color="#e6f3ff">
              <span>Educador: {{this.usuario}}</span>
            </v-card>
            <v-card class="subcard" color="#e6f3ff">
              <span>Cargo: {{ this.cargo }}</span>
            </v-card>
          </v-card>

          <v-textarea
            v-model="avanceSeg.contenido.observacion"
            label="Observación"
            auto-grow
            outlined
            rows="2"
            row-height="40"
            color="#009900"
            shaped
          ></v-textarea>
          <!-- @input="$v.avanceSeg.contenido.situacionactual.$touch()"
            @blur="$v.avanceSeg.contenido.situacionactual.$touch()"
            :error-messages="errorSituacionEducativa" -->
            <v-card
                style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
              >
                <v-card-title>Anexos</v-card-title>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="60"
                  v-for="(item, index) in avanceSeg.contenido.anexos"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8">
                      <article>
                        <img
                          style="margin-right:5px;width:6% "
                          src="https://www.flaticon.es/svg/static/icons/svg/2991/2991112.svg"
                          alt="imagen documento"
                        />
                        <span style="font-size:18px"> {{ item.titulo }}</span>
                      </article>
                    </v-col>
                    <v-col :cols="2" align="center">
                      <template>
                        <v-btn
                          fab
                          icon=""
                          x-small
                          dark
                          color="#EAEAEA"
                          @click="verAnexo(index)"
                        >
                          <img
                            style="width:25% "
                            src="https://www.flaticon.es/svg/static/icons/svg/709/709612.svg"
                            alt="visualizar"
                          />
                        </v-btn>
                      </template>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-dialog
                v-model="dialogVistaPreviaAnexos"
                persistent
                max-width="600px"
              >
                <v-card align="center">
                  <v-card-title>
                    <span class="headline">Vista previa</span>
                  </v-card-title>
                  <v-card-text>
                    <iframe :src="pdf" width="100%" height="600"></iframe>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="cerrarVistaPreviaAnexo()"
                    >
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

          <v-card style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA">
            <v-row>
              <v-col :cols="12" align="center">
                <div>
                  <v-card-text>
                    <img width="240" height="170" :src="this.firma" alt />
                  </v-card-text>
                </div>
              </v-col>
            </v-row>
          </v-card>

          <v-row>
            <v-col>
              <v-btn block @click="cerrarDialogo()" color="primary">
                <v-icon left>mdi-close-outline</v-icon>
                <span>Cerrar</span>
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState, mapGetters } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value);
}
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ-]+$/.test(value);
}
export default {
  props: ["residente"],
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      titulo: "AAA",
      fileList: [],
      datemenu: false,
      pdf:"",
      firma:"",
      usuario: "",
      cargo:"",
      dialogVistaPreviaAnexos:false,
      step: 1,
      avanceSeg: {
        id: "",
        tipo: "AvanceSeguimiento",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: "",
        area: "educativa",
        fase: "4",
        idresidente: "",
        estado: "",
        contenido: {
          observacion: "",
          anexos: [],
          codigodocumento: ""
        }
      }
    };
  },
  filters: {
    fomatoFecha: fecha => {
      var formato = moment(fecha);
      return formato.format("llll");
    }
  },
  async created() {
    await this.obtenerSegumiento();
    await this.obtenerCreador();
  },
  methods: {
    async obtenerSegumiento() {
      await axios
        .get("/documento/AvanceSeguimiento/residente/"+this.residente.id)
        .then((x) => {
          this.avanceSeg = x.data[0];
        })
        .catch((err) => console.log(err));
    },
    async obtenerCreador() {
      await axios
        .get("/usuario/rol/permiso?id=" + this.avanceSeg.creadordocumento)
        .then((x) => {
          this.usuario = x.data.datos.nombre + " " + x.data.datos.apellido;
          this.cargo = x.data.rol.nombre;
          this.firma = x.data.datos.firma;
        })
        .catch((err) => console.log(err));
    },
    verAnexo(index) {
      this.pdf = this.avanceSeg.contenido.anexos[index].url;
      this.dialogVistaPreviaAnexos = true;
    },
    cerrarVistaPreviaAnexo() {
      this.dialogVistaPreviaAnexos = false;
    },
    cerrarDialogo() {
      this.$emit("cerrar-modal-docf1");
    },
    limpiarInforme() {
      return {
        id: "",
        tipo: "AvanceSeguimiento",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: null,
        area: "educativa",
        fase: "4",
        idresidente: "",
        estado: "creado",
        contenido: {
          observacion: "",
          anexos: [],
          codigodocumento: ""
        }
      };
    },
  },
};
</script>

<style scoped>
.container-user {
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
