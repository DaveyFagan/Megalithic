<script>
    import monument2 from "/src/assets/monument2.png";
    import MonumentList from "../components/MonumentList.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
  </script>
  
  <div class="columns is-vcentered">
    <div class="column is-two-thirds">
      <TitleBar subTitle={"Monuments so far..."} title={"Monument Services Inc."}/>
    </div>
    <div class="column">
      <MainNavigator/>
    </div>
  </div>
  
  <div class="columns">
    <div class="column has-text-centered">
      <img alt="Monument" src={monument2} width="300"/>
    </div>
    <div class="column box has-text-centered">
      <h1 class="title is-4">All Monuments to Date</h1>
      <MonumentList/>
    </div>
  </div>