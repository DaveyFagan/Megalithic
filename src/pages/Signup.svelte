<script>
    import monument2 from "/src/assets/monument2.png";
    import WelcomeNavigator from "../components/WelcomeNavigator.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import SignupForm from "../components/SignupForm.svelte";
  </script>
  
  <div class="columns is-vcentered">
    <div class="column is-two-thirds">
      <TitleBar subTitle={"Sign up or Log in"} title={"Donation Services Inc."}/>
    </div>
    <div class="column">
      <WelcomeNavigator/>
    </div>
  </div>
  
  <div class="columns">
    <div class="column">
      <div class="box">
        <h1 class="title">Login</h1>
        <SignupForm/>
      </div>
    </div>
    <div class="column has-text-centered">
      <img alt="homer" src="{monument2}" width="300">
    </div>
  </div>
  
  