<template>
    <div class="popup">
        <header>
            <span><strong>Translate and Study with Beemo</strong>!</span>
            <span>
                <a href="#" @click="openInstructions = !openInstructions"><icon class="how-to-icon" name="question-circle"></icon></a>
                <a href="#" @click="openOptionsPage"><icon name="cog"></icon></a>
            </span>
        </header>
        <div v-if="loading">
            Loading ...
        </div>
        <div v-if="!openInstructions && !loading" class="main">
            <div class="vocabulary">
                <div v-if="!vocabulary.length" class="empty">
                    <img src="https://orig00.deviantart.net/40d9/f/2012/221/5/b/beemo_dancing_by_norrling-d5afmpo.gif"
                         width="120"
                         height="120"
                         alt="Beemo is dancing"
                    >
                    <div>Your vocabulary is empty</div>
                </div>
                <div v-else="vocabulary.length" class="vocabulary-table">
                    <el-table :data="vocabulary">
                        <el-table-column
                                prop="original"
                                label="Original"
                                :formatter="formatCellLength"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="translation"
                                label="Translation"
                                :formatter="formatCellLength"
                                width="120">
                        </el-table-column>
                        <el-table-column align="right">
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
            <el-button size="mini" type="primary" @click="tab">Open in new tab</el-button>
        </div>
        <div v-if="openInstructions && !loading" class="instructions">
            instructions ...
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        openInstructions: false,
        vocabulary: [],
        loading: false
      };
    },
    methods: {
      tab() {
        chrome.tabs.create({url: 'pages/app.html'});
      },
      openOptionsPage() {
        chrome.runtime.openOptionsPage();
      },
      removePair(index) {
        this.vocabulary.splice(index, 1);

        chrome.storage.sync.set({vocabulary: this.vocabulary}, () => {});
      },
      formatCellLength(row, column, cellValue) {
        if (cellValue.length > 100) {
          cellValue = cellValue.slice(0, 100) + '...';
        }

        return cellValue;
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
<style scoped lang="scss">
    $grey: #3C4858;
    $light-grey: #8492A6;
    $super-light-grey: #dcdcdc;

    .muted {
        color: $light-grey;
    }

    .popup {
        width: 350px;
        min-height: 300px;
        max-height: 500px;
        font-family: 'Proxima Nova', sans-serif;
        font-size: 14px;
        color: $grey;

        header {
            display: flex;
            justify-content: space-between;

            svg {
                padding-right: 5px;
            }

            a {
                color: $grey;

                &:hover {
                    color: $light-grey;
                }
            }
        }

        .main {
            .vocabulary {
                min-height: 220px;
                display: flex;
                flex-direction: column;

                img {
                    align-self: center;
                    pointer-events: none;
                }

                .empty {
                    text-align: center;
                    padding-top: 40px;
                }

                border-bottom: 1px solid $super-light-grey;
                margin-bottom: 15px;

                .vocabulary-table {
                    max-height: 400px;
                    overflow-y: scroll;
                }
            }
        }

        .instructions {}
    }
</style>
