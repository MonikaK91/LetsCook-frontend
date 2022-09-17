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
    <form class="password-form" @submit.prevent="changePassword">
      <div class="form-header">
        <h1>Promijeni lozinku</h1>
      </div>
      <div class="form-body">
        <div class="form-group">
          <label for="password" class="label-title">Stara lozinka</label>
          <input
            v-model="old_password"
            type="password"
            name="password"
            id="password"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <label for="passwordR" class="label-title">Nova lozinka</label>
          <input
            v-model="new_password"
            type="password"
            name="passwordR"
            id="passwordR"
            class="form-input"
            required
          />
        </div>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn">Promijeni lozinku</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Recepti, Auth } from "@/services";

export default {
  name: "lozinka",
  data: function () {
    return {
      old_password: "",
      new_password: "",
      korisnik: Auth.state.userEmail,
    };
  },
  methods: {
    //metoda za promjenu lozinke
    async changePassword() {
      let result = await Auth.newpassword(
        this.old_password,
        this.new_password,
        this.korisnik
      );
      alert("Lozinka uspješno promijenjena");
      this.$router.go();
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

.password-form {
  font-family: Arial;
  width: 700px;
  margin: 80px auto;
  background: #fff;
  border-radius: 10px;
  border: 5px;
  border-style: solid;
  border-color: #05d853;
  box-shadow: 10px 10px 5px #05d853;
}

.form-header {
  background-color: #eff0f1;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.form-header h1 {
  font-size: 30px;
  text-align: center;
  color: #000;
  padding: 20px 0;
  border-bottom: 1px solid #cccccc;
  margin: 0px;
}

.form-body {
  padding: 10px 40px;
}

.form-group {
  margin-bottom: 20px;
}

.form-body .label-title {
  color: #000;
  font-size: 17px;
  font-weight: bold;
}

.form-body .form-input {
  font-size: 17px;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-left: 10px;
  padding-right: 10px;
  color: #333333;
  text-align: left;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
  background: #fff;
  outline: none;
}

.form-footer {
  clear: both;
}

.password-form .form-footer {
  background-color: #eff0f1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px 4px;
  text-align: right;
  border-top: 1px solid #cccccc;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #05d853;
  font-size: 17px;
  border: none;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
}

.btn:hover {
  background-color: #fff;
  color: #000;
  border: 1px;
  border-style: solid;
  border-color: #05d853;
}
</style>
