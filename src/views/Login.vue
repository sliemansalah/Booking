<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-4 mt-4">
                  <h4 class="mb-4">{{$t('Login')}}</h4>
                  <p>{{$t('WelcomeBack')}}</p>
                </div>

                <div>
                  <vs-input
                      name="email"
                      icon-no-border
                      icon="icon icon-user"
                      icon-pack="feather"
                      :label-placeholder="$t('Email')"
                      v-model="inputs.email"
                      class="w-full mt-6"/>

                  <vs-input
                      type="password"
                      name="password"
                      icon-no-border
                      icon="icon icon-lock"
                      icon-pack="feather"
                      :label-placeholder="$t('Password')"
                      v-model="inputs.password"
                      class="w-full mt-6" />
                  <vs-button @click="login" class="float-right mt-3 mb-3">{{$t('Login')}}</vs-button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default{
  name: 'login',
  data() {
    return {
      inputs: {
        email: "",
        password: "",
      }
    }
  },
  methods: {
     login() {
    this.$store.dispatch('auth/login', this.inputs).then(res => {
      this.$vs.notify({
        title:this.$t('Login'),
        text: this.$t('LoginSuccessfully'),
        color:'success',
        position: 'top-center',
        time:4000,
      })
      setTimeout(() => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href= "/";
      }, 500);
    })
    .catch(() => {
      this.$vs.notify({
        title:this.$t('Login'),
        text: this.$t('LoginFailed'),
        color:'danger',
        position: 'top-center',
        time:4000,
      })
    })
  },
  }
}
</script>