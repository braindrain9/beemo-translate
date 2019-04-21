<template>
    <div class="vocabulary-tab">
        <div class="full-vocabulary">
            <h1>Beemo Translate Vocabulary</h1>

            <div class="vocabulary-table">
                <div v-if="!vocabulary.length" class="empty">
                        <img src="https://orig00.deviantart.net/40d9/f/2012/221/5/b/beemo_dancing_by_norrling-d5afmpo.gif"
                             width="120"
                             height="120"
                             alt="Beemo is dancing"
                        >
                        <div>Your vocabulary is empty</div>
                    </div>
                <div v-else="vocabulary.length">
                    <el-table :data="vocabulary" :border="true">
                        <el-table-column
                                prop="original"
                                label="Original">
                        </el-table-column>
                        <el-table-column
                                prop="translation"
                                label="Translation">
                        </el-table-column>
                        <el-table-column align="right" width="90">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="removePair(scope.$index, scope.row)">Delete</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        vocabulary: [],
        loading: false,
        search: ''
      };
    },
    methods: {
      removePair(index) {
        this.vocabulary.splice(index, 1);

        chrome.storage.sync.set({vocabulary: this.vocabulary}, () => {});
      }
    },
    mounted() {
      this.loading = true;

      chrome.storage.sync.get(['vocabulary'], (data) => {
        console.log(data, 'vocabulary');
        this.loading = false;
        this.vocabulary = data.vocabulary.reverse();
      });
    }
  };
</script>
<style lang="scss">
    $light-grey: #EFF2F7;
    $grey: #3C4858;

    body {
        background: $light-grey;
        font-family: 'Proxima Nova', sans-serif;
    }

    .vocabulary-tab {
        display: flex;
        justify-content: center;
        color: $grey;

        .full-vocabulary {
            max-width: 900px;
            width: 100%;

            h1 {
                font-size: 22px;
            }

            .vocabulary-table {
                background: white;
                min-height: 500px;
                border-radius: 4px;
                padding: 24px;
                box-shadow: 5px 5px 20px -18px rgba(0,0,0,0.55);
                display: flex;
                justify-content: center;

                table {
                    width: 100%;
                }
            }

            .empty {
                padding-top: 100px;
            }
        }
    }
</style>
