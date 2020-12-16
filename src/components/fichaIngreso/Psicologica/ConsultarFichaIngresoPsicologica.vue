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
              <v-card style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA">  
                <v-card-title>
                      Residentes Registrado
                </v-card-title>
                <v-card style="margin:10px;padding:10px" height="100px">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                                    :value="obtenerResidente"
                                    label="Nombre del Residente"
                                    outlined
                                    color="info"
                                    readonly
                                  ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                                    :value="obtenerIdentificacion"
                                    label="Identificacion del Residente"
                                    outlined
                                    color="info"
                                    readonly
                                  ></v-text-field>
                    </v-col>
                    <v-col cols="2"></v-col>
                  </v-row>
                </v-card>
              </v-card>

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
                readonly
                style="margin-top: 20px"
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
                        readonly
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
                        readonly
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-card elevation="3" outlined>
                    <v-card-title>Grado escolar por edad (si tuviera)</v-card-title>
                    <v-list flat>
                      <v-list-item
                        v-for="(item, i) in fichaIngreso.contenido.escolaridad.edadgradoescolar"
                        :key="i"
                        class="item-list"
                      >
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
                              readonly
                            ></v-textarea>
                            <v-textarea
                              label="Apellidos"
                              v-model="padre.apellidos"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              readonly
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
                                  readonly
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
                                  readonly
                                ></v-textarea>
                              </v-col>
                              <v-col>
                                <v-select
                                  :items="listaPadreparentesco"
                                  v-model="padre.parentesco"
                                  label="Parentesco"
                                  outlined
                                  readonly
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
                                  readonly
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
                                  readonly
                                ></v-textarea>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
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
                              color="blue"
                              @click="modalConsultarPadre(index)"
                            >
                              <v-icon dark>mdi-eye</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>

              <v-card style="padding:5px;margin:40px 0 18px 0;background-color:#EAEAEA">
                <v-card-title>
                  <v-row>
                    <v-col :cols="8">Hermanos del residente</v-col>
                    <v-col :cols="4" align="right">
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
                              readonly
                            ></v-textarea>
                            <v-textarea
                              label="Edad"
                              v-model.number="hermano.edad"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              readonly
                            ></v-textarea>

                            <v-textarea
                              label="Actividad"
                              v-model="hermano.actividad"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              readonly
                            ></v-textarea>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
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
                              color="blue"
                              @click="modalConsultarhermano(index)"
                            >
                              <v-icon dark>mdi-eye</v-icon>
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
                        readonly=""
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-select
                        :items="listaDiscapacidad"
                        v-model="fichaIngreso.contenido.discapacidad.fisico"
                        label="Discapacidad física"
                        outlined
                        readonly
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-select
                        :items="listaDiscapacidad"
                        v-model="fichaIngreso.contenido.discapacidad.sensorial"
                        label="Discapacidad sensorial"
                        outlined
                        readonly
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-card elevation="3" outlined>
                    <v-card-title>Enfermedades</v-card-title>
                    <v-list flat>
                      <v-list-item
                        v-for="(item, i) in fichaIngreso.contenido.discapacidad.enfermedad"
                        :key="i"
                        class="item-list"
                      >
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
                        readonly
                      ></v-textarea>
                    </v-col>
                    <v-col>
                      <v-textarea
                        label="Veces que tuvo abuso sexual"
                        v-model.number="fichaIngreso.contenido.abusosexual.veces"
                        outlined
                        color="#009900"
                        rows="1"
                        auto-grow
                        readonly
                      ></v-textarea>
                    </v-col>
                  </v-row>

                  <v-switch
                    v-model="fichaIngreso.contenido.abusosexual.atencionpsicologica"
                    :label="`¿Recibio atención psicológica? Respuesta: ${ fichaIngreso.contenido.abusosexual.atencionpsicologica ? 'SI' : 'NO'}`"
                    readonly
                  ></v-switch>
                </v-container>
              </v-card>

              <v-card elevation="6" outlined style="margin-top: 20px">
                <v-card-title>Evidencia de maltrato</v-card-title>
                <v-list flat>
                  <v-list-item
                    v-for="(item, i) in fichaIngreso.contenido.maltrato"
                    :key="i"
                    class="item-list"
                  >
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
                        readonly
                      ></v-switch>
                    </v-col>
                    <v-col>
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                        disabled
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
                    </v-col>
                  </v-row>

                  <v-card elevation="3" outlined>
                    <v-card-title>Consumo de sustancias psicoadictivas - SPA (si consumiera)</v-card-title>
                    <v-list flat>
                      <v-list-item
                        v-for="(item, i) in fichaIngreso.contenido.adicciones.spa"
                        :key="i"
                        class="item-list"
                      >
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
                <v-list flat>
                  <v-list-item
                    v-for="(item, i) in fichaIngreso.contenido.conductasriesgo"
                    :key="i"
                    class="item-list"
                  >
                    <v-list-item-content>
                      <v-list-item-title>Conducta: {{ item.conducta }} - Obs: {{ item.observacion }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card elevation="6" outlined style="margin-top: 20px">
                <v-card-title>Indicadores emocionales/conductuales</v-card-title>
                <v-list flat>
                  <v-list-item
                    v-for="(item, i) in fichaIngreso.contenido.conductasemocionales"
                    :key="i"
                    class="item-list"
                  >
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
                        readonly
                      ></v-switch>
                    </v-col>
                    <v-col>
                      <v-menu
                        v-model="menu3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                        disabled
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
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="fichaIngreso.contenido.desarrollosexual.menarquia"
                          @input="menu3 = false"
                        ></v-date-picker>
                      </v-menu>
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
                            readonly
                          ></v-switch>
                        </v-col>
                        <v-col>
                          <v-textarea
                            label="Edad inicio de relaciones"
                            v-model.number="fichaIngreso.contenido.desarrollosexual.relaciones.edadinicio"
                            outlined
                            color="#009900"
                            rows="1"
                            auto-grow
                            readonly
                          ></v-textarea>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col>
                          <v-select
                            :items="listaMotivorelaciones"
                            v-model="fichaIngreso.contenido.desarrollosexual.relaciones.motivo"
                            label="Motivo de las relaciones"
                            outlined
                            readonly
                          ></v-select>
                        </v-col>
                        <v-col>
                          <v-select
                            :items="listaParejasexual"
                            v-model="fichaIngreso.contenido.desarrollosexual.relaciones.generopareja"
                            label="Genero de la pareja"
                            outlined
                            readonly
                          ></v-select>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col>
                          <v-switch
                            v-model="fichaIngreso.contenido.desarrollosexual.relaciones.relacionconsentida"
                            :label="`¿Fue relacion consentida? Respuesta:${ fichaIngreso.contenido.desarrollosexual.relaciones.relacionconsentida ? 'SI' : 'NO'}`"
                            readonly
                          ></v-switch>
                        </v-col>
                        <v-col>
                          <v-switch
                            v-model="fichaIngreso.contenido.desarrollosexual.relaciones.its"
                            :label="`¿Tiene ITS? Respuesta:${ fichaIngreso.contenido.desarrollosexual.relaciones.its ? 'SI' : 'NO'}`"
                            readonly
                          ></v-switch>
                        </v-col>
                        <v-col>
                          <v-switch
                            v-model="fichaIngreso.contenido.desarrollosexual.relaciones.tratamientoits"
                            :label="`¿Tuvo tratamiento de la ITS? Respuesta:${ fichaIngreso.contenido.desarrollosexual.relaciones.tratamientoits ? 'SI' : 'NO'}`"
                            readonly
                          ></v-switch>
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
                        readonly
                      ></v-switch>
                    </v-col>
                    <v-col>
                      <v-textarea
                        label="Edad inicio de explotación"
                        v-model.number="fichaIngreso.contenido.explotacionsexual.edadinicio"
                        outlined
                        color="#009900"
                        rows="1"
                        auto-grow
                        readonly
                      ></v-textarea>
                    </v-col>
                    <v-col>
                      <v-switch
                        v-model="fichaIngreso.contenido.explotacionsexual.victimatrata"
                        :label="`¿Fue víctima de trata? Respuesta:${ fichaIngreso.contenido.explotacionsexual.victimatrata ? 'SI' : 'NO'}`"
                        readonly
                      ></v-switch>
                    </v-col>
                  </v-row>

                  <v-card style="padding:5px;margin:40px 0 18px 0;background-color:#EAEAEA">
                    <v-card-title>
                      <v-row>
                        <v-col :cols="8">Trata sexual</v-col>
                        <v-col :cols="4" align="right">
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
                                      readonly
                                    ></v-select>
                                  </v-col>
                                  <v-col>
                                    <v-textarea
                                      label="Duración"
                                      v-model="tratasexual.duracion"
                                      outlined
                                      color="#009900"
                                      rows="1"
                                      auto-grow
                                      readonly
                                    ></v-textarea>
                                  </v-col>
                                  <v-col>
                                    <v-textarea
                                      label="Lugar"
                                      v-model="tratasexual.lugar"
                                      outlined
                                      color="#009900"
                                      rows="1"
                                      auto-grow
                                      readonly
                                    ></v-textarea>
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
                                      readonly
                                    ></v-textarea>
                                  </v-col>
                                  <v-col>
                                    <v-textarea
                                      label="Referencias"
                                      v-model="tratasexual.referencias"
                                      outlined
                                      color="#009900"
                                      rows="1"
                                      auto-grow
                                      readonly=""
                                    ></v-textarea>
                                  </v-col>
                                </v-row>

                                <v-card
                                  style="margin-top:30px;padding:5px 5px;padding-bottom:15px;background-color:#EAEAEA"
                                >
                                  <v-chip
                                    class="ma-2"
                                    color="green"
                                    text-color="white"
                                    >Personas de contacto</v-chip>
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
                                    </v-row>
                                  </v-card>
                                </v-card>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
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
                                  color="blue"
                                  @click="modalConsultartratasexual(index)"
                                >
                                  <v-icon dark>mdi-eye</v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </div>
                    </v-card-text>
                  </v-card>
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
                    readonly
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Habilidades deportivas"
                    v-model="fichaIngreso.contenido.actividades.habilidadesdeportivas"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
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
                    readonly
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Observaciones (Opcional)"
                    v-model="fichaIngreso.contenido.observaciones"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card
                style="margin-top:30px;padding:5px 5px;padding-bottom:15px;background-color:#EAEAEA"
                >
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                >Redes sociales</v-chip>
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
                                v-model="this.fichaIngreso.contenido.firma.nombre"
                                label="Autor de la ficha de ingreso"
                                outlined
                                color="info"
                                readonly
                              ></v-text-field>
                        </v-card >
                             <v-card class="subcard" color="#e6f3ff">
                                 <v-text-field
                                  v-model="this.fichaIngreso.contenido.firma.cargo"
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
                         <img
                           width="100%"
                           height="100%"
                           :src="this.fichaIngreso.contenido.firma.urlfirma"
                           alt=""
                           />
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
import { mapMutations, mapState } from "vuex";

import moment from "moment";

import { mapGetters } from "vuex";
export default {
  props: ["listaresidentes", "listaeducadores", "fichaIngreso"],
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
      ],
      responsableTurnoAux:""
      //fin datos ficha ingreso psicologica
    };
  },
  methods: {
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
      this.$emit("cerrar-modal-detalle-ficha-ingreso");
      this.step = 1;
      this.limpiarCampos();
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
    cerrarAgregarPadre() {
      this.dialogAgregarpadre = false;

      this.padre.nombre = "";
      this.padre.apellidos = "";
      this.padre.parentesco = "";
      this.padre.instruccion = "";
      this.padre.estadosalud = "";
      this.padre.relacion = "";
      this.padre.edad = "";
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
    cerrarAgregarhermano() {
      this.dialogAgregarhermano = false;

      this.hermano.nombre = "";
      this.hermano.edad = "";
      this.hermano.actividad = "";
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
    //modal tratasexual
    modalRegistrartratasexual() {
      this.acciontratasexual = "registrar";
      this.dialogAgregartratasexual = true;
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
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer
      });
    }
  },
  async created() {
      this.responsableTurnoAux = this.listaeducadores
      .find(x => x.id == this.fichaIngreso.contenido.responsableturno)
    },
  computed: {
    ...mapGetters(["user"]),
    obtenerResidente(){
        return `${this.fichaIngreso.residente.nombre} ${this.fichaIngreso.residente.apellido}`
    },obtenerIdentificacion(){
        return `${this.fichaIngreso.residente.tipoDocumento}: ${this.fichaIngreso.residente.numeroDocumento}`
    },
    ObtenerResponsableTurno(){
         return `${this.responsableTurnoAux.datos.nombre} ${this.responsableTurnoAux.datos.apellido}`
      },obtenerIdentificacionResponsable(){
          return `${this.responsableTurnoAux.datos.tipodocumento}: ${this.responsableTurnoAux.datos.numerodocumento}`
      },
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
  },
};
</script>