<template>
  <v-card elevation="3" outlined class="card">
    <v-card-title>Consulta de estadísticas</v-card-title>
    <v-card-subtitle>
      Visualice las estadísticas de los residente según el tipo de consulta que
      eliga
    </v-card-subtitle>
    <v-card-text>
      <v-combobox
        filled
        label="Tipo de consulta"
        :items="selectedTypes"
        v-model="selectedType"
        item-text="text"
        item-value="value"
        return-object
      >
      </v-combobox>
    </v-card-text>
    <v-card-text v-if="selectedType.value != ''">
      <component :is="selectedType.value"></component>
    </v-card-text>
  </v-card>
</template>

<script>
import EstadisticaGradoModalidad from "@/components/estadisticas/EstadisticaGradoModalidad.vue";
import EstadisticaNivelModalidad from "@/components/estadisticas/EstadisticaNivelModalidad.vue";
import EstadisticaResidenteEdad from "@/components/estadisticas/EstadisticaResidenteEdad.vue";
import EstadisticaResidenteFase from "@/components/estadisticas/EstadisticaResidenteFase.vue";

export default {
  name: "consulta-estadisticas",
  data() {
    return {
      selectedTypes: [
        {
          text: "Cantidad de residente por fase",
          value: "EstadisticaResidenteFase",
        },
        {
          text: "Cantidad de residentes por rango de edad",
          value: "EstadisticaResidenteEdad",
        },
        {
          text: "Grado académico de los residentes según modalidad",
          value: "EstadisticaGradoModalidad",
        },
        {
          text: "Nivel académico de los residentes según modalidad",
          value: "EstadisticaNivelModalidad",
        },
      ],
      selectedType: {
          text: "",
          value: ""
      },
    };
  },
  components: {
    EstadisticaGradoModalidad,
    EstadisticaNivelModalidad,
    EstadisticaResidenteEdad,
    EstadisticaResidenteFase,
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