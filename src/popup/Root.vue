<template>
    <div class="popup">
        <header>
            <span>Beemo App <span class="muted">0.0.1</span></span>
            <span>
                <a href="#" @click="openInstructions = !openInstructions"><icon class="how-to-icon" name="question-circle"></icon></a>
                <a href="#" @click="openOptionsPage"><icon name="cog"></icon></a>
            </span>
        </header>
        <div v-if="!openInstructions" class="main">
            <div class="vocabulary">
                <img src="https://orig00.deviantart.net/40d9/f/2012/221/5/b/beemo_dancing_by_norrling-d5afmpo.gif"
                     width="120"
                     height="120"
                     alt="Hot air balloon icon"
                >
                <div>Your vocabulary is empty</div>
            </div>
            <el-button type="primary" @click="tab">New tab</el-button>
        </div>
        <div v-else class="instructions">
            instructions ...
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        openInstructions: false
      };
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    methods: {
      tab() {
        chrome.tabs.create({url: 'pages/app.html'});
      },
      openOptionsPage() {
        chrome.runtime.openOptionsPage();
      }
    }
  };
</script>
<style scoped lang="scss">
    $grey: #3C4858;
    $light-grey: #8492A6;

    .muted {
        color: $light-grey;
    }

    .popup {
        width: 350px;
        min-height: 300px;
        max-height: 500px;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        color: $grey;

        header {
            display: flex;
            justify-content: space-between;

            > span {
                font-weight: bold;
            }

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
                height: 220px;
                display: flex;
                justify-content: center;
                flex-direction: column;

                img {
                    align-self: center;
                }

                div {
                    text-align: center;
                    padding-top: 20px;
                    font-weight: bold;
                }

                border-bottom: 1px solid #dcdcdc;
                margin-bottom: 20px;
            }
        }

        .instructions {}
    }
</style>