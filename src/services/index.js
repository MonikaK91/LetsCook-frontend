import axios from 'axios'
import $router from '@/router'

//instanca axios-a za potrebe Let's Cook backenda
//Service za komunikaciju sa backendom
let Service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 30000 //vidi da li ćeš promijeniti
})

//prije svakog poslanog requesta na backend izvrši:
Service.interceptors.request.use((request) => {
  try {
    //dodajemo token u header od requesta
    request.headers["Authorization"] = "Bearer" + Auth.getToken()
  }
  catch(e) {
    console.error(e)
  }
  return request
})

//nakon svakog odgovora s backenda izvrši:
//response dio ako je sve u redu, a error dio ako je došlo do greške
Service.interceptors.response.use((response) => response, (error) => {
  //ako je došlo do navedenih grešaka poziva brisanje tokena sa logout metodom
  if (error.response.status == 401 || error.response.status == 403) {
    Auth.logout()
    $router.go()
  }
})

//objekt za sve pozive koji se dotiču recepata
//sve vezano za rutu recepti
let Recepti = {
  //------------ za recepte ------------//
  async create(data) { //za objaviti recept   
    let serverData = {
      slika: data.image,
      nazivRecepta: data.nazivRecepta,
      sastojci: data.ingredients,
      priprema: data.preparation,
      težinaPripreme: data.difficulty,
      brojOsoba: data.numberOfPeople,
      vrijemePripreme: data.preparationTime,
      grupaJela: data.group,
      kategorija: data.category,
      objavljeno: data.postedAt,
      korisnik: data.user,
      //s lijeve strane backend, s desne frontend
    }
    console.log("Spremam na backend", data)
    await Service.post("/recepti", serverData)
    return
  },
    async getAll(searchTerm) { //za dohvat i pretragu
        let response = await Service.get(`/recepti?nazivRecepta=${searchTerm}`)
        let data = response.data
        console.log(data)
        data = data.map((doc) => {
            return {
              id: doc._id,
              image: doc.slika,
              nazivRecepta: doc.nazivRecepta,
              ingredients: doc.sastojci,
              preparation: doc.priprema,
              difficulty: doc.težinaPripreme,
              numberOfPeople: doc.brojOsoba,
              preparationTime: doc.vrijemePripreme,
              group: doc.grupaJela,
              category: doc.kategorija,
              postedAt: doc.objavljeno,
              user: doc.korisnik,
              //s lijeve strane atributi frontenda, s desne backenda
            };
          });
          return data
    },
    async getOne(id) { //dohvat jednog recepta
      let response = await Service.get(`/recepti/${id}`)
      //ne trebamo koristiti map funkciju zato jer vraća jedan dokument, a ne array
      let doc = response.data;
      return {
        id: doc._id,
        image: doc.slika,
        nazivRecepta: doc.nazivRecepta,
        ingredients: doc.sastojci,
        preparation: doc.priprema,
        difficulty: doc.težinaPripreme,
        numberOfPeople: doc.brojOsoba,
        preparationTime: doc.vrijemePripreme,
        group: doc.grupaJela,
        category: doc.kategorija,
        postedAt: doc.objavljeno,
        user: doc.korisnik,
        //s lijeve strane atributi frontenda, s desne backenda
      }
    },
    async deleteRecipe(id) { //brisanje određenog recepta
      console.log("Brišem dokument", id)
      await Service.delete(`/recepti/${id}`)
    },
    async getAllUsername(username) { //dohvat svih recepata određenog korisnika
      let response = await Service.get(`/recepti/korisnik/${username}`)
      let data = response.data
      console.log(data)
      data = data.map((doc) => {
        return {
            id: doc._id,
            image: doc.slika,
            nazivRecepta: doc.nazivRecepta,
            ingredients: doc.sastojci,
            preparation: doc.priprema,
            difficulty: doc.težinaPripreme,
            numberOfPeople: doc.brojOsoba,
            preparationTime: doc.vrijemePripreme,
            group: doc.grupaJela,
            category: doc.kategorija,
            postedAt: doc.objavljeno,
            user: doc.korisnik,
            //s lijeve strane atributi frontenda, s desne backenda
          };
        });
        return data
    },
    async getAllFilter(filter) { //dohvat svih recepata po filteru
      let response = await Service.get(`/recepti/filter/${filter}`)
      let data = response.data
      data = data.map((doc) => {
          return {
            id: doc._id,
            image: doc.slika,
            nazivRecepta: doc.nazivRecepta,
            ingredients: doc.sastojci,
            preparation: doc.priprema,
            difficulty: doc.težinaPripreme,
            numberOfPeople: doc.brojOsoba,
            preparationTime: doc.vrijemePripreme,
            group: doc.grupaJela,
            category: doc.kategorija,
            postedAt: doc.objavljeno,
            user: doc.korisnik,
            //s lijeve strane atributi frontenda, s desne backenda
          };
        });
        return data
    },
    async getPopular() { //dohvat recepta sa najviše komentara
      let response = await Service.get("/recepti-popularni")
      //ne trebamo koristiti map funkciju zato jer vraća jedan dokument, a ne array
      let doc = response.data;
      return {
        id: doc._id,
        image: doc.slika,
        nazivRecepta: doc.nazivRecepta,
        ingredients: doc.sastojci,
        preparation: doc.priprema,
        difficulty: doc.težinaPripreme,
        numberOfPeople: doc.brojOsoba,
        preparationTime: doc.vrijemePripreme,
        group: doc.grupaJela,
        category: doc.kategorija,
        postedAt: doc.objavljeno,
        user: doc.korisnik,
        //s lijeve strane atributi frontenda, s desne backenda
      }
    },
    async getRandom() { //dohvat random recepta
      let response = await Service.get("/recepti-slucajni")
      //ne trebamo koristiti map funkciju zato jer vraća jedan dokument, a ne array
      let doc = response.data;
      return {
        id: doc._id,
        image: doc.slika,
        nazivRecepta: doc.nazivRecepta,
        ingredients: doc.sastojci,
        preparation: doc.priprema,
        difficulty: doc.težinaPripreme,
        numberOfPeople: doc.brojOsoba,
        preparationTime: doc.vrijemePripreme,
        group: doc.grupaJela,
        category: doc.kategorija,
        postedAt: doc.objavljeno,
        user: doc.korisnik,
        //s lijeve strane atributi frontenda, s desne backenda
      }
    },
    //------------ za komentare ------------//
    async createComment(data, id) { //za objavu komentara određenog recepta
      try{
        let Data = {
          idRecepta: data.id_recipe,
          komentarR: data.comment,
          korisnik: data.user,
          ocjena: data.review,
          objavljeno: data.postedAt,
          //s lijeve strane backend, s desne frontend
        }
        console.log("Spremam na backend", data)
        await Service.post(`/recepti/${id}/komentari`, Data)
      }
      catch(e) {
        ("Došlo je do greške", e)
      }
    },
    async getComments(id) { //dohvat svih komentara određenog recepta
      let response = await Service.get(`/recepti/${id}/komentari`)
      let data = response.data
      data = data.map((doc) => {
          return {
            id: doc._id,
            id_recipe: doc.idRecepta,
            comment: doc.komentarR,
            user: doc.korisnik,
            review: doc.ocjena,
            postedAt: doc.objavljeno,
            //s lijeve strane atributi frontenda, s desne backenda
          };
        });
        return data
    },
    async deleteComment(id) { //brisanje određenog komentara
      console.log("services", id)
      await Service.delete(`/recepti/komentari/${id}`)
    },
    async updateComment(id, komentar, ocjena) { //mijenjanje određenog komentara
      let result = await Service.patch(`/recepti/komentari/${id}`, {
        komentarR: komentar,
        ocjena: ocjena
      })
    },
    
  }
//sve vezano za autentifikaciju
let Auth = {
  //metoda za prijavu
  async login(username, password) {
    //pozivamo metodu sa backenda koja služi za autorizaciju
    let response = await Service.post("/auth", {
      username: username,
      password: password
    })
    //izvači podatke koje smo dobili sa backenda
    let user = response.data
    //user podatke spremamo u localStorage pomoću funkcije setItem
    //kako se podaci proslijeđuju u obliku ključ i vrijednost. 
    //Ovdje "user" predstavlja ključ, a drugi dio vrijednost. 
    //JSON.stringify služi za pretvaranje objekta u string
    localStorage.setItem("user", JSON.stringify(user))

    return true
  },
  //metoda za registraciju
  async signup(username, password) {
    //pozivamo metodu sa backenda koja služi za registraciju
    let response = await Service.post("/users", {
      username: username,
      password: password
    })
    //izvači podatke koje smo dobili sa backenda
    let user = response.data
    localStorage.setItem("user", JSON.stringify(user))

    return true
  },
  //metoda za odjavu
  logout() {
    //mičemo iz localStorage podatke (token) za usera
    localStorage.removeItem("user") 
  },
  //metoda za mijenjanje lozinke
  async newpassword(oldPassword, newPassword, user) {
    let result = await Service.patch("/users", {
      old_password: oldPassword,
      new_password: newPassword,
      korisnik: user,
    })
    return result
  },
  //metoda za dobivanje korisnika
  getUser() {
    //izvlači korisnika iz localStorage-a
    return JSON.parse(localStorage.getItem("user"))
  },
  //metoda za izvlačenje tokena
  getToken() {
    //da dobijemo usera
    let user = Auth.getUser()
    //ako taj user postoji i ako ima u sebi token
    if (user && user.token) {
      return user.token //vrati user token
    }
    else {
      return false
    }
  },
  authenticated() {
    let user = Auth.getUser()
    if (user && user.token) {
      return true
    }
    return false
  },
  state: {
    //get ispred atributa - pretvara atribut u funkciju (ali se i dalje može čitati kao da je atribut)
    get authenticated() {
      //pozivanje metode iznad
      return Auth.authenticated()
    },
    get userEmail() {
      //dobivanje usera
      let user = Auth.getUser()
      //ako postoji user
      if (user) {
        return user.username // vraćamo njegovo korisničko ime odnosno email adresu
      }
    },
  }
}

//exportamo Service za ručne pozive ili Recepti za metode
export {Service, Recepti, Auth}
