<script>
    import monument2 from "/src/assets/monument2.png";
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import Chart from 'svelte-frappe-charts';
    import {getContext, onMount} from "svelte"
    import Button from "../components/Button.svelte";

    const monumentService = getContext("MonumentService");

    let buttonMonuments = false;
    let categoryButton = false;

    let data = {
      labels: ['Monuments'],
      datasets: [
        {
          values: [0,0]
        }
      ]
    };

    

    let totalByCategory = {
        labels: [],
        datasets: [
        {
          values: [0,0,0,0,0,0,0,0]
        }
      ]
    };

    onMount(async () => {
    let monumentList = await monumentService.getMonuments();
    const noMonuments = monumentList.length;
    console.log("Number of Monuments: ", noMonuments);
    data.datasets[0].values[0] += noMonuments;

    let categories = await monumentService.getCategories();
    totalByCategory.labels = [];

    categories.forEach(category => {
        totalByCategory.labels.push(`${category.typeMonument}`);
     });

     for (let i = 0; i < categories.length; i++){
      let monumentChart = []
     monumentChart = monumentList.filter(monument => monument.category.typeMonument.indexOf(categories[i].typeMonument)
     !== -1);
     console.log(categories[i].typeMonument + " amount", monumentChart.length)
      totalByCategory.datasets[0].values[i] += monumentChart.length;
     }

     });
     function buttonTrue() {
    buttonMonuments = true;
    console.log("Button monuments is: ", buttonMonuments)
  }

  function categoryTrue() {
    categoryButton = true;
    console.log("Button monuments is: ", categoryButton)
  }

  </script>
  
  <div class="columns is-vcentered">
    <div class="column is-two-thirds">
      <TitleBar subTitle={"monument Analytics"} title={"monument Services Inc."}/>
    </div>
    <div class="column">
      <MainNavigator/>
    </div>
  </div>
  
  <div class="columns">
    
    <div class="column box has-text-centered">
        <div class="column box has-text-centered">
          <button on:click="{buttonTrue}">
            Total Number Of Monuments
          </button>
          {#if buttonMonuments === true }
            <h1 class="title is-4">Number of Monuments to Date</h1>
            <Chart data={data} type="bar" />
            {/if}
        </div>
        <div class="column box has-text-centered">
          <button class="primary" on:click="{categoryTrue}">
            Monuments By Category
          </button>
          {#if categoryButton === true }
            <h1 class="title is-4">Types of Monuments</h1>
            <Chart data={totalByCategory} type="line" />
            {/if}
        </div>
    </div>
  </div>