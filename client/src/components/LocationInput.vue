<template>
    <div>

    </div>
</template>

<script>

    export default {
        name: "location-input",
        data() {
            return {
                cities: ['Alabama', 'Alaska', 'American Samoa', 'Arizona',
                    'Arkansas', 'California', 'Colorado', 'Connecticut',
                    'Delaware', 'District of Columbia', 'Federated States of Micronesia'/*...this.$store.getters.cities*/],
                is_loading: false,
                location: null
            }
        },
    }
</script>

<style scoped>

</style>