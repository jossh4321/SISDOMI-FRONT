<template>
  <v-card elevation="3" outlined class="card">
    <v-card-title>Consulta de estadísticas</v-card-title>
    <v-card-subtitle>
      Visualice las estadísticas de los residente según el tipo de consulta que
      eliga
    </v-card-subtitle>
    <v-card-text class="pb-0">
      <v-combobox
        filled
        label="Tipo de consulta"
        :items="selectedTypes"
        v-model="selectedType"
        item-text="text"
        item-value="value"
        @change="selectedStadistic"
        return-object
      >
      </v-combobox>
    </v-card-text>
    <v-card-text class="pt-0" v-if="isShowResidentsFieldProgress">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="6" xl="6">
          <v-autocomplete
            label="Nombres y apellidos del residente"
            outlined
            v-model="resident"
            :loading="loadingSearch"
            :items="residentes"
            :search-input.sync="searchResident"
            item-text="residente"
            item-value="id"
            hide-no-data
            hide-selected
            return-object
            @change="changeShowStadistic"
          >
            <template v-slot:item="item">
              <v-list-item-avatar
                color="primary"
                class="headline font-weight-light white--text"
              >
                {{ item.item.residente.charAt(0) }}
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.item.residente }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  DNI: {{ item.item.numeroDocumento }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="3"
          class="d-flex align-center mb-3"
        >
          <v-btn
            color="primary"
            :disabled="resident.id != '' ? false : true"
            @click="showStadistic"
          >
            Obtener estadísticas
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-if="selectedType.value != '' && isShowStadistic">
      <component :is="selectedType.value" :residente="resident"></component>
    </v-card-text>
  </v-card>
</template>

<script>
import EstadisticaGradoModalidad from "@/components/estadisticas/EstadisticaGradoModalidad.vue";
import EstadisticaNivelModalidad from "@/components/estadisticas/EstadisticaNivelModalidad.vue";
import EstadisticaResidenteEdad from "@/components/estadisticas/EstadisticaResidenteEdad.vue";
import EstadisticaResidenteFase from "@/components/estadisticas/EstadisticaResidenteFase.vue";
import EstadisticaProgresoResidente from "@/components/estadisticas/EstadisticaProgresoResidente.vue";
import axios from "axios";

export default {
  name: "consulta-estadisticas",
  data() {
    return {
      selectedTypes: [
        {
          text: "Cantidad de residente por fase",
          value: "EstadisticaResidenteFase",
          multipleFields: false,
        },
        {
          text: "Cantidad de residentes por rango de edad",
          value: "EstadisticaResidenteEdad",
          multipleFields: false,
        },
        {
          text: "Grado académico de los residentes según modalidad",
          value: "EstadisticaGradoModalidad",
          multipleFields: false,
        },
        {
          text: "Nivel académico de los residentes según modalidad",
          value: "EstadisticaNivelModalidad",
          multipleFields: false,
        },
        {
          text: "Progreso por residente",
          value: "EstadisticaProgresoResidente",
          multipleFields: true,
        },
      ],
      selectedType: {
        text: "",
        value: "",
        multipleFields: false,
      },
      isShowStadistic: false,
      resident: {
        residente: "",
        id: "",
        numeroDocumento: "",
        progreso: [],
      },
      loadingSearch: false,
      residentes: [],
      searchResident: null,
      isShowResidentsFieldProgress: false,
    };
  },
  methods: {
    selectedStadistic(value) {
      if (!value.multipleFields) {
        this.isShowStadistic = true;
        this.resident = {
          residente: "",
          id: "",
          numeroDocumento: "",
          progreso: [],
        };
        this.isShowResidentsFieldProgress = false;
      } else {
        switch (value.value) {
          case "EstadisticaProgresoResidente":
            this.isShowStadistic = false;
            this.isShowResidentsFieldProgress = true;
            break;

          default:
            break;
        }
      }
    },
    showStadistic() {
      this.isShowStadistic = true;
    },
    changeShowStadistic() {
      this.isShowStadistic = false;
    }
  },
  watch: {
    searchResident(value) {
      if (value == null) {
        this.resident = {
          residente: "",
          id: "",
          numeroDocumento: "",
          progreso: [],
        };
      }

      if (this.residentes.length > 0) {
        return;
      }

      if (this.loadingSearch) {
        return;
      }

      this.loadingSearch = true;

      axios
        .get("/residente/all")
        .then((res) => {
          let residentesMap = res.data.map(function (res) {
            return {
              residente: res.nombre + " " + res.apellido,
              id: res.id,
              numeroDocumento: res.numeroDocumento,
              progreso: res.progreso,
            };
          });

          this.residentes = residentesMap;

          this.loadingSearch = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  components: {
    EstadisticaGradoModalidad,
    EstadisticaNivelModalidad,
    EstadisticaResidenteEdad,
    EstadisticaResidenteFase,
    EstadisticaProgresoResidente,
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 95%;
  margin: 0px auto;
  margin-top: 30px;
  padding-bottom: 20px;
}
</style>