<template>
  <div class="main">
    <div class="navbar">
      <div class="icon">
        <h2 class="logo">Let's Cook</h2>
      </div>

      <div class="menu">
        <ul>
          <li><a href="#" @click="message()">RECEPTI </a></li>
          <li><a href="#" @click="message()">NAPIŠI RECEPT</a></li>
        </ul>
      </div>
    </div>
    <div class="content">
      <h1>
        Tražiš nove recepte <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ili<br />
        želiš podijeliti vlastite?<br /><span>Let's Cook</span>
        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ima baš ono što ti treba.
      </h1>
      <br />
      <p class="par">Prijavi se i započni svoju kulinarsku avanturu.</p>

      <div class="form">
        <h2>Sign in</h2>
        <input v-model="email" type="email" name="email" placeholder="Email " />
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="Lozinka"
        />
        <button type="submit" class="btnn" @click="login()">Sign in</button>

        <p class="link">
          Nemate račun?<br />
          <router-link to="/signup">Sign up </router-link> ovdje
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from "@/services";

export default {
  name: "signin",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    message() {
      alert("Prijavite se da bi mogli koristiti Let's Cook.");
    },
    //metoda za prijavu
    async login() {
      let success = await Auth.login(this.email, this.password); //poziv metode login iz services
      console.log("Rezultat prijave: ", success);

      //ako je sve u redu sa prijavom prebacuje nas na početnu stranicu
      if (success == true) {
        this.$router.push({ name: "Pocetna" });
      }
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
  background: url("~@/assets/19.jpeg");
  background-position: center;
  background-size: cover;
  height: 100vh;
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

.content {
  width: 1200px;
  height: auto;
  margin: auto;
  color: #fff;
  position: relative;
}

.content .par {
  padding-left: 0px;
  padding-bottom: 25px;
  font-family: Arial;
  letter-spacing: 1.5px;
  line-height: 20px;
  font-size: 22px;
}

.content h1 {
  font-family: "Times New Roman";
  font-size: 38px;
  padding-left: 0px;
  margin-top: 6%;
  letter-spacing: 2px;
}

.content span {
  color: #05d853;
  font-size: 45px;
}

.form {
  width: 250px;
  height: 310px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 50%,
    rgba(0, 0, 0, 0.8) 50%
  );
  position: absolute;
  top: -1px;
  left: 870px;
  transform: translate(0%, -5%);
  border: 0.5px solid #05d853;
  border-radius: 10px;
  padding: 25px;
}

.form h2 {
  width: 220px;
  font-family: sans-serif;
  text-align: center;
  color: #05d853;
  font-size: 22px;
  margin: 2px;
  padding: 8px;
}

.form input {
  width: 240px;
  height: 35px;
  background: transparent;
  border-bottom: 1px solid #05d853;
  border-top: none;
  border-right: none;
  border-left: none;
  color: #fff;
  font-size: 15px;
  letter-spacing: 1px;
  margin-top: 30px;
  font-family: sans-serif;
}

.form input:focus {
  outline: none;
}

::placeholder {
  color: #fff;
  font-family: Arial;
}

::-ms-reveal {
  filter: invert(100%);
}

.btnn {
  width: 240px;
  height: 40px;
  background: #05d853;
  border: none;
  margin-top: 30px;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
  color: #000;
  transition: 0.4s ease;
}

.btnn:hover {
  background: #fff;
}

.form .link {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  padding-top: 20px;
  text-align: center;
}

.form .link a {
  text-decoration: none;
  color: #05d853;
}
</style>
