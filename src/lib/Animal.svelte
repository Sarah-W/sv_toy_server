<script>
  export let animal;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const byebye = async () => {
    fetch(`api/${animal._id}`, { method: `DELETE` }).then((d) =>
      dispatch("delete", { e: d.json() })
    );
  };
</script>

<div class="animal" on:dblclick={byebye}>
  <p>Name: {animal.Name}</p>
  <p>Type: {animal.Type}</p>
  {#if animal["Tiger Type"]}
    <p>Tiger Type: {animal["Tiger Type"]}</p>
  {/if}
  <p class="id">ID: {animal._id}</p>
</div>

<style lang="scss">
  .animal {
    padding: 0px 5px 0px 5px;
    margin: 5px;
    border: 1px solid grey;
    width: fit-content;
    cursor: pointer;
    p {
      cursor: pointer;
    }
    p.id {
      font-size: xx-small;
    }
  }
  .animal:hover {
    background-color: rgb(250, 165, 165);
  }
</style>
