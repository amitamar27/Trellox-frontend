<template>
    <section class="background-unsplash">
        <input
            type="text"
            placeholder="Photos"
            v-model="search"
            @change="getImgsBySearch"
            
        />
        <div v-if="results">
            <div
                class="unsplash-box"
                v-for="(imgUrl, i) in results"
                :key="i"
                :style="{
                    backgroundImage: `url(${imgUrl.urls.regular})`,
                }"
                @click="sendUrl(imgUrl.urls.regular)"
            ></div>
        </div>
       
    </section>
</template>

<script>
    import { unsplashService } from '../services/unsplash-service.js'
    export default {
        data() {
            return {
                search: '',
                results: [],
            };
        },
        created() {
            this.getImgsBySearch();
        },
        methods: {
            async getImgsBySearch() {
                let searchWord = 'flowers';
                if (this.search) searchWord = this.search;

                try {
                    const res = await unsplashService.getSplashImgs(searchWord);
                    this.results = res;
                } catch (err) {
                    throw err;
                }
            },
            sendUrl(url) {
                this.$emit('onSaveImg', url);
            },
        },
    };
</script>



