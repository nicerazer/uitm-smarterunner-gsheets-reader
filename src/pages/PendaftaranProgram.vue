<template>
    <div>
        <div class="overflow-x-auto flex flex-col p-4">
            <div class="flex gap-4 mb-4">
                <input v-model="searchString" type="text" placeholder="Isi carian tajuk kertas kerja" class="input input-bordered w-full">
                <!-- <div class="btn-group flex-none"> -->
                    <button type="button" class="btn btn-ghost" @click="pageDecrement()">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <div class="flex items-center uppercase whitespace-nowrap">
                        Halaman&nbsp;&nbsp;
                        <input type="text" v-model="currentPage" class="input input-sm input-bordered w-10 text-center">
                        &nbsp;&nbsp;dari {{ totalPage }}
                    </div>
                    <button type="button" class="btn btn-ghost" @click="pageIncrement()">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </button>
                <!-- </div> -->
            </div>
            <!-- <div v-if="$apollo.loading" class="bg-white p-4 ring-1 ring-slate-900/5 rounded-lg shadow-lg max-w-xs w-full h-28">
                <div class="flex space-x-4 animate-pulse">
                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-200 rounded"></div>
                    </div>
                    </div>
                </div>
            </div> -->
            <table class="table w-full">
                <!-- head -->
                <thead>
                    <tr>
                        <th></th>
                        <th>Nama Program</th>
                        <th>Jenis Program</th>
                        <th>Anjuran</th>
                        <th>Tarikh Program</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="$apollo.loading">
                    <tr v-for="i in totalDataCurrentPage" :key="i" class="animate-pulse">
                        <th></th>
                        <td><div class="h-2 bg-base-300 rounded"></div></td>
                        <td><div class="h-2 bg-base-300 rounded"></div></td>
                        <td><div class="h-2 bg-base-300 rounded"></div></td>
                        <td><div class="h-2 bg-base-300 rounded"></div></td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr class="hover" v-for="(item, index) in pendaftaranProgram" :key="index">
                        <th>{{ (index+1)+(currentPage-1)*10 }}</th>
                        <td>{{ item.NAMAPROGRAM__F }}</td>
                        <td>{{ item.JENISPROGRAM__G }}</td>
                        <td>{{ item.ANJURAN__E }}</td>
                        <td>{{ item.TARIKHPROGRAM__H }}</td>
                        <td class="hover:text-gray-600 text-gray-400">
                            <a :href="item.KERTASKERJAYANGDILULUSKAN__N" class="cursor-pointer" :class="{ 'hidden': ! item.KERTASKERJAYANGDILULUSKAN__N }">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'

const PAGINATED_PENDAFTARANPROGRAM_QUERY = gql`
    query PendaftaranProgram($q: String!) {
        pendaftaranProgram(q: $q) {
            Timestamp__A
            EmailAddress__B
            KAMPUS__C
            KELULUSANTABUNG__D
            ANJURAN__E
            NAMAPROGRAM__F
            JENISPROGRAM__G
            TARIKHPROGRAM__H
            MASAPROGRAMMULA__I
            MASAPROGRAMTAMAT__J
            TEMPATPROGRAM__K
            MOD__L
            PERUNTUKAN__M
            KERTASKERJAYANGDILULUSKAN__N
            NAMAPENYEDIAKERTASKERJA__O
            TARIKH__P
        }
    }
`

const ALL_LITE_PENDAFTARANPROGRAM_QUERY = gql`
    query PendaftaranProgram ($q: String!) {
        pendaftaranProgram(q: $q) {
            NAMAPROGRAM__F
        }
    }
`

export default {
    data() {
        return {
            searchString: "",
            currentPage: 1,
        }
    },
    computed: {
        paginatedDataComputedQuery: function () { console.log('triggered 1'); return `SELECT * WHERE LOWER( NAMAPROGRAM__F ) like "%${this.searchString.toLowerCase()}%" LIMIT 10 OFFSET ${this.pageOffset}` },
        allDataComputedQuery: function () { console.log('triggered 2'); return `SELECT * WHERE LOWER( NAMAPROGRAM__F ) like "%${this.searchString.toLowerCase()}%"` },
        pageOffset: function () { console.log('triggered 3'); return (this.currentPage-1) * 10 },
        totalDataCurrentPage: function () { console.log('triggered 4'); return this.pendaftaranProgram ? this.pendaftaranProgram.length : 10 },
    },
    methods: {
        pageDecrement() {
            this.currentPage = this.currentPage <= 1 ? 1 : this.currentPage-1
        },
        pageIncrement() {
            if (this.currentPage < this.totalPage) {
                this.currentPage++
            } else if (this.currentPage > this.totalPage) {
                this.currentPage = this.totalPage
            }
        },
    },
    watch: {
        currentPage: function(val, oldVal) {
            if (val >= this.totalPage) {
                this.currentPage = this.totalPage
            }
        }
    },
    apollo: {
        totalPage: {
            query: ALL_LITE_PENDAFTARANPROGRAM_QUERY,
            variables () {
                return {
                    q: this.allDataComputedQuery
                }
            },
            update: data => (Math.ceil(data.pendaftaranProgram.length / 10.0))
        },
        pendaftaranProgram: {
            query: PAGINATED_PENDAFTARANPROGRAM_QUERY,
            variables () {
                return {
                    q: this.paginatedDataComputedQuery
                }
            },
        },
    }
}
</script>