<template>
  <v-card>
    <v-card-title class="justify-center">Registro de Usuarios</v-card-title>

    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1"> Datos Generales </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2"> Datos de Cuenta </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form>
              <v-text-field
                v-model="usuario.datos.nombre"
                label="Ingrese los Nombres"
                outlined
                @input="$v.usuario.datos.nombre.$touch()"
                @blur="$v.usuario.datos.nombre.$touch()"
                :error-messages="errorNombre"
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="usuario.datos.apellido"
                label="Ingrese los Apellidos"
                outlined
                @input="$v.usuario.datos.apellido.$touch()"
                @blur="$v.usuario.datos.apellido.$touch()"
                :error-messages="errorApellido"
                color="#009900"
              ></v-text-field>
              <v-menu
                v-model="datemenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="usuario.datos.fechanacimiento"
                    label="Fecha de Nacimiento"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @input="$v.usuario.datos.fechanacimiento.$touch()"
                    @blur="$v.usuario.datos.fechanacimiento.$touch()"
                    :error-messages="errorFechaNacimiento"
                    color="#009900"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="usuario.datos.fechanacimiento"
                  @input="menu2 = false"
                  locale="es-es"
                ></v-date-picker>
              </v-menu>
              <v-select
                :items="['DNI', 'Pasaporte', 'Carnet Extranjeria']"
                label="Ingrese el Tipo de Documento"
                dense
                outlined
                v-model="usuario.datos.tipodocumento"
                @input="$v.usuario.datos.tipodocumento.$touch()"
                @blur="$v.usuario.datos.tipodocumento.$touch()"
                :error-messages="errorTipoDocumento"
                color="#009900"
              ></v-select>
              <v-text-field
                v-model="usuario.datos.numerodocumento"
                label="Ingrese el Numero de Documento"
                outlined
                @input="$v.usuario.datos.numerodocumento.$touch()"
                @blur="$v.usuario.datos.numerodocumento.$touch()"
                :error-messages="errorNumeroDocumento"
                color="#009900"
              ></v-text-field>
              <v-textarea
                v-model="usuario.datos.direccion"
                label="Ingrese el la direccion"
                auto-grow
                outlined
                rows="2"
                row-height="25"
                @input="$v.usuario.datos.direccion.$touch()"
                @blur="$v.usuario.datos.direccion.$touch()"
                :error-messages="errorDireccion"
                color="#009900"
                shaped
              ></v-textarea>
              <v-text-field
                v-model="usuario.datos.email"
                label="Ingrese el Correo Electronico"
                outlined
                @input="$v.usuario.datos.email.$touch()"
                @blur="$v.usuario.datos.email.$touch()"
                :error-messages="errorEmail"
                color="#009900"
              ></v-text-field>
              <v-row>
                <v-col>
                  <v-btn block @click="step = 2" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div class="container-user">
            <form>
              <v-text-field
                v-model="usuario.usuario"
                label="Ingrese el nombre de Usuario"
                outlined
                @input="$v.usuario.usuario.$touch()"
                @blur="$v.usuario.usuario.$touch()"
                :error-messages="errorNombreUsuario"
                class="inputTextField"
                color="#009900"
              ></v-text-field>

              <v-autocomplete
                v-model="usuario.rol"
                :items="listaroles"
                filled
                chips
                dense
                outlined
                color="#009900"
                label="Seleccione un Rol del Sistema"
                item-text="nombre"
                item-value="id"
                @input="$v.usuario.rol.$touch()"
                @blur="$v.usuario.rol.$touch()"
                :error-messages="errorRol"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    style="margin-top: 5px"
                  >
                    <v-avatar left color="#b3b3ff" size="24">
                      <span style="font-size: 12px">RT</span>
                    </v-avatar>
                    {{ data.item.nombre }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <v-avatar left color="#b3b3ff" size="24">
                        <span style="font-size: 12px">RT</span>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        >Rol: {{ data.item.nombre }}</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >Area: {{ data.item.area }}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >descripcion:
                        {{ data.item.descripcion }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
              <v-select
                v-model="usuario.estado"
                :items="['activo', 'inactivo']"
                label="Ingrese el Estado"
                dense
                outlined
                @input="$v.usuario.estado.$touch()"
                @blur="$v.usuario.estado.$touch()"
                :error-messages="errorEstado"
                color="#009900"
              ></v-select>
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
              <v-card v-if="errorImagen" color="red">
                <v-card-text class="text-center" style="color: white"
                  >Debe Subir una imagen del usuario
                  Obligatoriamente</v-card-text
                >
              </v-card>
              <v-divider class="divider-custom"></v-divider>
              <v-row>
                <v-col>
                  <v-btn block @click="registrarUsuario" color="success">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    <span>Registrar Usuario</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>
<script>
import axios from "axios";
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";
export default {
  props: ["listaroles"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      datemenu: false,
      step: 1,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 1,
        acceptedFiles: ".jpg, .png, jpeg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione una Imagen de su Dispositivo o Arrastrela Aqui",
      }, //utilizado en los formularios como un prop
      usuario: {
        id: "",
        usuario: "",
        rol: "",
        estado: "",
        datos: {
          nombre: "",
          apellido: "",
          fechanacimiento: "",
          tipodocumento: "",
          numerodocumento: "",
          direccion: "",
          email: "",
          imagen: "",
        },
      },
    };
  },
  created() {},
  methods: {
    ...mapMutations(["setUsuarios", "addUsuario"]),
    async registrarUsuario() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("hay errores");
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        console.log("no hay errores");
        await axios
          .post("/usuario", this.usuario)
          .then((res) => {
            this.usuario = res.data;
            this.addUsuario(this.usuario);
            this.cerrarDialogo();
          })
          .catch((err) => console.log(err));
        await this.mensaje(
          "success",
          "listo",
          "Usuario registrado Satisfactoriamente",
          "<strong>Se redirigira a la Interfaz de Gestion<strong>"
        );
      }
    },
    resetUsuarioValidationState() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.$v.usuario.$reset();
    },
    cerrarDialogo() {
      this.usuario = this.limpiarUsuario();
      this.step = 1;
      this.resetUsuarioValidationState();
      this.$emit("close-dialog-save");
    },
    afterSuccess(file, response) {
      console.log(file);
      this.usuario.datos.imagen = file.dataURL.split(",")[1];
      this.$v.usuario.datos.imagen.$model = file.dataURL.split(",")[1];
      //console.log(file.dataURL.split(",")[1]);
    },
    afterRemoved(file, error, xhr) {
      this.usuario.datos.imagen = "";
      this.$v.usuario.datos.imagen.$model = "";
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    limpiarUsuario() {
      return {
        usuario: "",
        rol: "",
        estado: "",
        datos: {
          nombre: "",
          apellido: "",
          fechanacimiento: "",
          tipodocumento: "",
          numerodocumento: "",
          direccion: "",
          email: "",
          imagen: "",
        },
      };
    },
  },
  computed: {
    ...mapState(["usuarios"]),
    verifyColor() {
      return "red";
    },
    errorNombreUsuario() {
      const errors = [];
      if (!this.$v.usuario.usuario.$dirty) return errors;
      !this.$v.usuario.usuario.required &&
        errors.push("Debe ingresar un Nombre de Usuario Obligatoriamente");
      !this.$v.usuario.usuario.minLength &&
        errors.push("El Nombre de Usuario debe poseer al menos 4 caracteres");

      return errors;
    },
    errorNombre() {
      const errors = [];
      if (!this.$v.usuario.datos.nombre.$dirty) return errors;
      !this.$v.usuario.datos.nombre.required &&
        errors.push("Debe ingresar un Nombre Obligatoriamente");
      !this.$v.usuario.datos.nombre.minLength &&
        errors.push("El Nombre debe tener al menos 3 caracteres");
      return errors;
    },
    errorApellido() {
      const errors = [];
      if (!this.$v.usuario.datos.apellido.$dirty) return errors;
      !this.$v.usuario.datos.apellido.required &&
        errors.push("Debe ingresar un Apellido Obligatoriamente");
      !this.$v.usuario.datos.apellido.minLength &&
        errors.push("El apellido debe tener al menos 3 caracteres");
      return errors;
    },
    errorNumeroDocumento() {
      const errors = [];
      if (!this.$v.usuario.datos.numerodocumento.$dirty) return errors;
      !this.$v.usuario.datos.numerodocumento.required &&
        errors.push("Debe ingresar el Numero de Documento Obligatoriamente");
      !this.usuario.datos.tipodocumento != "" &&
        errors.push("Debe seleccionar el Tipo de Documento Inicialmente");
      if (this.usuario.datos.tipodocumento == "DNI") {
        !/^[0-9]{8}$/.test(this.usuario.datos.numerodocumento) != false &&
          errors.push("El Numero de DNI debe poseer 8 digitos numericos");
      }
      if (this.usuario.datos.tipodocumento == "Pasaporte") {
        !/^(?!^0+$)[a-zA-Z0-9]{3,20}$/.test(
          this.usuario.datos.numerodocumento
        ) != false &&
          errors.push(
            "El Numero de Pasaporte debe poseer de 3 a 20 caracteres alfanumericos"
          );
      }
      if (this.usuario.datos.tipodocumento == "Carnet Extranjeria") {
        !/^[0-9]{9}$/.test(this.usuario.datos.numerodocumento) != false &&
          errors.push("El Numero de DNI debe poseer 9 digitos numericos");
      }
      return errors;
    },
    errorTipoDocumento() {
      const errors = [];
      if (!this.$v.usuario.datos.tipodocumento.$dirty) return errors;
      !this.$v.usuario.datos.tipodocumento.required &&
        errors.push("Debe seleccionar el Tipo de Documento Obligatoriamente");
      return errors;
    },
    errorFechaNacimiento() {
      const errors = [];
      if (!this.$v.usuario.datos.fechanacimiento.$dirty) return errors;
      !this.$v.usuario.datos.fechanacimiento.required &&
        errors.push("Debe Ingresar una Fecha de Nacimiento Obligatoriamente");
      //validating whether the user are an adult
      var dateselected = new Date(this.usuario.datos.fechanacimiento);
      var maxdate = new Date();
      maxdate.setFullYear(maxdate.getFullYear() - 18);
      !(dateselected.getTime() <= maxdate.getTime()) &&
        errors.push("El usuario debe ser mayor de edad");

      return errors;
    },
    errorEmail() {
      const errors = [];
      if (!this.$v.usuario.datos.email.$dirty) return errors;
      !this.$v.usuario.datos.email.required &&
        errors.push("Debe ingresar el email Obligatoriamente");
      !this.$v.usuario.datos.email.email &&
        errors.push("Debe ingresar el formato example@example.something");
      return errors;
    },
    errorDireccion() {
      const errors = [];
      if (!this.$v.usuario.datos.email.$dirty) return errors;
      !this.$v.usuario.datos.direccion.required &&
        errors.push("Debe ingresar una direccion Obligatoriamente");
      !this.$v.usuario.datos.direccion.minLength &&
        errors.push("La direccion debe tener al menos 10 caracteres");
      return errors;
    },
    errorRol() {
      const errors = [];
      if (!this.$v.usuario.rol.$dirty) return errors;
      !this.$v.usuario.rol.required &&
        errors.push("Debe seleccionar un Rol obligatoriamente");
      return errors;
    },
    errorEstado() {
      const errors = [];
      if (!this.$v.usuario.estado.$dirty) return errors;
      !this.$v.usuario.estado.required &&
        errors.push("Debe seleccionar un Estado obligatoriamente");
      return errors;
    },
    errorImagen() {
      return this.$v.usuario.datos.imagen.required == false &&
        this.$v.usuario.datos.imagen.$dirty == true
        ? true
        : false;
    },
  },
  validations() {
    return {
      usuario: {
        usuario: {
          required,
          minLength: minLength(4),
        },
        rol: {
          required,
        },
        estado: {
          required,
        },
        datos: {
          nombre: {
            required,
            minLength: minLength(3),
          },
          apellido: {
            required,
            minLength: minLength(3),
          },
          fechanacimiento: {
            required, //cumplio? false
          },
          tipodocumento: {
            required,
          },
          numerodocumento: {
            required,
          },
          email: {
            required,
            email,
          },
          direccion: {
            required,
            minLength: minLength(10),
          },
          fechanacimiento: {
            required,
          },
          direccion: {
            required,
            minLength: minLength(10),
          },
          imagen: {
            required,
          },
        },
      },
    };
  },
};
</script>
<style  scoped>
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