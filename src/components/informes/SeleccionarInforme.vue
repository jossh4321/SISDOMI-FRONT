<template>
    <v-card >
        <v-card-title class="justify-center">Seleccione el tipo de informe que desea registrar</v-card-title>               
         <div  class="container-user">
             <v-card-text>            
            <v-select
                v-model="items.value"
                :items="items"
                label="Selector de Formularios de Informes"
                outlined
                dense
            ></v-select>            
            <v-row>
                <v-col>
                    <v-btn block @click="cerrarDialogo()" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                    </v-btn>
                </v-col>
                <template>
                    <v-col>
                        <v-btn block @click="abrirDialogo()" color="success">
                        <v-icon left>done</v-icon>
                        <span >Continuar</span>
                        </v-btn>
                        <RegistrarInformeEducativoEvolutivo 
                            v-if="showRegistrarInformeEE" 
                            :listaresidentes="listaresidentesIEE" 
                            :listaeducadores="listaeducadores" 
                            :visible="showRegistrarInformeEE" 
                            :titulo="titulo" 
                            @close="showRegistrarInformeEE=false"/>                     
                        <RegistrarInformeEducativoInicial 
                            v-if="showRegistrarInformeEI"
                            :listaresidentes="listaresidentesIEI"
                            :listaeducadores="listaeducadores"           
                            :visible="showRegistrarInformeEI"  
                            @close="showRegistrarInformeEI=false"/>
                        <RegistrarInformeSocialInicial                 
                            v-if="showRegistrarInformeSI"
                            :listaresidentes="listaresidentesISI" 
                            :visible="showRegistrarInformeSI"  
                            :listasociales="listasociales"
                            @close="showRegistrarInformeSI=false"/>
                        <RegistrarInformeSocialEvolutivo                 
                            v-if="showRegistrarInformeSE"
                            :listaresidentes="listaresidentes"
                            :listasociales="listasociales" 
                            :visible="showRegistrarInformeSE"
                            :titulo="titulo"  
                            @close="showRegistrarInformeSE=false"/>
                        <RegistrarInformePsicologicoInicial        
                            :listaresidentes="listaresidentesIPI"    
                            :listapsicologos="listapsicologos"
                            v-if="showRegistrarInformePI" 
                            :visible="showRegistrarInformePI"                                 
                            @close="showRegistrarInformePI=false"/>
                        <RegistrarInformePsicologicoEvolutivo                 
                            v-if="showRegistrarInformePE"
                            :listaresidentes="listaresidentes"
                            :listapsicologos="listapsicologos" 
                            :visible="showRegistrarInformePE"
                            :titulo="titulo"  
                            @close="showRegistrarInformePE=false"/>                       
                    </v-col>
                </template>
            </v-row>
            </v-card-text>                       
         </div>
    </v-card>
</template>
<script> 
import axios from 'axios';
import RegistrarInformeEducativoInicial from '@/components/informes/RegistrarInformeEducativoInicial.vue'
import RegistrarInformeEducativoEvolutivo from '@/components/informes/RegistrarInformeEducativoEvolutivo.vue'
import RegistrarInformeSocialInicial from '@/components/informes/RegistrarInformeSocialInicial.vue'
import RegistrarInformeSocialEvolutivo from '@/components/informes/RegistrarInformeSocialEvolutivo.vue'
import RegistrarInformePsicologicoInicial from '@/components/informes/RegistrarInformePsicologicoInicial.vue'
import RegistrarInformePsicologicoEvolutivo from '@/components/informes/RegistrarInformePsicologicoEvolutivo.vue'
import {mapMutations, mapState} from "vuex";
export default {
    props:["listaresidentes", "listaeducadores","listasociales", "listapsicologos"],
    components: {
        RegistrarInformeEducativoInicial,
        RegistrarInformeEducativoEvolutivo,
        RegistrarInformeSocialInicial,
        RegistrarInformeSocialEvolutivo,
        RegistrarInformePsicologicoInicial,
        RegistrarInformePsicologicoEvolutivo
    },
    data () {
      return {                
        items: [
            { value: '1', text: 'Informe Educativo Inicial'},
            { value: '2', text: 'Informe Educativo Evolutivo'},
            { value: '3', text: 'Informe Educativo Final'},
            { value: '4', text: 'Informe Social Inicial'},
            { value: '5', text: 'Informe Social Evolutivo'},
            { value: '6', text: 'Informe Social Final'},
            { value: '7', text: 'Informe Psicológico Inicial'},
            { value: '8', text: 'Informe Psicológico Evolutivo'},
            { value: '9', text: 'Informe Psicológico Final'}
        ],
        titulo:"Titulo por defecto",
        showRegistrarInformeEI: false,
        showRegistrarInformeEE: false,
        showRegistrarInformeSI: false,
        showRegistrarInformeSE: false,
        showRegistrarInformePI: false,
        showRegistrarInformePE: false,
        listaresidentesIEI: [],
        listaresidentesIEE: [],
        listaresidentesISI: [],
        listaresidentesISE: [],
        listaresidentesIPI: [],
        listaresidentesIPE: [],
        faseEducativaInicial: {            
            fase: "1",
            area: "educativa",
            documentoanterior: "FichaEducativaIngreso",
            documentoactual: "InformeEducativoInicial",
            estadodocumentoanterior: "Completo",
        },
        faseEducativaEvolutivo: {            
            fase: "2",
            fasedocumentoanterior:"2",
            area: "educativa",
            documentoanterior: "PlanIntervencionIndividualEducativo",
            documentoactual: "InformeEducativoEvolutivo",
            estadodocumentoanterior: "Completo",
            estadodocumentoactual: " "
        },
        faseEducativaFinal: {            
            fase: "3",
            area: "educativa",
            documentoanterior: "InformeEducativoEvolutivo",
            documentoactual: "InformeEducativoFinal",
            estadodocumentoanterior: "Completo",
        },
        faseSocialInicial: {            
            fase: "1",
            area: "social",
            documentoanterior: "FichaSocialIngreso",
            documentoactual: "InformeSocialInicial",
            estadodocumentoanterior: "Completo",
        },
        faseSocialFinal: {            
            fase: "3",
            area: "social",
            documentoanterior: "InformeSocialEvolutivo",
            documentoactual: "InformeSocialFinal",
            estadodocumentoanterior: "Completo",
        },
        fasePsicologicoInicial: {            
            fase: "1",
            area: "psicologica",
            documentoanterior: "FichaPsicologicaIngreso",
            documentoactual: "InformePsicologicoInicial",
            estadodocumentoanterior: "Completo",
        },
        fasePsicologicoFinal: {            
            fase: "3",
            area: "psicologica",
            documentoanterior: "InformePsicologicoEvolutivo",
            documentoactual: "InformePsicologicoFinal",
            estadodocumentoanterior: "Completo",
        }
      }
    }, 
    async created(){
        this.obtenerResidentesIEI();
        this.obtenerResidentesISI();
        this.obtenerResidentesIPI();
    },
     methods:{
        cerrarDialogo(){            
            this.$emit("close-dialog-save");
        },
        async abrirDialogo(){
            console.log(this.items.value);
            switch(this.items.value){
                case "1":                                         
                    this.showRegistrarInformeEI = true;
                    break;
                case "2":
                    this.titulo = "Registrar Informe Educativo Evolutivo"
                    await this.obtenerResidentesIEE();
                    this.showRegistrarInformeEE = true;
                    break;
                case "3":
                    this.titulo = "Registrar Informe Educativo Final"
                    await this.obtenerResidentesIEF();
                    this.showRegistrarInformeEE = true;
                    break;
                case "4":
                    this.showRegistrarInformeSI = true;
                    break;
                case "5":
                    this.titulo = "Registrar Informe Social Evolutivo"
                    this.showRegistrarInformeSE = true;
                    break;
                case "6":
                    this.titulo = "Registrar Informe Social Final"
                    this.showRegistrarInformeSE = true;
                    break;
                case "7":
                    this.showRegistrarInformePI = true;
                    break;
                case "8":
                    this.titulo = "Registrar Informe Psicologico Evolutivo"
                    this.showRegistrarInformePE = true;
                    break;
                case "9":
                    this.titulo = "Registrar Informe Psicologico Final"
                    this.showRegistrarInformePE = true;
                    break;
                default: 
                    console.log("no encontre ni pincho .|.");
            }            
            this.$emit("close-dialog-save");
        },
     async obtenerResidentesIEI() {      
      await axios
        .post("/residente/all/estadofase", this.faseEducativaInicial)
        .then((x) => {
          this.listaresidentesIEI = x.data;
          console.log(this.listaresidentesIEI);
        })
        .catch((err) => console.log(err));
     },
     async obtenerResidentesIEE() {      
      await axios
        .post("/residente/all/estadofase", this.faseEducativaEvolutivo)
        .then((x) => {
          this.listaresidentesIEE = x.data;
          console.log(this.listaresidentesIEE);
        })
        .catch((err) => console.log(err));
     },
     async obtenerResidentesIEF() {      
      await axios
        .post("/residente/all/estadofase", this.faseEducativaFinal)
        .then((x) => {
          this.listaresidentesIEE = x.data;
          console.log(this.listaresidentesIEE);
        })
        .catch((err) => console.log(err));
     },
     async obtenerResidentesISI() {      
      await axios
        .post("/residente/all/estadofase", this.faseSocialInicial)
        .then((x) => {
          this.listaresidentesISI = x.data;
          console.log(this.listaresidentesISI);
        })
        .catch((err) => console.log(err));
     },
     async obtenerResidentesISF() {      
      await axios
        .post("/residente/all/estadofase", this.faseSocialFinal)
        .then((x) => {
          this.listaresidentesISE = x.data;
          console.log(this.listaresidentesISE);
        })
        .catch((err) => console.log(err));
     },
     async obtenerResidentesIPI() {      
      await axios
        .post("/residente/all/estadofase", this.fasePsicologicoInicial)
        .then((x) => {
          this.listaresidentesIPI = x.data;
          console.log(this.listaresidentesIPI);
        })
        .catch((err) => console.log(err));
     },
     async obtenerResidentesIPF() {      
      await axios
        .post("/residente/all/estadofase", this.fasePsicologicoFinal)
        .then((x) => {
          this.listaresidentesIPE = x.data;
          console.log(this.listaresidentesIPE);
        })
        .catch((err) => console.log(err));
     },
    }
}
</script>