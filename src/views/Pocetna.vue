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
              <li><router-link to="/recepti">RECEPTI</router-link></li>
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
    <p>Pozdrav &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;{{ username() }}</p>
    <div class="headline">
      <h1 class="caption">
        <span>Popularni recept</span>
      </h1>
    </div>
    <div v-if="card">
      <recept-m :info="card" />
    </div>
    <div class="headline">
      <h1 class="caption">
        <span>Let's Cook preporuka</span>
      </h1>
    </div>
    <div v-if="card2">
      <recept-m :info="card2" />
    </div>
  </div>
</template>

<script>
import { Service, Recepti, Auth } from "@/services";
import ReceptM from "@/components/ReceptM.vue";

export default {
  name: "pocetna",
  data() {
    return {
      korisnik: Auth.state.userEmail,
      card: null,
      card2: null,
    };
  },
  components: {
    ReceptM,
  },
  mounted() {
    this.getPopularRecipe();
    this.getRandomRecipe();
  },
  methods: {
    //metoda za dobivanje korisničkog imena
    username() {
      //uzimamo email od trenutnog korisnika i pomoću split metode vraćamo dio ispred znaka @
      let email = this.korisnik;
      let result = email.split("@")[0];
      return result;
    },
    async getPopularRecipe() {
      this.card = await Recepti.getPopular();
    },
    async getRandomRecipe() {
      this.card2 = await Recepti.getRandom();
    },
    //metoda za odjavu
    logout() {
      //pozivamo logout metodu iz services
      Auth.logout();
      //osvježavamo trenutnu stranicu
      this.$router.go();
    },
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
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.4) 50%
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

p {
  text-align: center;
  font-size: 20px;
  font-family: Arial;
  font-weight: bold;
  margin-top: 60px;
}

.headline {
  margin: 100px 100px 50px 100px;
}

.caption {
  width: 60%;
  text-align: center;
  font-family: Arial;
  font-size: 56px;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin: 10px 0 20px;
  margin-left: auto;
  margin-right: auto;
  color: #05d853;
}

.caption span {
  background: #fff;
  padding: 0 10px;
}
</style>
