<script>
  import Main from "./pages/Main.svelte"
  import Login from "./pages/Login.svelte"
  import Signup from "./pages/Signup.svelte"
  import Monuments from "./pages/Monuments.svelte"
  import Poi from "./pages/Poi.svelte"
  import Place from "./pages/Place.svelte"
  import Router from "svelte-spa-router";
  import {MonumentService} from "./services/MonumentService.js";
  import {setContext} from "svelte"
  import Map from "./pages/Map.svelte";
  import Charts from "./pages/Charts.svelte";
  import Camera from "./pages/Camera.svelte";

  setContext("MonumentService", new MonumentService("https://plume-nervous-rooster.glitch.me"));

  let routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/main": Main,
    "/poi": Poi,
    "/monuments": Monuments,
    "/map": Map,
    "/logout": Main,
    "/place": Place,
    "/charts": Charts,
    "/camera": Camera,
  }
</script>

<div class="container">
  <Router {routes}/>
</div>
