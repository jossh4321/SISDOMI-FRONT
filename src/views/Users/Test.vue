<template>
  <div>
    <h1>HOLA</h1>
    <vue-dropzone ref="myVueDropzone"  @vdropzone-file-added="something()" 
          @vdropzone-complete="afterComplete"

    id="dropzone" :options="dropzoneOptions"></vue-dropzone>
      <div>
        <v-btn @click="hacerAlgo">
          Eliminar Todo
        </v-btn>
      </div>


  </div>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import moment from 'moment'
export default {
  name: "test",
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 3.0,
        maxFiles:1,
        acceptedFiles:".jpg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true
      },
    };
  },
  methods: {
    hacerAlgo(){
       console.log(moment("12-25-1995", "MM-DD-YYYY"));
       console.log(new Date());
       console.log(new Date("12-25-1995"));
       console.log(moment("12-25-1995").format('YYYY-MM-DD'));
    },
    eliminarArchivos(){
      console.log(this.$refs.myVueDropzone.dropzone.files[0].dataURL);
       this.$refs.myVueDropzone.removeAllFiles(true);
    },
    async something(file){
      console.log("Something Happened");
      /*console.log(file);
       await console.log(this.$refs.myVueDropzone.dropzone.files[0].dataURL);*/
    },
    afterComplete(file){
      console.log(file.dataURL);
    }
  },
};
</script>