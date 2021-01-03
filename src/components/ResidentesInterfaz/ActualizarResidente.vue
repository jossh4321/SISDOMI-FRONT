<template>
  <v-card>
    <v-card-title class="justify-center">Actualizar Residentes</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1"> Datos Generales </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2"> Datos Especificos </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form>
              <v-text-field
                style="margin-top:5px"
                v-model="residente.nombre"
                label="Nombres"
                outlined
                color="#009900"
                @input="$v.residente.nombre.$touch()"
                @blur="$v.residente.nombre.$touch()"
                :error-messages="errorNombre"
              ></v-text-field>
              <v-text-field
                v-model="residente.apellido"
                @input="$v.residente.apellido.$touch()"
                @blur="$v.residente.apellido.$touch()"
                :error-messages="errorApellido"
                label="Apellidos"
                outlined
                color="#009900"
              ></v-text-field>
              <v-select
                :items="['Masculino', 'Femenino']"
                label="Ingrese el Sexo"
                dense
                outlined
                v-model="residente.sexo"
                @input="$v.residente.sexo.$touch()"
                @blur="$v.residente.sexo.$touch()"
                :error-messages="errorTipoSexo"
                color="#009900"
              ></v-select>
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
                    v-model="residente.fechaNacimiento"
                    label="Fecha de Nacimiento"
                    prepend-icon="mdi-calendar"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    @input="$v.residente.fechaNacimiento.$touch()"
                    @blur="$v.residente.fechaNacimiento.$touch()"
                    :error-messages="errorFechaNacimiento"
                    color="#009900"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="residente.fechaNacimiento"
                  @input="menu2 = false"
                  locale="es-es"
                ></v-date-picker>
              </v-menu>
              <v-select
                :items="['DNI', 'Pasaporte', 'Carnet Extranjeria', 'dni']"
                label="Tipo de Documento"
                dense
                outlined
                color="#009900"
                v-model="residente.tipoDocumento"
                @input="$v.residente.tipoDocumento.$touch()"
                @blur="$v.residente.tipoDocumento.$touch()"
                :error-messages="errorTipoDocumento"
              ></v-select>
              <v-text-field
                v-model="residente.numeroDocumento"
                @input="$v.residente.numeroDocumento.$touch()"
                @blur="$v.residente.numeroDocumento.$touch()"
                :error-messages="errorNumeroDocumento"
                label="Ingrese el Numero de Documento"
                outlined
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="residente.lugarNacimiento"
                @input="$v.residente.lugarNacimiento.$touch()"
                @blur="$v.residente.lugarNacimiento.$touch()"
                :error-messages="errorLugarNacimiento"
                label="Lugar de Nacimiento"
                outlined
                color="#009900"
              ></v-text-field>
              <!--NUMEROS TELEFONO -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogTelefonoReferencial"
                  persistent
                  max-width="600px"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on">
                      Ver Telefonos
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Modificar Telefonos </span>
                    </v-card-title>
                    <!--asasdsadas-->
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="telefonos.referenteFamiliar"
                              label="Referente familiar"
                              color="#009900"
                              @input="$v.telefonos.referenteFamiliar.$touch()"
                              @blur="$v.telefonos.referenteFamiliar.$touch()"
                              :error-messages="errorReferenteFamiliar"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-combobox
                              v-model="telefonos.parentesco"
                              :items="itemParentesco"
                              label="Parentesco"
                              @input="$v.telefonos.parentesco.$touch()"
                              @blur="$v.telefonos.parentesco.$touch()"
                              :error-messages="errorParentesco"
                            ></v-combobox>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="telefonos.numero"
                              label="Ingrese el numero Telefonico"
                              color="#009900"
                              @input="$v.telefonos.numero.$touch()"
                              @blur="$v.telefonos.numero.$touch()"
                              :error-messages="errorTelefono"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-btn color="success" @click="guardarTelefono">
                              añadir
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <!-- afdsasdsadas-->
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <!--Mostrar Cuadro -->

                          <!--AQUI COMIENZA-->
                          <template
                            v-if="residente.telefonosReferencia.length > 0"
                          >
                            <v-card
                              style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                            >
                              <v-row align="center">
                                <v-col>
                                  <v-card-title
                                    style="font-size:22px;padding: 0px 10px;"
                                    >Referentes Familiares</v-card-title
                                  >
                                </v-col>
                              </v-row>

                              <v-card
                                tile
                                elevation="0"
                                color="#FAFAFA"
                                style="margin-top:5px"
                                height="60"
                                v-for="(item,
                                index) in residente.telefonosReferencia"
                                :key="index"
                              >
                                <v-row
                                  style="margin-left:10px;heigh:100%"
                                  align="center"
                                >
                                  <v-col :cols="5">
                                    <article>
                                      <img
                                        style="margin-right:5px;width:6% "
                                        src="https://www.flaticon.es/svg/static/icons/svg/996/996443.svg"
                                        alt="imagen usuario"
                                      />
                                      <span style="font-size:18px">
                                        {{ item.referentefamiliar }} -
                                        {{ item.parentesco }}</span
                                      >
                                    </article>
                                  </v-col>
                                  <v-col :cols="3">
                                    <article>
                                      <img
                                        style="margin-right:10px;width:8%"
                                        src="https://www.flaticon.es/svg/static/icons/svg/633/633544.svg"
                                        alt="imagen telefono"
                                      />
                                      <span style="font-size:18px">{{
                                        item.numero
                                      }}</span>
                                    </article>
                                  </v-col>
                                  <v-col :cols="4" align="right">
                                    <div style="margin-right:20px">
                                      <v-btn
                                        fab
                                        x-small
                                        dark
                                        color="red"
                                        @click="eliminarTelefono(item.index)"
                                      >
                                        <v-icon dark>
                                          mdi-minus
                                        </v-icon>
                                      </v-btn>
                                    </div>
                                  </v-col>
                                </v-row>
                              </v-card>
                              <v-card
                                v-if="errorTelefonosReferenciales"
                                color="red"
                              >
                                <v-card-text
                                  class="text-center"
                                  style="color: white"
                                  >Debe Ingresar un Telefono de referencia
                                  Obligatoriamente</v-card-text
                                >
                              </v-card>
                            </v-card>
                          </template>
                          <!-- -->
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cerrarTelefonosReferencia()"
                      >
                        Cerrar
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="guardarTelefonosReferencia()"
                      >
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!--FIN NUMEROS TELEFONO -->
              <!--PROGRESO RESIDENTE -->

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
        <v-stepper-content step="2"
          ><!--CONTIENE LOS STEPPERS 2 -->
          <div class="container-user">
            <form>
              <h4>Ubigeo</h4>
              <v-row>
                <v-col>
                  <v-autocomplete
                    :items="this.departamentos"
                    filled
                    dense
                    v-model="idDepartamento"
                    outlined
                    color="#009900"
                    label="Departamento"
                    item-text="nombreDepartamento"
                    item-value="idDepartamento"
                    @change="obtenerProvincias()"
                    @input="$v.idDepartamento.$touch()"
                    @blur="$v.idDepartamento.$touch()"
                    :error-messages="errorDepartamento"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete
                    :items="this.provincias"
                    filled
                    dense
                    outlined
                    color="#009900"
                    label="Provincia"
                    v-model="idProvincia"
                    item-text="nombreProvincia"
                    item-value="idProvincia"
                    @change="obtenerDistritos()"
                    @input="$v.idProvincia.$touch()"
                    @blur="$v.idProvincia.$touch()"
                    :error-messages="errorProvincia"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete
                    :items="this.distritos"
                    filled
                    dense
                    outlined
                    color="#009900"
                    label="Distrito"
                    v-model="residente.ubigeo"
                    @input="$v.residente.ubigeo.$touch()"
                    @blur="$v.residente.ubigeo.$touch()"
                    :error-messages="errorDistrito"
                    item-text="nombreDistrito"
                    item-value="idDistrito"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-text-field
                v-model="residente.juzgadoProcedencia"
                @input="$v.residente.juzgadoProcedencia.$touch()"
                @blur="$v.residente.juzgadoProcedencia.$touch()"
                :error-messages="errorJuzgadoProcedencia"
                outlined
                label="Ingrese el Juzgado de Procedencia"
                color="#009900"
              ></v-text-field>
              <!--FECHA INGRESO -->
              <v-menu
                v-model="datemenu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="residente.fechaIngreso"
                    label="Fecha de Ingreso"
                    prepend-icon="mdi-calendar"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    @input="$v.residente.fechaIngreso.$touch()"
                    @blur="$v.residente.fechaIngreso.$touch()"
                    :error-messages="errorFechaIngreso"
                    color="#009900"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="residente.fechaIngreso"
                  @input="menu2 = false"
                  locale="es-es"
                ></v-date-picker> </v-menu
              ><!--acabo  -->

              <v-textarea
                v-model="residente.motivoIngreso"
                @input="$v.residente.motivoIngreso.$touch()"
                @blur="$v.residente.motivoIngreso.$touch()"
                label="Ingrese el Motivo de Ingreso"
                color="#009900"
              ></v-textarea>
              <!--------AQUI esta  EL cuadro de progreso -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogProgresoFase"
                  persistent
                  max-width="850px"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on">
                      Ver Progreso
                    </v-btn>
                  </template>
                  <v-card height="10%">
                    <v-container>
                      <v-card-title>
                        <span class="headline">Modificar Progreso</span>
                      </v-card-title>
                      <v-select
                        :items="itemFase"
                        label="Ingrese  la fase"
                        dense
                        outlined
                        color="#009900"
                        v-model="progreso.fase"
                        @input="$v.progreso.fase.$touch()"
                        @blur="$v.progreso.fase.$touch()"
                        :error-messages="errorFase"
                      ></v-select>
                      <v-select
                        :items="[
                          'Inicio',
                          'Progreso',
                          'Finalizado',
                          'En   adopcion',
                        ]"
                        label="Ingrese el estado"
                        dense
                        outlined
                        color="#009900"
                        v-model="progreso.estado"
                        @input="$v.progreso.estado.$touch()"
                        @blur="$v.progreso.estado.$touch()"
                        :error-messages="errorEstadoProgreso"
                      ></v-select>
                      <v-menu
                        v-model="datemenu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="progreso.fechaingreso"
                            label="Fecha de Ingreso"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            color="#009900"
                            @input="$v.progreso.fechaingreso.$touch()"
                            @blur="$v.progreso.fechaingreso.$touch()"
                            :error-messages="errorFechaIngresoProgreso"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="progreso.fechaingreso"
                          @input="menu2 = false"
                          locale="es-es"
                        ></v-date-picker>
                      </v-menu>
                      <v-menu
                        v-model="datemenu3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="progreso.fechafinalizacion"
                            label="Fecha de finalizacion"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            color="#009900"
                            @input="$v.progreso.fechafinalizacion.$touch()"
                            @blur="$v.progreso.fechafinalizacion.$touch()"
                            :error-messages="errorFechaFinalizacionProgreso"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="progreso.fechafinalizacion"
                          @input="menu2 = false"
                          locale="es-es"
                        ></v-date-picker>
                      </v-menu>
                      <v-col cols="12" sm="6" md="4">
                        <v-btn color="success" @click="guardarProgreso()">
                          añadir
                        </v-btn>
                      </v-col>
                    </v-container>
                    <v-container>
                      <v-card
                        style="margin-top:1%;width:100%;padding:5px 5px;background-color:#EAEAEA"
                      >
                        <v-card-title style="font-size:22px;padding: 10px 10px;"
                          >Lista de Progresos de Residente</v-card-title
                        >
                        <!-- Cabecera -->
                        <v-card
                          elevation="0"
                          color="#EAEAEA"
                          style="margin-top:5px; margin-bottom:15px"
                          height="30"
                        >
                          <v-row
                            style="margin-left:10px;heigh:100%"
                            align="center"
                          >
                            <v-col cols="2">
                              <article>
                                <span style="font-size:16px">Fase</span>
                              </article>
                            </v-col>
                            <v-col cols="3">
                              <article>
                                <span style="font-size:16px"
                                  >Fecha Ingreso</span
                                >
                              </article>
                            </v-col>
                            <v-col cols="3">
                              <article>
                                <span style="font-size:16px"
                                  >Fecha Finalizacion</span
                                >
                              </article>
                            </v-col>
                            <v-col>
                              <article cols="2">
                                <span style="font-size:16px">Estado</span>
                              </article>
                            </v-col>
                            <v-col align="right"> </v-col>
                          </v-row>
                        </v-card>
                        <!-- Cuerpo -->
                        <template>
                          <v-card
                            tile
                            elevation="0"
                            color="#FAFAFA"
                            style="margin-top:5px"
                            height="60"
                            v-for="(item, index) in residente.progreso"
                            :key="index"
                          >
                            <v-row
                              style="margin-left:10px;heigh:100%;"
                              align="center"
                            >
                              <v-col :cols="2">
                                <article>
                                  <span style="font-size:16px"
                                    >Nº{{ item.fase }} - {{ item.nombre }}</span
                                  >
                                </article>
                              </v-col>
                              <v-col :cols="3">
                                <article>
                                  <span style="font-size:16px">{{
                                    convertDateFormat(item.fechaingreso)
                                  }}</span>
                                </article>
                              </v-col>
                              <v-col :cols="3">
                                <article>
                                  <span style="font-size:16px"
                                    >{{
                                      convertDateFormat(item.fechafinalizacion)
                                    }}
                                    <span
                                      v-if="
                                        comprobarPrevicion(
                                          item.fechafinalizacion
                                        )
                                      "
                                      style="margin-left:5px"
                                      >(previsto)</span
                                    ></span
                                  >
                                </article>
                              </v-col>
                              <v-col :cols="2">
                                <article>
                                  <span style="font-size:16px">{{
                                    item.estado
                                  }}</span>
                                </article>
                              </v-col>
                              <v-col align="right">
                                <div style="margin-right:20px">
                                  <!-- <v-btn
                                        style="margin-right:10px"
                                        fab
                                        x-small
                                        dark
                                        color="#126BB5"
                                        >
                                        <v-icon dark>
                                            mdi-pencil
                                        </v-icon>
                                        </v-btn> -->
                                  <v-btn
                                    @click="eliminarProgreso(item.index)"
                                    fab
                                    x-small
                                    dark
                                    color="red"
                                  >
                                    <v-icon dark>
                                      mdi-minus
                                    </v-icon>
                                  </v-btn>
                                </div>
                              </v-col>
                            </v-row>
                          </v-card>
                        </template>
                        <v-card v-if="errorFasesProgreso" color="red">
                          <v-card-text class="text-center" style="color: white"
                            >Debe Ingresar Las Fases de la Residente
                            Obligatoriamente</v-card-text
                          >
                        </v-card>
                      </v-card>
                    </v-container>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cerrarFaseResidente()"
                      >
                        Cerrar
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="guardarFasesResidente()"
                      >
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>

              <!--Aqui acaba -->
              <v-select
                :items="['En tratamiento', 'Finalizado']"
                v-model="residente.estado"
                @input="$v.residente.estado.$touch()"
                @blur="$v.residente.estado.$touch()"
                :error-messages="errorEstado"
                label="Ingrese el Estado"
                color="#009900"
              ></v-select>

              <v-row>
                <!-- termina le texto -->
                <v-col>
                  <v-btn block @click="modificarResidente()" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Modificar Residente</span>
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