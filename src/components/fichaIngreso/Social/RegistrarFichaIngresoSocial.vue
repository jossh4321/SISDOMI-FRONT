<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Ficha de Ingreso Social</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">Residente y Familia</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2">Vivienda</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="3">Económico y Salud</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="4">Legal</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <!--Residente y Familiares-->
        <v-stepper-content step="1">
          <div class="container-user">
            <form style="margin-top: 10px;">
              <v-row>
                <v-col>
                  <v-autocomplete
                    :items="listaresidentes"
                    filled
                    chips
                    outlined
                    v-model="fichaIngreso.idresidente"
                    color="#009900"
                    label="Residente"
                    item-text="nombre"
                    item-value="residenteSeleccionado"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        style="margin-top:5px"
                      >
                        <v-avatar left color="#b3b3ff" size="24">
                          <span
                            style="font-size:12px"
                          >{{ data.item.nombre.charAt(0) }} {{ data.item.apellido.charAt(0) }}</span>
                        </v-avatar>
                        {{ data.item.nombre }} {{ data.item.apellido }}
                      </v-chip>
                    </template>

                    <template v-slot:item="data">
                      <v-list-item-avatar>
                        <v-avatar left color="#b3b3ff" size="24">
                          <span
                            style="font-size:12px"
                          >{{ data.item.nombre.charAt(0) }} {{ data.item.apellido.charAt(0) }}</span>
                        </v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>Nombre completo: {{ data.item.nombre }} {{data.item.apellido}}</v-list-item-title>
                        <v-list-item-subtitle>Nro. Documento: {{data.item.numerodocumento}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col>
                  <v-select
                    :items="itemFamilias"
                    v-model="itemFamilias.value"
                    label="Tipo de familia"
                    outlined
                  ></v-select>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Problemática familiar"
                    v-model.trim="fichaIngreso.contenido.familiar.problematicafam"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <v-text-field v-model="motivoIngreso" label="Motivo Ingreso" color="#009900"></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="agregarMotivoIngreso">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin:5px"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.familiar.motivoingreso"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <span>{{ item }}</span>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <div style="margin-right:20px">
                        <v-btn fab x-small dark color="red" @click="eliminarMotivoIngreso(index)">
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <!--Falta familiares del residente-->

              <v-row>
                <v-col>
                  <v-btn block @click="cerrarDialogo" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="step = 2" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="container-user">
            <form>
              <v-row>
                <v-col>
                  <v-textarea
                    label="Ubicación"
                    v-model.trim="fichaIngreso.contenido.vivienda.ubicacion"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Descripción Ubicación"
                    v-model.trim="fichaIngreso.contenido.vivienda.descripcionubicacion"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Habitaciones disponibles"
                    v-model.trim="fichaIngreso.contenido.vivienda.habitacionesdormir"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Tipo propiedad"
                    v-model.trim="fichaIngreso.contenido.vivienda.tipopropiedad"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Tipo de vivienda"
                    v-model.trim="fichaIngreso.contenido.vivienda.tipo"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Material de la vivienda"
                    v-model.trim="fichaIngreso.contenido.vivienda.material"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Tipo del piso"
                    v-model.trim="fichaIngreso.contenido.vivienda.tipopiso"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Tipo del techo"
                    v-model.trim="fichaIngreso.contenido.vivienda.tipotecho"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <v-text-field
                        v-model="habitante"
                        label="Habitante de la vivienda"
                        color="#009900"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="agregarHabitante">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin:5px"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.vivienda.habitantes"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10" align="left">
                      <span>{{ item }}</span>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <div style="margin-right:20px">
                        <v-btn fab x-small dark color="red" @click="eliminarHabitante(index)">
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-card style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA">
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="4" align="left">
                      <v-text-field
                        v-model.trim="servicio.servicio"
                        label="Servicio"
                        color="#009900"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="left">
                      <v-text-field v-model.trim="servicio.tipo" label="Tipo" color="#009900"></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="agregarServicio">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.vivienda.servicios"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10">
                      <span style="font-size:18px">{{ item.servicio }} - {{ item.tipo }}</span>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <div style="margin-right:20px">
                        <v-btn fab x-small dark color="red" @click="eliminarServicio(index)">
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-row>
                <v-col>
                  <v-btn block @click="cerrarDialogo" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="step = 3" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div class="container-user">
            <form>
              <v-row>
                <v-col>
                  <v-textarea
                    label="Condición laboral"
                    v-model.trim="fichaIngreso.contenido.economico.condicionlaboral"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Ocupación"
                    v-model.trim="fichaIngreso.contenido.economico.ocupacion"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Observacion"
                    v-model.trim="fichaIngreso.contenido.economico.observacion"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Salud"
                    v-model.trim="fichaIngreso.contenido.salud"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <v-text-field v-model.trim="ingreso" label="Ingresos" color="#009900"></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="agregarIngreso">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin:5px"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.economico.ingresos"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <span>{{ item }}</span>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <div style="margin-right:20px">
                        <v-btn fab x-small dark color="red" @click="eliminarIngreso(index)">
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <v-text-field v-model.trim="egreso" label="Egresos" color="#009900"></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="agregarEgreso">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin:5px"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.economico.egresos"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <span>{{ item }}</span>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <div style="margin-right:20px">
                        <v-btn fab x-small dark color="red" @click="eliminarEgreso(index)">
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-row>
                <v-col>
                  <v-btn block @click="cerrarDialogo" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="step = 4" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>

        <v-stepper-content step="4">
          <div class="container-user">
            <form style="margin-top: 10px;">
              <v-textarea
                label="Recibe o recibio apoyo de redes locales"
                v-model.trim="fichaIngreso.contenido.legal.apoyolocal"
                outlined
                color="#009900"
                rows="1"
                auto-grow
              ></v-textarea>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Diagnóstico Social"
                    v-model.trim="fichaIngreso.contenido.diagnosticosocial"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    shaped
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Plan de intervención"
                    v-model.trim="fichaIngreso.contenido.planintervencion"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    shaped
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA">
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                >
                  Antecedentes penales en familares del residente
                </v-chip>
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="4" align="left">
                      <v-text-field v-model.trim="penal.familiar" label="Familiar" color="#009900"></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="left">
                      <v-text-field v-model.trim="penal.motivo" label="Motivo" color="#009900"></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="agregarPenal">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.legal.penales"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10">
                      <span style="font-size:18px">{{ item.familiar }} - {{ item.motivo }}</span>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <div style="margin-right:20px">
                        <v-btn fab x-small dark color="red" @click="eliminarPenal(index)">
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-card style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA">
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                >
                  Firmas de encargados
                </v-chip>
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="4" align="left">
                      <v-text-field
                        v-model="firmas.nombre"
                        label="Nombre"
                        color="#009900"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="left">
                      <v-text-field
                        v-model="firmas.cargo"
                        label="Cargo"
                        color="#009900"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="agregarFirma">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
                <v-row>
                  <v-col :cols="12" align="right">
                    <div>
                      <vue-dropzone
                        ref="myVueDropzone"
                        @vdropzone-success="afterSuccess2"
                        @vdropzone-removed-file="afterRemoved2"
                        id="dropzone2"
                        :options="dropzoneOptions2"
                      ></vue-dropzone>
                    </div>
                    <!-- <v-card v-if="errorUrlFirma" color="red">
                      <v-card-text class="text-center" style="color: white">
                        Debe Subir una imagen de la firma
                        obligatoriamente
                      </v-card-text>
                    </v-card> -->
                    <v-divider class="divider-custom"></v-divider>
                  </v-col>
                </v-row>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.firmas"
                  :key="index"
                  >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8">
                      <article>
                        <img
                          style="margin-right:5px;width:6% "
                          src="https://www.flaticon.es/svg/static/icons/svg/996/996443.svg"
                          alt="imagen usuario"
                        />
                        <span style="font-size:18px">{{ item.nombre }} {{ item.cargo }}</span>
                      </article>
                    </v-col>
                    <v-col :cols="2" align="center">
                      <template>
                        <v-btn fab icon x-small dark color="#EAEAEA" @click="verFirma(index)">
                          <img
                            style="width:25% "
                            src="https://www.flaticon.es/svg/static/icons/svg/1/1180.svg"
                            alt="firma"
                          />
                        </v-btn>
                      </template>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <div style="margin-right:20px">
                        <v-btn fab x-small dark color="red" @click="eliminarFirma(index)">
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-dialog
                  v-model="dialogVistaPreviaFirma"
                  persistent
                  max-width="600px"
                >
                  <v-card align="center">
                    <v-card-title>
                      <span class="headline">Vista previa</span>
                    </v-card-title>
                    <v-card-text>
                      <img
                        width="100%"
                        height="100%"
                        :src="'data:image/jpeg;base64,' + imagen"
                        alt=""
                      />
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cerrarVistaPreviaFirma()"
                      >
                        Cerrar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-row>
                  <v-col>
                    <v-btn block @click="cerrarDialogo" color="primary">
                      <v-icon left>mdi-close-outline</v-icon>
                      <span>Cerrar</span>
                    </v-btn>
                  </v-col>

                  <v-col>
                    <v-btn block @click="registrarFichaIngresoSocial" color="success">
                      <v-icon left>mdi-content-save-all-outline</v-icon>
                      <span>Registrar Informe</span>
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
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";

export default {
  props: ["listaresidentes", "visible", "listaeducadores"],
  ...mapMutations(["setFichaIngreso", "addFichaIngreso"]),
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      itemFamilias: [
        { value: "1", text: "Nuclear" },
        { value: "2", text: "Extensa" },
        { value: "3", text: "Monoparental" },
        { value: "4", text: "Homoparental" },
        { value: "5", text: "Desintegrada" },
        { value: "6", text: "Reconstruida" },
        { value: "7", text: "Acogida" }
      ],

      dialogVistaPreviaFirma: false,
      dialogoVistaFamiliares: false,
      datemenu: false,
      step: 1,

      dropzoneOptions2: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 5.0,
        maxFiles: 1,
        acceptedFiles: ".png",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione la imagen de la firma su dispositivo o arrástrela aquí",
      },

      motivoIngreso: "",
      motivosIngreso: [],

      familiar: "",
      familiares: {
        nombreCompleto: "",
        parentezco: "",
        edad: "",
        estadoCivil: "",
        gradoInstruccion: "",
        ocupacion: "",
        observacion: ""
      },

      habitante: "",
      habitantes: [],

      servicio: { servicio: "", tipo: "" },
      servicios: [],

      ingreso: "",
      ingresos: [],

      egreso: "",
      egresos: [],

      penal: { familiar: "", motivo: "" },
      penales: [],

      urlfirma: "",
      firmas: { urlfirma: "", nombre: "", cargo: "" },

      fichaIngreso: {
        id: "",
        tipo: "FichaSocialIngreso",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: new Date(),
        area: "social",
        fase: "acogida",
        idresidente: "",
        estado: "creado",
        contenido: {
          familiar: {
            motivoingreso: [],
            familiares: [],
            tipofamilia: "",
            problematicafam: ""
          },
          vivienda: {
            ubicacion: "",
            descripcionubicacion: "",
            habitantes: [],
            habitacionesdormir: "",
            tipopropiedad: "",
            tipo: "",
            material: "",
            tipopiso: "",
            tipotecho: "",
            servicios: []
          },
          economico: {
            condicionlaboral: "",
            ocupacion: "",
            ingresos: [],
            egresos: [],
            observacion: ""
          },
          salud: "",
          legal: {
            penales: [],
            apoyolocal: ""
          },
          diagnosticosocial: "",
          planintervencion: "",
          firmas: [],
          codigodocumento: ""
        }
      },
      imagen: ""
    };
  },

  methods: {
    cerrarDialogo() {
      this.step = 1;
      this.$emit("cerrar-modal-registro-ficha-ingreso");
      this.limpiarFichaIngreso();
      this.limpiarCampos();
      //limpiar los campos que contienen los datos acumulados
    },
    async registrarFichaIngresoSocial() {
      console.log(this.fichaIngreso);
    },
    agregarMotivoIngreso() {
      let motivoIngresoR = this.motivoIngreso;
      this.fichaIngreso.contenido.familiar.motivoingreso.push(motivoIngresoR);
      this.motivoIngreso = "";
    },
    eliminarMotivoIngreso(index) {
      this.fichaIngreso.contenido.familiar.motivoingreso.splice(index, 1);
    },
    agregarServicio() {
      let servicioV = {
        servicio: this.servicio.servicio,
        tipo: this.servicio.tipo
      };

      this.fichaIngreso.contenido.vivienda.servicios.push(servicioV);

      this.servicio.servicio = "";
      this.servicio.tipo = "";
    },
    eliminarServicio(index) {
      this.fichaIngreso.contenido.vivienda.servicios.splice(index, 1);
    },
    agregarHabitante() {
      let habitanteR = this.habitante;
      this.fichaIngreso.contenido.vivienda.habitantes.push(habitanteR);
      this.habitante = "";
    },
    eliminarHabitante(index) {
      this.fichaIngreso.contenido.vivienda.habitantes.splice(index, 1);
    },
    agregarIngreso() {
      let ingresoR = this.ingreso;
      this.fichaIngreso.contenido.economico.ingresos.push(ingresoR);
      this.ingreso = "";
    },
    eliminarIngreso(index) {
      this.fichaIngreso.contenido.economico.ingresos.splice(index, 1);
    },
    agregarEgreso() {
      let egresoR = this.egreso;
      this.fichaIngreso.contenido.economico.egresos.push(egresoR);
      this.egreso = "";
    },
    eliminarEgreso(index) {
      this.fichaIngreso.contenido.economico.egresos.splice(index, 1);
    },
    agregarPenal() {
      let penalV = {
        familiar: this.penal.familiar,
        motivo: this.penal.motivo
      };

      this.fichaIngreso.contenido.legal.penales.push(penalV);

      this.penal.familiar = "";
      this.penal.motivo = "";
    },
    eliminarPenal(index) {
      this.fichaIngreso.contenido.legal.penales.splice(index, 1);
    },
    agregarFirma() {
      //this.$v.firmas.$touch();
      //this.$v.urlfirma.$touch();

      //if (!this.$v.firmas.$invalid && !this.$v.urlfirma.$invalid) {
        let firmas = {
          urlfirma: this.urlfirma,
          nombre: this.firmas.nombre,
          cargo: this.firmas.cargo,
        };
        this.fichaIngreso.contenido.firmas.push(firmas);
        this.$refs.myVueDropzone.removeAllFiles();

        this.urlfirma = "";
        this.firmas.nombre = "";
        this.firmas.cargo = "";
        //this.$v.firmas.$reset();
        //this.$v.urlfirma.$reset();
      //}
    },
    eliminarFirma(index) {
      this.fichaIngreso.contenido.firmas.splice(index, 1);
    },
    verFirma(index) {
      this.imagen = this.fichaIngreso.contenido.firmas[index].urlfirma;
      this.dialogVistaPreviaFirma = true;
    },
    cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
    afterSuccess2(file, response) {
      this.urlfirma = file.dataURL.split(",")[1];
    },
    afterRemoved2(file, error, xhr) {
      this.urlfirma = "";
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer
      });
    },

    limpiarFichaIngreso() {
      this.fichaIngreso = {
        id: "",
        tipo: "FichaSocialIngreso",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: new Date(),
        area: "social",
        fase: "acogida",
        idresidente: "",
        estado: "creado",
        contenido: {
          familiar: {
            motivoingreso: [],
            familiares: [],
            tipofamilia: "",
            problematicafam: ""
          },
          vivienda: {
            ubicacion: "",
            descripcionubicacion: "",
            habitantes: [],
            habitacionesdormir: "",
            tipopropiedad: "",
            tipo: "",
            material: "",
            tipopiso: "",
            tipotecho: "",
            servicios: []
          },
          economico: {
            condicionlaboral: "",
            ocupacion: "",
            ingresos: [],
            egresos: [],
            observacion: ""
          },
          salud: "",
          legal: {
            penales: [],
            apoyolocal: ""
          },
          diagnosticosocial: "",
          planintervencion: "",
          firmas: [],
          codigodocumento: ""
        }
      };
    },
    limpiarCampos() {
      this.motivosIngreso = "";
      this.motivoIngreso = "";
      this.habitantes = "";
      this.habitante = "";
      this.ingresos = "";
      this.ingreso = "";
      this.egresos = "";
      this.egreso = "";
    }
  },

  computed: {}
};
</script>

<style scoped>
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
</style>