<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Ficha de Ingreso Social</v-card-title>
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
                    item-value="id"
                    @input="$v.fichaIngreso.idresidente.$touch()"
                    @blur="$v.fichaIngreso.idresidente.$touch()"
                    :error-messages="errorResidente"
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
                    v-model="fichaIngreso.contenido.familiar.tipofamilia"
                    label="Tipo de familia"
                    outlined
                    @input="$v.fichaIngreso.contenido.familiar.tipofamilia.$touch()"
                    @blur="$v.fichaIngreso.contenido.familiar.tipofamilia.$touch()"
                    :error-messages="errorTipofamilia"
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
                    @input="$v.fichaIngreso.contenido.familiar.problematicafam.$touch()"
                    @blur="$v.fichaIngreso.contenido.familiar.problematicafam.$touch()"
                    :error-messages="errorProblematicafamiliar"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom: 15px;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <v-text-field 
                        v-model="motivoIngreso" 
                        label="Motivo Ingreso" 
                        color="#009900"
                        @input="$v.motivoIngreso.$touch()"
                        @blur="$v.motivoIngreso.$touch()"
                        :error-messages="errorTextomotivoingreso"
                        ></v-text-field>
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
                  style="margin:5px; margin-top: 20px;"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.familiar.motivoingreso"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <span>Motivo de ingreso: {{ item }}</span>
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
              <div>
                <h4
                  v-if="$v.fichaIngreso.contenido.familiar.motivoingreso.$error"
                  class="red--text"
                >Debe tener como mínimo un motivo de ingreso registrado</h4>
              </div>

              <v-card style="padding:5px;margin:40px 0 18px 0;background-color:#EAEAEA">
                <v-card-title>
                  <v-row>
                    <v-col :cols="8">Composición Familiar</v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="modalRegistrar()">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                      <v-dialog v-model="dialogAgregarFamiliar" persistent max-width="600px">
                        <v-card align="center">
                          <v-card-title>
                            <span class="headline">Datos familiar</span>
                          </v-card-title>
                          <v-card-text>
                            <v-textarea
                              label="Nombres"
                              v-model="familiar.nombre"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              :readonly="isDisabled"
                                @input="$v.familiar.nombre.$touch()"
                                @blur="$v.familiar.nombre.$touch()"
                                :error-messages="errorNombreFamiliar"
                            ></v-textarea>
                            <v-textarea
                              label="Apellidos"
                              v-model="familiar.apellido"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              :readonly="isDisabled"
                                @input="$v.familiar.apellido.$touch()"
                                @blur="$v.familiar.apellido.$touch()"
                                :error-messages="errorApellidoFamiliar"
                            ></v-textarea>
                            <v-row>
                              <v-col>
                                <v-textarea
                                  label="Nro. Documento"
                                  v-model="familiar.numerodocumento"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  :readonly="isDisabled"
                                  @input="$v.familiar.numerodocumento.$touch()"
                                  @blur="$v.familiar.numerodocumento.$touch()"
                                  :error-messages="errorNumeroDocumentoFamiliar"
                                ></v-textarea>
                              </v-col>
                              <v-col>
                                <v-textarea
                                  label="Edad"
                                  v-model="familiar.edad"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  :readonly="isDisabled"
                                    @input="$v.familiar.edad.$touch()"
                                    @blur="$v.familiar.edad.$touch()"
                                    :error-messages="errorEdadFamiliar"
                                ></v-textarea>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-textarea
                                  label="Parentesco"
                                  v-model="familiar.parentesco"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  :readonly="isDisabled"
                                    @input="$v.familiar.parentesco.$touch()"
                                    @blur="$v.familiar.parentesco.$touch()"
                                    :error-messages="errorParentescoFamiliar"
                                ></v-textarea>
                              </v-col>
                              <v-col>
                                <v-textarea
                                  label="Grado instrucción"
                                  v-model="familiar.gradoinstruccion"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  :readonly="isDisabled"
                                    @input="$v.familiar.gradoinstruccion.$touch()"
                                    @blur="$v.familiar.gradoinstruccion.$touch()"
                                    :error-messages="errorGradoInstruccionFamiliar"
                                ></v-textarea>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-textarea
                                  label="Ocupación"
                                  v-model="familiar.ocupacion"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  :readonly="isDisabled"
                                    @input="$v.familiar.ocupacion.$touch()"
                                    @blur="$v.familiar.ocupacion.$touch()"
                                    :error-messages="errorOcupacionFamiliar"
                                ></v-textarea>
                              </v-col>
                              <v-col>
                                <v-textarea
                                  label="Estado civil"
                                  v-model="familiar.estadocivil"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                    :readonly="isDisabled"
                                    @input="$v.familiar.estadocivil.$touch()"
                                    @blur="$v.familiar.estadocivil.$touch()"
                                    :error-messages="errorEstadoCivil"
                                ></v-textarea>
                              </v-col>
                            </v-row>

                            <v-textarea
                              label="Observaciones"
                              v-model="familiar.observaciones"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                            ></v-textarea>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              v-if="accion == 'registrar'"
                              color="success"
                              @click="agregarFamiliar()"
                            >
                              <v-icon left class="mr-0 icon-plan">mdi-check</v-icon>Agregar
                            </v-btn>
                            <v-btn
                              v-if="accion == 'actualizar'"
                              color="yellow"
                              @click="actualizarFamiliar(indice)"
                            >
                              <v-icon left class="mr-0 icon-plan">mdi-pencil</v-icon>Actualizar
                            </v-btn>
                            <v-btn color="error" @click="cerrarAgregarFamiliar()">
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
                  <div
                    v-for="(item, index) in fichaIngreso.contenido.familiar.familiares"
                    :key="index"
                  >
                    <v-row>
                      <v-col>{{ item.nombre }} {{ item.apellido }}</v-col>
                      <v-col>{{ item.parentesco }}</v-col>
                      <v-col>
                        <v-row style="padding:0;margin:0">
                          <v-col style="padding:0;margin:0">
                            <v-btn fab x-small dark color="yellow" @click="modalActualizar(index)">
                              <v-icon dark>mdi-pen</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col style="padding:0;margin:0">
                            <v-btn fab x-small dark color="blue" @click="modalConsultar(index)">
                              <v-icon dark>mdi-eye</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col style="padding:0;margin:0">
                            <v-btn fab x-small dark color="red" @click="eliminarFamiliar(index)">
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
                  v-if="$v.fichaIngreso.contenido.familiar.familiares.$error"
                  class="red--text"
                >Debe tener como mínimo un familiar registrado</h4>
              </div>

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
                    @input="$v.fichaIngreso.contenido.vivienda.ubicacion.$touch()"
                    @blur="$v.fichaIngreso.contenido.vivienda.ubicacion.$touch()"
                    :error-messages="errorUbicacion"
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
                    @input="$v.fichaIngreso.contenido.vivienda.descripcionubicacion.$touch()"
                    @blur="$v.fichaIngreso.contenido.vivienda.descripcionubicacion.$touch()"
                    :error-messages="errorDescripcionubicacion"
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
                    @input="$v.fichaIngreso.contenido.vivienda.habitacionesdormir.$touch()"
                    @blur="$v.fichaIngreso.contenido.vivienda.habitacionesdormir.$touch()"
                    :error-messages="errorHabitacionesdormir"
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
                    @input="$v.fichaIngreso.contenido.vivienda.tipopropiedad.$touch()"
                    @blur="$v.fichaIngreso.contenido.vivienda.tipopropiedad.$touch()"
                    :error-messages="errorTipopropiedad"
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
                    @input="$v.fichaIngreso.contenido.vivienda.tipo.$touch()"
                    @blur="$v.fichaIngreso.contenido.vivienda.tipo.$touch()"
                    :error-messages="errorTipo"
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
                    @input="$v.fichaIngreso.contenido.vivienda.material.$touch()"
                    @blur="$v.fichaIngreso.contenido.vivienda.material.$touch()"
                    :error-messages="errorMaterial"
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
                    @input="$v.fichaIngreso.contenido.vivienda.tipopiso.$touch()"
                    @blur="$v.fichaIngreso.contenido.vivienda.tipopiso.$touch()"
                    :error-messages="errorTipopiso"
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
                    @input="$v.fichaIngreso.contenido.vivienda.tipotecho.$touch()"
                    @blur="$v.fichaIngreso.contenido.vivienda.tipotecho.$touch()"
                    :error-messages="errorTipotecho"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom: 15px;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <v-text-field
                        v-model="habitante"
                        label="Habitante de la vivienda"
                        color="#009900"
                        @input="$v.habitante.$touch()"
                        @blur="$v.habitante.$touch()"
                        :error-messages="errorTextohabitante"
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
                  style="margin:5px; margin-top: 20px;"
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
              <div>
                <h4
                  v-if="$v.fichaIngreso.contenido.vivienda.habitantes.$error"
                  class="red--text"
                >Debe tener como mínimo un habitante registrado</h4>
              </div>

              <v-card style="margin-top:30px;padding:5px 5px;padding-bottom:15px;background-color:#EAEAEA">
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="4" align="left">
                      <v-text-field
                        v-model.trim="servicio.servicio"
                        label="Servicio"
                        color="#009900"
                        @input="$v.servicio.servicio.$touch()"
                        @blur="$v.servicio.servicio.$touch()"
                        :error-messages="errorTextoservicio"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="left">
                      <v-text-field 
                        v-model.trim="servicio.tipo" 
                        label="Tipo" 
                        color="#009900"
                        @input="$v.servicio.tipo.$touch()"
                        @blur="$v.servicio.tipo.$touch()"
                        :error-messages="errorTextoserviciotipo"
                      ></v-text-field>
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
                  style="margin-top:5px; margin-top: 20px;"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.vivienda.servicios"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10">
                      <span style="font-size:18px">Servicio: {{ item.servicio }} - Tipo: {{ item.tipo }}</span>
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
              <div>
                <h4
                  v-if="$v.fichaIngreso.contenido.vivienda.servicios.$error"
                  class="red--text"
                >Debe tener como mínimo un servicio registrado</h4>
              </div>

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
                    @input="$v.fichaIngreso.contenido.economico.condicionlaboral.$touch()"
                    @blur="$v.fichaIngreso.contenido.economico.condicionlaboral.$touch()"
                    :error-messages="errorCondicionlaboral"
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
                    @input="$v.fichaIngreso.contenido.economico.ocupacion.$touch()"
                    @blur="$v.fichaIngreso.contenido.economico.ocupacion.$touch()"
                    :error-messages="errorOcupacion"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Observacion (Opcional)"
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
                    @input="$v.fichaIngreso.contenido.salud.$touch()"
                    @blur="$v.fichaIngreso.contenido.salud.$touch()"
                    :error-messages="errorSalud"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom: 15px;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <v-text-field 
                        v-model.trim="ingreso" 
                        label="Ingresos" 
                        color="#009900"
                        @input="$v.ingreso.$touch()"
                        @blur="$v.ingreso.$touch()"
                        :error-messages="errorTextoingreso"
                      ></v-text-field>
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
              <div>
                <h4
                  v-if="$v.fichaIngreso.contenido.economico.ingresos.$error"
                  class="red--text"
                >Debe tener como mínimo un ingreso registrado</h4>
              </div>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom: 15px;background-color:#EAEAEA"
              >
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <v-text-field 
                        v-model.trim="egreso" 
                        label="Egresos" 
                        color="#009900"
                        @input="$v.egreso.$touch()"
                        @blur="$v.egreso.$touch()"
                        :error-messages="errorTextoegreso"
                      ></v-text-field>
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
              <div>
                <h4
                  v-if="$v.fichaIngreso.contenido.economico.egresos.$error"
                  class="red--text"
                >Debe tener como mínimo un egreso registrado</h4>
              </div>

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
                @input="$v.fichaIngreso.contenido.legal.apoyolocal.$touch()"
                @blur="$v.fichaIngreso.contenido.legal.apoyolocal.$touch()"
                :error-messages="errorApoyolocal"
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
                    @input="$v.fichaIngreso.contenido.diagnosticosocial.$touch()"
                    @blur="$v.fichaIngreso.contenido.diagnosticosocial.$touch()"
                    :error-messages="errorDiagnosticosocial"
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
                    @input="$v.fichaIngreso.contenido.planintervencion.$touch()"
                    @blur="$v.fichaIngreso.contenido.planintervencion.$touch()"
                    :error-messages="errorPlanintervencion"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card style="margin-top:30px;padding:5px 5px;padding-bottom:15px;background-color:#EAEAEA">
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                >Antecedentes penales en familares del residente</v-chip>
                <v-card elevation="0" style="background-color:#EAEAEA" height="70">
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="4" align="left">
                      <v-text-field 
                        v-model.trim="penal.familiar" 
                        label="Familiar"
                        color="#009900"
                        @input="$v.penal.familiar.$touch()"
                        @blur="$v.penal.familiar.$touch()"
                        :error-messages="errorTextopenalfamiliar"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="left">
                      <v-text-field 
                        v-model.trim="penal.motivo"
                        label="Motivo"
                        color="#009900"
                        @input="$v.penal.motivo.$touch()"
                        @blur="$v.penal.motivo.$touch()"
                        :error-messages="errorTextopenalmotivo"
                      ></v-text-field>
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
                      <span style="font-size:18px">Familiar: {{ item.familiar }} - Motivo: {{ item.motivo }}</span>
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
                  <v-btn block @click="registrarFichaIngresoSocial" color="success">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    <span>Actualizar Ficha de ingreso social</span>
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
import { required, minLength, email, helpers, numeric, between } from "vuelidate/lib/validators";
import moment from "moment";

import { mapGetters } from "vuex";

function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}

export default {
  props: ["listaresidentes", "fichaIngreso"],
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      //modal composicion familiar
      accion: "registrar",
      dialogAgregarFamiliar: false,
      familiar: {
        nombre: "",
        apellido: "",
        numerodocumento: "",
        parentesco: "",
        edad: "",
        estadocivil: "",
        gradoinstruccion: "",
        ocupacion: "",
        observaciones: ""
      },
      //fin modal composicion familiar
      itemFamilias: [
        { value: "Nuclear", text: "Nuclear" },
        { value: "Extensa", text: "Extensa" },
        { value: "Monoparental", text: "Monoparental" },
        { value: "Homoparental", text: "Homoparental" },
        { value: "Desintegrada", text: "Desintegrada" },
        { value: "Reconstruida", text: "Reconstruida" },
        { value: "Acogida", text: "Acogida" }
      ],

      dialogVistaPreviaFirma: false,
      datemenu: false,
      step: 1,

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

      motivoIngreso: "",
      motivosIngreso: [],

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

      imagen: ""
    };
  },

  methods: {
    ...mapMutations(["replaceFichaIngreso"]),
    mounteddropzone(){
      var file = { size: 123, name: "Firma del Documento", type: "image/jpg" };
      this.$refs.myVueDropzone.manuallyAddFile(file, this.fichaIngreso.contenido.firma.urlfirma,null,null,true);
    },
    cerrarDialogo(){     
      this.$emit("cerrar-modal-edicion-ficha-ingreso");
      this.step = 1;
      this.$refs.myVueDropzone.removeAllFiles();
      this.limpiarCampos();
      this.$v.$reset();
    },
    async registrarFichaIngresoSocial() {
      //await this.sendPDFFiles();

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
          .put("/documento/fichaingresosocial",ficha)
          .then((res) => {
            this.replaceFichaIngreso(res.data);
            this.cerrarDialogo();
          })
          .catch((err) => console.log(err));
            await this.mensaje(
              "success",
              "listo",
              "Ficha de Ingreso social Modificada Satisfactoriamente",
              "<strong>Se redirigira a la Interfaz de Gestion<strong>"
            );
        /*await axios
          .post("/documento/fichaingresosocialcrear", ficha)
          .then(res => {
            this.mensaje(
              "success",
              "Listo",
              "Ficha de ingreso social registrada satisfactoriamente",
              "<strong>Se redirigira a la interfaz de fichas<strong>"
            );

            this.$v.motivoIngreso.$reset();
            this.cerrarDialogo();
          })
          .catch(err => console.log(err));*/
      }
    },
    agregarMotivoIngreso() {
      this.$v.motivoIngreso.$touch();
      if (!this.$v.motivoIngreso.$invalid) {
        let motivoIngresoR = this.motivoIngreso;
        this.fichaIngreso.contenido.familiar.motivoingreso.push(motivoIngresoR);
        this.motivoIngreso = "";
        this.$v.motivoIngreso.$reset();
      }
    },
    eliminarMotivoIngreso(index) {
      this.fichaIngreso.contenido.familiar.motivoingreso.splice(index, 1);
    },
    agregarServicio() {
      this.$v.servicio.$touch();
      if (!this.$v.servicio.$invalid) {
        let servicioV = {
          servicio: this.servicio.servicio,
          tipo: this.servicio.tipo
        };

        this.fichaIngreso.contenido.vivienda.servicios.push(servicioV);

        this.servicio.servicio = "";
        this.servicio.tipo = "";
        this.$v.servicio.$reset();
      }
    },
    eliminarServicio(index) {
      this.fichaIngreso.contenido.vivienda.servicios.splice(index, 1);
    },
    agregarHabitante() {
      this.$v.habitante.$touch();
      if (!this.$v.habitante.$invalid) {
        let habitanteR = this.habitante;
        this.fichaIngreso.contenido.vivienda.habitantes.push(habitanteR);
        this.habitante = "";
        this.$v.habitante.$reset();
      }
    },
    eliminarHabitante(index) {
      this.fichaIngreso.contenido.vivienda.habitantes.splice(index, 1);
    },
    agregarIngreso() {
      this.$v.ingreso.$touch();
      if (!this.$v.ingreso.$invalid) {
        let ingresoR = this.ingreso;
        this.fichaIngreso.contenido.economico.ingresos.push(ingresoR);
        this.ingreso = "";
        this.$v.ingreso.$reset();
      }
    },
    eliminarIngreso(index) {
      this.fichaIngreso.contenido.economico.ingresos.splice(index, 1);
    },
    agregarEgreso() {
      this.$v.egreso.$touch();
      if (!this.$v.egreso.$invalid) {
         let egresoR = this.egreso;
        this.fichaIngreso.contenido.economico.egresos.push(egresoR);
        this.egreso = "";
        this.$v.egreso.$reset();
      }
    },
    eliminarEgreso(index) {
      this.fichaIngreso.contenido.economico.egresos.splice(index, 1);
    },
    agregarPenal() {
      this.$v.penal.$touch();
      if (!this.$v.penal.$invalid) {
        let penalV = {
          familiar: this.penal.familiar,
          motivo: this.penal.motivo
        };

        this.fichaIngreso.contenido.legal.penales.push(penalV);

        this.penal.familiar = "";
        this.penal.motivo = "";
        this.$v.penal.$reset();
      }
    },
    eliminarPenal(index) {
      this.fichaIngreso.contenido.legal.penales.splice(index, 1);
    },
    agregarFirma() {
      this.$v.firmas.$touch();
      this.$v.urlfirma.$touch();

      if (!this.$v.firmas.$invalid && !this.$v.urlfirma.$invalid) {
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
        this.$v.firmas.$reset();
        this.$v.urlfirma.$reset();
      }
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
      this.fichaIngreso.contenido.firma.urlfirma = file.dataURL.split(",")[1];
    },
    afterRemoved2(file, error, xhr) {
      this.fichaIngreso.contenido.firma.urlfirma = "";
    },
    //Del modal de composicion familiar
    modalRegistrar() {
      this.accion = "registrar";
      this.dialogAgregarFamiliar = true;
    },
    agregarFamiliar() {
      this.$v.familiar.$touch();
      if (this.$v.familiar.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Debe completar los datos del familiar",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      }
      else {
        let familiar = {
          nombre: this.familiar.nombre,
          apellido: this.familiar.apellido,
          numerodocumento: this.familiar.numerodocumento,
          parentesco: this.familiar.parentesco,
          edad: this.familiar.edad,
          estadocivil: this.familiar.estadocivil,
          gradoinstruccion: this.familiar.gradoinstruccion,
          ocupacion: this.familiar.ocupacion,
          observaciones: this.familiar.observaciones
        };
        this.fichaIngreso.contenido.familiar.familiares.push(familiar);
        this.familiar.nombre = "";
        this.familiar.apellido = "";
        this.familiar.parentesco = "";
        this.familiar.edad = "";
        this.familiar.estadocivil = "";
        this.familiar.gradoinstruccion = "";
        this.familiar.ocupacion = "";
        this.familiar.observaciones = "";
        this.familiar.numerodocumento = "";
        this.dialogAgregarFamiliar = false;
       this.$v.familiar.$reset();
      }
    },
    cerrarAgregarFamiliar() {
      this.dialogAgregarFamiliar = false;

      this.familiar.nombre = "";
      this.familiar.apellido = "";
      this.familiar.parentesco = "";
      this.familiar.edad = "";
      this.familiar.estadocivil = "";
      this.familiar.gradoinstruccion = "";
      this.familiar.ocupacion = "";
      this.familiar.observaciones = "";
      this.familiar.numerodocumento = "";

      this.$v.familiar.$reset();
    },
    modalActualizar(index) {
      this.accion = "actualizar";
      this.dialogAgregarFamiliar = true;
      this.familiar.nombre = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].nombre;
      this.familiar.apellido = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].apellido;
      this.familiar.parentesco = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].parentesco;
      this.familiar.edad = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].edad;
      this.familiar.estadocivil = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].estadocivil;
      this.familiar.gradoinstruccion = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].gradoinstruccion;
      this.familiar.ocupacion = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].ocupacion;
      this.familiar.observaciones = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].observaciones;
      this.familiar.numerodocumento = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].numerodocumento;

      this.indice = index;
    },
    actualizarFamiliar(index) {
      this.$v.familiar.$touch();
      if (this.$v.familiar.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Debe completar los datos del familiar",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      }
      else {
        this.fichaIngreso.contenido.familiar.familiares[
          index
        ].nombre = this.familiar.nombre;
        this.fichaIngreso.contenido.familiar.familiares[
          index
        ].apellido = this.familiar.apellido;
        this.fichaIngreso.contenido.familiar.familiares[
          index
        ].parentesco = this.familiar.parentesco;
        this.fichaIngreso.contenido.familiar.familiares[
          index
        ].edad = this.familiar.edad;
        this.fichaIngreso.contenido.familiar.familiares[
          index
        ].estadocivil = this.familiar.estadocivil;
        this.fichaIngreso.contenido.familiar.familiares[
          index
        ].gradoinstruccion = this.familiar.gradoinstruccion;
        this.fichaIngreso.contenido.familiar.familiares[
          index
        ].ocupacion = this.familiar.ocupacion;
        this.fichaIngreso.contenido.familiar.familiares[
          index
        ].observaciones = this.familiar.observaciones;
        this.fichaIngreso.contenido.familiar.familiares[
          index
        ].numerodocumento = this.familiar.numerodocumento;

        this.dialogAgregarFamiliar = false;
       this.$v.familiar.$reset();
      }
    },
    eliminarFamiliar(index) {
      this.fichaIngreso.contenido.familiar.familiares.splice(index, 1);
    },
    modalConsultar(index) {
      this.accion = "consultar";
      this.dialogAgregarFamiliar = true;
      this.familiar.nombre = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].nombre;
      this.familiar.apellido = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].apellido;
      this.familiar.parentesco = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].parentesco;
      this.familiar.edad = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].edad;
      this.familiar.estadocivil = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].estadocivil;
      this.familiar.gradoinstruccion = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].gradoinstruccion;
      this.familiar.ocupacion = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].ocupacion;
      this.familiar.observaciones = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].observaciones;
      this.familiar.numerodocumento = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].numerodocumento;
    },
    //fin modal composicion familiar
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer
      });
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

  computed: {
    ...mapGetters(["user"]),
    errorResidente() {
      const errors = [];
      if (!this.$v.fichaIngreso.idresidente.$dirty) return errors;
      !this.$v.fichaIngreso.idresidente.required &&
        errors.push("Debe seleccionar un residente");
      return errors;
    },
    errorMotivoIngreso() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.familiar.motivoingreso.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.familiar.motivoingreso.required &&
        errors.push(
          "Debe ingresar al menos un motivo por el cual el residente fue ingresado"
        );
      return errors;
    },
    errorFamiliares() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.familiar.familiares.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.familiar.familiares.required &&
        errors.push("Debe ingresar al menos un familiar del residente");
      return errors;
    },
    errorTipofamilia() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.familiar.tipofamilia.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.familiar.tipofamilia.required &&
        errors.push("Debe ingresar el tipo de familia del residente");
      return errors;
    },
    errorProblematicafamiliar() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.familiar.problematicafam.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.familiar.problematicafam.required &&
        errors.push("Debe ingresar la problemática familiar del residente");
      return errors;
    },
    errorUbicacion() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.vivienda.ubicacion.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.vivienda.ubicacion.required &&
        errors.push("Debe ingresar la ubicación de la vivienda del residente");
      return errors;
    },
    errorDescripcionubicacion() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.vivienda.descripcionubicacion.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.vivienda.descripcionubicacion.required &&
        errors.push(
          "Debe ingresar una descripción de la ubicación de la vivienda del residente"
        );
      return errors;
    },
    errorHabitacionesdormir() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.vivienda.habitacionesdormir.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.vivienda.habitacionesdormir.required &&
        errors.push(
          "Debe ingresar número de habitaciones para dormir en la vivienda del residente"
        );
      return errors;
    },
    errorTipopropiedad() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.vivienda.tipopropiedad.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.vivienda.tipopropiedad.required &&
        errors.push(
          "Debe ingresar el tipo de propiedad de la vivienda del residente"
        );
      return errors;
    },
    errorTipo() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.vivienda.tipo.$dirty) return errors;
      !this.$v.fichaIngreso.contenido.vivienda.tipo.required &&
        errors.push("Debe ingresar el tipo de vivienda del residente");
      return errors;
    },
    errorMaterial() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.vivienda.material.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.vivienda.material.required &&
        errors.push("Debe ingresar el material de la vivienda del residente");
      return errors;
    },
    errorTipopiso() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.vivienda.tipopiso.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.vivienda.tipopiso.required &&
        errors.push(
          "Debe ingresar el tipo de piso de la vivienda del residente"
        );
      return errors;
    },
    errorTipotecho() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.vivienda.tipotecho.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.vivienda.tipotecho.required &&
        errors.push(
          "Debe ingresar el tipo de techo de la vivienda del residente"
        );
      return errors;
    },
    errorHabitantes() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.vivienda.habitantes.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.vivienda.habitantes.required &&
        errors.push(
          "Debe ingresar al menos un habitante de la vivienda del residente"
        );
      return errors;
    },
    errorServicios() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.vivienda.servicios.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.vivienda.servicios.required &&
        errors.push(
          "Debe ingresar al menos un servicio de la vivienda del residente"
        );
      return errors;
    },
    errorCondicionlaboral() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.economico.condicionlaboral.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.economico.condicionlaboral.required &&
        errors.push(
          "Debe ingresar la condicion laboral del residente"
        );
      return errors;
    },
    errorOcupacion() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.economico.ocupacion.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.economico.ocupacion.required &&
        errors.push(
          "Debe ingresar la ocupación del residente"
        );
      return errors;
    },
    errorOcupacion() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.economico.ocupacion.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.economico.ocupacion.required &&
        errors.push(
          "Debe ingresar la ocupación del residente"
        );
      return errors;
    },
    errorIngresos() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.economico.ingresos.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.economico.ingresos.required &&
        errors.push(
          "Debe ingresar al menos 1 ingreso del residente"
        );
      return errors;
    },
    errorEgresos() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.economico.egresos.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.economico.egresos.required &&
        errors.push(
          "Debe ingresar al menos 1 egreso del residente"
        );
      return errors;
    },
    errorSalud() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.salud.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.salud.required &&
        errors.push(
          "Debe ingresar el estado de salud del residente"
        );
      return errors;
    },
    errorApoyolocal() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.legal.apoyolocal.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.legal.apoyolocal.required &&
        errors.push(
          "Debe ingresar si el residente recibio apoyo local"
        );
      return errors;
    },
    errorDiagnosticosocial() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.diagnosticosocial.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.diagnosticosocial.required &&
        errors.push(
          "Debe ingresar un diagnóstico social para el residente"
        );
      return errors;
    },
    errorPlanintervencion() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.planintervencion.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.planintervencion.required &&
        errors.push(
          "Debe ingresar un plan de intervención para el residente"
        );
      return errors;
    },
    errorFirma() {
      return this.$v.fichaIngreso.contenido.firma.urlfirma.required == false &&
        this.$v.fichaIngreso.contenido.firma.urlfirma.$dirty == true
        ? true
        : false;
    },
    /*errorFirmas() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.firmas.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.firmas.required &&
        errors.push(
          "Debe ingresar al menos una firma del encargado"
        );
      return errors;
    },*/
    //validaciones para listas
    errorTextomotivoingreso() {
      const errors = [];
      if (!this.$v.motivoIngreso.$dirty)
        return errors;
      !this.$v.motivoIngreso.required &&
        errors.push(
          "El campo motivo ingreso no puede estar vacio"
        );
      return errors;
    },
    errorTextohabitante() {
      const errors = [];
      if (!this.$v.habitante.$dirty)
        return errors;
      !this.$v.habitante.required &&
        errors.push(
          "El campo habitante no puede estar vacio"
        );
      return errors;
    },
    errorTextoservicio() {
      const errors = [];
      if (!this.$v.servicio.servicio.$dirty)
        return errors;
      !this.$v.servicio.servicio.required && errors.push("El campo servicio no puede estar vacio");
      return errors;
    },
    errorTextoserviciotipo() {
      const errors = [];
      if (!this.$v.servicio.tipo.$dirty)
        return errors;
      !this.$v.servicio.tipo.required && errors.push("El campo tipo no puede estar vacio");
      return errors;
    },
    errorTextoingreso() {
      const errors = [];
      if (!this.$v.ingreso.$dirty)
        return errors;
      !this.$v.ingreso.required && errors.push("El campo ingreso no puede estar vacio");
      return errors;
    },
    errorTextoegreso() {
      const errors = [];
      if (!this.$v.egreso.$dirty)
        return errors;
      !this.$v.egreso.required && errors.push("El campo egreso no puede estar vacio");
      return errors;
    },
    errorTextopenalfamiliar() {
      const errors = [];
      if (!this.$v.penal.familiar.$dirty)
        return errors;
      !this.$v.penal.familiar.required && errors.push("El campo familiar no puede estar vacio");
      return errors;
    },
    errorTextopenalmotivo() {
      const errors = [];
      if (!this.$v.penal.motivo.$dirty)
        return errors;
      !this.$v.penal.motivo.required && errors.push("El campo motivo no puede estar vacio");
      return errors;
    },
    //validaciones firma
    errorNombreFirma() {
      const errors = [];
      if (!this.$v.firmas.nombre.$dirty) return errors;
      !this.$v.firmas.nombre.required &&
        errors.push("Debe registrar el nombre obligatoriamente");
      !this.$v.firmas.nombre.esTexto &&
        errors.push("Debe registrar el nombre correctamente");
      return errors;
    },
    errorCargoFirma() {
      const errors = [];
      if (!this.$v.firmas.cargo.$dirty) return errors;
      !this.$v.firmas.cargo.required &&
        errors.push("Debe registrar el cargo obligatoriamente");
      !this.$v.firmas.cargo.esTexto &&
        errors.push("Debe registrar el cargo correctamente");
      return errors;
    },
    errorUrlFirma() {
      return this.$v.urlfirma.required == false &&
        this.$v.urlfirma.$dirty == true
        ? true
        : false;
    },
    //validaciones modal familiar
    errorNumeroDocumentoFamiliar() {
      const errors = [];
      if (!this.$v.familiar.numerodocumento.$dirty) return errors;
      !this.$v.familiar.numerodocumento.required &&
        errors.push("Debe escribir el número de documento obligatoriamente");
      !this.$v.familiar.numerodocumento.esParrafo &&
        errors.push("No se aceptan caracteres especiales");
      return errors;
    },
    errorNombreFamiliar() {
      const errors = [];
      if (!this.$v.familiar.nombre.$dirty) return errors;
      !this.$v.familiar.nombre.required &&
        errors.push("Debe escribir el nombre del familiar obligatoriamente");
      !this.$v.familiar.nombre.esTexto &&
        errors.push("No se aceptan números ni caracteres especiales");
      return errors;
    },
    errorApellidoFamiliar() {
      const errors = [];
      if (!this.$v.familiar.apellido.$dirty) return errors;
      !this.$v.familiar.apellido.required &&
        errors.push("Debe escribir el apellido del familiar obligatoriamente");
      !this.$v.familiar.apellido.esTexto &&
        errors.push("No se aceptan números ni caracteres especiales");
      return errors;
    },
    errorParentescoFamiliar() {
      const errors = [];
      if (!this.$v.familiar.parentesco.$dirty) return errors;
      !this.$v.familiar.parentesco.required &&
        errors.push(
          "Debe escribir el parentesco del familiar obligatoriamente"
        );
      !this.$v.familiar.parentesco.esTexto &&
        errors.push("No se aceptan números ni caracteres especiales");
      return errors;
    },
    errorEdadFamiliar() {
      const errors = [];
      if (!this.$v.familiar.edad.$dirty) return errors;
      !this.$v.familiar.edad.required &&
        errors.push("Debe escribir la edad del familiar obligatoriamente");
      !this.$v.familiar.edad.numeric &&
        errors.push("Debe Ingresar valores Numericos");
      !this.$v.familiar.edad.between &&
        errors.push("La edad debe estar entre 0 y 150 años");
      return errors;
    },
    errorEstadoCivil() {
      const errors = [];
      if (!this.$v.familiar.estadocivil.$dirty) return errors;
      !this.$v.familiar.estadocivil.required &&
        errors.push("Debe escribir el estado civil del familiar obligatoriamente");
      !this.$v.familiar.estadocivil.esTexto &&
        errors.push("No se aceptan números ni caracteres especiales");
      return errors;
    },
    errorGradoInstruccionFamiliar() {
      const errors = [];
      if (!this.$v.familiar.gradoinstruccion.$dirty) return errors;
      !this.$v.familiar.gradoinstruccion.required &&
        errors.push(
          "Debe escribir el grado de instrucción del familiar obligatoriamente"
        );
      !this.$v.familiar.gradoinstruccion.esTexto &&
        errors.push("No se aceptan números ni caracteres especiales");
      return errors;
    },
    errorOcupacionFamiliar() {
      const errors = [];
      if (!this.$v.familiar.ocupacion.$dirty) return errors;
      !this.$v.familiar.ocupacion.required &&
        errors.push("Debe escribir la ocupación del familiar obligatoriamente");
      !this.$v.familiar.ocupacion.esParrafo &&
        errors.push("No se aceptan caracteres especiales");
      return errors;
    },
    isDisabled() {
      if (this.accion == "consultar") {
        return true;
      } else {
        return false;
      }
    },
  },

  validations() {
    return {
      fichaIngreso: {
        idresidente: {
          required
        },
        contenido: {
          familiar: {
            motivoingreso: {
              required
            }, //[]
            familiares: {
              required
            }, //[]
            tipofamilia: {
              required
            },
            problematicafam: {
              required
            }
          },
          vivienda: {
            ubicacion: {
              required
            },
            descripcionubicacion: {
              required
            },
            habitantes: {
              required
            }, //[]
            habitacionesdormir: {
              required
            },
            tipopropiedad: {
              required
            },
            tipo: {
              required
            },
            material: {
              required
            },
            tipopiso: {
              required
            },
            tipotecho: {
              required
            },
            servicios: {
              required
            } //[]
          },
          economico: {
            condicionlaboral: {
              required
            },
            ocupacion: {
              required
            },
            ingresos: {
              required
            }, //[]
            egresos: {
              required
            }, //[]
          },
          salud: {
            required
          },
          legal: {
            //penales: {
            //  required
            //}, [] - puede no tener antecedentees penales
            apoyolocal: {
              required
            }
          },
          diagnosticosocial: {
            required
          },
          planintervencion: {
            required
          },
          firma: {
            nombre: {
              required
            },
            cargo: {
              required
            },
            urlfirma: {
              required,
            },
          },
        }
      },
      motivoIngreso:{
        required
      },
      habitante: {
        required
      },
      servicio: {
        servicio: {
          required
        },
        tipo: {
          required
        }
      },
      ingreso: {
        required
      },
      egreso: {
        required
      },
      penal: {
        familiar: {
          required
        },
        motivo: {
          required
        }
      },
      urlfirma: {
        required,
      },
      firmas: {
        nombre: {
          required,
          esTexto
        },
        cargo: {
          required,
          esTexto
        }
      },
      familiar: {
        nombre: {
          required,
          esTexto
        },
        apellido: {
          required,
          esTexto
        },
        numerodocumento: {
          required,
          esParrafo
        },
        parentesco: {
          required,
          esTexto
        },
        edad: {
          required,
          numeric,
          between: between(0, 150)
        },
        estadocivil: {
          required,
          esTexto
        },
        gradoinstruccion: {
          required,
          esTexto
        },
        ocupacion: {
          required,
          esParrafo
        },
      },
    };
  }
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

    .v-dialog {
    max-width: 85%;
    }
</style>