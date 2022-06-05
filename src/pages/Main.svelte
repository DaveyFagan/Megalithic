<script>
    import monument from "/src/assets/monument.png";
    import WelcomeNavigator from "../components/WelcomeNavigator.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import {getContext} from "svelte";

    const monumentService = getContext("MonumentService")
    monumentService.logout();
  </script>
  
  <div class="columns is-vcentered">
    <div class="column is-two-thirds">
      <TitleBar title={"Megalithic Services Inc."} subTitle={"Sign up or Log in"}/>
    </div>
    <div class="column">
      <WelcomeNavigator/>
    </div>
  </div>
  
  <div class="columns is-vcentered content">
    <div class="column has-text-centered">
      <img width="300" src="{monument}" alt="monument">
    </div>
    <div class="column">
      <h1 class="title">Megalithic Ireland</h1>
      <p>Help discover megalithic monuments around Ireland.</p>
    </div>
  </div>