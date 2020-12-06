<template>
  <v-card>
    <v-card-title class="justify-center"
      >Actualización de Informe Social Inicial</v-card-title
    >
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">
          Datos Generales
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2">
          Descripción de la situación
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="3">
          Análisis y diagnóstico
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form>
              <v-autocomplete
                :items="listaresidentes"
                v-model="informe.idresidente"
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
                    <v-avatar left color="#b3b3ff" size="24">
                      <span style="font-size:12px">RT</span>
                    </v-avatar>
                    {{ data.item.nombre }} {{ data.item.apellido }}
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
                        >Nombre completo: {{ data.item.nombre }}
                        {{ data.item.apellido }}
                      </v-list-item-title>
                      <v-list-item-subtitle
                        >Nro. Documento:
                        {{ data.item.numeroDocumento }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
              <div :key="residente.id" v-for="residente in listaresidentes">
                <v-textarea
                  v-if="residente.id == informe.idresidente"
                  v-model="residente.motivoIngreso"
                  label="Motivo de ingreso"
                  outlined
                  readonly
                  color="#009900"
                  rows="1"
                  auto-grow
                  style="margin-top:5px"
                ></v-textarea>
              </div>

              <v-autocomplete
                  :items="listasociales"
                  filled
                  chips
                  dense
                  outlined
                  v-model="informe.contenido.evaluador"
                  color="#009900"
                  label="Evaluador"
                  item-text="usuario"
                  item-value="id"
                  :error-messages="errorEvaluador"
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
                      {{ data.item.datos.apellido }}
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

              <v-textarea
                v-model="informe.contenido.antecedentes"
                label="Antecedentes"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                @input="$v.informe.contenido.antecedentes.$touch()"
                @blur="$v.informe.contenido.antecedentes.$touch()"
                :error-messages="errorAntecedentes"
              ></v-textarea>

              <v-card
                style="padding:5px;margin:0 0 18px 0;background-color:#EAEAEA"
              >
                <v-card-title>
                  <v-row>
                    <v-col :cols="8">
                      Composición Familiar
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn
                        fab
                        small
                        dark
                        color="green"
                        @click="modalRegistrar()"
                      >
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                      <v-dialog
                        v-model="dialogAgregarFamiliar"
                        persistent
                        max-width="600px"
                      >
                        <v-card align="center">
                          <v-card-title>
                            <span class="headline">Datos familiar</span>
                          </v-card-title>
                          <v-card-text>
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
                            >
                            </v-textarea>
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
                            >
                            </v-textarea>
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
                            >
                            </v-textarea>
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
                                >
                                </v-textarea>
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
                                >
                                </v-textarea>
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
                                  :error-messages="
                                    errorGradoInstruccionFamiliar
                                  "
                                >
                                </v-textarea>
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
                                >
                                </v-textarea>
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
                                >
                                </v-textarea>
                              </v-col>
                            </v-row>

                            <v-textarea
                              label="Observaciones"
                              v-model="familiar.observaciones"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              :readonly="isDisabled"
                            >
                            </v-textarea>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              v-if="accion == 'registrar'"
                              color="blue darken-1"
                              text
                              @click="agregarFamiliar()"
                            >
                              Agregar
                            </v-btn>
                            <v-btn
                              v-if="accion == 'actualizar'"
                              color="blue darken-1"
                              text
                              @click="actualizarFamiliar(indice)"
                            >
                              Actualizar
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="cerrarAgregarFamiliar()"
                            >
                              Cerrar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-card-text style="background-color:#FAFAFA">
                  <v-row>
                    <v-col><h3>Nombre</h3></v-col>
                    <v-col><h3>Parentesco</h3></v-col>
                    <v-col><h3>Nro. Documento</h3></v-col>
                    <v-col><h3>Acciones</h3></v-col>
                  </v-row>
                  <div
                    v-for="(item, index) in informe.contenido.familiares"
                    :key="index"
                  >
                    <v-row>
                      <v-col>{{ item.nombre }} {{ item.apellido }}</v-col>
                      <v-col>{{ item.parentesco }}</v-col>
                      <v-col>{{ item.numerodocumento }}</v-col>
                      <v-col>
                        <v-row style="padding:0;margin:0">
                          <v-col style="padding:0;margin:0">
                            <v-btn
                              fab
                              x-small
                              dark
                              color="yellow"
                              @click="modalActualizar(index)"
                            >
                              <v-icon dark>
                                mdi-pen
                              </v-icon>
                            </v-btn>
                          </v-col>
                          <v-col style="padding:0;margin:0">
                            <v-btn
                              fab
                              x-small
                              dark
                              color="blue"
                              @click="modalConsultar(index)"
                            >
                              <v-icon dark>
                                mdi-eye
                              </v-icon>
                            </v-btn>
                          </v-col>
                          <v-col style="padding:0;margin:0">
                            <v-btn
                              fab
                              x-small
                              dark
                              color="red"
                              @click="eliminarFamiliar(index)"
                            >
                              <v-icon dark>
                                mdi-minus
                              </v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>

              <v-textarea
                v-model="informe.contenido.situacionfamiliar"
                label="Descripción de la situación familiar"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                @input="$v.informe.contenido.situacionfamiliar.$touch()"
                @blur="$v.informe.contenido.situacionfamiliar.$touch()"
                :error-messages="errorSituacionFamiliar"
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
          <div class="container-user">
            <form>
              <v-textarea
                v-model="informe.contenido.situacionvivienda"
                label="Descripción de la vivienda"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                @input="$v.informe.contenido.situacionvivienda.$touch()"
                @blur="$v.informe.contenido.situacionvivienda.$touch()"
                :error-messages="errorSituacionVivienda"
              ></v-textarea>
              <v-textarea
                v-model="informe.contenido.situacioneconomica"
                label="Descripción de la situacion económica"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                @input="$v.informe.contenido.situacioneconomica.$touch()"
                @blur="$v.informe.contenido.situacioneconomica.$touch()"
                :error-messages="errorSituacionEconomica"
              ></v-textarea>
              <v-textarea
                v-model="informe.contenido.situacionsalud"
                label="Descripción de la situacion de salud"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                @input="$v.informe.contenido.situacionsalud.$touch()"
                @blur="$v.informe.contenido.situacionsalud.$touch()"
                :error-messages="errorSituacionSalud"
              ></v-textarea>
              <v-textarea
                v-model="informe.contenido.educacion"
                label="Descripción de la situacion educativa"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                @input="$v.informe.contenido.educacion.$touch()"
                @blur="$v.informe.contenido.educacion.$touch()"
                :error-messages="errorSituacionEducativa"
              ></v-textarea>
              <v-textarea
                v-model="informe.contenido.situacionactual"
                label="Descripción de la situacion social"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                @input="$v.informe.contenido.situacionactual.$touch()"
                @blur="$v.informe.contenido.situacionactual.$touch()"
                :error-messages="errorSituacionActual"
              ></v-textarea>
              <v-row>
                <v-col>
                  <v-btn block @click="step = 3" color="success">
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
        <v-stepper-content step="3">
          <div class="container-user">
            <form>
              <v-textarea
                v-model="informe.contenido.diagnosticosocial"
                label="Diagnóstico social"
                outlined
                color="#009900"
                rows="1"
                auto-grow
              ></v-textarea>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
              >
                <v-card
                  elevation="0"
                  style="background-color:#EAEAEA"
                  height="70"
                >
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <v-text-field
                        v-model="recomendacion"
                        label="Recomendaciones"
                        color="#009900"
                        @input="$v.recomendacion.$touch()"
                        @blur="$v.recomendacion.$touch()"
                        :error-messages="errorRecomendacion"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn
                        fab
                        small
                        dark
                        color="green"
                        @click="agregarRecomendaciones"
                      >
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
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
                  v-for="recomendacion in informe.contenido.recomendaciones"
                  :key="recomendacion"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <span>{{ recomendacion }}</span>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <div style="margin-right:20px">
                        <v-btn
                          fab
                          x-small
                          dark
                          color="red"
                          @click="eliminarRecomendaciones(recomendacion)"
                        >
                          <v-icon dark>
                            mdi-minus
                          </v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>
              <v-card
                style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
              >
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

                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="60"
                  v-for="(item, index) in informe.contenido.anexos"
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
                    <v-col :cols="2" align="right">
                      <div style="margin-right:20px">
                        <v-btn
                          fab
                          x-small
                          dark
                          color="red"
                          @click="eliminarAnexo(index)"
                        >
                          <v-icon dark>
                            mdi-minus
                          </v-icon>
                        </v-btn>
                      </div>
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
              <v-card
                style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
              >
                <v-card
                  elevation="0"
                  style="background-color:#EAEAEA"
                  height="70"
                >
                  <v-row style="margin:1%;heigh:100%" align="center">
                    <v-col :cols="4" align="left">
                      <v-text-field
                        v-model="firmas.nombre"
                        label="Nombre"
                        color="#009900"
                        @input="$v.firmas.nombre.$touch()"
                        @blur="$v.firmas.nombre.$touch()"
                        :error-messages="errorNombreFirma"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="left">
                      <v-text-field
                        v-model="firmas.cargo"
                        label="Cargo"
                        color="#009900"
                        @input="$v.firmas.cargo.$touch()"
                        @blur="$v.firmas.cargo.$touch()"
                        :error-messages="errorCargoFirma"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn fab small dark color="green" @click="agregarFirma">
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
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
                      >
                      </vue-dropzone>
                    </div>
                    <v-card v-if="errorUrlFirma" color="red">
                      <v-card-text class="text-center" style="color: white"
                        >Debe Subir una imagen del usuario
                        Obligatoriamente</v-card-text
                      >
                    </v-card>
                    <v-divider class="divider-custom"></v-divider>
                  </v-col>
                </v-row>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="60"
                  v-for="(item, index) in informe.contenido.firmas"
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
                        <span style="font-size:18px">
                          {{ item.nombre }} {{ item.cargo }}</span
                        >
                      </article>
                    </v-col>
                    <v-col :cols="2" align="center">
                      <v-dialog
                        v-model="dialogVistaPreviaFirma"
                        persistent
                        max-width="600px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn
                            v-on="on"
                            fab
                            icon=""
                            x-small
                            dark
                            color="#EAEAEA"
                            @click="verFirma(index)"
                          >
                            <img
                              style="width:25% "
                              src="https://www.flaticon.es/svg/static/icons/svg/1/1180.svg"
                              alt="firma"
                            />
                          </v-btn>
                        </template>
                        <v-card align="center">
                          <v-card-title>
                            <span class="headline">Vista previa</span>
                          </v-card-title>
                          <v-card-text>
                            <img
                              v-if="imagen.includes('http')"
                              width="100%"
                              height="100%"
                              :src="imagen"
                              alt=""
                            />
                            <img
                              v-else
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
                    </v-col>
                    <v-col :cols="2" align="right">
                      <div style="margin-right:20px">
                        <v-btn
                          fab
                          x-small
                          dark
                          color="red"
                          @click="eliminarFirma(index)"
                        >
                          <v-icon dark>
                            mdi-minus
                          </v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-row>
                <v-col>
                  <v-btn block color="success" @click="actualizarInforme">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
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
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers, numeric, between } from "vuelidate/lib/validators";
import moment from "moment";

function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}

function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}

export default {
  props: ["listaresidentes", "visible", "informe", "listasociales"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      step: 1,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 10.0,
        maxFiles: 10,
        acceptedFiles: ".pdf",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione un archivo anexo de su dispositivo o arrástrela aquí",
      },
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
      urlfirma: "",
      firmas: { urlfirma: "", nombre: "", cargo: "" },
      familiar: {
        nombre: "",
        apellido: "",
        numerodocumento: "",
        parentesco: "",
        edad: "",
        estadocivil: "",
        gradoinstruccion: "",
        ocupacion: "",
        observaciones: "",
      },
      urlfirma: "",
      dialogAgregarFamiliar: false,
      accion: "registrar",
      indice: "",
      recomendacion: "",
      recomendaciones: [],
      dialogVistaPreviaFirma: false,
      dialogVistaPreviaAnexos: false,
      imagen: "",
      fileList: [],
      pdf: "",
    };
  },
  created() {
    console.log("Siganme en twitch.tv/anderasdfg c:");
  },
  methods: {
    ...mapMutations(["addInforme"]),
    async sendPDFFiles() {
      let listaTitulos = [];
      let listaanexos = this.fileList;
      for (let index = 0; index < this.fileList.length; index++) {
        let formData = new FormData();
        listaTitulos.push(this.fileList[index].name);
        formData.append("file", this.fileList[index]);
        await axios
          .post("/Media/archivos/pdf", formData)
          .then((res) => {
            listaanexos[index] = res.data;
          })
          .catch((err) => console.log(err));
      }
      for (let index = 0; index < this.fileList.length; index++) {
        this.informe.contenido.anexos.push({
          url: listaanexos[index],
          titulo: listaTitulos[index],
        });
      }
      console.log(this.informe.contenido.anexos);
    },
    async actualizarInforme() {
      await this.sendPDFFiles();
      console.log(this.informe);
      this.$v.informe.$touch();
      if (this.$v.informe.$invalid) {
        console.log("Hay errores :c");
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        console.log("no hay errores");
        await axios
          .put("/informe/informesi", this.informe)
          .then((res) => {
            this.informe = res.data;
            var resi = this.listaresidentes.filter(function(residente) {
              return residente.id == res.data.idresidente;
            });
            var info = {
              id: res.data.id,
              tipo: res.data.tipo.replace(/([a-z])([A-Z])/g, "$1 $2"),
              fechacreacion: res.data.fechacreacion.split("T")[0],
              codigodocumento: res.data.contenido.codigodocumento,
              nombrecompleto: resi[0].nombre + " " + resi[0].apellido,
            };
            this.addInforme(info);
            this.cerrarDialogo();
          })
          .catch((err) => console.log(err));
        await this.mensaje(
          "success",
          "Listo",
          "Informe registrado Satisfactoriamente",
          "<strong>Se redirigirá a la interfaz de gestión<strong>"
        );
      }
    },
    resetInformeValidationState() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.$v.informe.$reset();
      this.$v.firmas.$reset();
    },
    agregarFamiliar() {
      console.log(this.familiar);
      this.$v.familiar.$touch();
      if (this.$v.familiar.$invalid) {
        console.log("Hay errores :c");
        this.mensaje(
          "error",
          "..Oops",
          "Debe completar los datos del familiar",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        let familiar = {
          nombre: this.familiar.nombre,
          apellido: this.familiar.apellido,
          numerodocumento: this.familiar.numerodocumento,
          parentesco: this.familiar.parentesco,
          edad: this.familiar.edad,
          estadocivil: this.familiar.estadocivil,
          gradoinstruccion: this.familiar.gradoinstruccion,
          ocupacion: this.familiar.ocupacion,
          observaciones: this.familiar.observaciones,
        };

        this.informe.contenido.familiares.push(familiar);

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
    },
    modalRegistrar() {
      this.accion = "registrar";
      this.dialogAgregarFamiliar = true;
      console.log(this.accion);
    },
    modalActualizar(index) {
      this.accion = "actualizar";
      this.dialogAgregarFamiliar = true;
      this.familiar.nombre = this.informe.contenido.familiares[index].nombre;
      this.familiar.apellido = this.informe.contenido.familiares[
        index
      ].apellido;
      this.familiar.parentesco = this.informe.contenido.familiares[
        index
      ].parentesco;
      this.familiar.edad = this.informe.contenido.familiares[index].edad;
      this.familiar.estadocivil = this.informe.contenido.familiares[
        index
      ].estadocivil;
      this.familiar.gradoinstruccion = this.informe.contenido.familiares[
        index
      ].gradoinstruccion;
      this.familiar.ocupacion = this.informe.contenido.familiares[
        index
      ].ocupacion;
      this.familiar.observaciones = this.informe.contenido.familiares[
        index
      ].observaciones;
      this.familiar.numerodocumento = this.informe.contenido.familiares[
        index
      ].numerodocumento;

      this.indice = index;
    },
    actualizarFamiliar(index) {
      this.informe.contenido.familiares[index].nombre = this.familiar.nombre;
      this.informe.contenido.familiares[
        index
      ].apellido = this.familiar.apellido;
      this.informe.contenido.familiares[
        index
      ].parentesco = this.familiar.parentesco;
      this.informe.contenido.familiares[index].edad = this.familiar.edad;
      this.informe.contenido.familiares[
        index
      ].estadocivil = this.familiar.estadocivil;
      this.informe.contenido.familiares[
        index
      ].gradoinstruccion = this.familiar.gradoinstruccion;
      this.informe.contenido.familiares[
        index
      ].ocupacion = this.familiar.ocupacion;
      this.informe.contenido.familiares[
        index
      ].observaciones = this.familiar.observaciones;
      this.informe.contenido.familiares[
        index
      ].numerodocumento = this.familiar.numerodocumento;

      this.dialogAgregarFamiliar = false;
    },
    eliminarFamiliar(index) {
      this.informe.contenido.familiares.splice(index, 1);
    },
    modalConsultar(index) {
      this.accion = "consultar";
      this.dialogAgregarFamiliar = true;
      this.familiar.nombre = this.informe.contenido.familiares[index].nombre;
      this.familiar.apellido = this.informe.contenido.familiares[
        index
      ].apellido;
      this.familiar.parentesco = this.informe.contenido.familiares[
        index
      ].parentesco;
      this.familiar.edad = this.informe.contenido.familiares[index].edad;
      this.familiar.estadocivil = this.informe.contenido.familiares[
        index
      ].estadocivil;
      this.familiar.gradoinstruccion = this.informe.contenido.familiares[
        index
      ].gradoinstruccion;
      this.familiar.ocupacion = this.informe.contenido.familiares[
        index
      ].ocupacion;
      this.familiar.observaciones = this.informe.contenido.familiares[
        index
      ].observaciones;
      this.familiar.numerodocumento = this.informe.contenido.familiares[
        index
      ].numerodocumento;
    },
    agregarRecomendaciones() {
      this.$v.recomendacion.$touch();
      if (!this.$v.recomendacion.$invalid) {
        let recomendaciones = this.recomendacion;
        this.informe.contenido.recomendaciones.push(recomendaciones);
        this.recomendaciones = this.informe.contenido.recomendaciones;
        this.recomendacion = "";
      }
    },
    eliminarRecomendaciones(recomendacion) {
      this.recomendaciones.forEach(function(car, index, object) {
        if (car === recomendacion) {
          object.splice(index, 1);
        }
      });
    },
    agregarFirma() {
      this.$v.firmas.$touch();
      this.$v.urlfirma.$touch();

      if (!this.$v.firmas.$invalid && !this.errorUrlFirma) {
        let firmas = {
          urlfirma: this.urlfirma,
          nombre: this.firmas.nombre,
          cargo: this.firmas.cargo,
        };
        this.informe.contenido.firmas.push(firmas);
        this.$refs.myVueDropzone.removeAllFiles();

        this.urlfirma = "";
        this.firmas.nombre = "";
        this.firmas.cargo = "";
      }
    },
    eliminarFirma(index) {
      this.informe.contenido.firmas.splice(index, 1);
    },
    verFirma(index) {
      this.imagen = this.informe.contenido.firmas[index].urlfirma;
    },
    cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
    afterSuccess(file, response) {      
      this.fileList.push(file);
      console.log(this.informe.contenido.anexos);
      console.log("asdasdasasdasd");
      console.log(file);

    },
    afterRemoved(file, error, xhr) {
      this.informe.contenido.anexos = "";
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
        footer: footer,
      });
    },
    cerrarDialogo() {
      this.$emit("close-dialog-update");
    },
    eliminarAnexo(index) {
      this.informe.contenido.anexos.splice(index, 1);
    },
    verAnexo(index) {
      this.pdf = this.informe.contenido.anexos[index].url;
      console.log(this.pdf), (this.dialogVistaPreviaAnexos = true);
    },
    cerrarVistaPreviaAnexo() {
      this.dialogVistaPreviaAnexos = false;
    },
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
    errorResidente() {
      const errors = [];
      if (!this.$v.informe.idresidente.$dirty) return errors;
      !this.$v.informe.idresidente.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    },
    errorAntecedentes() {
      const errors = [];
      if (!this.$v.informe.contenido.antecedentes.$dirty) return errors;
      !this.$v.informe.contenido.antecedentes.required &&
        errors.push("Debe completar los antecedentes obligatoriamente");
      !this.$v.informe.contenido.antecedentes.esParrafo &&
        errors.push("No se aceptan caracteres especiales");
      return errors;
    },
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
    errorSituacionVivienda() {
      const errors = [];
      if (!this.$v.informe.contenido.situacionvivienda.$dirty) return errors;
      !this.$v.informe.contenido.situacionvivienda.required &&
        errors.push(
          "Debe registrar la situación de la vivienda obligatoriamente"
        );
      !this.$v.informe.contenido.situacionvivienda.esParrafo &&
        errors.push("No se aceptan caracteres especiales");
      return errors;
    },
    errorSituacionEconomica() {
      const errors = [];
      if (!this.$v.informe.contenido.situacioneconomica.$dirty) return errors;
      !this.$v.informe.contenido.situacioneconomica.required &&
        errors.push("Debe registrar la situación económica obligatoriamente");
      !this.$v.informe.contenido.situacioneconomica.esParrafo &&
        errors.push("No se aceptan caracteres especiales");
      return errors;
    },
    errorSituacionSalud() {
      const errors = [];
      if (!this.$v.informe.contenido.situacionsalud.$dirty) return errors;
      !this.$v.informe.contenido.situacionsalud.required &&
        errors.push("Debe registrar la situación de salud obligatoriamente");
      !this.$v.informe.contenido.situacionsalud.esParrafo &&
        errors.push("No se aceptan caracteres especiales");
      return errors;
    },
    errorSituacionEducativa() {
      const errors = [];
      if (!this.$v.informe.contenido.educacion.$dirty) return errors;
      !this.$v.informe.contenido.educacion.required &&
        errors.push("Debe registrar la situación educativa obligatoriamente");
      !this.$v.informe.contenido.educacion.esParrafo &&
        errors.push("No se aceptan caracteres especiales");
      return errors;
    },
    errorSituacionActual() {
      const errors = [];
      if (!this.$v.informe.contenido.situacionactual.$dirty) return errors;
      !this.$v.informe.contenido.situacionactual.required &&
        errors.push("Debe registrar la situación actual obligatoriamente");
      !this.$v.informe.contenido.situacionactual.esParrafo &&
        errors.push("No se aceptan caracteres especiales");
      return errors;
    },
    errorSituacionFamiliar() {
      const errors = [];
      if (!this.$v.informe.contenido.situacionfamiliar.$dirty) return errors;
      !this.$v.informe.contenido.situacionfamiliar.required &&
        errors.push("Debe registrar la situación familiar obligatoriamente");
      !this.$v.informe.contenido.situacionfamiliar.esParrafo &&
        errors.push("No se aceptan caracteres especiales");
      return errors;
    },
    errorRecomendacion() {
      const errors = [];
      if (!this.$v.recomendacion.$dirty) return errors;
      !this.$v.recomendacion.required &&
        errors.push("Debe registrar la recomendación obligatoriamente");
    !this.$v.recomendacion.esParrafo &&
        errors.push("La recomendación no debe contener caracteres especiales.");  
      return errors;
    },
    errorNombreFirma() {
      const errors = [];
      if (!this.$v.firmas.nombre.$dirty) return errors;
      !this.$v.firmas.nombre.required &&
        errors.push("Debe registrar el nombre obligatoriamente");
      !this.$v.firmas.nombre.esTexto &&
        errors.push("El nombre debe contener solo texto.");
      return errors;
    },
    errorCargoFirma() {
      const errors = [];
      if (!this.$v.firmas.cargo.$dirty) return errors;
      !this.$v.firmas.cargo.required &&
        errors.push("Debe registrar el cargo obligatoriamente");
      !this.$v.firmas.cargo.esTexto &&
        errors.push("El cargo debe contener solo texto.");
      return errors;
    },
    errorUrlFirma() {
      return this.$v.urlfirma.required == false &&
        this.$v.urlfirma.$dirty == true
        ? true
        : false;
    },
    errorEvaluador() {
      const errors = [];
      if (!this.$v.informe.contenido.evaluador.$dirty) return errors;
      !this.$v.informe.contenido.evaluador.required &&
        errors.push("Debe seleccionar un evaluador obligatoriamente");
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
       informe: {
        idresidente: {
          required,
        },
        contenido: {
          antecedentes: {
            required,
            esParrafo
          },
          situacionvivienda: {
            required,
            esParrafo
          },
          situacioneconomica: {
            required,
            esParrafo
          },
          situacionsalud: {
            required,
            esParrafo
          },
          situacionfamiliar: {
            required,
            esParrafo
          },
          educacion: {
            required,
            esParrafo
          },
          situacionactual: {
            required,
            esParrafo
          },
          evaluador:{
            required,
          }
        },
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
      recomendacion: {
        required,
        esParrafo
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
        },
      },
    }
  },
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
