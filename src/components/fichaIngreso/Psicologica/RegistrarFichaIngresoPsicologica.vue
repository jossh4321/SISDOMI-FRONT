<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Ficha de Ingreso Psicológica</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">Entorno</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2">Desventajas</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="3">Adicciones</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="4">Datos sexuales</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="5">Actividades y firmas</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form>
              <v-autocomplete
                :items="listaresidentes"
                filled
                chips
                outlined
                v-model="fichaIngreso.idresidente"
                color="#009900"
                label="Residente"
                item-text="nombre"
                item-value="id"
              >
                <!-- @input="$v.fichaIngreso.idresidente.$touch()"
                @blur="$v.fichaIngreso.idresidente.$touch()"
                :error-messages="errorResidente"-->
                <template v-slot:selection="data">
                  <v-chip v-bind="data.attrs" :input-value="data.selected" style="margin-top:5px">
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

              <v-autocomplete
                :items="listaeducadores"
                filled
                chips
                outlined
                v-model="fichaIngreso.contenido.responsableturno"
                color="#009900"
                label="Responsable de turno"
                item-text="usuario"
                item-value="id"
              >
              <!-- @input="$v.seguimiento.creadordocumento.$touch()"
                @blur="$v.seguimiento.creadordocumento.$touch()"
                :error-messages="errorEducador" -->
                <template v-slot:selection="data">
                  <v-chip v-bind="data.attrs" :input-value="data.selected" style="margin-top:5px">
                    <v-avatar left color="#b3b3ff" size="24">
                      <span style="font-size:12px">{{ data.item.datos.nombre.charAt(0) }} {{ data.item.datos.apellido.charAt(0) }}</span>
                    </v-avatar>
                    {{ data.item.datos.nombre + " " + data.item.datos.apellido }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <v-avatar left color="#b3b3ff" size="24">
                        <span style="font-size:12px">{{ data.item.datos.nombre.charAt(0) }} {{ data.item.datos.apellido.charAt(0) }}</span>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        Nombre completo: {{ data.item.datos.nombre }}
                        {{ data.item.datos.apellido }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Nro. Documento:
                        {{
                        data.item.datos.numerodocumento
                        }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Nivel de educación"
                    v-model="fichaIngreso.contenido.escolaridad.niveleducativo"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                    @input="$v.familiar.parentesco.$touch()"
                    @blur="$v.familiar.parentesco.$touch()"
                  :error-messages="errorParentescoFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="Educación especial"
                    v-model="fichaIngreso.contenido.escolaridad.educacionespecial"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                    @input="$v.familiar.gradoinstruccion.$touch()"
                    @blur="$v.familiar.gradoinstruccion.$touch()"
                  :error-messages="errorGradoInstruccionFamiliar"-->
                </v-col>
              </v-row>

              <v-card
                style="margin-top:30px;padding:5px 5px;padding-bottom:15px;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="4" align="left">
                      <v-text-field
                        v-model.trim="edadgradoescolar.edad"
                        label="Edad"
                        color="#009900"
                      ></v-text-field>
                      <!-- @input="$v.servicio.servicio.$touch()"
                        @blur="$v.servicio.servicio.$touch()"
                      :error-messages="errorTextoservicio"-->
                    </v-col>
                    <v-col :cols="4" align="left">
                      <v-text-field
                        v-model.trim="edadgradoescolar.gradoescolar"
                        label="Grado escolar"
                        color="#009900"
                      ></v-text-field>
                      <!-- @input="$v.servicio.tipo.$touch()"
                        @blur="$v.servicio.tipo.$touch()"
                      :error-messages="errorTextoserviciotipo"-->
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="agregaredadgradoescolar">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px; margin-top: 20px;"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.escolaridad.edadgradoescolar"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10">
                      <span
                        style="font-size:18px"
                      >Edad: {{ item.edad }} - Grado escolar: {{ item.gradoescolar }}</span>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <div style="margin-right:20px">
                        <v-btn
                          fab
                          x-small
                          dark
                          color="red"
                          @click="eliminaredadgradoescolar(index)"
                        >
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-card style="padding:5px;margin:40px 0 18px 0;background-color:#EAEAEA">
                <v-card-title>
                  <v-row>
                    <v-col :cols="8">Padres del residente</v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="modalRegistrarPadres()">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                      <v-dialog v-model="dialogAgregarpadre" persistent max-width="600px">
                        <v-card align="center">
                          <v-card-title>
                            <span class="headline">Datos de los padres</span>
                          </v-card-title>
                          <v-card-text>
                            <v-textarea
                              label="Nombres"
                              v-model="padre.nombre"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                            ></v-textarea>
                            <!-- :readonly="isDisabled"
                                @input="$v.familiar.nombre.$touch()"
                                @blur="$v.familiar.nombre.$touch()"
                            :error-messages="errorNombreFamiliar"-->
                            <v-textarea
                              label="Apellidos"
                              v-model="padre.apellidos"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                            ></v-textarea>
                            <!-- :readonly="isDisabled"
                                @input="$v.familiar.apellido.$touch()"
                                @blur="$v.familiar.apellido.$touch()"
                            :error-messages="errorApellidoFamiliar"-->
                            <v-row>
                              <v-col>
                                <v-textarea
                                  label="Parentesco con la residente"
                                  v-model="padre.parentesco"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                ></v-textarea>
                                <!-- :readonly="isDisabled"
                                  @input="$v.familiar.numerodocumento.$touch()"
                                  @blur="$v.familiar.numerodocumento.$touch()"
                                :error-messages="errorNumeroDocumentoFamiliar"-->
                              </v-col>
                              <v-col>
                                <v-textarea
                                  label="Instrucción"
                                  v-model="padre.instruccion"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                ></v-textarea>
                                <!-- :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
                                :error-messages="errorEdadFamiliar"-->
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-textarea
                                  label="Estado de salud"
                                  v-model="padre.estadosalud"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                ></v-textarea>
                                <!-- :readonly="isDisabled"
                                    @input="$v.familiar.parentesco.$touch()"
                                    @blur="$v.familiar.parentesco.$touch()"
                                :error-messages="errorParentescoFamiliar"-->
                              </v-col>
                              <v-col>
                                <v-textarea
                                  label="Relación con la residente"
                                  v-model="padre.relacion"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                ></v-textarea>
                                <!-- :readonly="isDisabled"
                                    @input="$v.familiar.gradoinstruccion.$touch()"
                                    @blur="$v.familiar.gradoinstruccion.$touch()"
                                :error-messages="errorGradoInstruccionFamiliar"-->
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              v-if="accion == 'registrar'"
                              color="success"
                              @click="agregarPadre()"
                            >
                              <v-icon left class="mr-0 icon-plan">mdi-check</v-icon>Agregar
                            </v-btn>
                            <v-btn
                              v-if="accion == 'actualizar'"
                              color="yellow"
                              @click="actualizarPadre(indice)"
                            >
                              <v-icon left class="mr-0 icon-plan">mdi-pencil</v-icon>Actualizar
                            </v-btn>
                            <v-btn color="error" @click="cerrarAgregarPadre()">
                              <v-icon left class="mr-0 icon-plan">mdi-close</v-icon>Cerrar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-card-text style="background-color:#FAFAFA">
                  <v-row>
                    <v-col>
                      <h3>Nombre</h3>
                    </v-col>
                    <v-col>
                      <h3>Parentesco</h3>
                    </v-col>
                    <v-col>
                      <h3>Acciones</h3>
                    </v-col>
                  </v-row>
                  <div v-for="(item, index) in fichaIngreso.contenido.padres" :key="index">
                    <v-row>
                      <v-col>{{ item.nombre }} {{ item.apellidos }}</v-col>
                      <v-col>{{ item.parentesco }}</v-col>
                      <v-col>
                        <v-row style="padding:0;margin:0">
                          <v-col style="padding:0;margin:0">
                            <v-btn
                              fab
                              x-small
                              dark
                              color="yellow"
                              @click="modalActualizarPadre(index)"
                            >
                              <v-icon dark>mdi-pen</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col style="padding:0;margin:0">
                            <v-btn
                              fab
                              x-small
                              dark
                              color="blue"
                              @click="modalConsultarPadre(index)"
                            >
                              <v-icon dark>mdi-eye</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col style="padding:0;margin:0">
                            <v-btn fab x-small dark color="red" @click="eliminarPadre(index)">
                              <v-icon dark>mdi-minus</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>
              <!-- <div>
                <h4
                  v-if="$v.fichaIngreso.contenido.padres.$error"
                  class="red--text"
                >Debe registrar como mínimo un padre y como máximo 2 padres</h4>
              </div>-->

              <v-card style="padding:5px;margin:40px 0 18px 0;background-color:#EAEAEA">
                <v-card-title>
                  <v-row>
                    <v-col :cols="8">Hermanos del residente</v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="modalRegistrarhermano()">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                      <v-dialog v-model="dialogAgregarhermano" persistent max-width="600px">
                        <v-card align="center">
                          <v-card-title>
                            <span class="headline">Datos de los hermanos</span>
                          </v-card-title>
                          <v-card-text>
                            <v-textarea
                              label="Nombres y Apellidos"
                              v-model="hermano.nombre"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                            ></v-textarea>
                            <!-- :readonly="isDisabled"
                                @input="$v.familiar.nombre.$touch()"
                                @blur="$v.familiar.nombre.$touch()"
                            :error-messages="errorNombreFamiliar"-->
                            <v-textarea
                              label="Edad"
                              v-model="hermano.edad"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                            ></v-textarea>
                            <!-- :readonly="isDisabled"
                                @input="$v.familiar.apellido.$touch()"
                                @blur="$v.familiar.apellido.$touch()"
                            :error-messages="errorApellidoFamiliar"-->

                            <v-textarea
                              label="Actividad"
                              v-model="hermano.actividad"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                            ></v-textarea>
                            <!-- :readonly="isDisabled"
                                  @input="$v.familiar.numerodocumento.$touch()"
                                  @blur="$v.familiar.numerodocumento.$touch()"
                            :error-messages="errorNumeroDocumentoFamiliar"-->
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              v-if="accionHermano == 'registrar'"
                              color="success"
                              @click="agregarhermano()"
                            >
                              <v-icon left class="mr-0 icon-plan">mdi-check</v-icon>Agregar
                            </v-btn>
                            <v-btn
                              v-if="accionHermano == 'actualizar'"
                              color="yellow"
                              @click="actualizarhermano(indice)"
                            >
                              <v-icon left class="mr-0 icon-plan">mdi-pencil</v-icon>Actualizar
                            </v-btn>
                            <v-btn color="error" @click="cerrarAgregarhermano()">
                              <v-icon left class="mr-0 icon-plan">mdi-close</v-icon>Cerrar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-card-text style="background-color:#FAFAFA">
                  <v-row>
                    <v-col>
                      <h3>Nombre</h3>
                    </v-col>
                    <v-col>
                      <h3>Edad</h3>
                    </v-col>
                    <v-col>
                      <h3>Acciones</h3>
                    </v-col>
                  </v-row>
                  <div v-for="(item, index) in fichaIngreso.contenido.hermanos" :key="index">
                    <v-row>
                      <v-col>{{ item.nombre }}</v-col>
                      <v-col>{{ item.edad }}</v-col>
                      <v-col>
                        <v-row style="padding:0;margin:0">
                          <v-col style="padding:0;margin:0">
                            <v-btn
                              fab
                              x-small
                              dark
                              color="yellow"
                              @click="modalActualizarhermano(index)"
                            >
                              <v-icon dark>mdi-pen</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col style="padding:0;margin:0">
                            <v-btn
                              fab
                              x-small
                              dark
                              color="blue"
                              @click="modalConsultarhermano(index)"
                            >
                              <v-icon dark>mdi-eye</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col style="padding:0;margin:0">
                            <v-btn fab x-small dark color="red" @click="eliminarhermano(index)">
                              <v-icon dark>mdi-minus</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>
              <!-- <div>
                <h4
                  v-if="$v.fichaIngreso.contenido.padres.$error"
                  class="red--text"
                >Debe registrar como mínimo un padre y como máximo 2 padres</h4>
              </div>-->

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
                    label="Discapacidad intelectual"
                    v-model="fichaIngreso.contenido.discapacidad.intelectual"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                  @input="$v.familiar.numerodocumento.$touch()"
                                  @blur="$v.familiar.numerodocumento.$touch()"
                  :error-messages="errorNumeroDocumentoFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="Discapacidad física"
                    v-model="fichaIngreso.contenido.discapacidad.fisico"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
                  :error-messages="errorEdadFamiliar"-->
                </v-col>
              </v-row>

              <v-textarea
                label="Discapacidad sensorial"
                v-model="fichaIngreso.contenido.discapacidad.sensorial"
                outlined
                color="#009900"
                rows="1"
                auto-grow
              ></v-textarea>
              <!-- :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
              :error-messages="errorEdadFamiliar"-->

              <v-row>
                <v-col>
                  <v-textarea
                    label="Edad cuando tuvo abuso sexual"
                    v-model="fichaIngreso.contenido.abusosexual.edad"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.parentesco.$touch()"
                                    @blur="$v.familiar.parentesco.$touch()"
                  :error-messages="errorParentescoFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="Veces que tuvo abuso sexual"
                    v-model="fichaIngreso.contenido.abusosexual.veces"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.gradoinstruccion.$touch()"
                                    @blur="$v.familiar.gradoinstruccion.$touch()"
                  :error-messages="errorGradoInstruccionFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="¿Recibio atención psicológica?"
                    v-model="fichaIngreso.contenido.abusosexual.atencionpsicologica"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>

                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.gradoinstruccion.$touch()"
                                    @blur="$v.familiar.gradoinstruccion.$touch()"
                  :error-messages="errorGradoInstruccionFamiliar"-->
                </v-col>
              </v-row>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom: 15px;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <v-text-field v-model="enfermedad" label="Enfermedad" color="#009900"></v-text-field>
                      <!-- @input="$v.motivoIngreso.$touch()"
                        @blur="$v.motivoIngreso.$touch()"
                      :error-messages="errorTextomotivoingreso"-->
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="agregarenfermedad">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin:5px; margin-top: 20px;"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.discapacidad.enfermedad"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <span>Enfermedad: {{ item }}</span>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <div style="margin-right:20px">
                        <v-btn fab x-small dark color="red" @click="eliminarenfermedad(index)">
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>
              <!-- <div>
                <h4
                  v-if="$v.fichaIngreso.contenido.familiar.motivoingreso.$error"
                  class="red--text"
                >Debe tener como mínimo un motivo de ingreso registrado</h4>
              </div>-->

              <v-card
                style="margin-top:30px;padding:5px 5px;padding-bottom:15px;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="4" align="left">
                      <v-text-field
                        v-model.trim="maltrato.tipomaltrato"
                        label="Tipo de maltrato"
                        color="#009900"
                      ></v-text-field>
                      <!-- @input="$v.servicio.servicio.$touch()"
                        @blur="$v.servicio.servicio.$touch()"
                      :error-messages="errorTextoservicio"-->
                    </v-col>
                    <v-col :cols="4" align="left">
                      <v-text-field v-model.trim="maltrato.agresor" label="Agresor" color="#009900"></v-text-field>
                      <!-- @input="$v.servicio.tipo.$touch()"
                        @blur="$v.servicio.tipo.$touch()"
                      :error-messages="errorTextoserviciotipo"-->
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="agregarmaltrato">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px; margin-top: 20px;"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.maltrato"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10">
                      <span
                        style="font-size:18px"
                      >Tipo maltrato: {{ item.tipomaltrato }} - Agresor: {{ item.agresor }}</span>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <div style="margin-right:20px">
                        <v-btn fab x-small dark color="red" @click="eliminarmaltrato(index)">
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>
              <!-- <div>
                <h4
                  v-if="$v.fichaIngreso.contenido.vivienda.servicios.$error"
                  class="red--text"
                >Debe tener como mínimo un servicio registrado</h4>
              </div>-->

              <!-- <v-expansion-panels 
                popout
                shaped
                >
                    <v-expansion-panel>
                        <v-expansion-panel-header>Observaciones del Residente</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-textarea
                                label="Observación 1"
                                auto-grow
                                outlined         
                                color="#009900"
                                shaped
                            ></v-textarea>
                            <v-btn 
                            depressed
                            color= rgba(0,0,0,0.2)
                            >
                                <span>Agregar Observación</span>
                            </v-btn>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
              </v-expansion-panels>-->
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
                    label="¿Fue adicto alguna vez?"
                    v-model="fichaIngreso.contenido.adicciones.consumo"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                  @input="$v.familiar.numerodocumento.$touch()"
                                  @blur="$v.familiar.numerodocumento.$touch()"
                  :error-messages="errorNumeroDocumentoFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="Último dia de consumo"
                    v-model="fichaIngreso.contenido.adicciones.ultimodiaconsumo"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
                  :error-messages="errorEdadFamiliar"-->
                </v-col>
              </v-row>

              <v-card
                style="margin-top:30px;padding:5px 5px;padding-bottom:15px;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="3" align="left">
                      <v-text-field
                        v-model.trim="spa.tipospa"
                        label="Tipo de adicción"
                        color="#009900"
                      ></v-text-field>
                      <!-- @input="$v.servicio.servicio.$touch()"
                        @blur="$v.servicio.servicio.$touch()"
                      :error-messages="errorTextoservicio"-->
                    </v-col>
                    <v-col :cols="3" align="left">
                      <v-text-field
                        v-model.trim="spa.tiempoconsumo"
                        label="Tiempo de consumo"
                        color="#009900"
                      ></v-text-field>
                      <!-- @input="$v.servicio.tipo.$touch()"
                        @blur="$v.servicio.tipo.$touch()"
                      :error-messages="errorTextoserviciotipo"-->
                    </v-col>
                    <v-col :cols="3" align="left">
                      <v-text-field
                        v-model.trim="spa.frecuencia"
                        label="Frecuencia de consumo"
                        color="#009900"
                      ></v-text-field>
                      <!-- @input="$v.servicio.tipo.$touch()"
                        @blur="$v.servicio.tipo.$touch()"
                      :error-messages="errorTextoserviciotipo"-->
                    </v-col>
                    <v-col :cols="3" align="right">
                      <v-btn fab small dark color="green" @click="agregarspa">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px; margin-top: 20px;"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.adicciones.spa"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10">
                      <span
                        style="font-size:18px"
                      >Tipo: {{ item.tipospa }} - Tiempo: {{ item.tiempoconsumo }} - Frecuencia: {{ item.frecuencia }}</span>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <div style="margin-right:20px">
                        <v-btn fab x-small dark color="red" @click="eliminarspa(index)">
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-card
                style="margin-top:30px;padding:5px 5px;padding-bottom:15px;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="5" align="left">
                      <v-text-field
                        v-model.trim="conductasriesgo.conducta"
                        label="Riesgo de conducta"
                        color="#009900"
                      ></v-text-field>
                      <!-- @input="$v.servicio.servicio.$touch()"
                        @blur="$v.servicio.servicio.$touch()"
                      :error-messages="errorTextoservicio"-->
                    </v-col>
                    <v-col :cols="5" align="left">
                      <v-text-field
                        v-model.trim="conductasriesgo.observacion"
                        label="Observación de la conducta"
                        color="#009900"
                      ></v-text-field>
                      <!-- @input="$v.servicio.tipo.$touch()"
                        @blur="$v.servicio.tipo.$touch()"
                      :error-messages="errorTextoserviciotipo"-->
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-btn fab small dark color="green" @click="agregarconductasriesgo">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px; margin-top: 20px;"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.conductasriesgo"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10">
                      <span
                        style="font-size:18px"
                      >Conducta: {{ item.conducta }} - Obs: {{ item.observacion }}</span>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <div style="margin-right:20px">
                        <v-btn fab x-small dark color="red" @click="eliminarconductasriesgo(index)">
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-card
                style="margin-top:30px;padding:5px 5px;padding-bottom:15px;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="5" align="left">
                      <v-text-field
                        v-model.trim="conductasemocionales.indicador"
                        label="Indicador de conducta"
                        color="#009900"
                      ></v-text-field>
                      <!-- @input="$v.servicio.servicio.$touch()"
                        @blur="$v.servicio.servicio.$touch()"
                      :error-messages="errorTextoservicio"-->
                    </v-col>
                    <v-col :cols="5" align="left">
                      <v-text-field
                        v-model.trim="conductasemocionales.observacion"
                        label="Observación de la conducta"
                        color="#009900"
                      ></v-text-field>
                      <!-- @input="$v.servicio.tipo.$touch()"
                        @blur="$v.servicio.tipo.$touch()"
                      :error-messages="errorTextoserviciotipo"-->
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-btn fab small dark color="green" @click="agregarconductasemocionales">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px; margin-top: 20px;"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.conductasemocionales"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10">
                      <span
                        style="font-size:18px"
                      >Indicador: {{ item.indicador }} - Obs: {{ item.observacion }}</span>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <div style="margin-right:20px">
                        <v-btn
                          fab
                          x-small
                          dark
                          color="red"
                          @click="eliminarconductasemocionales(index)"
                        >
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
            <form>
              <v-row>
                <v-col>
                  <v-textarea
                    label="¿Tiene menstruación?"
                    v-model="fichaIngreso.contenido.desarrollosexual.menstruacion"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                  @input="$v.familiar.numerodocumento.$touch()"
                                  @blur="$v.familiar.numerodocumento.$touch()"
                  :error-messages="errorNumeroDocumentoFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="Menarquía"
                    v-model="fichaIngreso.contenido.desarrollosexual.menarquia"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
                  :error-messages="errorEdadFamiliar"-->
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="¿Tuvo relaciones sexuales?"
                    v-model="fichaIngreso.contenido.desarrollosexual.relaciones.iniciorelaciones"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                  @input="$v.familiar.numerodocumento.$touch()"
                                  @blur="$v.familiar.numerodocumento.$touch()"
                  :error-messages="errorNumeroDocumentoFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="Edad inicio de relaciones"
                    v-model="fichaIngreso.contenido.desarrollosexual.relaciones.edadinicio"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
                  :error-messages="errorEdadFamiliar"-->
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Motivo de las relaciones"
                    v-model="fichaIngreso.contenido.desarrollosexual.relaciones.motivo"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                  @input="$v.familiar.numerodocumento.$touch()"
                                  @blur="$v.familiar.numerodocumento.$touch()"
                  :error-messages="errorNumeroDocumentoFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="Genero de la pareja"
                    v-model="fichaIngreso.contenido.desarrollosexual.relaciones.generopareja"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
                  :error-messages="errorEdadFamiliar"-->
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="¿Fue relacion consentida?"
                    v-model="fichaIngreso.contenido.desarrollosexual.relaciones.relacionconsentida"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                  @input="$v.familiar.numerodocumento.$touch()"
                                  @blur="$v.familiar.numerodocumento.$touch()"
                  :error-messages="errorNumeroDocumentoFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="¿Tiene ITS?"
                    v-model="fichaIngreso.contenido.desarrollosexual.relaciones.its"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
                  :error-messages="errorEdadFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="¿Tuvo tratamiento de la ITS?"
                    v-model="fichaIngreso.contenido.desarrollosexual.relaciones.tratamientoits"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
                  :error-messages="errorEdadFamiliar"-->
                </v-col>
              </v-row>

              <v-row>
                <!-- Explotacion sexual -->
                <v-col>
                  <v-textarea
                    label="¿Fue víctima de explotación?"
                    v-model="fichaIngreso.contenido.explotacionsexual.victimaexplotacion"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                  @input="$v.familiar.numerodocumento.$touch()"
                                  @blur="$v.familiar.numerodocumento.$touch()"
                  :error-messages="errorNumeroDocumentoFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="Edad inicio de explotación"
                    v-model="fichaIngreso.contenido.explotacionsexual.edadinicio"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
                  :error-messages="errorEdadFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="¿Fue víctima de trata?"
                    v-model="fichaIngreso.contenido.explotacionsexual.victimatrata"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
                  :error-messages="errorEdadFamiliar"-->
                </v-col>
              </v-row>

              <v-card style="padding:5px;margin:40px 0 18px 0;background-color:#EAEAEA">
                <v-card-title>
                  <v-row>
                    <v-col :cols="8">Trata sexual</v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="modalRegistrartratasexual()">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                      <v-dialog v-model="dialogAgregartratasexual" persistent max-width="600px">
                        <v-card align="center">
                          <v-card-title>
                            <span class="headline">Datos de la trata sexual</span>
                          </v-card-title>
                          <v-card-text>
                            <v-row>
                              <v-col>
                                <v-textarea
                                  label="Modalidad"
                                  v-model="tratasexual.modalidad"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                ></v-textarea>
                                <!-- :readonly="isDisabled"
                                                @input="$v.familiar.numerodocumento.$touch()"
                                                @blur="$v.familiar.numerodocumento.$touch()"
                                :error-messages="errorNumeroDocumentoFamiliar"-->
                              </v-col>
                              <v-col>
                                <v-textarea
                                  label="Duración"
                                  v-model="tratasexual.duracion"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                ></v-textarea>
                                <!-- :readonly="isDisabled"
                                                @input="$v.familiar.numerodocumento.$touch()"
                                                @blur="$v.familiar.numerodocumento.$touch()"
                                :error-messages="errorNumeroDocumentoFamiliar"-->
                              </v-col>
                              <v-col>
                                <v-textarea
                                  label="Lugar"
                                  v-model="tratasexual.lugar"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                ></v-textarea>
                                <!-- :readonly="isDisabled"
                                                  @input="$v.familiar.edad.$touch()"
                                                  @blur="$v.familiar.edad.$touch()"
                                :error-messages="errorEdadFamiliar"-->
                              </v-col>
                            </v-row>

                            <v-row>
                              <v-col>
                                <v-textarea
                                  label="Sentimientos"
                                  v-model="tratasexual.sentimientos"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                ></v-textarea>
                                <!-- :readonly="isDisabled"
                                                @input="$v.familiar.numerodocumento.$touch()"
                                                @blur="$v.familiar.numerodocumento.$touch()"
                                :error-messages="errorNumeroDocumentoFamiliar"-->
                              </v-col>
                              <v-col>
                                <v-textarea
                                  label="Referencias"
                                  v-model="tratasexual.referencias"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                ></v-textarea>
                                <!-- :readonly="isDisabled"
                                                  @input="$v.familiar.edad.$touch()"
                                                  @blur="$v.familiar.edad.$touch()"
                                :error-messages="errorEdadFamiliar"-->
                              </v-col>
                            </v-row>

                            <v-card
                              style="margin-top:30px;padding:5px 5px;padding-bottom:15px;background-color:#EAEAEA"
                            >
                              <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                                <v-row style="margin:1%;heigh:100%" align="center">
                                  <v-col :cols="8" align="left">
                                    <v-text-field
                                      v-model.trim="personascontacto"
                                      label="Personas contacto"
                                      color="#009900"
                                    ></v-text-field>
                                    <!-- @input="$v.servicio.servicio.$touch()"
                                      @blur="$v.servicio.servicio.$touch()"
                                    :error-messages="errorTextoservicio"-->
                                  </v-col>
                                  <v-col :cols="4" align="right">
                                    <v-btn
                                      fab
                                      small
                                      dark
                                      color="green"
                                      @click="agregarpersonascontacto"
                                    >
                                      <v-icon dark>mdi-plus</v-icon>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-card>
                              <v-card
                                color="#FAFAFA"
                                style="margin-top:5px; margin-top: 20px;"
                                height="60"
                                v-for="(item, index) in tratasexual.personascontacto"
                                :key="index"
                              >
                                <v-row style="margin-left:10px;heigh:100%" align="center">
                                  <v-col :cols="10">
                                    <span style="font-size:18px">Contacto: {{ item }}</span>
                                  </v-col>
                                  <v-col :cols="2" align="right">
                                    <div style="margin-right:20px">
                                      <v-btn
                                        fab
                                        x-small
                                        dark
                                        color="red"
                                        @click="eliminarpersonascontacto(index)"
                                      >
                                        <v-icon dark>mdi-minus</v-icon>
                                      </v-btn>
                                    </div>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </v-card>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              v-if="acciontratasexual == 'registrar'"
                              color="success"
                              @click="agregartratasexual()"
                            >
                              <v-icon left class="mr-0 icon-plan">mdi-check</v-icon>Agregar
                            </v-btn>
                            <v-btn
                              v-if="acciontratasexual == 'actualizar'"
                              color="yellow"
                              @click="actualizartratasexual(indice)"
                            >
                              <v-icon left class="mr-0 icon-plan">mdi-pencil</v-icon>Actualizar
                            </v-btn>
                            <v-btn color="error" @click="cerrarAgregartratasexual()">
                              <v-icon left class="mr-0 icon-plan">mdi-close</v-icon>Cerrar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-card-text style="background-color:#FAFAFA">
                  <v-row>
                    <v-col>
                      <h3>Modalidad</h3>
                    </v-col>
                    <v-col>
                      <h3>Lugar</h3>
                    </v-col>
                    <v-col>
                      <h3>Acciones</h3>
                    </v-col>
                  </v-row>
                  <div
                    v-for="(item, index) in fichaIngreso.contenido.explotacionsexual.tratasexual"
                    :key="index"
                  >
                    <v-row>
                      <v-col>{{ item.modalidad }}</v-col>
                      <v-col>{{ item.lugar }}</v-col>
                      <v-col>
                        <v-row style="padding:0;margin:0">
                          <v-col style="padding:0;margin:0">
                            <v-btn
                              fab
                              x-small
                              dark
                              color="yellow"
                              @click="modalActualizartratasexual(index)"
                            >
                              <v-icon dark>mdi-pen</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col style="padding:0;margin:0">
                            <v-btn
                              fab
                              x-small
                              dark
                              color="blue"
                              @click="modalConsultartratasexual(index)"
                            >
                              <v-icon dark>mdi-eye</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col style="padding:0;margin:0">
                            <v-btn fab x-small dark color="red" @click="eliminartratasexual(index)">
                              <v-icon dark>mdi-minus</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>
              <!-- <div>
                <h4
                  v-if="$v.fichaIngreso.contenido.padres.$error"
                  class="red--text"
                >Debe registrar como mínimo un padre y como máximo 2 padres</h4>
              </div>-->

              <v-row>
                <v-col>
                  <v-btn block @click="cerrarDialogo" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="step = 5" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
        <v-stepper-content step="5">
          <div class="container-user">
            <form>
              <v-row>
                <v-col>
                  <v-textarea
                    label="Habilidades manuales"
                    v-model="fichaIngreso.contenido.actividades.habilidadesmanuales"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                  @input="$v.familiar.numerodocumento.$touch()"
                                  @blur="$v.familiar.numerodocumento.$touch()"
                  :error-messages="errorNumeroDocumentoFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="Habilidades deportivas"
                    v-model="fichaIngreso.contenido.actividades.habilidadesdeportivas"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
                  :error-messages="errorEdadFamiliar"-->
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Otras habilidades"
                    v-model="fichaIngreso.contenido.actividades.otras"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                  @input="$v.familiar.numerodocumento.$touch()"
                                  @blur="$v.familiar.numerodocumento.$touch()"
                  :error-messages="errorNumeroDocumentoFamiliar"-->
                </v-col>
                <v-col>
                  <v-textarea
                    label="Observaciones (Opcional)"
                    v-model="fichaIngreso.contenido.observaciones"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                  <!-- :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
                  :error-messages="errorEdadFamiliar"-->
                </v-col>
              </v-row>

              <v-card
                style="margin-top:30px;padding:5px 5px;padding-bottom:15px;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <v-text-field
                        v-model.trim="redessociales"
                        label="Redes sociales residente"
                        color="#009900"
                      ></v-text-field>
                      <!-- @input="$v.servicio.servicio.$touch()"
                                      @blur="$v.servicio.servicio.$touch()"
                      :error-messages="errorTextoservicio"-->
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="agregarredessociales">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px; margin-top: 20px;"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.actividades.redessociales"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10">
                      <span style="font-size:18px">Red social: {{ item }}</span>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <div style="margin-right:20px">
                        <v-btn fab x-small dark color="red" @click="eliminarredessociales(index)">
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-card style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA">
                <v-chip class="ma-2" color="green" text-color="white">Firmas de encargados</v-chip>
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="4" align="left">
                      <v-text-field v-model="firmas.nombre" label="Nombre" color="#009900"></v-text-field>
                      <!-- @input="$v.firmas.nombre.$touch()"
                        @blur="$v.firmas.nombre.$touch()"
                      :error-messages="errorNombreFirma"-->
                    </v-col>
                    <v-col :cols="4" align="left">
                      <v-text-field v-model="firmas.cargo" label="Cargo" color="#009900"></v-text-field>
                      <!-- @input="$v.firmas.cargo.$touch()"
                        @blur="$v.firmas.cargo.$touch()"
                      :error-messages="errorCargoFirma"-->
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
                    </v-card>-->
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
                        <span
                          style="font-size:18px"
                        >Nombre: {{ item.nombre }} - Cargo: {{ item.cargo }}</span>
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
              <!-- <div>
                <h4
                  v-if="$v.fichaIngreso.contenido.firmas.$error"
                  class="red--text"
                >Debe tener como mínimo una firma registrada</h4>
              </div>-->

              <v-dialog v-model="dialogVistaPreviaFirma" persistent max-width="600px">
                <v-card align="center">
                  <v-card-title>
                    <span class="headline">Vista previa</span>
                  </v-card-title>
                  <v-card-text>
                    <img width="100%" height="100%" :src="'data:image/jpeg;base64,' + imagen" alt />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cerrarVistaPreviaFirma()">Cerrar</v-btn>
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
                  <v-btn block @click="registrarFichaPsicologicaIngreso" color="success">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    <span>Registrar Ficha de Ingreso</span>
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
  props: ["listaresidentes","listaeducadores"],
  ...mapMutations(["setFichaIngreso", "addFichaIngreso"]),
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      datemenu: false,
      step: 1,
      //modal padres
      accion: "registrar",
      dialogAgregarpadre: false,
      padre: {
        nombre: "",
        apellidos: "",
        parentesco: "",
        instruccion: "",
        estadosalud: "",
        relacion: ""
      },
      //fin modal padres
      //modal hermanos
      accionHermano: "registrar",
      dialogAgregarhermano: false,
      hermano: {
        nombre: "",
        edad: "",
        actividad: ""
      },
      //fin modal hermanos
      //modal tratasexual
      acciontratasexual: "registrar",
      dialogAgregartratasexual: false,
      tratasexual: {
        modalidad: "",
        lugar: "",
        personascontacto: [],
        duracion: "",
        sentimientos: "",
        referencias: ""
      },
      personascontacto: "",
      //fin modal tratasexual
      edadgradoescolar: {
        edad: 0,
        gradoescolar: ""
      },
      //datos ficha ingreso psicologica
      fichaIngreso: {
        id: "",
        tipo: "FichaPsicologicaIngreso",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: new Date(),
        area: "psicologica",
        fase: "acogida",
        idresidente: "",
        estado: "creado",
        contenido: {
          responsableturno: "",
          firmas: [],
          padres: [],
          hermanos: [],
          escolaridad: {
            niveleducativo: "",
            educacionespecial: "",
            edadgradoescolar: []
          },
          discapacidad: {
            intelectual: "",
            fisico: "",
            sensorial: "",
            enfermedad: []
          },
          maltrato: [],
          abusosexual: {
            edad: 0,
            veces: 0,
            atencionpsicologica: false
          },
          adicciones: {
            consumo: false,
            ultimodiaconsumo: new Date(),
            spa: []
          },
          conductasriesgo: [],
          conductasemocionales: [],
          desarrollosexual: {
            menstruacion: true,
            menarquia: new Date(),
            relaciones: {
              iniciorelaciones: true,
              edadinicio: 15,
              motivo: "",
              generopareja: "",
              relacionconsentida: true,
              its: true,
              tratamientoits: true
            }
          },
          explotacionsexual: {
            victimaexplotacion: true,
            edadinicio: 15,
            victimatrata: true,
            tratasexual: []
          },
          actividades: {
            habilidadesmanuales: "",
            habilidadesdeportivas: "",
            otras: "",
            redessociales: []
          },
          observaciones: "",
          codigodocumento: ""
        }
      },
      enfermedad: "",
      maltrato: {
        tipomaltrato: "",
        agresor: ""
      },
      spa: {
        tipospa: "",
        tiempoconsumo: "",
        frecuencia: ""
      },
      conductasriesgo: {
        conducta: "",
        observacion: ""
      },
      conductasemocionales: {
        indicador: "",
        observacion: ""
      },
      redessociales: "",
      firmas: { urlfirma: "", nombre: "", cargo: "" },
      urlfirma: "",
      imagen: "",
      dialogVistaPreviaFirma: false,
      dropzoneOptions2: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 5.0,
        maxFiles: 1,
        acceptedFiles: ".png",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione la imagen de la firma su dispositivo o arrástrela aquí"
      }
      //fin datos ficha ingreso psicologica
    };
  },
  methods: {
    cerrarDialogo() {
      this.step = 1;
      this.$emit("cerrar-modal-registro-ficha-ingreso");
    },
    async registrarFichaPsicologicaIngreso() {
      let fichaI = this.fichaIngreso;
      console.log(fichaI);
      await axios
        .post("/Documento/fichaingresopsicologicacrear", fichaI)
        .then(res => {
          console.log(this.res);
        })
        .catch(err => console.log(err));
    },
    //Metodos modal padres
    modalRegistrarPadres() {
      this.accion = "registrar";
      this.dialogAgregarpadre = true;
    },
    agregarPadre() {
      /*this.$v.familiar.$touch();
      if (this.$v.familiar.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Debe completar los datos del familiar",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      }
      else {*/
      let padre = {
        nombre: this.padre.nombre,
        apellidos: this.padre.apellidos,
        parentesco: this.padre.parentesco,
        instruccion: this.padre.instruccion,
        estadosalud: this.padre.estadosalud,
        relacion: this.padre.relacion
      };
      this.fichaIngreso.contenido.padres.push(padre);
      this.padre.nombre = "";
      this.padre.apellidos = "";
      this.padre.parentesco = "";
      this.padre.instruccion = "";
      this.padre.estadosalud = "";
      this.padre.relacion = "";
      this.dialogAgregarpadre = false;
      //this.$v.padre.$reset();
      //}
    },
    cerrarAgregarPadre() {
      this.dialogAgregarpadre = false;

      this.padre.nombre = "";
      this.padre.apellidos = "";
      this.padre.parentesco = "";
      this.padre.instruccion = "";
      this.padre.estadosalud = "";
      this.padre.relacion = "";

      //this.$v.padre.$reset();
    },
    modalActualizarPadre(index) {
      this.accion = "actualizar";
      this.dialogAgregarpadre = true;
      this.padre.nombre = this.fichaIngreso.contenido.padres[index].nombre;
      this.padre.apellidos = this.fichaIngreso.contenido.padres[
        index
      ].apellidos;
      this.padre.parentesco = this.fichaIngreso.contenido.padres[
        index
      ].parentesco;
      this.padre.instruccion = this.fichaIngreso.contenido.padres[
        index
      ].instruccion;
      this.padre.estadosalud = this.fichaIngreso.contenido.padres[
        index
      ].estadosalud;
      this.padre.relacion = this.fichaIngreso.contenido.padres[index].relacion;

      this.indice = index;
    },
    actualizarPadre(index) {
      /*this.$v.familiar.$touch();
      if (this.$v.familiar.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Debe completar los datos del familiar",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      }
      else {*/
      this.fichaIngreso.contenido.padres[index].nombre = this.padre.nombre;
      this.fichaIngreso.contenido.padres[
        index
      ].apellidos = this.padre.apellidos;
      this.fichaIngreso.contenido.padres[
        index
      ].parentesco = this.padre.parentesco;
      this.fichaIngreso.contenido.padres[
        index
      ].instruccion = this.padre.instruccion;
      this.fichaIngreso.contenido.padres[
        index
      ].estadosalud = this.padre.estadosalud;
      this.fichaIngreso.contenido.padres[index].relacion = this.padre.relacion;

      this.dialogAgregarpadre = false;
      // this.$v.padre.$reset();
      // }
    },
    eliminarPadre(index) {
      this.fichaIngreso.contenido.padres.splice(index, 1);
    },
    modalConsultarPadre(index) {
      this.accion = "consultar";
      this.dialogAgregarpadre = true;
      this.padre.nombre = this.fichaIngreso.contenido.padres[index].nombre;
      this.padre.apellidos = this.fichaIngreso.contenido.padres[
        index
      ].apellidos;
      this.padre.parentesco = this.fichaIngreso.contenido.padres[
        index
      ].parentesco;
      this.padre.instruccion = this.fichaIngreso.contenido.padres[
        index
      ].instruccion;
      this.padre.estadosalud = this.fichaIngreso.contenido.padres[
        index
      ].estadosalud;
      this.padre.relacion = this.fichaIngreso.contenido.padres[index].relacion;
    },
    //fin metodos modal padres
    //Metodos modal hermanos
    modalRegistrarhermano() {
      this.accionHermano = "registrar";
      this.dialogAgregarhermano = true;
    },
    agregarhermano() {
      /*this.$v.familiar.$touch();
      if (this.$v.familiar.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Debe completar los datos del familiar",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      }
      else {*/
      let hermano = {
        nombre: this.hermano.nombre,
        edad: this.hermano.edad,
        actividad: this.hermano.actividad
      };
      this.fichaIngreso.contenido.hermanos.push(hermano);
      this.hermano.nombre = "";
      this.hermano.edad = "";
      this.hermano.actividad = "";
      this.dialogAgregarhermano = false;
      //this.$v.padre.$reset();
      //}
    },
    cerrarAgregarhermano() {
      this.dialogAgregarhermano = false;

      this.hermano.nombre = "";
      this.hermano.edad = "";
      this.hermano.actividad = "";

      //this.$v.padre.$reset();
    },
    modalActualizarhermano(index) {
      this.accionHermano = "actualizar";
      this.dialogAgregarhermano = true;
      this.hermano.nombre = this.fichaIngreso.contenido.hermanos[index].nombre;
      this.hermano.edad = this.fichaIngreso.contenido.hermanos[index].edad;
      this.hermano.actividad = this.fichaIngreso.contenido.hermanos[
        index
      ].actividad;

      this.indice = index;
    },
    actualizarhermano(index) {
      /*this.$v.familiar.$touch();
      if (this.$v.familiar.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Debe completar los datos del familiar",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      }
      else {*/
      this.fichaIngreso.contenido.hermanos[index].nombre = this.hermano.nombre;
      this.fichaIngreso.contenido.hermanos[index].edad = this.hermano.edad;
      this.fichaIngreso.contenido.hermanos[
        index
      ].actividad = this.hermano.actividad;

      this.dialogAgregarhermano = false;
      // this.$v.padre.$reset();
      // }
    },
    eliminarhermano(index) {
      this.fichaIngreso.contenido.hermanos.splice(index, 1);
    },
    modalConsultarhermano(index) {
      this.accionHermano = "consultar";
      this.dialogAgregarhermano = true;
      this.hermano.nombre = this.fichaIngreso.contenido.hermanos[index].nombre;
      this.hermano.edad = this.fichaIngreso.contenido.hermanos[index].edad;
      this.hermano.actividad = this.fichaIngreso.contenido.hermanos[
        index
      ].actividad;
    },
    //fin metodos modal hermanos
    agregaredadgradoescolar() {
      /*this.$v.servicio.$touch();
      if (!this.$v.servicio.$invalid) {*/
      let edadgradoescolar = {
        edad: this.edadgradoescolar.edad,
        gradoescolar: this.edadgradoescolar.gradoescolar
      };

      this.fichaIngreso.contenido.escolaridad.edadgradoescolar.push(
        edadgradoescolar
      );

      this.edadgradoescolar.edad = "";
      this.edadgradoescolar.gradoescolar = "";
      //  this.$v.servicio.$reset();
      //}
    },
    eliminaredadgradoescolar(index) {
      this.fichaIngreso.contenido.escolaridad.edadgradoescolar.splice(index, 1);
    },
    agregarenfermedad() {
      /*this.$v.motivoIngreso.$touch();
      if (!this.$v.motivoIngreso.$invalid) {*/
      let enfermedadR = this.enfermedad;
      this.fichaIngreso.contenido.discapacidad.enfermedad.push(enfermedadR);
      this.enfermedad = "";
      //  this.$v.motivoIngreso.$reset();
      //}
    },
    eliminarenfermedad(index) {
      this.fichaIngreso.contenido.discapacidad.enfermedad.splice(index, 1);
    },
    agregarmaltrato() {
      /*this.$v.servicio.$touch();
      if (!this.$v.servicio.$invalid) {*/
      let maltratoR = {
        tipomaltrato: this.maltrato.tipomaltrato,
        agresor: this.maltrato.agresor
      };

      this.fichaIngreso.contenido.maltrato.push(maltratoR);

      this.maltrato.tipomaltrato = "";
      this.maltrato.agresor = "";
      //  this.$v.servicio.$reset();
      //}
    },
    eliminarmaltrato(index) {
      this.fichaIngreso.contenido.maltrato.splice(index, 1);
    },
    agregarspa() {
      /*this.$v.servicio.$touch();
      if (!this.$v.servicio.$invalid) {*/
      let spaR = {
        tipospa: this.spa.tipospa,
        tiempoconsumo: this.spa.tiempoconsumo,
        frecuencia: this.spa.frecuencia
      };

      this.fichaIngreso.contenido.adicciones.spa.push(spaR);

      this.spa.tipospa = "";
      this.spa.tiempoconsumo = "";
      this.spa.frecuencia = "";
      //  this.$v.servicio.$reset();
      //}
    },
    eliminarspa(index) {
      this.fichaIngreso.contenido.adicciones.spa.splice(index, 1);
    },
    agregarconductasriesgo() {
      /*this.$v.servicio.$touch();
      if (!this.$v.servicio.$invalid) {*/
      let conductasriesgoR = {
        conducta: this.conductasriesgo.conducta,
        observacion: this.conductasriesgo.observacion
      };

      this.fichaIngreso.contenido.conductasriesgo.push(conductasriesgoR);

      this.conductasriesgo.conducta = "";
      this.conductasriesgo.observacion = "";
      //  this.$v.servicio.$reset();
      //}
    },
    eliminarconductasriesgo(index) {
      this.fichaIngreso.contenido.conductasriesgo.splice(index, 1);
    },
    agregarconductasemocionales() {
      /*this.$v.servicio.$touch();
      if (!this.$v.servicio.$invalid) {*/
      let conductasemocionalesR = {
        indicador: this.conductasemocionales.indicador,
        observacion: this.conductasemocionales.observacion
      };

      this.fichaIngreso.contenido.conductasemocionales.push(
        conductasemocionalesR
      );

      this.conductasemocionales.indicador = "";
      this.conductasemocionales.observacion = "";
      //  this.$v.servicio.$reset();
      //}
    },
    eliminarconductasemocionales(index) {
      this.fichaIngreso.contenido.conductasemocionales.splice(index, 1);
    },
    //modal tratasexual
    modalRegistrartratasexual() {
      this.acciontratasexual = "registrar";
      this.dialogAgregartratasexual = true;
    },
    agregartratasexual() {
      /*this.$v.familiar.$touch();
      if (this.$v.familiar.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Debe completar los datos del familiar",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      }
      else {*/
      let tratasexualR = {
        modalidad: this.tratasexual.modalidad,
        lugar: this.tratasexual.lugar,
        personascontacto: this.tratasexual.personascontacto,
        duracion: this.tratasexual.duracion,
        sentimientos: this.tratasexual.sentimientos,
        referencias: this.tratasexual.referencias
      };
      this.fichaIngreso.contenido.explotacionsexual.tratasexual.push(
        tratasexualR
      );
      this.tratasexual.modalidad = "";
      this.tratasexual.lugar = "";
      this.tratasexual.duracion = "";
      this.tratasexual.sentimientos = "";
      this.tratasexual.referencias = "";
      this.tratasexual.personascontacto = [];
      this.personascontacto = "";
      this.dialogAgregartratasexual = false;
      //this.$v.padre.$reset();
      //}
    },
    cerrarAgregartratasexual() {
      this.dialogAgregartratasexual = false;

      this.tratasexual.modalidad = "";
      this.tratasexual.lugar = "";
      this.tratasexual.duracion = "";
      this.tratasexual.sentimientos = "";
      this.tratasexual.referencias = "";
      this.tratasexual.personascontacto = [];
      this.personascontacto = "";

      //this.$v.padre.$reset();
    },
    modalActualizartratasexual(index) {
      this.acciontratasexual = "actualizar";
      this.dialogAgregartratasexual = true;
      this.tratasexual.modalidad = this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].modalidad;
      this.tratasexual.lugar = this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].lugar;
      this.tratasexual.duracion = this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].duracion;
      this.tratasexual.sentimientos = this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].sentimientos;
      this.tratasexual.referencias = this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].referencias;
      this.tratasexual.personascontacto = this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].personascontacto;
      this.personascontacto = "";
      this.indice = index;
    },
    actualizartratasexual(index) {
      /*this.$v.familiar.$touch();
      if (this.$v.familiar.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Debe completar los datos del familiar",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      }
      else {*/
      this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].modalidad = this.tratasexual.modalidad;
      this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].lugar = this.tratasexual.lugar;
      this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].duracion = this.tratasexual.duracion;
      this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].sentimientos = this.tratasexual.sentimientos;
      this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].referencias = this.tratasexual.referencias;
      this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].personascontacto = this.tratasexual.personascontacto;
      this.personascontacto = "";
      this.dialogAgregartratasexual = false;
      // this.$v.padre.$reset();
      // }
    },
    eliminartratasexual(index) {
      this.fichaIngreso.contenido.explotacionsexual.tratasexual.splice(
        index,
        1
      );
    },
    modalConsultartratasexual(index) {
      this.acciontratasexual = "consultar";
      this.dialogAgregartratasexual = true;
      this.tratasexual.modalidad = this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].modalidad;
      this.tratasexual.lugar = this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].lugar;
      this.tratasexual.duracion = this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].duracion;
      this.tratasexual.sentimientos = this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].sentimientos;
      this.tratasexual.referencias = this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].referencias;
      this.tratasexual.personascontacto = this.fichaIngreso.contenido.explotacionsexual.tratasexual[
        index
      ].personascontacto;
      this.personascontacto = "";
    },
    agregarpersonascontacto() {
      /*this.$v.servicio.$touch();
      if (!this.$v.servicio.$invalid) {*/
      let personascontactoR = this.personascontacto;

      this.tratasexual.personascontacto.push(personascontactoR);

      this.personascontacto = "";
      //  this.$v.servicio.$reset();
      //}
    },
    eliminarpersonascontacto(index) {
      this.tratasexual.personascontacto.splice(index, 1);
    },
    //fin modal tratasexual
    agregarredessociales() {
      /*this.$v.servicio.$touch();
      if (!this.$v.servicio.$invalid) {*/
      let redessocialesR = this.redessociales;

      this.fichaIngreso.contenido.actividades.redessociales.push(
        redessocialesR
      );

      this.redessociales = "";
      //  this.$v.servicio.$reset();
      //}
    },
    eliminarredessociales(index) {
      this.fichaIngreso.contenido.actividades.redessociales.splice(index, 1);
    },
    agregarFirma() {
      //this.$v.firmas.$touch();
      //this.$v.urlfirma.$touch();

      //if (!this.$v.firmas.$invalid && !this.$v.urlfirma.$invalid) {
      let firmas = {
        urlfirma: this.urlfirma,
        nombre: this.firmas.nombre,
        cargo: this.firmas.cargo
      };
      this.fichaIngreso.contenido.firmas.push(firmas);
      this.$refs.myVueDropzone.removeAllFiles();

      this.urlfirma = "";
      this.firmas.nombre = "";
      this.firmas.cargo = "";
      //  this.$v.firmas.$reset();
      //  this.$v.urlfirma.$reset();
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
    }
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close-dialog-fichaIngreso");
        }
      }
    }
  }
};
</script>