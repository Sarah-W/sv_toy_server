<script>
let promise_of_animals = fetch('api').then(res=>res.json())

</script>

<h1>Animals!</h1>

{#await promise_of_animals then animals}
  {#each animals as animal}
  <!-- <>  -->
    <p>{JSON.stringify(animal)}</p>
  {/each}
{/await}
