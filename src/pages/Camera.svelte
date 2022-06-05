<script>
    import monument2 from "/src/assets/monument2.png";
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import UserMonuments from "../components/UserMonuments.svelte";
  </script>
  
  <div class="columns is-vcentered">
    <div class="column is-two-thirds">
      <TitleBar subTitle={"Please add a place of interest"} title={"Monument Services Inc."}/>
    </div>
    <div class="column">
      <MainNavigator/>
    </div>
  </div>
  
  <div class="columns is-vcentered">
    <div class="column box has-text-centered">
      <h1 class="title is-4">Add Photos</h1>
      <UserMonuments/>
    </div>
  </div>