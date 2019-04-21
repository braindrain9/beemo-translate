<template>
    <div class="options-tab">
        <div class="options-container">
            <h1>Beemo Translate Options</h1>
            <div class="options">
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

    .options-tab {
        display: flex;
        justify-content: center;
        color: $grey;

        .options-container {
            max-width: 900px;
            width: 100%;

            h1 {
                font-size: 22px;
            }

            .options {
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
