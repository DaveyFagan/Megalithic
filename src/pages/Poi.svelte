<script>
    import monument2 from "/src/assets/monument2.png";
    import PoiForm from "../components/PoiForm.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import PoiList from "../components/PoiList.svelte";
    let addPlaceList = null;

    function placeAdded(event) {
    addPlaceList.addPlace(event.detail.name);
    }
  
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
    <div class="column has-text-centered">
      <img alt="Monument" src={monument2} width="300"/>
    </div>
    <div class="column box has-text-centered">
      <h1 class="title is-4">Place of Interest List</h1>
      <PoiList/>
      <PoiForm on:message={placeAdded}/>
    </div>
  </div>