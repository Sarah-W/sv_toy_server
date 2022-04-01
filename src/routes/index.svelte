<script>
  import "../style/style.scss";
  import Animal from "$lib/Animal.svelte";
  import { validate_my_animal } from "$lib/animal_validator";

  let a_promise_of_animals = fetch("api").then((res) => res.json());
  const getAnimals = () =>
    (a_promise_of_animals = fetch("api").then((res) => res.json()));

  let Name;
  let Type;
  let TigerType;

  let auth;

  const newAnimal = (Name, Type, TigerType) => {
    let new_animal = { Name, Type };
    if (Type === "Tiger") {
      new_animal["Tiger Type"] = TigerType;
    }
    return new_animal;
  };

  const validAnimal = (animal) => {
    //cheap validator for front end purposes only as jsonvalidator contains node shit
    return !!Name && !!Type && (Type != "Tiger" || !!TigerType);
  };

  $: new_animal = newAnimal(Name, Type, TigerType);
  $: valid_animal = validAnimal(new_animal);

  const addAnimal = async () => {
    const put_options = {
      method: "PUT",
      headers: { "Content-Type": "application/json", authorization: auth },
      body: JSON.stringify(new_animal),
    };
    await fetch("api", put_options).then(getAnimals);
    Name = null;
    TigerType = null;
  };
</script>

<div><h1>Animals!</h1></div>
<div>
  <p>Add a new animal</p>
  <label for="name"> Name:</label>
  <input
    type="text"
    id="name"
    name="name"
    placeholder="Name"
    bind:value={Name}
  />
  <label for="type">Type:</label>
  <select id="type" name="type" bind:value={Type}>
    {#each ["Bear", "Tiger", "Snake", "Donkey"] as type}
      <option value={type}>{type}</option>
    {/each}
  </select>
  <label for="tigertype"> Tiger Type:</label>
  <input
    type="text"
    id="tigertype"
    name="tigertype"
    placeholder="Tiger Type"
    bind:value={TigerType}
    disabled={Type != "Tiger"}
  />
  <label for="auth">Magic Word? </label>
  <input
    type="password"
    id="auth"
    name="auth"
    placeholder="Magic Word"
    bind:value={auth}
  />
  <button type="button" on:click={addAnimal} disabled={!valid_animal}>
    Add {Name ? Name + "!" : "Someone?"}
  </button>
  <p>Doubleclick an animal to delete it.</p>
</div>
<div class="animals">
  {#await a_promise_of_animals then animals}
    {#each animals as animal}
      <Animal {animal} on:delete={getAnimals} />
    {/each}
  {/await}
</div>

<style lang="scss">
  div {
    width: 60%;
    margin: auto;
    border: 1px solid grey;
    padding: 5px;
    margin-bottom: 5px;
  }
  .animals {
    display: flex;
    flex-wrap: wrap;
  }
</style>
