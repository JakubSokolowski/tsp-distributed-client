<template>
  <div>
    <Menu/>
    <div class="Content">
      <form enctype="multipart/form-data">
        <fieldset>
          <legend>Prześlij plik</legend>
          <label for="file">Wybierz plik do przesłania:</label>
          <input
            accept=".tsp, .atsp, .xml"
            type="file"
            id="file"
            ref="file"
            @change="handleFileUpload()"
          >
          <input type="button" value="Wyślij" @click="submitFile">
        </fieldset>
      </form>
    </div>
  </div>
</template>


<script>
import Menu from "@/components/Menu.vue";
import DataAccess from "@/components/DataAccess.js";
import axios from "axios";

export default {
  name: "FileUpload",
  components: {
    Menu
  },

  data() {
    return {
      file: "",
      comunicats: []
    };
  },

  methods: {
    submitFile() {
      let formData = new FormData();
      const url = `http://localhost:8086/myapp/Files`;
      formData.append("file", this.file);

      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          params: null,
          auth: {
            username: this.$store.getters.username,
            password: this.$store.getters.password
          }
        })
        .then(function() {
          console.log("Submit succesfully!");
        })
        .catch(function() {
          console.log("Submit failed!");
        });
    },

    handleFileUpload() {
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
};
</script>

<style scoped>
form{
  border: solid 2px darkblue;
  box-shadow: 0px 0px 10px darkblue;
  background-color: rgba(0,0,0,0.7);
  color: blue;
  width: 70%;
  margin-left:auto; 
  margin-right:auto;
}
form fieldset{
  border: none;
}
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
