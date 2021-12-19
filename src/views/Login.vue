<template>
  <section class="inner-section">
    <background></background>
    <div class="section-warapper">
      <div class="signup-form-container">
        <div class="form-container">
          <div class="signup">
            <h1 v-if="!isSignedUp">Sign up for your account</h1>
            <h1 v-else>Log in to Trellox</h1>
            <form class="signup-form">
              <div class="signup-login-password-container">
                <el-input
                  v-if="!isSignedUp"
                  placeholder="Enter Full name"
                  type="text"
                  v-model="fullName"
                >
                </el-input>
                <el-input
                  placeholder="Enter email"
                  type="email"
                  v-model="email"
                >
                </el-input>
                <el-input
                  placeholder="Enter password"
                  type="password"
                  v-model="password"
                ></el-input>
                <p class="terms-policy">
                  By signing up, you confirm that you've read and accepted our
                  <a href="">Terms of Service</a>
                  and
                  <a href="">Privacy Policy</a>.
                </p>

                <p class="wrong-input" v-if="isInvaild && isSignedUp">
                  Wrong email or password
                </p>

                <div class="btns-container">
                  <a
                    v-if="!isSignedUp"
                    class="sign-in-a"
                    @click="isSignedUp = !isSignedUp"
                    >Sign in</a
                  >
                  <a
                    v-if="isSignedUp"
                    class="sign-up-a"
                    @click="isSignedUp = !isSignedUp"
                    >Sign up</a
                  >
                  <el-button v-if="isSignedUp" value="Sign In" @click="login"
                    >Log In</el-button
                  >
                  <el-button v-if="!isSignedUp" value="Sign Up" @click="signUp"
                    >Sign Up</el-button
                  >
                  <el-button @click="tryDemo">Try Demo</el-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import userService from "../services/user-service";
import background from "../components/background-login/background.vue";
export default {
  data() {
    return {
      email: "",
      password: "",
      fullName: "",
      isSignedUp: false,
      isInvaild: false,
    };
  },
  methods: {
    isValidEmailAddress(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    signUp() {
      if (!this.email || !this.password || !this.fullName) return;
      // if(!this.isValidEmailAddress(this.email)) return
      const newUser = {
        fullname: this.fullName,
        email: this.email,
        password: this.password,
        boardsIds: [],
      };
      this.$store
        .dispatch({ type: "signUp", user: newUser })
        .catch((err) => {
          console.log("err", err);
        })
        .then((user) => {
          this.$router.push(`/boards`);
        })
        
    },
    login() {
      if (!this.email || !this.password) {
        this.isInvaild = true;
        return;
      }
      if (!this.isValidEmailAddress(this.email)) {
        this.isInvaild = true;
        return;
      }
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch({ type: "login", user: user })
        .catch((err) => {
          this.isInvaild = true;
          throw err;
        })
        .then((user) => {
          if (user) this.$router.push(`/boards`);
          else {this.isInvaild = true;}
        });
    },
    tryDemo() {
      this.$store.dispatch({ type: "tryDemo" });
      this.$router.push(`/boards`);
    },
  },
  components: {
    userService,
    background,
  },
};
</script>

<style lang="scss">
.inner-section {
  width: 100%;
  padding: 0px;
  overflow: visible;
  margin-bottom: 30px;
  word-wrap: break-word;
  .section-warapper {
    max-width: 400px;
    margin: 50px auto;

    .signup-form-container {
      background-color: #ffffff;
      border-radius: 3px;
      padding: 25px 40px;
      box-shadow: rgb(0 0 0 / 10%) 0 0 10px;

      .form-container {
        // height: 100px;
        .signup {
          h1 {
            text-align: center;
            color: #5e6c84;
            font-size: 16px;
            letter-spacing: -0.01em;
            line-height: 28px;
            margin-top: 10px;
            margin-bottom: 25px;
            // font-size: 14px;
            font-weight: 700;
            // margin: 0.67em 0;
          }
          .signup-form {
            .signup-login-password-container {
              input {
                background-color: #fafbfc;
                margin: 0 0 1.2em;
              }
              .btns-container {
                display: flex;
                flex-direction: column;
                gap: 5px;
                button {
                  background: #e2e4e6;
                  color: rgb(255, 255, 255);
                  box-shadow: none;
                  //   color: hsl(0, 0%, 55%);
                  background: #5aac44;
                  cursor: default;
                  box-shadow: none;
                  font-weight: 700;
                  padding: 0.6em 1.3em;
                  text-decoration: none;
                  border: 0px;
                  height: 35.6597px;
                  font-weight: 700;
                  font-size: 14px;
                  width: 320px;
                  font-family: Segoe UI, sans-serif;
                  cursor: pointer;
                  margin: 0;
                }
                // button:hover {
                //   // color:rgb(255, 255, 255);
                //   // background-color: #94942b50;
                //   // background: linear-gradient(to bottom, #8f9c8c 0%, #1c1f1b 100%);
                // }
                a {
                  background: transparent;
                  text-decoration: none;
                  color: #132033;
                  cursor: pointer;
                }
              }
              button:last-child {
                background: #1560b6;
              }

              .terms-policy {
                margin-top: 20px;
                margin-bottom: 20px;
                font-size: 12px;
                line-height: 16px;
                color: #5e6c84;
                -webkit-box-direction: normal;
                a {
                  background: transparent;
                  text-decoration: none;
                  color: #0052cc;
                  cursor: pointer;
                }
              }
              .wrong-input {
                color: red;
              }
            }
          }
        }
      }
    }
  }
}
</style>