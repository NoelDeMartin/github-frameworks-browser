<template>
    <div class="bg-grey-light w-screen h-screen flex flex-col items-center justify-center">

        <h1 class="text-3xl text-center mb-2">Github Frameworks Browser</h1>
        <h2 class="text-sm mb-4"><a href="https://github.com/NoelDeMartin/github-frameworks-browser">Work in progress!</a></h2>

        <VueSelect
            v-model="framework"
            :options="frameworks"
            label="name"
            class="mb-4 w-screen-90 md:w-1/2 lg:w-1/4"
        />

        <h2
            v-if="framework"
            class="text-xl mb-4"
        >
            {{ framework.name }}
            <a
                v-if="framework.homeUrl"
                :href="framework.homeUrl"
                target="_blank"
            >
                {{ framework.homeUrl }}
            </a>
        </h2>

        <button
            v-if="framework && !loading"
            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            @click="search"
        >
            Search
        </button>

        <h2 v-else-if="loading">Loading...</h2>

        <ul v-if="repositories.length > 0">
            <li
                v-for="repository in repositories"
                :key="repository.id"
            >
                <a
                    :href="repository.html_url"
                    target="_blank"
                >
                    {{ repository.full_name }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import VueSelect from 'vue-select';

export default {
    components: {
        VueSelect,
    },
    data() {
        return {
            loading: false,
            framework: null,
            frameworks: [],
            repositories: [],
        };
    },
    created() {
        const frameworksContext = require.context('./lib/frameworks', true, /\.js$/);
        for (let framework of frameworksContext.keys()) {
            const FrameworkClass = frameworksContext(framework).default;
            this.frameworks.push(new FrameworkClass());
        }
    },
    methods: {
        search() {
            this.loading = true;
            this.framework
                .searchRepositories()
                .then(repositories => {
                    this.loading = false;
                    this.repositories = repositories;
                });
        },
    },
};
</script>
