<template>
    <v-card>
      <v-card-title class="justify-center">{{titulo}}</v-card-title>
      <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step
        editable
        step="1"
      >
        Datos Generales
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step
        editable
        step="2"
      >
        Análisis y Diagnóstico
      </v-stepper-step>
    </v-stepper-header>
    <!-- fdsfs -->
    <v-stepper-items>
      <v-stepper-content step="1">
        <div class="container-user">
      <form>
        <v-autocomplete
                  v-model="informe.idresidente"             
                  :items="listaresidentes"
                  filled
                  chips
                  dense
                  outlined          
                  color="#009900"
                  label="Usuaria CAR"
                  item-text="nombre"
                  item-value="id"
                  @input="$v.informe.idresidente.$touch()"
                  @blur="$v.informe.idresidente.$touch()"
                  :error-messages="errorResidente"                            
                >
                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      style="margin-top:5px"
                    >
                      <v-avatar left color="#b3b3ff"  size="24">
                        <span style="font-size:12px">UE</span>
                      </v-avatar>
                        {{ data.item.nombre + " "+ data.item.apellido	}}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template>
                    <v-list-item-avatar>
                      <v-avatar left color="#b3b3ff"  size="24">
                        <span style="font-size:12px">US</span>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Nombre completo: {{ data.item.nombre }} {{data.item.apellido}} </v-list-item-title>
                      <v-list-item-subtitle>Nro. Documento: {{data.item.numerodocumento}}</v-list-item-subtitle>                    
                    </v-list-item-content>
                    </template>
                  </template>
        </v-autocomplete>
        <v-autocomplete
                  :items="listaeducadores"
                  filled
                  chips
                  dense
                  outlined
                  v-model="informe.creadordocumento"
                  color="#009900"
                  label="Educador responsable"
                  item-text="usuario"
                  item-value="rol"
                  @input="$v.informe.creadordocumento.$touch()"
                  @blur="$v.informe.creadordocumento.$touch()"
                  :error-messages="errorCreador"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      style="margin-top:5px"
                    >
                      <v-avatar left color="#b3b3ff" size="24">
                        <span style="font-size:12px">RT</span>
                      </v-avatar>
                      {{ data.item.datos.nombre }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template>
                      <v-list-item-avatar>
                        <v-avatar left color="#b3b3ff" size="24">
                          <span style="font-size:12px">UC</span>
                        </v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          >Nombre completo: {{ data.item.datos.nombre }}
                          {{ data.item.datos.apellido }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                          >Nro. Documento:
                          {{
                            data.item.datos.numerodocumento
                          }}</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </template>
                  </template>
        </v-autocomplete> 
        <v-text-field
          v-model="informe.contenido.iereinsersion.nombre"
          label="Instirución Educativa"
          outlined
          @input="$v.informe.contenido.iereinsersion.nombre.$touch()"
          @blur="$v.informe.contenido.iereinsersion.nombre.$touch()"
          :error-messages="errorNombreIE"
          color="#009900"
        ></v-text-field>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="informe.contenido.iereinsersion.modalidad"
              label="Modalidad"
              outlined
              @input="$v.informe.contenido.iereinsersion.modalidad.$touch()"
              @blur="$v.informe.contenido.iereinsersion.modalidad.$touch()"
              :error-messages="errorModalidadIE"
              color="#009900"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="informe.contenido.iereinsersion.nivel"
              label="Nivel Educativo"
              outlined
              @input="$v.informe.contenido.iereinsersion.nivel.$touch()"
              @blur="$v.informe.contenido.iereinsersion.nivel.$touch()"
              :error-messages="errorNivelIE"
              color="#009900"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="informe.contenido.iereinsersion.grado"
              label="Grado"
              outlined
              @input="$v.informe.contenido.iereinsersion.grado.$touch()"
              @blur="$v.informe.contenido.iereinsersion.grado.$touch()"
              :error-messages="errorGradoIE"
              color="#009900"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-textarea
          v-model="informe.contenido.antecedentes"        
          label="Antecedentes"
          auto-grow
          outlined
          @input="$v.informe.contenido.antecedentes.$touch()"
          @blur="$v.informe.contenido.antecedentes.$touch()"
          :error-messages="errorAntecedentes"
          rows="2"
          row-height="40"                    
          color="#009900"
          shaped
        ></v-textarea>
        <v-textarea
          v-model="informe.contenido.situacionactual"        
          label="Situación Educativa Actual"
          auto-grow
          outlined
          @input="$v.informe.contenido.situacionactual.$touch()"
          @blur="$v.informe.contenido.situacionactual.$touch()"
          :error-messages="errorSituacionEducativa"
          rows="2"
          row-height="40"                    
          color="#009900"
          shaped
        ></v-textarea>                
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
        <div  class="container-user">
          <form>
            <v-row>
              <v-col>
                <v-btn color="warning" block>
                      <v-icon left>mdi-briefcase-edit</v-icon>
                      <span>Actualizar Informe</span>
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
import axios from 'axios';
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState} from "vuex";
import { required, minLength,email,helpers } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
    props:["informe","titulo"],
    components: {
        vueDropzone: vue2Dropzone,
    },
    data () {
      return {                
        datemenu: false,
        step:1,
        dropzoneOptions: {
            url: "https://httpbin.org/post",
            thumbnailWidth: 250,
            maxFilesize: 3.0,
            maxFiles:1,
            acceptedFiles:".jpg",
            headers: { "My-Awesome-Header": "header value" },
            addRemoveLinks: true,
            dictDefaultMessage: "Seleccione una Imagen de su Dispositivo o Arrastrela Aqui",
        },
      }
    },
    methods:{
        cerrarDialogo(){
            //this.resetUsuarioValidationState();
            this.$emit("close-dialog-update");
        },
    },
    computed: {
      ...mapState(["informes"]),
      verifyColor(){
        return 'red';
      },
      errorNombreIE () {
        const errors = []
        if (!this.$v.informe.contenido.iereinsersion.nombre.$dirty) return errors
          !this.$v.informe.contenido.iereinsersion.nombre.required && errors.push('Debe ingresar el nombre de la Institución Educativa')
        return errors
      },errorModalidadIE(){
        const errors = []
        if (!this.$v.informe.contenido.iereinsersion.modalidad.$dirty) return errors
          !this.$v.informe.contenido.iereinsersion.modalidad.required && errors.push('Debe ingresar la modalidad')
        return errors
      },errorNivelIE(){
        const errors = []
        if (!this.$v.informe.contenido.iereinsersion.nivel.$dirty) return errors
          !this.$v.informe.contenido.iereinsersion.nivel.required && errors.push('Debe ingresar el nivel')
        return errors
      },errorGradoIE(){
        const errors = []
        if (!this.$v.informe.contenido.iereinsersion.grado.$dirty) return errors
          !this.$v.informe.contenido.iereinsersion.grado.required && errors.push('Debe ingresar el grado')
        return errors
      },errorAntecedentes(){
        const errors = []
        if (!this.$v.informe.contenido.antecedentes.$dirty) return errors
          !this.$v.informe.contenido.antecedentes.required && errors.push('Debe ingresar un antecedente')
        return errors
      },errorSituacionEducativa(){
        const errors = []
        if (!this.$v.informe.contenido.situacionactual.$dirty) return errors
          !this.$v.informe.contenido.situacionactual.required && errors.push('Debe ingresar la situación actual')
        return errors
      },
      errorResidente() {
        const errors = [];
        if (!this.$v.informe.idresidente.$dirty) return errors;
        !this.$v.informe.idresidente.required && errors.push("Debe seleccionar un residente obligatoriamente");
        return errors;
      },errorCreador(){
        const errors = [];
        if (!this.$v.informe.creadordocumento.$dirty) return errors;
        !this.$v.informe.creadordocumento.required && errors.push("Debe seleccionar un educador obligatoriamente");
      return errors;
      }
    },
    validations() {
    return {
        informe: {
            idresidente : {
              required
            },
            creadordocumento: {
              required
            },
           contenido: {
              antecedentes:{
                required
              },
              situacionactual: {
                required
              },
              logroalcanzado:{
                required
              },
              recomendaciones:{
                required
              },
              iereinsersion: {
                nombre:{
                  required
                },
                modalidad:{
                  required
                },
                nivel:{
                  required
                },
                grado:{
                  required
                }
              },
              firmas: [
                {
                  urlfirma: {
                    required
                  },
                }
              ]
          }
        }
    }
  }
}
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
.divider-custom{
  margin-top:7px;
  margin-bottom:7px
}

.inputTextField{
  border-color: green;
}
</style>