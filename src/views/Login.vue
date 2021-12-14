<template>
  <section class="inner-section">
    <div class="section-warapper">
      <div class="signup-form-container">
        <div class="signup">
          <h1>Sign up for your account</h1>
          <form class="signup-form">
            <div class="signup-login-password-container">
              <el-input
                placeholder="Enter email"
                id="el-input"
                type="email"
                v-model="email"
              >
              </el-input>
              <el-input
                placeholder="Enter password"
                type="password"
                id="el-input"
                v-model="password"
              ></el-input>
              <p class="terms-policy">
                By signing up, you confirm that you've read and accepted our
                <a href="">Terms of Service</a>
                and
                <a href="">Privacy Policy</a>.
              </p>
              <el-button id="el-input-btn" type="submit" value="Sign Up"
                >Sign Up</el-button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// : #FAFBFC
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {},
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
    margin: 0 auto;

    .signup-form-container {
      background-color: #ffffff;
      border-radius: 3px;
      padding: 25px 40px;
      box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
      .signup {
        h1 {
          text-align: center;
          color: #5e6c84;
          font-size: 16px;
          letter-spacing: -0.01em;
          line-height: 28px;
          margin-top: 10px;
          margin-bottom: 25px;
          font-size: 14px;
          // margin: 0.67em 0;
        }
        .signup-form {
          .signup-login-password-container {
            #el-input {
              background-color: #fafbfc;
              margin: 0 0 1.2em;
            }
            #el-input-btn {
              background: #e2e4e6;
              color:rgb(255, 255, 255);
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
            }
            #el-input-btn:hover{
                // color:rgb(255, 255, 255);
                // background-color: #fffff750;
                    // background: linear-gradient(to bottom, #61BD4F 0%, #5AAC44 100%);
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
              }
            }
          }
        }
      }
    }
  }
}
</style>