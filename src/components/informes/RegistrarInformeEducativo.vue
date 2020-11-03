<template>
    <v-card >
    <v-card-title class="justify-center">Registro de Informe Educativo Inicial</v-card-title>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi tenetur a fugit quisquam unde sint molestias dolore voluptate. Tempore quia voluptas hic earum sapiente omnis eos quibusdam, a explicabo placeat perferendis temporibus aut, veniam deleniti eligendi ipsum magni aliquid fugiat.</p>
        <v-btn block @click="cerrarDialogo()" color="primary">
            <v-icon left>mdi-close-outline</v-icon>
            <span>Cerrar</span>
        </v-btn>
    </v-card>
</template>
<script> 
import axios from 'axios';
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import {mapMutations, mapState} from "vuex";
import { required, minLength,email,helpers } from 'vuelidate/lib/validators'
import moment from 'moment'

export default {
     methods:{
         cerrarDialogo(){            
            this.$emit("close-dialog-save");
        },
     }
}
</script>