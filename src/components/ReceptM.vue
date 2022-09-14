<template>
  <div class="container">
    <div class="card-container">
      <div class="header">
        <img :src="info.image" />
      </div>
      <div class="description">
        <!-- link koji vodi na cijeli recept -->
        <h4>
          <router-link :to="'/recept-detalji/' + info.id">{{
            info.nazivRecepta
          }}</router-link>
        </h4>
        <!-- ako je email autora recepta isti kao i email trenutnog korisnika 
        onda se prikazuje ikona i može se obrisati recept -->
        <a href="#" v-if="info.user == this.korisnik" @click="removeRecipe()"
          ><ion-icon name="trash"></ion-icon
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import { Recepti, Auth } from "@/services";

export default {
  props: ["info"],
  name: "ReceptM",
  data() {
    return {
      korisnik: Auth.state.userEmail,
    };
  },
  methods: {
    //metoda za brisanje recepta
    async removeRecipe() {
      const c = confirm("Jeste li sigurni da želite obrisati recept?");
      if (c) {
        let id = this.info.id; //id označava id određenog(trenutnog) recepta
        await Recepti.deleteRecipe(id);
        alert("Uspješno obrisan oglas");
        //nakon brisanja osvježavamo trenutnu stranicu
        this.$router.go();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  font-family: Arial;
}

.card-container {
  display: flex;
  width: 900px;
  height: auto;
  background: #fff;
  box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.4);
}

.header img {
  transition: 0.2s;
  width: 500px;
  height: 300px;
  object-fit: cover;
  position: relative;
  display: block;
}

.description {
  background: #fff;
  padding: 25px;
  text-align: left;
  position: relative;
}

.description h4 {
  margin: 20px 30px;
  font-size: 38px;
}

.description a {
  text-decoration: none;
  color: #05d853;
}

.description a:hover {
  color: #000;
}

.description ion-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  color: #05d853;
  height: 50px;
  width: 32px;
}

.description ion-icon:hover {
  color: #000;
}
</style>
