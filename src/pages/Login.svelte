<script>
    import monument2 from "/src/assets/monument2.png";
    import WelcomeNavigator from "../components/WelcomeNavigator.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import LoginForm from "../components/LoginForm.svelte";
  </script>
  
  <div class="columns is-vcentered">
    <div class="column is-two-thirds">
      <TitleBar title={"Megalithic Services Inc."} subTitle={"Sign up or Log in"}/>
    </div>
    <div class="column">
      <WelcomeNavigator/>
    </div>
  </div>
  
  <div class="columns">
    <div class="column has-text-centered">
      <img alt="homer" src="{monument2}" width="300">
    </div>
    <div class="column">
      <div class="box">
        <h1 class="title">Login</h1>
        <LoginForm/>
          <a class="button is-black" id="logingit" href="/logingit">Login With GitHub</a>
      </div>
    </div>
</div>

  