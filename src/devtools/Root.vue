<template>
    <div class="devtools-tab">
        <div class="devtools-container">
            <h1>Beemo Translate Devtools</h1>
            <div class="devtools">
                <div class="empty">
                    <img src="https://orig00.deviantart.net/40d9/f/2012/221/5/b/beemo_dancing_by_norrling-d5afmpo.gif"
                         width="120"
                         height="120"
                         alt="Beemo is dancing"
                    >
                    <div>Commin soon ...</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {};
</script>
<style lang="scss">
    $light-grey: #EFF2F7;
    $grey: #3C4858;

    body {
        background: $light-grey;
        font-family: 'Proxima Nova', sans-serif;
    }

    .devtools-tab {
        display: flex;
        justify-content: center;
        color: $grey;

        .devtools-container {
            max-width: 900px;
            width: 100%;

            h1 {
                font-size: 22px;
            }

            .devtools {
                background: white;
                min-height: 500px;
                border-radius: 4px;
                padding: 24px;
                box-shadow: 5px 5px 20px -18px rgba(0,0,0,0.55);
                display: flex;
                justify-content: center;
            }

            .empty {
                padding-top: 100px;
            }
        }
    }
</style>
