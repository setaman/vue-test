<template>
    <div>
        <v-autocomplete
                class="mb-5"
                color="white"
                clearable
                v-model="location"
                hint="Enter your city or use location button"
                :items="cities"
                persistent-hint
                prepend-icon="location_city"
                label="Add your Location"
        >
            <v-slide-x-reverse-transition
                    mode="out-in"
                    slot="append-outer"
            >
                <div class="d-flex justify-center align-center">
                    <v-btn flat medium icon color="white" @click="getLocation" :loading="is_loading">
                        <v-icon>room</v-icon>
                    </v-btn>
                </div>
            </v-slide-x-reverse-transition>
        </v-autocomplete>
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