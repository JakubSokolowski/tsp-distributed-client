<template>
  <div>
    <Menu/>
    <div class="Content">
      <p>Prześlij plik</p>
      <div>
        Wybierz plik do przesłania:
      </div>
      <div>
        <input accept=".tsp, .atsp, .xml" type="file" id="file" ref="file" @change="handleFileUpload()"/>
      </div>  
      <div> 
        <input type="button" value="Wyślij" @click="submitFile">
      </div>
    </div>
  </div>
</template>


<script>
  import Menu from "@/components/Menu.vue";
  import DataAccess from "@/components/DataAccess.js";
  import axios from 'axios'

  export default {
    name: "FileUpload",
    components: {
      Menu
    },

    data(){
      return {
        file: '',
        comunicats: []
      }
    },

    methods: {

      submitFile(){

            let formData = new FormData();
            const url = `http://localhost:8086/myapp/Files`;
            formData.append('file', this.file);
            
            axios.post( url, formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                
              }
              
            ).then(function(){
          console.log('Submit succesfully!');
        })
        .catch(function(){
          console.log('Submit failed!');
        });
        
      },

      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    },
    //na razie w wersji powyższej
    sendFile() {
      let formData = new FormData();
      DataAccess.sendFIle(formData)
        .then(response => {
          this.comunicats = [];
          this.comunicats.push(response.data);
        })
        .catch(error => {
          this.comunicats = [];
          for (var propName in error.response.data) {
            this.comunicats.push(error.response.data[propName]);
          }
        });
    }
  }
</script>

<style scoped>
.Content {
  padding: 5px;
}
.Content p {
  display: block;
  border-style: none none solid none;
  border-bottom-color: darkgreen;
  color: darkgreen;
}
</style>
