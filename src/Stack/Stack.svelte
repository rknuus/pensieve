<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    import { stacks } from './stack-store.js';
    import Card from '../Card/Card.svelte';

    export let id;

    let cards;

    const dispatch = createEventDispatcher();

    console.assert(id, 'stack has no valid ID');

    const unsubscribe = stacks.subscribe(items => {
        const stack = items.find(i => i.id === id);
        cards = stack.cards;
        console.assert(stack, 'stack with ID %s not found in stack store', id);
    });

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });
</script>

<style>
</style>

<div class="stack">
    {#each cards as cardId}
        <Card id={cardId} />
    {/each}
</div>