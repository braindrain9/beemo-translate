<template>
    <div class="popup">
        <header>
            <span><strong>Translate and Study with Beemo</strong>!</span>
            <span>
                <a href="#" @click="openAbout = !openAbout"><icon class="how-to-icon" name="question-circle"></icon></a>
                <a href="#" @click="openOptionsPage"><icon name="cog"></icon></a>
            </span>
        </header>
        <div v-if="!openAbout" class="main">
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
                        <el-table-column label="Original" :formatter="formatCellLength">
                            <template slot-scope="scope">
                                {{ scope.row.flag.original }} {{ scope.row.selection.original }}
                            </template>
                        </el-table-column>
                        <el-table-column label="Translation" :formatter="formatCellLength">
                            <template slot-scope="scope">
                                {{ scope.row.flag.translation }} {{ scope.row.selection.translation }}
                            </template>
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
            <el-button size="mini" type="primary" @click="tab">Open in new tab</el-button>
        </div>
        <div v-else="openAbout" class="instructions">
            <p class="muted">Meet Beemo! The most friendliest Chrome Translation Extension! ❤️</p>
            <el-collapse v-model="activeNames">
                <el-collapse-item title="How to use" name="1">
                    <div>Using Beemo can't be easier! Just select text on the page, and all magic is done!</div>
                    <div>You can change translation language
                        and add translation to you own vocabulary. <br>
                        To see your vocabulary click
                        <a href="#" @click="tab" class="link">Open ine a new tab</a> and enjoy!</div>
                </el-collapse-item>
                <el-collapse-item title="What is next" name="2">
                    <div>Beemo is always working on updates to improve your experience using Beemo. New features are comming!</div>
                </el-collapse-item>
                <el-collapse-item title="Feedback" name="3">
                    <div>Help Beemo to become better! We're glad to receive any suggestion <span class="muted">here</span></div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        openAbout: false,
        vocabulary: [],
        activeNames: ['1']
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
      chrome.storage.sync.get(['vocabulary'], (data) => {
        console.log(data, 'vocabulary');
        this.vocabulary = data.vocabulary.reverse();
      });
    }
  };
</script>
<style lang="scss">
    $grey: #3C4858;
    $light-grey: #8492A6;
    $super-light-grey: #dcdcdc;

    .el-collapse-item__header {
        font-weight: bold;
    }

    .muted {
        color: $light-grey;
    }

    .link {
        color: #67c23a;
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
