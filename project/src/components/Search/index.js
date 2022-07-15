export default Vue.component('search', {
    template: `
    <label>
      <input class="goods-search" type="text" @input="$emit('input', $event.target.value)">
    </label>
    `
});