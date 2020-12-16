<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Ficha de Ingreso Psicológica</v-card-title>
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
            <form style="margin-top: 10px;">
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
                @input="$v.fichaIngreso.idresidente.$touch()"
                @blur="$v.fichaIngreso.idresidente.$touch()"
                :error-messages="errorResidente"
              >
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
                @input="$v.fichaIngreso.contenido.responsableturno.$touch()"
                @blur="$v.fichaIngreso.contenido.responsableturno.$touch()"
                :error-messages="errorresponsableturno"
              >
                <template v-slot:selection="data">
                  <v-chip v-bind="data.attrs" :input-value="data.selected" style="margin-top:5px">
                    <v-avatar left color="#b3b3ff" size="24">
                      <span
                        style="font-size:12px"
                      >{{ data.item.datos.nombre.charAt(0) }} {{ data.item.datos.apellido.charAt(0) }}</span>
                    </v-avatar>
                    {{ data.item.datos.nombre + " " + data.item.datos.apellido }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <v-avatar left color="#b3b3ff" size="24">
                        <span
                          style="font-size:12px"
                        >{{ data.item.datos.nombre.charAt(0) }} {{ data.item.datos.apellido.charAt(0) }}</span>
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

              <v-card elevation="12" outlined>
                <v-card-title>Escolaridad del residente</v-card-title>
                <v-container grid-list-md text-xs-center>
                  <v-row>
                    <v-col>
                      <v-select
                        :items="listaNiveleducativo"
                        v-model="fichaIngreso.contenido.escolaridad.niveleducativo"
                        label="Nivel de educación"
                        outlined
                        @input="$v.fichaIngreso.contenido.escolaridad.niveleducativo.$touch()"
                        @blur="$v.fichaIngreso.contenido.escolaridad.niveleducativo.$touch()"
                        :error-messages="errorniveleducativo"
                      ></v-select>
                      <!-- :readonly="isDisabled"
                      -->
                    </v-col>
                    <v-col>
                      <v-select
                        :items="listaEducacionespecial"
                        v-model="fichaIngreso.contenido.escolaridad.educacionespecial"
                        label="Educación especial"
                        outlined
                        @input="$v.fichaIngreso.contenido.escolaridad.educacionespecial.$touch()"
                        @blur="$v.fichaIngreso.contenido.escolaridad.educacionespecial.$touch()"
                        :error-messages="erroreducacionespecial"
                      ></v-select>
                      <!-- :readonly="isDisabled"-->
                    </v-col>
                  </v-row>

                  <v-card elevation="3" outlined>
                    <v-card-title>Grado escolar por edad (si tuviera)</v-card-title>
                    <v-container grid-list-md text-xs-center>
                      <v-layout row wrap>
                        <v-flex xs5>
                          <v-textarea
                            v-model.number="edadgradoescolar.edad"
                            label="Edad"
                            outlined
                            auto-grow
                            rows="1"
                            color="#009900"
                            @input="$v.edadgradoescolar.edad.$touch()"
                            @blur="$v.edadgradoescolar.edad.$touch()"
                            :error-messages="erroredadgradoescolaredad"
                          ></v-textarea>
                        </v-flex>
                        <v-flex xs5>
                          <v-textarea
                            v-model.trim="edadgradoescolar.gradoescolar"
                            label="Grado escolar"
                            outlined
                            auto-grow
                            rows="1"
                            color="#009900"
                            @input="$v.edadgradoescolar.gradoescolar.$touch()"
                            @blur="$v.edadgradoescolar.gradoescolar.$touch()"
                            :error-messages="errorgradoescolargradoescolar"
                          ></v-textarea>
                        </v-flex>
                        <v-flex xs2>
                          <v-btn
                            class="mx-2"
                            fab
                            dark
                            color="success"
                            @click="agregaredadgradoescolar"
                          >
                            <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <v-list flat>
                      <v-list-item
                        v-for="(item, i) in fichaIngreso.contenido.escolaridad.edadgradoescolar"
                        :key="i"
                        class="item-list"
                      >
                        <v-list-item-icon>
                          <v-icon
                            @click="eliminaredadgradoescolar(i)"
                            left
                            color="red"
                          >mdi-minus-circle</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>Edad: {{ item.edad }} - Grado escolar: {{ item.gradoescolar }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-container>
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
                              :readonly="isDisabledPadre"
                              @input="$v.padre.nombre.$touch()"
                              @blur="$v.padre.nombre.$touch()"
                              :error-messages="errorpadrenombre"
                            ></v-textarea>
                            <v-textarea
                              label="Apellidos"
                              v-model="padre.apellidos"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              :readonly="isDisabledPadre"
                              @input="$v.padre.apellidos.$touch()"
                              @blur="$v.padre.apellidos.$touch()"
                              :error-messages="errorpadreapellidos"
                            ></v-textarea>
                            <v-row>
                              <v-col>
                                <v-textarea
                                  label="Edad"
                                  v-model.number="padre.edad"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  :readonly="isDisabledPadre"
                                  @input="$v.padre.edad.$touch()"
                                  @blur="$v.padre.edad.$touch()"
                                  :error-messages="errorpadreedad"
                                ></v-textarea>
                              </v-col>
                              <v-col>
                                <v-textarea
                                  label="Instrucción"
                                  v-model="padre.instruccion"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  :readonly="isDisabledPadre"
                                  @input="$v.padre.instruccion.$touch()"
                                  @blur="$v.padre.instruccion.$touch()"
                                  :error-messages="errorpadreinstruccion"
                                ></v-textarea>
                              </v-col>
                              <v-col>
                                <v-select
                                  :items="listaPadreparentesco"
                                  v-model="padre.parentesco"
                                  label="Parentesco"
                                  outlined
                                  :readonly="isDisabledPadre"
                                  @input="$v.padre.parentesco.$touch()"
                                  @blur="$v.padre.parentesco.$touch()"
                                  :error-messages="errorpadreparentesco"
                                ></v-select>
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
                                  :readonly="isDisabledPadre"
                                  @input="$v.padre.estadosalud.$touch()"
                                  @blur="$v.padre.estadosalud.$touch()"
                                  :error-messages="errorpadreestadosalud"
                                ></v-textarea>
                              </v-col>
                              <v-col>
                                <v-textarea
                                  label="Relación con la residente"
                                  v-model="padre.relacion"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  :readonly="isDisabledPadre"
                                  @input="$v.padre.relacion.$touch()"
                                  @blur="$v.padre.estadosalud.$touch()"
                                  :error-messages="errorpadrerelacion"
                                ></v-textarea>
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
              <div>
                <h4
                  v-if="$v.fichaIngreso.contenido.padres.$error"
                  class="red--text"
                >Debe registrar como mínimo un padre y como máximo 2 padres</h4>
              </div>

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
                              :readonly="isDisabledHermano"
                              @input="$v.hermano.nombre.$touch()"
                              @blur="$v.hermano.nombre.$touch()"
                              :error-messages="errorhermanonombre"
                            ></v-textarea>
                            <v-textarea
                              label="Edad"
                              v-model.number="hermano.edad"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              :readonly="isDisabledHermano"
                              @input="$v.hermano.edad.$touch()"
                              @blur="$v.hermano.edad.$touch()"
                              :error-messages="errorhermanoedad"
                            ></v-textarea>

                            <v-textarea
                              label="Actividad"
                              v-model="hermano.actividad"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              :readonly="isDisabledHermano"
                              @input="$v.hermano.actividad.$touch()"
                              @blur="$v.hermano.actividad.$touch()"
                              :error-messages="errorhermanoactividad"
                            ></v-textarea>
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
              <v-card elevation="6" outlined>
                <v-card-title>Discapacidades del residente</v-card-title>
                <v-container grid-list-md text-xs-center>
                  <v-row>
                    <v-col>
                      <v-select
                        :items="listaDiscapacidad"
                        v-model="fichaIngreso.contenido.discapacidad.intelectual"
                        label="Discapacidad intelectual"
                        outlined
                        @input="$v.fichaIngreso.contenido.discapacidad.intelectual.$touch()"
                        @blur="$v.fichaIngreso.contenido.discapacidad.intelectual.$touch()"
                        :error-messages="errorintelectual"
                      ></v-select>
                      <!-- :readonly="isDisabled"-->
                    </v-col>
                    <v-col>
                      <v-select
                        :items="listaDiscapacidad"
                        v-model="fichaIngreso.contenido.discapacidad.fisico"
                        label="Discapacidad física"
                        outlined
                        @input="$v.fichaIngreso.contenido.discapacidad.fisico.$touch()"
                        @blur="$v.fichaIngreso.contenido.discapacidad.fisico.$touch()"
                        :error-messages="errorfisico"
                      ></v-select>
                      <!-- :readonly="isDisabled"-->
                    </v-col>
                    <v-col>
                      <v-select
                        :items="listaDiscapacidad"
                        v-model="fichaIngreso.contenido.discapacidad.sensorial"
                        label="Discapacidad sensorial"
                        outlined
                        @input="$v.fichaIngreso.contenido.discapacidad.sensorial.$touch()"
                        @blur="$v.fichaIngreso.contenido.discapacidad.sensorial.$touch()"
                        :error-messages="errorsensorial"
                      ></v-select>
                      <!-- :readonly="isDisabled"-->
                    </v-col>
                  </v-row>

                  <v-card elevation="3" outlined>
                    <v-card-title>Enfermedades</v-card-title>
                    <v-container grid-list-md text-xs-center>
                      <v-layout row wrap>
                        <v-flex xs10>
                          <v-textarea
                            v-model="enfermedad"
                            label="Ingrese la enfermedad"
                            outlined
                            auto-grow
                            rows="1"
                            color="#009900"
                            @input="$v.enfermedad.$touch()"
                            @blur="$v.enfermedad.$touch()"
                            :error-messages="errorenfermedad"
                          ></v-textarea>
                        </v-flex>
                        <v-flex xs2>
                          <v-btn class="mx-2" fab dark color="success" @click="agregarenfermedad">
                            <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <v-list flat>
                      <v-list-item
                        v-for="(item, i) in fichaIngreso.contenido.discapacidad.enfermedad"
                        :key="i"
                        class="item-list"
                      >
                        <v-list-item-icon>
                          <v-icon @click="eliminarenfermedad(i)" left color="red">mdi-minus-circle</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>Enfermedad: {{ item }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-container>
              </v-card>
              <v-card elevation="6" outlined style="margin-top: 20px">
                <v-card-title>Sobre el abuso sexual</v-card-title>
                <v-container grid-list-md text-xs-center>
                  <v-row>
                    <v-col>
                      <v-textarea
                        label="Edad cuando tuvo abuso sexual"
                        v-model.number="fichaIngreso.contenido.abusosexual.edad"
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
                        v-model.number="fichaIngreso.contenido.abusosexual.veces"
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

                  <v-switch
                    v-model="fichaIngreso.contenido.abusosexual.atencionpsicologica"
                    :label="`¿Recibio atención psicológica? Respuesta: ${ fichaIngreso.contenido.abusosexual.atencionpsicologica ? 'SI' : 'NO'}`"
                  ></v-switch>
                  <!-- :readonly="isDisabled"
                                      @input="$v.familiar.gradoinstruccion.$touch()"
                                      @blur="$v.familiar.gradoinstruccion.$touch()"
                  :error-messages="errorGradoInstruccionFamiliar"-->
                </v-container>
              </v-card>

              <v-card elevation="6" outlined style="margin-top: 20px">
                <v-card-title>Evidencia de maltrato</v-card-title>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs5>
                      <v-select
                        :items="listaTipomaltrato"
                        v-model="maltrato.tipomaltrato"
                        label="Tipo de maltrato"
                        outlined
                        @input="$v.maltrato.tipomaltrato.$touch()"
                        @blur="$v.maltrato.tipomaltrato.$touch()"
                        :error-messages="errormaltratotipomaltrato"
                      ></v-select>
                    </v-flex>
                    <v-flex xs5>
                      <v-select
                        :items="listaAgresor"
                        v-model="maltrato.agresor"
                        label="Agresor"
                        outlined
                        @input="$v.maltrato.agresor.$touch()"
                        @blur="$v.maltrato.agresor.$touch()"
                        :error-messages="errormaltratoagresor"
                      ></v-select>
                    </v-flex>
                    <v-flex xs2>
                      <v-btn class="mx-2" fab dark color="success" @click="agregarmaltrato">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-list flat>
                  <v-list-item
                    v-for="(item, i) in fichaIngreso.contenido.maltrato"
                    :key="i"
                    class="item-list"
                  >
                    <v-list-item-icon>
                      <v-icon @click="eliminarmaltrato(i)" left color="red">mdi-minus-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Tipo maltrato: {{ item.tipomaltrato }} - Agresor: {{ item.agresor }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
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
              <v-card elevation="6" outlined>
                <v-card-title>Otros indicadores</v-card-title>
                <v-container grid-list-md text-xs-center>
                  <v-row>
                    <v-col>
                      <v-switch
                        v-model="fichaIngreso.contenido.adicciones.consumo"
                        :label="`¿Ha consumido spa alguna vez? Respuesta:${ fichaIngreso.contenido.adicciones.consumo ? 'SI' : 'NO'}`"
                      ></v-switch>
                      <!-- :readonly="isDisabled"
                                      @input="$v.familiar.numerodocumento.$touch()"
                                      @blur="$v.familiar.numerodocumento.$touch()"
                      :error-messages="errorNumeroDocumentoFamiliar"-->
                    </v-col>
                    <v-col>
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="fichaIngreso.contenido.adicciones.ultimodiaconsumo"
                            label="Último dia de consumo"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            clearable
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="fichaIngreso.contenido.adicciones.ultimodiaconsumo"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                      <!-- :readonly="isDisabled"
                                        @input="$v.familiar.edad.$touch()"
                                        @blur="$v.familiar.edad.$touch()"
                      :error-messages="errorEdadFamiliar"-->
                    </v-col>
                  </v-row>

                  <v-card elevation="3" outlined>
                    <v-card-title>Consumo de sustancias psicoadictivas - SPA (si consumiera)</v-card-title>
                    <v-container grid-list-md text-xs-center>
                      <v-layout row wrap>
                        <v-flex xs3>
                          <v-select
                            :items="listaTipospa"
                            v-model="spa.tipospa"
                            label="SPA consumida"
                            outlined
                            @input="$v.spa.tipospa.$touch()"
                            @blur="$v.spa.tipospa.$touch()"
                            :error-messages="errorspatipospa"
                          ></v-select>
                        </v-flex>
                        <v-flex xs4>
                          <v-text-field
                            v-model.trim="spa.tiempoconsumo"
                            label="Tiempo de consumo"
                            color="#009900"
                            outlined
                            @input="$v.spa.tiempoconsumo.$touch()"
                            @blur="$v.spa.tiempoconsumo.$touch()"
                            :error-messages="errorspatiempoconsumo"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs3>
                          <v-select
                            :items="listaFrecuenciaconsumo"
                            v-model="spa.frecuencia"
                            label="Frecuencia de consumo"
                            outlined
                            @input="$v.spa.frecuencia.$touch()"
                            @blur="$v.spa.frecuencia.$touch()"
                            :error-messages="errorspafrecuencia"
                          ></v-select>
                        </v-flex>
                        <v-flex xs2>
                          <v-btn class="mx-2" fab dark color="success" @click="agregarspa">
                            <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <v-list flat>
                      <v-list-item
                        v-for="(item, i) in fichaIngreso.contenido.adicciones.spa"
                        :key="i"
                        class="item-list"
                      >
                        <v-list-item-icon>
                          <v-icon @click="eliminarspa(i)" left color="red">mdi-minus-circle</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>Tipo: {{ item.tipospa }} - Tiempo: {{ item.tiempoconsumo }} - Frecuencia: {{ item.frecuencia }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-container>
              </v-card>

              <v-card elevation="6" outlined style="margin-top: 20px">
                <v-card-title>Conductas de riesgo</v-card-title>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs5>
                      <v-select
                        :items="listaConductariesgo"
                        v-model="conductasriesgo.conducta"
                        label="Riesgo de conducta"
                        outlined
                        @input="$v.conductasriesgo.conducta.$touch()"
                            @blur="$v.conductasriesgo.conducta.$touch()"
                            :error-messages="errorconductasriesgoconducta"
                      ></v-select>
                    </v-flex>
                    <v-flex xs5>
                      <v-textarea
                        v-model.trim="conductasriesgo.observacion"
                        label="Observación de la conducta"
                        color="#009900"
                        outlined
                        rows="1"
                        auto-grow
                        @input="$v.conductasriesgo.observacion.$touch()"
                            @blur="$v.conductasriesgo.observacion.$touch()"
                            :error-messages="errorconductasriesgoobservacion"
                      ></v-textarea>
                    </v-flex>
                    <v-flex xs2>
                      <v-btn class="mx-2" fab dark color="success" @click="agregarconductasriesgo">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-list flat>
                  <v-list-item
                    v-for="(item, i) in fichaIngreso.contenido.conductasriesgo"
                    :key="i"
                    class="item-list"
                  >
                    <v-list-item-icon>
                      <v-icon @click="eliminarconductasriesgo(i)" left color="red">mdi-minus-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Conducta: {{ item.conducta }} - Obs: {{ item.observacion }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card elevation="6" outlined style="margin-top: 20px">
                <v-card-title>Indicadores emocionales/conductuales</v-card-title>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs5>
                      <v-select
                        :items="listaIndicadoresconductuales"
                        v-model="conductasemocionales.indicador"
                        label="Indicador de conducta"
                        outlined
                        @input="$v.conductasemocionales.indicador.$touch()"
                        @blur="$v.conductasemocionales.indicador.$touch()"
                        :error-messages="errorconductasemocionalesindicador"
                      ></v-select>
                    </v-flex>
                    <v-flex xs5>
                      <v-textarea
                        v-model.trim="conductasemocionales.observacion"
                        label="Observación de la conducta"
                        color="#009900"
                        outlined
                        rows="1"
                        auto-grow
                        @input="$v.conductasemocionales.observacion.$touch()"
                        @blur="$v.conductasemocionales.observacion.$touch()"
                        :error-messages="errorconductasemocionalesobservacion"
                      ></v-textarea>
                    </v-flex>
                    <v-flex xs2>
                      <v-btn class="mx-2" fab dark color="success" @click="agregarconductasemocionales">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-list flat>
                  <v-list-item
                    v-for="(item, i) in fichaIngreso.contenido.conductasemocionales"
                    :key="i"
                    class="item-list"
                  >
                    <v-list-item-icon>
                      <v-icon @click="eliminarconductasemocionales(i)" left color="red">mdi-minus-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Indicador: {{ item.indicador }} - Obs: {{ item.observacion }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
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
              <v-card elevation="6" outlined>
                <v-card-title>Desarrollo sexual</v-card-title>
                <v-container grid-list-md text-xs-center>
                  <v-row>
                    <v-col>
                      <v-switch
                        v-model="fichaIngreso.contenido.desarrollosexual.menstruacion"
                        :label="`¿Tiene menstruación? Respuesta: ${ fichaIngreso.contenido.desarrollosexual.menstruacion ? 'SI' : 'NO'}`"
                      ></v-switch>
                      <!-- :readonly="isDisabled"
                                      @input="$v.familiar.numerodocumento.$touch()"
                                      @blur="$v.familiar.numerodocumento.$touch()"
                      :error-messages="errorNumeroDocumentoFamiliar"-->
                    </v-col>
                    <v-col>
                      <v-menu
                        v-model="menu3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="fichaIngreso.contenido.desarrollosexual.menarquia"
                            label="Menarquía"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            clearable
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="fichaIngreso.contenido.desarrollosexual.menarquia"
                          @input="menu3 = false"
                        ></v-date-picker>
                      </v-menu>
                      <!-- :readonly="isDisabled"
                                        @input="$v.familiar.edad.$touch()"
                                        @blur="$v.familiar.edad.$touch()"
                      :error-messages="errorEdadFamiliar"-->
                    </v-col>
                  </v-row>

                <v-card elevation="3" outlined>
                  <v-card-title>Acerca de relaciones sexuales</v-card-title>
                    <v-container grid-list-md text-xs-center>

                      <v-row>
                        <v-col>
                          <v-switch
                            v-model="fichaIngreso.contenido.desarrollosexual.relaciones.iniciorelaciones"
                            :label="`¿Tuvo relaciones sexuales? Respuesta:${ fichaIngreso.contenido.desarrollosexual.relaciones.iniciorelaciones ? 'SI' : 'NO'}`"
                          ></v-switch>
                          <!-- :readonly="isDisabled"
                                          @input="$v.familiar.numerodocumento.$touch()"
                                          @blur="$v.familiar.numerodocumento.$touch()"
                          :error-messages="errorNumeroDocumentoFamiliar"-->
                        </v-col>
                        <v-col>
                          <v-textarea
                            label="Edad inicio de relaciones"
                            v-model.number="fichaIngreso.contenido.desarrollosexual.relaciones.edadinicio"
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
                          <v-select
                            :items="listaMotivorelaciones"
                            v-model="fichaIngreso.contenido.desarrollosexual.relaciones.motivo"
                            label="Motivo de las relaciones"
                            outlined
                            clearable
                          ></v-select>
                          <!-- :readonly="isDisabled"
                                          @input="$v.familiar.numerodocumento.$touch()"
                                          @blur="$v.familiar.numerodocumento.$touch()"
                          :error-messages="errorNumeroDocumentoFamiliar"-->
                        </v-col>
                        <v-col>
                          <v-select
                            :items="listaParejasexual"
                            v-model="fichaIngreso.contenido.desarrollosexual.relaciones.generopareja"
                            label="Genero de la pareja"
                            outlined
                            clearable
                          ></v-select>
                          <!-- :readonly="isDisabled"
                                            @input="$v.familiar.edad.$touch()"
                                            @blur="$v.familiar.edad.$touch()"
                          :error-messages="errorEdadFamiliar"-->
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col>
                          <v-switch
                            v-model="fichaIngreso.contenido.desarrollosexual.relaciones.relacionconsentida"
                            :label="`¿Fue relacion consentida? Respuesta:${ fichaIngreso.contenido.desarrollosexual.relaciones.relacionconsentida ? 'SI' : 'NO'}`"
                          ></v-switch>
                          <!-- :readonly="isDisabled"
                                          @input="$v.familiar.numerodocumento.$touch()"
                                          @blur="$v.familiar.numerodocumento.$touch()"
                          :error-messages="errorNumeroDocumentoFamiliar"-->
                        </v-col>
                        <v-col>
                          <v-switch
                            v-model="fichaIngreso.contenido.desarrollosexual.relaciones.its"
                            :label="`¿Tiene ITS? Respuesta:${ fichaIngreso.contenido.desarrollosexual.relaciones.its ? 'SI' : 'NO'}`"
                          ></v-switch>
                          <!-- :readonly="isDisabled"
                                            @input="$v.familiar.edad.$touch()"
                                            @blur="$v.familiar.edad.$touch()"
                          :error-messages="errorEdadFamiliar"-->
                        </v-col>
                        <v-col>
                          <v-switch
                            v-model="fichaIngreso.contenido.desarrollosexual.relaciones.tratamientoits"
                            :label="`¿Tuvo tratamiento de la ITS? Respuesta:${ fichaIngreso.contenido.desarrollosexual.relaciones.tratamientoits ? 'SI' : 'NO'}`"
                          ></v-switch>
                          <!-- :readonly="isDisabled"
                                            @input="$v.familiar.edad.$touch()"
                                            @blur="$v.familiar.edad.$touch()"
                          :error-messages="errorEdadFamiliar"-->
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-container>
              </v-card>

              <v-card elevation="6" outlined style="margin-top: 20px">
                <v-card-title>Explotacion sexual</v-card-title>
                <v-container grid-list-md text-xs-center>
                  <v-row>
                    <v-col>
                      <v-switch
                        v-model="fichaIngreso.contenido.explotacionsexual.victimaexplotacion"
                        :label="`¿Fue víctima de explotación? Respuesta:${ fichaIngreso.contenido.explotacionsexual.victimaexplotacion ? 'SI' : 'NO'}`"
                      ></v-switch>
                      <!-- :readonly="isDisabled"
                                      @input="$v.familiar.numerodocumento.$touch()"
                                      @blur="$v.familiar.numerodocumento.$touch()"
                      :error-messages="errorNumeroDocumentoFamiliar"-->
                    </v-col>
                    <v-col>
                      <v-textarea
                        label="Edad inicio de explotación"
                        v-model.number="fichaIngreso.contenido.explotacionsexual.edadinicio"
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
                      <v-switch
                        v-model="fichaIngreso.contenido.explotacionsexual.victimatrata"
                        :label="`¿Fue víctima de trata? Respuesta:${ fichaIngreso.contenido.explotacionsexual.victimatrata ? 'SI' : 'NO'}`"
                      ></v-switch>
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
                                    <v-select
                                      :items="listaModalidadtratasexual"
                                      v-model="tratasexual.modalidad"
                                      label="Modalidad"
                                      outlined
                                    ></v-select>
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
                </v-container>
              </v-card>

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
                      <v-select
                        :items="listaRedesSociales"
                        v-model="redessociales"
                        label="Redes sociales residente"
                        outlined
                      ></v-select>
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

              <v-card
                  style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                >
                <v-card class="subcard">
                        <v-card-title>Datos del Informante</v-card-title>
                        <v-card class="subcard"  style="margin-bottom:7px" color="#e6f3ff">
                            <v-text-field
                                v-model="this.user.usuario"
                                label="Autor de la ficha de ingreso"
                                outlined
                                color="info"
                                readonly
                              ></v-text-field>
                        </v-card >
                             <v-card class="subcard" color="#e6f3ff">
                                 <v-text-field
                                  v-model="this.user.rol.nombre"
                                  label="Cargo del Autor"
                                  outlined
                                  color="info"
                                  readonly
                                ></v-text-field>
                             </v-card>
                      </v-card>
                <v-row>
                  <v-col :cols="12" align="left">
                    <div>
                      <vue-dropzone
                        ref="myVueDropzone"
                        @vdropzone-success="afterSuccess2"
                        @vdropzone-removed-file="afterRemoved2"
                        id="dropzone2"
                        :options="dropzoneOptionsFirma"
                        @vdropzone-mounted="mounteddropzone"
                      >
                      </vue-dropzone>
                      <v-card v-if="errorFirma" class="error-card" color="red">
                        <v-card-text class="text-center" style="color: white"
                          >Debe Subir una firma obligatoriamente
                          </v-card-text
                        >
                      </v-card>
                    </div>
                  </v-col>
                </v-row>
              </v-card>

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
                    <span>Actualizar Ficha de Ingreso</span>
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
import {required,minLength,email,helpers,between, numeric} from "vuelidate/lib/validators";

import moment from "moment";

import { mapGetters } from "vuex";

function edadvalida(value) {
  return (value > 3 & value < 21);
}

function edadvalidapadre(value) {
  return (value > 4 & value < 101);
}

function edadvalidanormal(value) {
  return (value > 0 & value < 101);
}

export default {
  props: ["listaresidentes", "listaeducadores", "fichaIngreso"],
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
        edad: 0,
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
        edad: 0,
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
      menu2: false,
      menu3: false,
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
      dropzoneOptionsFirma: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 5.0,
        maxFiles: 1,
        acceptedFiles: ".png",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione la imagen de la firma su dispositivo o arrástrela aquí"
      },
      listaNiveleducativo: [
        { value: "Sin educación", text: "Sin educación" },
        { value: "Primaria", text: "Primaria" },
        { value: "Secundaria", text: "Secundaria" }
      ],
      listaEducacionespecial: [
        { value: "Sin educación especial", text: "Sin educación especial" },
        { value: "Primaria especial", text: "Primaria especial" },
        { value: "Talleres", text: "Talleres" }
      ],
      listaPadreparentesco: [
        { value: "Padre", text: "Padre" },
        { value: "Madre", text: "Madre" }
      ],
      listaDiscapacidad: [
        { value: "Sin discapacidad", text: "Sin discapacidad" },
        { value: "Leve", text: "Leve" },
        { value: "Moderada", text: "Moderada" },
        { value: "Grave", text: "Grave" },
        { value: "Profundo", text: "Profundo" }
      ],
      listaTipomaltrato: [
        { value: "Físico", text: "Físico" },
        { value: "Psicológico", text: "Psicológico" },
        { value: "Negligencia", text: "Negligencia" },
        { value: "Abuso sexual", text: "Abuso sexual" }
      ],
      listaAgresor: [
        { value: "Padre", text: "Padre" },
        { value: "Madre", text: "Madre" },
        { value: "Tío", text: "Tío" },
        { value: "Hermano", text: "Hermano" },
        { value: "Otro", text: "Otro" }
      ],
      listaTipospa: [
        { value: "Alcohol", text: "Alcohol" },
        { value: "Tabaco", text: "Tabaco" },
        { value: "Marihuana", text: "Marihuana" },
        { value: "PBC", text: "PBC" },
        { value: "Cocaína", text: "Cocaína" },
        { value: "Éxtasis", text: "Éxtasis" },
        { value: "Inhalantes", text: "Inhalantes" },
        { value: "Otros", text: "Otros" }
      ],
      listaFrecuenciaconsumo: [
        { value: "Diaria", text: "Diaria" },
        { value: "Interdiario", text: "Interdiario" },
        { value: "Semanal", text: "Semanal" },
        { value: "Quincenal", text: "Quincenal" },
        { value: "Mensual", text: "Mensual" }
      ],
      listaConductariesgo: [
        { value: "Robo", text: "Robo" },
        { value: "Pandilla", text: "Pandilla" },
        { value: "Venta de drogas", text: "Venta de drogas" },
        { value: "ESNNA", text: "ESNNA" },
        { value: "Videojuego", text: "Videojuego" },
        { value: "Otros", text: "Otros" }
      ],
      listaIndicadoresconductuales: [
        { value: "Tristeza", text: "Tristeza" },
        { value: "Ansiedad", text: "Ansiedad" },
        { value: "Impulsividad", text: "Impulsividad" },
        { value: "Irritabilidad", text: "Irritabilidad" },
        { value: "Prob. del apetito", text: "Prob. del apetito" },
        { value: "Prob. del sueño", text: "Prob. del sueño" },
        { value: "Enuresis", text: "Enuresis" },
        { value: "Encopresis", text: "Encopresis" },
        { value: "Onicofagia", text: "Onicofagia" },
        { value: "Disfemia", text: "Disfemia" },
        { value: "Ideación suicida", text: "Ideación suicida" }
      ],
      listaMotivorelaciones: [
        { value: "Propia voluntad", text: "Propia voluntad" },
        { value: "Por presión", text: "Por presión" },
        { value: "Por dinero", text: "Por dinero" },
        { value: "Otros", text: "Otros" }
      ],
      listaParejasexual: [
        { value: "Mujer", text: "Mujer" },
        { value: "Varón", text: "Varón" },
        { value: "Ambos", text: "Ambos" }
      ],
      listaModalidadtratasexual: [
        { value: "ESNNA", text: "ESNNA" },
        { value: "Explotación laboral", text: "Explotación laboral" },
        { value: "Pornografía", text: "Pornografía" }
      ],
      listaRedesSociales: [
        { value: "Internet", text: "Internet" },
        { value: "Facebook", text: "Facebook" },
        { value: "Email", text: "Email" },
        { value: "Video", text: "Video" }
      ]
      //fin datos ficha ingreso psicologica
    };
  },
  methods: {
    ...mapMutations(["replaceFichaIngreso"]),
    mounteddropzone(){
      var file = { size: 123, name: "Firma del Documento", type: "image/jpg" };
      this.$refs.myVueDropzone.manuallyAddFile(file, this.fichaIngreso.contenido.firma.urlfirma,null,null,true);
    },
    limpiarCampos() {
      this.maltrato = {
        tipomaltrato: "",
        agresor: ""
      };
      this.spa = {
        tipospa: "",
        tiempoconsumo: "",
        frecuencia: ""
      };
      this.conductasriesgo = {
        conducta: "",
        observacion: ""
      };
      this.conductasemocionales = {
        indicador: "",
        observacion: ""
      };
      this.enfermedad = "";
      this.redessociales = "";
    },
    cerrarDialogo(){     
      this.$emit("cerrar-modal-edicion-ficha-ingreso");
      this.step = 1;
      this.$refs.myVueDropzone.removeAllFiles();
      this.limpiarCampos();
      this.$v.$reset();
    },
    async registrarFichaPsicologicaIngreso() {
      this.$v.fichaIngreso.$touch();
      
      if (this.$v.fichaIngreso.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        this.fichaIngreso.contenido.firma.nombre = this.user.usuario;
        this.fichaIngreso.contenido.firma.cargo = this.user.rol.nombre;

        let ficha = this.fichaIngreso;
        
        await axios
          .put("/documento/fichaingresopsicologica",ficha)
          .then((res) => {
            this.replaceFichaIngreso(res.data);
            this.cerrarDialogo();
          })
          .catch((err) => console.log(err));
            await this.mensaje(
              "success",
              "listo",
              "Ficha de Ingreso psicologica Modificada Satisfactoriamente",
              "<strong>Se redirigira a la Interfaz de Gestion<strong>"
            );
      }
    },
    //Metodos modal padres
    modalRegistrarPadres() {
      if (this.fichaIngreso.contenido.padres.length >= 2) {
        this.mensaje(
          "error",
          "Demasiados padres",
          "Solo se pueden registrar 2 padres",
          ""
        );
      } else {
        this.accion = "registrar";
        this.dialogAgregarpadre = true;
      }
    },
    agregarPadre() {
      this.$v.padre.$touch();
      if (this.$v.padre.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Debe completar los datos del padre",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      }
      else {
      let padre = {
        nombre: this.padre.nombre,
        apellidos: this.padre.apellidos,
        parentesco: this.padre.parentesco,
        edad: this.padre.edad,
        instruccion: this.padre.instruccion,
        estadosalud: this.padre.estadosalud,
        relacion: this.padre.relacion
      };
      this.fichaIngreso.contenido.padres.push(padre);
      this.padre.nombre = "";
      this.padre.apellidos = "";
      this.padre.parentesco = "";
      this.padre.edad = "";
      this.padre.instruccion = "";
      this.padre.estadosalud = "";
      this.padre.relacion = "";
      this.dialogAgregarpadre = false;
      this.$v.padre.$reset();
      }
    },
    cerrarAgregarPadre() {
      this.dialogAgregarpadre = false;

      this.padre.nombre = "";
      this.padre.apellidos = "";
      this.padre.parentesco = "";
      this.padre.instruccion = "";
      this.padre.estadosalud = "";
      this.padre.relacion = "";
      this.padre.edad = "";

      this.$v.padre.$reset();
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
      this.padre.edad = this.fichaIngreso.contenido.padres[index].edad;
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
      this.$v.padre.$touch();
      if (this.$v.padre.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Debe completar los datos del padre",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      }
      else {
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
      this.fichaIngreso.contenido.padres[index].edad = this.padre.edad;
      this.fichaIngreso.contenido.padres[index].relacion = this.padre.relacion;

      this.dialogAgregarpadre = false;
      this.$v.padre.$reset();
      }
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
      this.padre.edad = this.fichaIngreso.contenido.padres[index].edad;
      this.padre.relacion = this.fichaIngreso.contenido.padres[index].relacion;
    },
    //fin metodos modal padres
    //Metodos modal hermanos
    modalRegistrarhermano() {
      this.accionHermano = "registrar";
      this.dialogAgregarhermano = true;
    },
    agregarhermano() {
      this.$v.hermano.$touch();
      if (this.$v.hermano.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Debe completar los datos del hermano",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      }
      else {
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
      this.$v.hermano.$reset();
      }
    },
    cerrarAgregarhermano() {
      this.dialogAgregarhermano = false;

      this.hermano.nombre = "";
      this.hermano.edad = "";
      this.hermano.actividad = "";

      this.$v.hermano.$reset();
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
      this.$v.hermano.$touch();
      if (this.$v.hermano.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Debe completar los datos del hermano",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      }
      else {
      this.fichaIngreso.contenido.hermanos[index].nombre = this.hermano.nombre;
      this.fichaIngreso.contenido.hermanos[index].edad = this.hermano.edad;
      this.fichaIngreso.contenido.hermanos[
        index
      ].actividad = this.hermano.actividad;

      this.dialogAgregarhermano = false;
      this.$v.hermano.$reset();
      }
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
      this.$v.edadgradoescolar.$touch();
      if (!this.$v.edadgradoescolar.$invalid) {
        let edadgradoescolar = {
          edad: this.edadgradoescolar.edad,
          gradoescolar: this.edadgradoescolar.gradoescolar
        };

        this.fichaIngreso.contenido.escolaridad.edadgradoescolar.push(
          edadgradoescolar
        );

        this.edadgradoescolar.edad = "";
        this.edadgradoescolar.gradoescolar = "";
        this.$v.edadgradoescolar.$reset();
      }
    },
    eliminaredadgradoescolar(index) {
      this.fichaIngreso.contenido.escolaridad.edadgradoescolar.splice(index, 1);
    },
    agregarenfermedad() {
      this.$v.enfermedad.$touch();
      if (!this.$v.enfermedad.$invalid) {
        let enfermedadR = this.enfermedad;
        this.fichaIngreso.contenido.discapacidad.enfermedad.push(enfermedadR);
        this.enfermedad = "";
        this.$v.enfermedad.$reset();
      }
    },
    eliminarenfermedad(index) {
      this.fichaIngreso.contenido.discapacidad.enfermedad.splice(index, 1);
    },
    agregarmaltrato() {
      this.$v.maltrato.$touch();
      if (!this.$v.maltrato.$invalid) {
        let maltratoR = {
          tipomaltrato: this.maltrato.tipomaltrato,
          agresor: this.maltrato.agresor
        };

        this.fichaIngreso.contenido.maltrato.push(maltratoR);

        this.maltrato.tipomaltrato = "";
        this.maltrato.agresor = "";
        this.$v.maltrato.$reset();
      }
    },
    eliminarmaltrato(index) {
      this.fichaIngreso.contenido.maltrato.splice(index, 1);
    },
    agregarspa() {
      this.$v.spa.$touch();
      if (!this.$v.spa.$invalid) {
        let spaR = {
          tipospa: this.spa.tipospa,
          tiempoconsumo: this.spa.tiempoconsumo,
          frecuencia: this.spa.frecuencia
        };

        this.fichaIngreso.contenido.adicciones.spa.push(spaR);

        this.spa.tipospa = "";
        this.spa.tiempoconsumo = "";
        this.spa.frecuencia = "";
        this.$v.spa.$reset();
      }
    },
    eliminarspa(index) {
      this.fichaIngreso.contenido.adicciones.spa.splice(index, 1);
    },
    agregarconductasriesgo() {
      this.$v.conductasriesgo.$touch();
      if (!this.$v.conductasriesgo.$invalid) {
      let conductasriesgoR = {
        conducta: this.conductasriesgo.conducta,
        observacion: this.conductasriesgo.observacion
      };

      this.fichaIngreso.contenido.conductasriesgo.push(conductasriesgoR);

      this.conductasriesgo.conducta = "";
      this.conductasriesgo.observacion = "";
        this.$v.conductasriesgo.$reset();
      }
    },
    eliminarconductasriesgo(index) {
      this.fichaIngreso.contenido.conductasriesgo.splice(index, 1);
    },
    agregarconductasemocionales() {
      this.$v.conductasemocionales.$touch();
      if (!this.$v.conductasemocionales.$invalid) {
        let conductasemocionalesR = {
          indicador: this.conductasemocionales.indicador,
          observacion: this.conductasemocionales.observacion
        };

        this.fichaIngreso.contenido.conductasemocionales.push(
          conductasemocionalesR
        );

        this.conductasemocionales.indicador = "";
        this.conductasemocionales.observacion = "";
        this.$v.conductasemocionales.$reset();
      }
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
    afterSuccess2(file, response) {
      this.fichaIngreso.contenido.firma.urlfirma = file.dataURL.split(",")[1];
    },
    afterRemoved2(file, error, xhr) {
      this.fichaIngreso.contenido.firma.urlfirma = "";
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
    ...mapGetters(["user"]),
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close-dialog-fichaIngreso");
        }
      }
    },
    isDisabledPadre() {
      if (this.accion == "consultar") {
        return true;
      } else {
        return false;
      }
    },
    isDisabledHermano() {
      if (this.accionHermano == "consultar") {
        return true;
      } else {
        return false;
      }
    },
    //errores del formulario
    errorResidente() {
      const errors = [];

      if (!this.$v.fichaIngreso.idresidente.$dirty) return errors;

      !this.$v.fichaIngreso.idresidente.required &&
        errors.push("Debe ingresar un residente obligatoriamente");

      return errors;
    },
    errorresponsableturno() {
      const errors = [];

      if (!this.$v.fichaIngreso.contenido.responsableturno.$dirty)
        return errors;

      !this.$v.fichaIngreso.contenido.responsableturno.required &&
        errors.push("Debe ingresar un responsable de turno obligatoriamente");

      return errors;
    },
    errorFirma() {
      return this.$v.fichaIngreso.contenido.firma.urlfirma.required == false &&
        this.$v.fichaIngreso.contenido.firma.urlfirma.$dirty == true
        ? true
        : false;
    },
    errorpadres() {
      const errors = [];

      if (!this.$v.fichaIngreso.contenido.padres.$dirty) return errors;

      !this.$v.fichaIngreso.contenido.padres.required &&
        errors.push("Debe ingresar un padre por lo menos");

      return errors;
    },
    erroreducacionespecial() {
      const errors = [];

      if (!this.$v.fichaIngreso.contenido.escolaridad.educacionespecial.$dirty)
        return errors;

      !this.$v.fichaIngreso.contenido.escolaridad.educacionespecial.required &&
        errors.push("Debe ingresar la educación especial del residente");

      return errors;
    },
    errorniveleducativo() {
      const errors = [];

      if (!this.$v.fichaIngreso.contenido.escolaridad.niveleducativo.$dirty)
        return errors;

      !this.$v.fichaIngreso.contenido.escolaridad.niveleducativo.required &&
        errors.push("Debe ingresar el nivel educativo del residente");

      return errors;
    },
    errorintelectual() {
      const errors = [];

      if (!this.$v.fichaIngreso.contenido.discapacidad.intelectual.$dirty)
        return errors;

      !this.$v.fichaIngreso.contenido.discapacidad.intelectual.required &&
        errors.push("Debe ingresar la discapacidad intelectual del residente");

      return errors;
    },
    errorfisico() {
      const errors = [];

      if (!this.$v.fichaIngreso.contenido.discapacidad.fisico.$dirty)
        return errors;

      !this.$v.fichaIngreso.contenido.discapacidad.fisico.required &&
        errors.push("Debe ingresar la discapacidad física del residente");

      return errors;
    },
    errorsensorial() {
      const errors = [];

      if (!this.$v.fichaIngreso.contenido.discapacidad.sensorial.$dirty)
        return errors;

      !this.$v.fichaIngreso.contenido.discapacidad.sensorial.required &&
        errors.push("Debe ingresar la discapacidad sensorial del residente");

      return errors;
    },
    erroredadgradoescolaredad() {
      const errors = [];

      if (!this.$v.edadgradoescolar.edad.$dirty)
        return errors;

      !this.$v.edadgradoescolar.edad.required && errors.push("Debe ingresar la edad del grado escolar");

      !this.$v.edadgradoescolar.edad.numeric && errors.push("La edad debe ser numérica");

      !this.$v.edadgradoescolar.edad.edadvalida && errors.push("La edad debe ser entre 4 a 20 años");

      return errors;
    },
    errorgradoescolargradoescolar() {
      const errors = [];

      if (!this.$v.edadgradoescolar.gradoescolar.$dirty)
        return errors;

      !this.$v.edadgradoescolar.gradoescolar.required && errors.push("Debe ingresar el grado escolar obligatoriamente");

      return errors;
    },
    errorpadrenombre() {
      const errors = [];

      if (!this.$v.padre.nombre.$dirty) return errors;

      !this.$v.padre.nombre.required && errors.push("Debe ingresar el nombre");

      return errors;
    },
    errorpadreapellidos() {
      const errors = [];

      if (!this.$v.padre.apellidos.$dirty) return errors;

      !this.$v.padre.apellidos.required && errors.push("Debe ingresar los apellidos");

      return errors;
    },
    errorpadreparentesco() {
      const errors = [];

      if (!this.$v.padre.parentesco.$dirty) return errors;

      !this.$v.padre.parentesco.required && errors.push("Debe ingresar el parentesco");

      return errors;
    },
    errorpadreedad() {
      const errors = [];

      if (!this.$v.padre.edad.$dirty) return errors;

      !this.$v.padre.edad.required && errors.push("Debe ingresar la edad del padre");

      !this.$v.padre.edad.numeric && errors.push("La edad debe ser numérica");

      !this.$v.padre.edad.edadvalidapadre && errors.push("La edad debe ser entre 5 a 100 años");

      return errors;
    },
    errorpadreinstruccion() {
      const errors = [];

      if (!this.$v.padre.instruccion.$dirty) return errors;

      !this.$v.padre.instruccion.required && errors.push("Debe ingresar el grado de instrucción");

      return errors;
    },
    errorpadreestadosalud() {
      const errors = [];

      if (!this.$v.padre.estadosalud.$dirty) return errors;

      !this.$v.padre.estadosalud.required && errors.push("Debe ingresar el estadosalud");

      return errors;
    },
    errorpadrerelacion() {
      const errors = [];

      if (!this.$v.padre.relacion.$dirty) return errors;

      !this.$v.padre.relacion.required && errors.push("Debe ingresar la relacion con la residente");

      return errors;
    },
    errorhermanonombre() {
      const errors = [];

      if (!this.$v.hermano.nombre.$dirty) return errors;

      !this.$v.hermano.nombre.required && errors.push("Debe ingresar el nombre del hermano");

      return errors;
    },
    errorhermanoedad() {
      const errors = [];

      if (!this.$v.hermano.edad.$dirty) return errors;

      !this.$v.hermano.edad.required && errors.push("Debe ingresar la edad del hermano");

      !this.$v.hermano.edad.numeric && errors.push("La edad debe ser numérica");

      !this.$v.hermano.edad.edadvalidanormal && errors.push("La edad debe ser entre 0 a 100 años");

      return errors;
    },
    errorhermanoactividad() {
      const errors = [];

      if (!this.$v.hermano.actividad.$dirty) return errors;

      !this.$v.hermano.actividad.required && errors.push("Debe ingresar la actividad del hermano");

      return errors;
    },
    errorenfermedad() {
      const errors = [];

      if (!this.$v.enfermedad.$dirty) return errors;

      !this.$v.enfermedad.required && errors.push("Debe ingresar la enfermedad");

      return errors;
    },
    errormaltratotipomaltrato() {
      const errors = [];

      if (!this.$v.maltrato.tipomaltrato.$dirty) return errors;

      !this.$v.maltrato.tipomaltrato.required && errors.push("Debe ingresar el tipo de maltrato");

      return errors;
    },
    errormaltratoagresor() {
      const errors = [];

      if (!this.$v.maltrato.agresor.$dirty) return errors;

      !this.$v.maltrato.agresor.required && errors.push("Debe ingresar el agresor");

      return errors;
    },
    errorspatipospa() {
      const errors = [];

      if (!this.$v.spa.tipospa.$dirty) return errors;

      !this.$v.spa.tipospa.required && errors.push("Debe ingresar el tipo de spa");

      return errors;
    },
    errorspatiempoconsumo() {
      const errors = [];

      if (!this.$v.spa.tiempoconsumo.$dirty) return errors;

      !this.$v.spa.tiempoconsumo.required && errors.push("Debe ingresar el tiempo de consumo");

      return errors;
    },
    errorspafrecuencia() {
      const errors = [];

      if (!this.$v.spa.frecuencia.$dirty) return errors;

      !this.$v.spa.frecuencia.required && errors.push("Debe ingresar la frecuencia");

      return errors;
    },
    errorconductasriesgoconducta() {
      const errors = [];

      if (!this.$v.conductasriesgo.conducta.$dirty) return errors;

      !this.$v.conductasriesgo.conducta.required && errors.push("Debe ingresar la conducta");

      return errors;
    },
    errorconductasriesgoobservacion() {
      const errors = [];

      if (!this.$v.conductasriesgo.observacion.$dirty) return errors;

      !this.$v.conductasriesgo.observacion.required && errors.push("Debe ingresar la observacion");

      return errors;
    },
    errorconductasemocionalesindicador() {
      const errors = [];

      if (!this.$v.conductasemocionales.indicador.$dirty) return errors;

      !this.$v.conductasemocionales.indicador.required && errors.push("Debe ingresar el indicador");

      return errors;
    },
    errorconductasemocionalesobservacion() {
      const errors = [];

      if (!this.$v.conductasemocionales.observacion.$dirty) return errors;

      !this.$v.conductasemocionales.observacion.required && errors.push("Debe ingresar la observacion");

      return errors;
    },
  },
  validations: {
    conductasriesgo: {
        conducta: {
        required
      },
        observacion: {
        required
      },
      },
      conductasemocionales: {
        indicador: {
        required
      },
        observacion: {
        required
      },
      },
    spa: {
      tipospa: {
        required
      },
      tiempoconsumo: {
        required
      },
      frecuencia: {
        required
      }
    },
    maltrato: {
        tipomaltrato: {
        required
      },
        agresor: {
        required
      }
    },
    edadgradoescolar: {
      edad: {
        required,
        numeric,
        edadvalida
      },
      gradoescolar: {
        required
      }
    },
    enfermedad: {
      required
    },
    padre: {
     nombre: {
        required
      },
     apellidos: {
        required
      },
     parentesco: {
        required
      },
     edad: {
        required,
        numeric,
        edadvalidapadre
      },
     instruccion: {
        required
      },
     estadosalud: {
        required
      },
     relacion: {
        required
      },
    },
    hermano: {
      nombre: {
        required
      },
      edad: {
        required,
        numeric,
        edadvalidanormal
      },
      actividad: {
        required
      },
    },
    fichaIngreso: {
      idresidente: {
        required
      },
      contenido: {
        responsableturno: {
          required
        },
        firma: {
          urlfirma: {
            required,
          },
        },
        padres: {
          required
        },
        escolaridad: {
          niveleducativo: {
            required
          },
          educacionespecial: {
            required
          }
        },
        discapacidad: {
          intelectual: {
            required
          },
          fisico: {
            required
          },
          sensorial: {
            required
          }
        }
      }
    }
  }
};
</script>