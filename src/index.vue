<template>
    <div class="test">
        13123123123
    </div>
</template>

<script>
export default {
    name: 'app',
    created() {
        const arr = [
            new Promise(() => {}),
            new Promise(() => {})
        ];

        console.log(15)

        arr.map((item, index) => {
            console.log(item, index)
        })
    }
}
</script>
<style scoped>
    .test{
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
