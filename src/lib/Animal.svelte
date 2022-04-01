<script>
  export let animal
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

</script>

<div class =animal on:dblclick={()=>dispatch('delete',{_id:animal._id})} >  
  <p>Name: {animal.Name}</p>
  <p>Type: {animal.Type}</p>
  {#if animal['Tiger Type']}
    <p>Tiger Type: {animal['Tiger Type']}</p>
  {/if}
  <p class = id>ID: {animal._id}</p>
</div>

<style lang=scss>
  .animal{
    padding: 0px 5px 0px 5px;
    margin:5px;
    border: 1px solid grey;
    width:fit-content;
    cursor: pointer;
    p{
      cursor: pointer;
    }
    p.id{
      font-size:xx-small; 
    }
  }
  .animal:hover{
    background-color: rgb(250, 165, 165);
  }
</style>

