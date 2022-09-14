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
                <router-link
                  to="/dodaj-oglas"
                  style="text-decoration: underline #05d853 4px"
                  >NAPIŠI RECEPT</router-link
                >
              </li>
              <li>
                <div class="dropdown">
                  <a style="font-size: 25px" href="#" @click="logout()"
                    ><ion-icon name="power"></ion-icon
                  ></a>
                  <div class="dropdown-content2">
                    <!-- link koji vodi na stranicu gdje su prikazani svi recepti određenog(trenutnog) korisnika  -->
                    <router-link :to="'/moji-oglasi/' + this.korisnik"
                      >Moji oglasi</router-link
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
    <form class="recipe-form" @submit.prevent="postRecipe">
      <div class="form-header">
        <h1>Objavi recept</h1>
      </div>
      <div class="form-body">
        <div class="form-group">
          <label for="url" class="label-title">Url slike</label>
          <input
            v-model="url"
            type="url"
            id="url"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <label for="nazivrecepta" class="label-title">Naziv recepta</label>
          <input
            v-model="naziv"
            type="text"
            id="nazivrecepta"
            class="form-input"
            required
          />
        </div>
        <div class="row">
          <div class="column">
            <div class="form-group">
              <label for="sastojak" class="label-title">Sastojak</label>
              <input
                type="text"
                v-model="sastojak"
                class="form-input"
                id="sastojak"
              />
            </div>
          </div>
          <div class="column">
            <div class="form-group">
              <label for="kolicina" class="label-title">Količina</label>
              <input
                type="number"
                v-model="kolicina"
                class="form-input"
                id="kolicina"
              />
            </div>
          </div>
          <div class="column">
            <div class="form-group">
              <label for="mjera" class="label-title">Mjera</label>
              <input
                type="text"
                v-model="mjera"
                class="form-input"
                id="mjera"
              />
            </div>
          </div>
          <div class="column">
            <div class="form-group">
              <!-- dodavanje sastojaka -->
              <a
                style="font-size: 30px; color: #05d853"
                @click="addIngredient()"
                href="#"
              >
                <ion-icon name="add-circle"></ion-icon>
              </a>
            </div>
          </div>
        </div>
        <div class="form-group">
          <!-- prikaz dodanih sastojaka, količina i mjera -->
          <table
            class="tab"
            v-for="(sastojak, index) in this.sastojci"
            :key="index"
          >
            <tr>
              <td>{{ sastojak.sastojak }}</td>
              <td>{{ sastojak.kolicina }}</td>
              <td>{{ sastojak.mjera }}</td>
              <td>
                <!-- brisanje dodanog sastojaka -->
                <a
                  style="font-size: 18px; color: #05d853"
                  href="#"
                  @click="deleteIngredient(index)"
                  ><ion-icon name="close"></ion-icon
                ></a>
              </td>
            </tr>
          </table>
        </div>
        <div class="form-group">
          <label for="priprema" class="label-title">Priprema</label>
          <textarea
            v-model="priprema"
            id="priprema"
            class="form-input"
            rows="6"
            cols="50"
            style="height: auto"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="tezina" class="label-title">Težina pripreme</label>
          <select
            v-model="tezina"
            name="tezinapripreme"
            id="tezina"
            class="form-input"
            required
          >
            <option value="Jednostavno">Jednostavno</option>
            <option value="Srednje zahtjevno">Srednje zahtjevno</option>
            <option value="Složeno">Složeno</option>
          </select>
        </div>
        <div class="form-group">
          <label for="brojosoba" class="label-title">Broj osoba</label>
          <input
            v-model="brojOsoba"
            type="number"
            id="brojosoba"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <label for="vrijemepripreme" class="label-title"
            >Vrijeme pripreme</label
          >
          <input
            v-model="vrijeme"
            type="number"
            id="vrijemepripreme"
            class="form-input"
            required
          />
          <p>u minutama</p>
        </div>
        <div class="form-group">
          <label for="grupa" class="label-title">Grupa jela</label>
          <select
            v-model="grupa"
            name="grupajela"
            id="grupa"
            class="form-input"
            required
          >
            <option value="Predjelo">Predjelo</option>
            <option value="Juha">Juha</option>
            <option value="Glavno jelo">Glavno jelo</option>
            <option value="Salata">Salata</option>
            <option value="Desert">Desert</option>
          </select>
        </div>
        <div class="form-group">
          <label class="label-title">Kategorija</label>
          <div>
            <input
              type="checkbox"
              id="mesno"
              value="Mesno"
              name="category"
              v-model="kategorija"
            />
            <label for="mesno">Mesno</label>&nbsp;&nbsp;
            <input
              type="checkbox"
              id="riblje"
              value="Riblje"
              name="category"
              v-model="kategorija"
            />
            <label for="riblje">Riblje</label>&nbsp;&nbsp;
            <input
              type="checkbox"
              id="bezlaktoze"
              value="Bez laktoze"
              name="category"
              v-model="kategorija"
            />
            <label for="bezlaktoze">Bez laktoze</label>&nbsp;&nbsp;
            <input
              type="checkbox"
              id="bezglutena"
              value="Bez glutena"
              name="category"
              v-model="kategorija"
            />
            <label for="bezglutena">Bez glutena</label>
            <br />
            <input
              type="checkbox"
              id="vegetarijansko"
              value="Vegetarijansko"
              name="category"
              v-model="kategorija"
            />
            <label for="vegetarijansko">Vegetarijansko</label>&nbsp;&nbsp;
            <input
              type="checkbox"
              id="vegansko"
              value="Vegansko"
              name="category"
              v-model="kategorija"
            />
            <label for="vegansko">Vegansko</label>&nbsp;&nbsp;
            <input
              type="checkbox"
              id="sirovo"
              value="Sirovo"
              name="category"
              v-model="kategorija"
            />
            <label for="sirovo">Sirovo</label>
          </div>
        </div>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn">Kreiraj</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Recepti, Auth } from "@/services";

export default {
  name: "dodaj-recept",
  data: function () {
    return {
      url: "",
      naziv: "",
      sastojak: "",
      kolicina: "",
      mjera: "",
      priprema: "",
      tezina: "",
      brojOsoba: "",
      vrijeme: "",
      grupa: "",
      kategorija: [],
      sastojci: [],
      korisnik: Auth.state.userEmail,
    };
  },
  methods: {
    //dodavanje sastojka, kolicine i mjere u array sastojci
    addIngredient() {
      if (this.sastojak && this.kolicina && this.mjera) {
        this.sastojci.push({
          sastojak: this.sastojak,
          kolicina: this.kolicina,
          mjera: this.mjera,
        });
        (this.sastojak = ""),
          (this.kolicina = ""),
          (this.mjera = ""),
          console.log(this.sastojci);
      } else {
        console.log("Greška");
      }
    },
    //brisanje već dodanih sastojaka, kolicine i mjere iz array-a sastojci pomoću splice metode
    deleteIngredient(number) {
      console.log(number);
      this.sastojci.splice(number, 1);
    },
    //metoda za objavu recepta
    async postRecipe() {
      try {
        let recept = {
          image: this.url,
          nazivRecepta: this.naziv,
          ingredients: this.sastojci,
          preparation: this.priprema,
          difficulty: this.tezina,
          numberOfPeople: this.brojOsoba,
          preparationTime: this.vrijeme,
          group: this.grupa,
          category: this.kategorija,
          postedAt: Date.now(),
          user: this.korisnik,
          //lijevo frontend, a desno iz data vrijednosti
        };
        await Recepti.create(recept); //poziv metode create iz services kojoj predajemo definirane podatke
        this.$router.push({ name: "Recepti" });
      } catch (e) {
        console.log("Došlo je do greške", e);
      }
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

.recipe-form {
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

::-webkit-input-placeholder {
  color: #d9d9d9;
}

.form-body p {
  font-size: 13px;
  font-family: Arial;
  font-style: italic;
  float: right;
}

.form-body .row {
  width: 100%;
  overflow: hidden;
  float: none;
  clear: both;
}

.form-body .column {
  float: left;
  width: 23%;
  padding: 10px;
  padding-left: 0px;
}

.form-body .column a {
  float: left;
  padding: 22px;
  padding-left: 25px;
}

.form-body .tab {
  /*width: 100%;
  height: auto;
  margin-bottom: 20px;
  float: left;*/
  font-family: Arial;
  font-size: 16px;
}

.form-footer {
  clear: both;
}

.recipe-form .form-footer {
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
