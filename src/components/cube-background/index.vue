<script>
import CubeSvg from './CubeSvg.vue'

export default {
    name: 'cube-background',
    components: {
        CubeSvg
    },
}
</script>

<template>
    <div class="cube-background">
        <CubeSvg class="cube" style="top: 5%; left: 5%;" width="221px" height="210px" />
        <CubeSvg class="cube" style="top: 30%; left: 28%; transform: rotate(30.89deg);" width="455px" height="432px" />
        <CubeSvg class="cube" style="top: 7%; right: 5%; transform: rotate(-62.355deg);" width="118px" height="113px" />
        <CubeSvg class="cube" style="bottom: -10%; left: -12%; transform: rotate(30.89deg); z-index: 1;" width="320px" height="304px" />
        <CubeSvg class="cube" style="bottom: 33%; right: 20%; transform: rotate(-62.355deg);" width="74px" height="70px" />
        <CubeSvg class="cube" style="bottom: -12%; right: 5%; transform: rotate(98.598deg);" width="283px" height="269px" />
    </div>
</template>

<style lang="scss" scoped>
.cube-background {
    overflow: hidden;
    position: relative;
    background: var(--sib-accent-color);
}

.cube {
    position: absolute;
}
</style>