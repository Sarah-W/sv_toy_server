<script>
  import "../style/style.scss"
  import Animal from '$lib/Animal.svelte';
  import {validate_my_animal} from '$lib/animal_validator'

  let a_promise_of_animals = fetch('api').then(res=>res.json())
  const getAnimals = () => a_promise_of_animals = fetch('api').then(res=>res.json())

  let Name
  let Type
  let TigerType

  let magic_word
  let result = null

  const newAnimal = (Name,Type,TigerType) => {
    let new_animal={Name,Type}
    if (Type === "Tiger"){new_animal["Tiger Type"]=TigerType}
    return new_animal
  }

  const validAnimal = (animal)=>{
    //cheap validator for front end purposes only. Ideally we'd pass it through validate_my_animal  
    return !!Name && !!Type && (Type !="Tiger" || !!TigerType)
  }

  $: new_animal = newAnimal(Name,Type,TigerType)
  $: valid_animal = validAnimal(new_animal)

  const addAnimal = async () => {
    const put_options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',"authorization":magic_word},
      body: JSON.stringify(new_animal)
    }
    result = await fetch('api',put_options).then(res=>res.json())
      getAnimals()
      Name = null
      TigerType = null
  }

  const deleteAnimal = async (e)=>{
    result = await fetch(`api/${e.detail._id}`,{method:`DELETE`,headers:{"authorization":magic_word}})
      .then(res=>res.json())
    getAnimals()
  }

$: console.log(result)
</script>

<div><h1>Animals!</h1></div>

<div>
  <label for="magicword"> Magic Word:</label>
  <input type="password" id="magicword" name="magicword" placeholder="" bind:value={magic_word}>
</div>
<div>
  <p>Add a new animal </p>
  <label for="name"> Name:</label>
  <input type="text" id="name" name="name" placeholder="Name" bind:value={Name}>
  <label for="type">Type:</label>
  <select id="type" name="type" bind:value={Type}>
    {#each ["Bear", "Tiger", "Snake", "Donkey"] as type}
    <option value={type}>{type}</option>
    {/each}
  </select>
  <label for="name"> Tiger Type:</label>
  <input type="text" id="tigertype" name="tigertype" placeholder="Tiger Type" bind:value={TigerType} disabled={Type !="Tiger"}>
  <button 
    type="button" 
    on:click={addAnimal}
    disabled = {!valid_animal} 
     >
     Add {Name ? Name+"!" :"Someone?"}  
  </button>
  <p>Double-Click an animal to delete it.</p>
</div>
<div class = animals>
  {#await a_promise_of_animals then animals}
    {#each animals as animal}
    <Animal {animal} on:delete={deleteAnimal}></Animal>
    {/each}
  {/await}
</div>
{#if (result && !result?.acknowledged)}
  <div>
    {result.message}  
  </div>
{/if}  

<style lang=scss>
  div{
    width:60%;
    margin:auto;
    border: 1px solid grey;
    padding:5px;
    margin-bottom: 5px;
  }
  .animals{
    display:flex;
    flex-wrap: wrap;
  }

</style>
