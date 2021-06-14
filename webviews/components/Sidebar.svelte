<script lang="ts">
  let todos: Array<{ text: string; completed: boolean }> = [];
  let text = "";
</script>

<div>Hello from Sidebar</div>

<form
  on:submit|preventDefault={() => {
    todos = [{ text, completed: false }, ...todos];
    text = "";
  }}
>
  <input bind:value={text} />
</form>

<ul>
  {#each todos as todo (todo.text)}
    <li
      class:complete={todo.completed}
      on:click={() => {
        todo.completed = !todo.completed;
      }}
    >
      {todo.text}
    </li>
  {/each}
</ul>

<button
  on:click={() => {
    tsvscode.postMessage({
      type: "onInfo",
      value: "Info from VSActions SB Provider",
    });
  }}
>
  Click Me for Info
</button>

<button
  on:click={() => {
    tsvscode.postMessage({
      type: "onError",
      value: "ERROR from VSActions SB Provider",
    });
  }}
>
  Click Me for Error
</button>

<style>
  .complete {
    text-decoration: line-through;
  }
</style>
