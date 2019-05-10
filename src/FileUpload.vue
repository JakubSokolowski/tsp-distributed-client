<template>
  <div>
    <Menu/>
    <div class="Content">
      <form enctype="multipart/form-data">
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
      </form>
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

            var formData = new FormData();
            const url = "http://localhost:8086/myapp/Pliki";
            formData.append('file', this.file);

          axios({
            method: 'post',
            url: url,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
            alert("Pomyślnie przesłano plik!");
            console.log(response);
          })
          .catch(function (response) {
            alert("Błąd przesyłania pliku!");
            console.log(response);
        });
      },

      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    },
    //na razie w wersji powyższej
    sendFile() {
      let formData = new FormData();
      DataAccess.sendFile(formData)
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
