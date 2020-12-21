<template lang="">
    <div>
        
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:"ProgresoResidente",
    data(){
        return{
            residente:"",
        }
    },
    async created(){
        await axios.get("/residente/progreso/5fd5bd206824543876e5a283")
                    .then((res)=>{
                        this.residente = res.data;
                        console.log(this.residente);
                    }).catch((err)=> console.log(err));
    },methods:{

    }
}
</script>