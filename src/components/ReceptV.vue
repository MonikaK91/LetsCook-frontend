<template>
  <div>
    <div class="headline">
      <h1 class="caption"><span>Recept</span></h1>
    </div>
    <div class="maincontainer">
      <div class="container">
        <div class="card-container">
          <div class="header">
            <img :src="info.image" />
          </div>
          <div class="description">
            <h1>{{ info.nazivRecepta }}</h1>
            <p>
              <ion-icon name="restaurant" style="font-size: 25px"></ion-icon>
              {{ info.numberOfPeople }} <br />
              <ion-icon name="time" style="font-size: 25px"></ion-icon>
              {{ info.preparationTime }} minuta<br />
              <br />
              <b>Kategorija:</b>
              <!-- prikaz kategorija iz array-a category -->
              <i v-for="c in info.category" :key="c"> {{ c }}, </i>
              <br />
              <b>Težina pripreme:</b> <i>{{ info.difficulty }}</i>
              <br />
              <b>Autor: </b><i>{{ info.user }}</i>
              <br />
              <b>Prosječna ocjena: </b><i>{{ prosječnaOcjena }}</i>
            </p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="card-container">
          <div class="description">
            <h2>Sastojci:</h2>
            <ul>
              <!-- prikaz sastojaka, kolicina i mjera iz array-a ingredients u obliku popisa -->
              <li v-for="ingredient in info.ingredients" :key="ingredient.id">
                {{ ingredient.sastojak }} - {{ ingredient.kolicina }}
                {{ ingredient.mjera }}
              </li>
            </ul>
          </div>
          <div class="description">
            <h2>Priprema:</h2>
            <p>
              {{ info.preparation }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="headline">
      <h1 class="caption2"><span>Komentari</span></h1>
    </div>
    <div class="container2">
      <div class="card-container">
        <div class="description">
          <!-- tekst ispod se prikazuje ako još nema komentara za određeni recept -->
          <h4 v-if="this.cards == ''">
            Još nema komentara. <br />
            Budi prva/i i podijeli svoje mišljenje o receptu.
          </h4>
          <!-- za prikaz komentara -->
          <div class="comment" v-for="card in cards" :key="card.id">
            <h5>
              <i>- {{ card.user }}</i>
            </h5>
            <p>
              <ion-icon
                name="star"
                style="font-size: 17px; color: #05d853"
              ></ion-icon>
              <i style="font-size: 15px"> {{ card.review }} </i>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {{ card.comment }}
            </p>
            <div class="function">
              <!-- opcija brisanja komentara ako je trenutni korisnik isti kao i autor komentara.
                   Za brisanje komentara prosljeđujemo id od komentara  -->
              <a
                style="font-size: 15px; color: #05d853"
                href="#"
                v-if="card.user == korisnik"
                @click="removeComment(card.id)"
                ><ion-icon name="close"></ion-icon>Obriši</a
              >&nbsp;&nbsp;&nbsp;&nbsp;
              <!-- za uređivanje komentara prvo se pokreće funkcija transferId,
                   a onda se otvara popup kako bi korisnik mogao urediti svoj komentar-->
              <a
                href="#popup1"
                class="popup-link"
                style="font-size: 15px; color: #05d853"
                v-if="card.user == korisnik"
                @click="transferId(card.id)"
                ><ion-icon name="brush"></ion-icon>Uredi</a
              >
              <div id="popup1" class="popup-container">
                <div class="popup-content">
                  <a href="#" class="close">&times;</a>
                  <h4>Uredite svoj komentar.</h4>
                  <form class="comment-form" @submit.prevent="changeComment">
                    <div class="form-body">
                      <div class="form-group">
                        <label for="komentar" class="label-title"></label>
                        <textarea
                          id="komentar"
                          class="form-input"
                          rows="6"
                          cols="50"
                          style="height: auto"
                          v-model="komentar2"
                          required
                        ></textarea>
                      </div>
                      <div class="form-group">
                        <label class="label-title">Ocjena</label>
                        <br />
                        <div>
                          <input
                            type="radio"
                            name="broj2"
                            id="one"
                            value="1"
                            v-model="ocjena2"
                            required
                          />
                          <label for="one">1</label>&nbsp;&nbsp;

                          <input
                            type="radio"
                            name="broj2"
                            id="two"
                            value="2"
                            v-model="ocjena2"
                          />
                          <label for="two">2</label>&nbsp;&nbsp;

                          <input
                            type="radio"
                            name="broj2"
                            id="three"
                            value="3"
                            v-model="ocjena2"
                          />
                          <label for="three">3</label>&nbsp;&nbsp;

                          <input
                            type="radio"
                            name="broj2"
                            id="four"
                            value="4"
                            v-model="ocjena2"
                          />
                          <label for="four">4</label>&nbsp;&nbsp;

                          <input
                            type="radio"
                            name="broj2"
                            id="five"
                            value="5"
                            v-model="ocjena2"
                          />
                          <label for="five">5</label>
                        </div>
                      </div>
                      <button type="submit" class="btn">Ažuriraj</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="description2">
          <h2>Komentiraj i ti:</h2>
          <div>
            <form class="comment-form" @submit.prevent="addComment">
              <div class="form-body">
                <div class="form-group">
                  <label for="komentar" class="label-title"></label>
                  <textarea
                    id="komentar"
                    class="form-input"
                    rows="6"
                    cols="50"
                    style="height: auto"
                    v-model="komentar"
                    required
                  ></textarea>
                </div>
                <div class="form-group">
                  <label class="label-title">Ocjena</label>
                  <br />
                  <div>
                    <input
                      type="radio"
                      name="number"
                      id="one"
                      value="1"
                      v-model="ocjena"
                      required
                    />
                    <label for="one">1</label>&nbsp;&nbsp;

                    <input
                      type="radio"
                      name="number"
                      id="two"
                      value="2"
                      v-model="ocjena"
                    />
                    <label for="two">2</label>&nbsp;&nbsp;

                    <input
                      type="radio"
                      name="number"
                      id="three"
                      value="3"
                      v-model="ocjena"
                    />
                    <label for="three">3</label>&nbsp;&nbsp;

                    <input
                      type="radio"
                      name="number"
                      id="four"
                      value="4"
                      v-model="ocjena"
                    />
                    <label for="four">4</label>&nbsp;&nbsp;

                    <input
                      type="radio"
                      name="number"
                      id="five"
                      value="5"
                      v-model="ocjena"
                    />
                    <label for="five">5</label>
                  </div>
                </div>

                <button type="submit" class="btn">Objavi</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Recepti, Auth } from "@/services";

export default {
  props: ["info", "id"],
  name: "ReceptV",
  data() {
    return {
      komentar: "",
      ocjena: "",
      komentar2: "",
      ocjena2: "",
      id_recepta: this.info.id, //id_recepta je id trenutnog recepta
      korisnik: Auth.state.userEmail,
      cards: [],
      prosječnaOcjena: "",
      id_komentara: "",
    };
  },
  mounted() {
    this.fetchComments(); //poziv funkcije
  },
  methods: {
    //metoda za objavu komentara određenog recepta
    async addComment() {
      try {
        let id = this.id_recepta;
        let komentar = {
          id_recipe: this.id_recepta,
          comment: this.komentar,
          user: this.korisnik,
          review: this.ocjena,
          postedAt: Date.now(),
          //s lijeve strane frontend, s desne podaci iz data dijela
        };
        await Recepti.createComment(komentar, id);
        this.$router.go();
      } catch (e) {
        console.log("Došlo je do greške. ", e);
      }
    },
    //metoda za dohvat svih komentara određenog recepta
    async fetchComments() {
      let id = this.id_recepta;
      let cards = await Recepti.getComments(id);
      this.cards = cards;

      //prosječna ocjena
      let niz = [];
      for (let c of cards) {
        niz.push(c.review); //guranje svih ocjena trenutnog recepta u definirani niz
      }
      let array = niz.map(Number); //pretvaranje svih ocjena iz stringa u integer
      let sum = 0;
      for (let number of array) {
        // zbrajanje svih brojeva iz niza
        sum += number;
      }
      let averageReview = sum / array.length; //dijeljenje sume sa dužinom niza
      averageReview = averageReview.toFixed(2); //zaokruživanje na dvije decimale
      if (averageReview > 0) {
        this.prosječnaOcjena = averageReview;
      } else {
        this.prosječnaOcjena = 0; //ako još nema komentara odnosno ocjena stavlja prosječnu ocjenu na 0
      }
    },
    //metoda za brisanje određenog komentara
    async removeComment(id) {
      console.log(id);
      const c = confirm("Jeste li sigurni da želite obrisati komentar?");
      if (c) {
        await Recepti.deleteComment(id);
        alert("Uspješno obrisan komentar");
        //nakon brisanja osvježavamo trenutnu stranicu
        this.$router.go();
      }
    },
    //metoda za prijenos id određenog komentara
    transferId(id) {
      this.id_komentara = id;
    },
    //metoda za promjenu komentara
    async changeComment() {
      let id = this.id_komentara;
      let result = await Recepti.updateComment(
        id,
        this.komentar2,
        this.ocjena2
      );
      alert("Uspješno promijenjen komentar");
      this.$router.go();
    },
  },
};
</script>

<style scoped lang="scss">
.headline {
  margin: 100px;
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

.maincontainer {
  margin: 25px 0 25px 0; /*možda ne treba*/
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial;
}

.container2 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial;
  margin-bottom: 60px;
}

.card-container {
  display: flex;
  width: 1000px;
  height: auto;
  background: #fff;
  box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.4);
}

.header img {
  transition: 0.2s;
  width: 600px;
  height: 400px;
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

.description h1 {
  margin: 20px 30px;
  font-size: 38px;
  color: #05d853;
}

.description p {
  margin: 20px 30px;
  font-size: 16px;
}

.description h2 {
  margin: 20px 30px;
  font-size: 30px;
}

.description h4 {
  margin: 60px 30px;
  font-size: 20px;
  text-align: center;
}

.description2 {
  background: #fff;
  padding: 25px;
  text-align: left;
  position: relative;
}

.description2 h2 {
  margin: 20px 30px;
  font-size: 30px;
}

.caption2 {
  width: 40%;
  text-align: center;
  font-family: Arial;
  font-size: 30px;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin: 10px 0 20px;
  margin-left: auto;
  margin-right: auto;
  color: #05d853;
}

.caption2 span {
  background: #fff;
  padding: 0 10px;
}

.comment h5 {
  font-style: bold;
  margin: 20px 30px 0px 30px;
  font-size: 14px;
}

.comment p {
  margin: 5px 30px 10px 30px;
  font-size: 16px;
}

.comment .function {
  margin: 5px 30px 10px 30px;
}

.comment .function a {
  text-decoration: none;
}

.popup-link {
  cursor: pointer;
  text-decoration: none;
}

.popup-container {
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  transform: scale(1.3);
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(21, 17, 17, 0.61);
  display: flex;
  align-items: center;
}

.popup-content {
  background-color: #fefefe;
  margin: auto;
  padding: 10px;
  border: 1px solid #888;
  width: 50%;
}

.popup-content a.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  background: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
}

.popup-content a.close:hover {
  color: #333;
}

.popup-container:target {
  visibility: visible;
  opacity: 1;
  transform: scale(1);
}

.popup-container h4 {
  margin: 10px;
  color: #05d853;
}

.comment-form {
  font-family: Arial;
  margin: 20px auto;
  background: #fff;
}

.form-body {
  padding: 10px 35px;
}

.form-group {
  margin-bottom: 10px;
}

.form-body .label-title {
  color: #000;
  font-size: 17px;
  font-weight: bold;
}

.form-body .form-input {
  font-size: 17px;
  box-sizing: border-box;
  width: 80%;
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
