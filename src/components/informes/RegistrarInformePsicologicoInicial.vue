<template>
  <v-dialog v-model="show" max-width="50%">
    <v-card>
      <v-card-title class="justify-center"
        >Registro de Informe Psicológico Inicial</v-card-title
      >
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">
            Datos Generales
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">
            Análisis y Diagnóstico
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

                <v-textarea
                  label="Antecedentes"                  
                  auto-grow
                  outlined
                  rows="2"
                  row-height="25"
                  color="#009900"
                  shaped                  
                ></v-textarea>

                <v-textarea
                  label="Contexto psicológico"                  
                  auto-grow
                  outlined
                  rows="2"
                  row-height="25"
                  color="#009900"
                  shaped                  
                ></v-textarea>

                <v-textarea
                  label="Análisis de estado psicológico actual"                  
                  auto-grow
                  outlined
                  rows="2"
                  row-height="25"
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
                    <v-btn block @click="show = false" color="primary">
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
                💩
                <v-row>
                  <v-col>
                    <v-btn block color="success">
                      <v-icon left>mdi-content-save-all-outline</v-icon>
                      <span>Registrar Informe</span>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn block @click="show = false" color="primary">
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
  </v-dialog>
</template>
<script>
export default {
  props: ["listaresidentes","visible"],
  data() {
    return {
      step: 1,
      informe: {
        id: "",
        tipo: "InformePsicologicoInicial",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: "",
        area: "psicologica",
        fase: "acogida",
        idresidente: "",
        estado: "creado",
        contenido: {          
        },
      },
    };
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
  },
};
</script>
