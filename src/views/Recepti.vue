<template>
  <div>
    <header>
      <div class="main">
        <div class="navbar">
          <div class="icon">
            <router-link to="/pocetna"
              ><h2 class="logo">Let's Cook</h2></router-link
            >
          </div>

          <div class="menu">
            <ul>
              <li>
                <router-link
                  to="/recepti"
                  style="text-decoration: underline #05d853 4px"
                  >RECEPTI</router-link
                >
              </li>
              <li>
                <router-link to="/dodaj-recept">NAPIŠI RECEPT</router-link>
              </li>
              <li>
                <div class="dropdown">
                  <a style="font-size: 25px" href="#" @click="logout()"
                    ><ion-icon name="power"></ion-icon
                  ></a>
                  <div class="dropdown-content2">
                    <!-- link koji vodi na stranicu gdje su prikazani svi recepti određenog(trenutnog) korisnika  -->
                    <router-link :to="'/moji-oglasi/' + this.korisnik"
                      >Moji recepti</router-link
                    >
                    <router-link to="/lozinka">Promijeni lozinku</router-link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <div class="search">
      <input
        v-model="searchTerm"
        class="srch"
        type="search"
        name="search"
        placeholder="Pretraži"
      />
    </div>
    <br />
    <br />
    <div class="filtriranje">
      <form class="filter">
        <div class="form-group">
          <label for="filter" class="label-title"></label>
          <select v-model="filter" name="filter" id="filter" class="form-input">
            <optgroup label="Grupa jela">
              <option value="Predjelo">Predjelo</option>
              <option value="Juha">Juha</option>
              <option value="Glavno jelo">Glavno jelo</option>
              <option value="Salata">Salata</option>
              <option value="Desert">Desert</option>
            </optgroup>
            <optgroup label="Kategorija jela">
              <option value="Mesno">Mesno</option>
              <option value="Riblje">Riblje</option>
              <option value="Bez glutena">Bez glutena</option>
              <option value="Bez laktoze">Bez laktoze</option>
              <option value="Vegetarijansko">Vegetarijansko</option>
              <option value="Vegansko">Vegansko</option>
              <option value="Sirovo">Sirovo</option>
            </optgroup>
          </select>
        </div>
      </form>
      <!-- ako filter nije odabran zove se emptyFilter metoda da upozori korisnika -->
      <button
        type="button"
        class="btnn"
        v-if="this.filter == ''"
        @click="emptyFilter()"
      >
        <a>Filtriraj</a>
      </button>
      <!-- ako je filter odabran korisnika se prebacuje na stranicu gdje su samo rezultati vezani uz taj filter -->
      <button class="btnn" v-if="this.filter != ''">
        <router-link :to="'/recepti-filter/' + this.filter"
          >Filtriraj</router-link
        >
      </button>
    </div>
    <!-- prikaz svih recepata -->
    <recept-m v-for="card in cards" :key="card.id" :info="card" />
  </div>
</template>

<script>
import _ from "lodash";
import ReceptM from "@/components/ReceptM.vue";
import { Service, Recepti, Auth } from "@/services";

export default {
  name: "recepti",
  data() {
    return {
      cards: [],
      searchTerm: "",
      filter: "",
      korisnik: Auth.state.userEmail,
    };
  },
  components: {
    ReceptM,
  },
  mounted() {
    this.fetchRecipes(); //poziv funkcije
  },
  methods: {
    //metoda za dohvat svih recepata te pretragu
    async fetchRecipes() {
      let term = this.searchTerm.toLowerCase(); //searchTerm iz data dijela pretvaramo u mala slova zbog pretrage
      let cards = await Recepti.getAll(term);
      this.cards = cards;
    },
    //metoda za odjavu
    logout() {
      //pozivamo logout metodu iz services
      Auth.logout();
      //osvježavamo trenutnu stranicu
      this.$router.go();
    },
    emptyFilter() {
      alert("Odaberi filter.");
    },
  },
  watch: {
    //slušanje promjena searchTerm varijable
    //okida se funkcija fetchRecipes kada se detektira promjena
    //debounce metoda čeka određeno vrijeme nakon posljednjeg događaja
    //osiguramo da se pozivi izvršavaju kada korisnik prestane s tipkanjem točnije nakon 500 milisekundi
    searchTerm: _.debounce(function (val) {
      this.fetchRecipes(val);
    }, 500),
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.main {
  width: 100%;
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.3) 30%,
      rgba(0, 0, 0, 0.3) 30%
    ),
    url("~@/assets/23.jpg");
  background-position: center;
  background-size: cover;
  height: 50vh;
  border-bottom: solid 5px #000;
}

.navbar {
  width: 1300px;
  height: 75px;
  margin: auto;
}

.icon {
  width: 270px;
  float: left;
  height: 70px;
}

.logo {
  color: #05d853;
  font-size: 45px;
  font-family: Arial;
  padding-left: 20px;
  float: left;
  padding-top: 10px;
  margin-top: 5px;
}

.menu {
  width: 500px;
  float: left;
  height: 70px;
}

ul {
  float: left;
  display: -webkit-box;
  justify-content: center;
  align-items: center;
}

ul li {
  list-style: none;
  margin-left: 250px;
  margin-top: 30px;
  font-size: 15px;
}

ul li a {
  text-decoration: none;
  color: #fff;
  font-family: Arial;
  font-weight: bold;
  transition: 0.4s ease-in-out;
}

ul li a:hover {
  color: #05d853;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content2 {
  position: absolute;
  background-color: #fff;
  z-index: 98;
  max-height: 0;
  min-width: 90px;
  transition: max-height 0.15s ease-out;
  overflow: hidden;
  border-radius: 5px;
  opacity: 0.6;
}

.dropdown-content2 a {
  color: #000;
  background-color: #fff;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content2 {
  max-height: 200px;
  min-width: 100px;
  transition: max-height 0.25s ease-in;
}

.search {
  width: 1000px;
  margin-top: 60px;
  margin-bottom: 100px;
  margin-left: 570px;
}

.srch {
  font-family: "Times New Roman";
  width: 400px;
  height: 54px;
  background: transparent;
  border: 2px solid #05d853;
  margin-top: 13px;
  color: #000;
  font-size: 18px;
  float: left;
  padding: 10px;
  border-radius: 5px;
}

.srch:focus {
  outline: none;
}

::-webkit-input-placeholder {
  color: #000;
}

.filtriranje {
  width: 520px;
  margin-top: 20px;
  margin-bottom: 60px;
  margin-left: 518px;
}

.filter {
  font-family: "Times New Roman";
  width: 400px;
  height: 54px;
  background: transparent;
  margin-top: 8px;
  color: #000;
  float: left;
  padding: 10px;
}

.form-group .form-input {
  font-size: 17px;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-left: 10px;
  padding-right: 10px;
  color: #333333;
  text-align: left;
  border: 2px solid #05d853;
  border-radius: 4px;
  background: #fff;
  outline: none;
}

::-ms-input-placeholder {
  color: grey;
}

::placeholder {
  color: grey;
}

.btnn {
  width: 100px;
  height: 42px;
  background: #05d853;
  border: 3px solid #05d853;
  margin-top: 13px;
  font-size: 16px;
  border-radius: 5px;
  transition: 0.2s ease;
  cursor: pointer;
}

.btnn:hover {
  background: #fff;
  border: 2px solid #05d853;
}

.btnn a {
  text-decoration: none;
  color: #000;
  font-weight: bold;
}

.btnn:focus {
  outline: none;
}
</style>
