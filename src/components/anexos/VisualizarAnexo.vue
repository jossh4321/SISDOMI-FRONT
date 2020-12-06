<template>
  <v-card>
    <v-card-title class="justify-center">Detalle de Anexo</v-card-title>

    <div class="container-anexo">
      <form>
        <v-text-field
          :value="anexo.titulo"
          label="Título del anexo"
          outlined
          color="#009900"
          readonly
        ></v-text-field>

        <v-text-field
          :value="residente.residente"
          label="Residente"
          outlined
          color="#009900"
          readonly
        ></v-text-field>

        <v-textarea
          :value="anexo.descripcion"
          label="Descripción del anexo"
          auto-grow
          height="25"
          rows="2"
          outlined
          color="#009900"
          readonly
        ></v-textarea>

        <v-text-field
          :value="areaAux"
          label="Area"
          outlined
          color="#009900"
          readonly
        ></v-text-field>

        <div>
          <v-list>
            <v-list-item v-for="(item, index) in anexo.enlaces" :key="index">
              <v-list-item-content>
                <v-list-item-title
                  >Documento Anexado N° {{ index }}</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="openFrameDialog(item.link)">
                  <v-icon color="info" large>mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </div>

        <v-dialog v-model="showFrameDocument" persistent max-width="900">
          <v-card>
          <iframe :src="actualUrl" height="550" width="900"> </iframe>
          <v-btn color="error" elevation="2" block @click="closeFrameDialog">
            <v-icon left>mdi-close-outline</v-icon>
            Cerrar
          </v-btn>
          </v-card>
        </v-dialog>

        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="12" md="12">
            <v-btn color="error" elevation="2" block @click="closeDialog">
              <v-icon left>mdi-close-outline</v-icon>
              Cerrar
            </v-btn>
          </v-col>
        </v-card-actions>
      </form>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  props: ["anexo"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      residente: {
        residente: "",
        id: "",
      },
      areaAux: "",
      actualUrl: "",
      showFrameDocument: false
    };
  },
  async created() {
    await axios
      .get("/residente/all")
      .then((res) => {
        this.setResidentes(res.data);
        console.log(this.residentes);
        let selected = this.residentes.find(
          (element) => element.id == this.anexo.idresidente
        );
        console.log(selected);
        this.residente.id = selected.id;
        this.residente.residente = selected.apellido + " " + selected.nombre;
      })
      .catch((err) => console.log(err));
    this.getAreaText(this.anexo.area);
  },
  methods: {
    ...mapMutations(["setResidentes"]),
    closeDialog() {
      this.$emit("close-dialog-detail");
    },
    openFrameDialog(url){
      this.actualUrl = url;
      this.showFrameDocument = true;
    },
    closeFrameDialog(){
      this.actualUrl = "";
      this.showFrameDocument = false;
    },
    getAreaText(texto) {
      switch (this.anexo.area) {
        case "social":
          this.areaAux = "Social";
          break;
        case "psicologica":
          this.areaAux = "Psicológica";
          break;
        case "educativa":
          this.areaAux = "Educativa";
          break;
        default:
          this.areaAux = "";
      }
    },
  },
  computed: {
    ...mapState(["residentes"]),
  },
};
</script>

<style  scoped>
.container-anexo {
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