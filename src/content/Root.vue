<template>
    <div class="beemo-popup" ref="popup">
        <div v-if="loading" class="loading">
            <img src="https://cdn.dribbble.com/users/56874/screenshots/1055874/bmo__gif_animation__by_desd_d-d5wdgdb.gif"
                 alt="Beemo thinks"
                 width="80"
            />
            <p>Beemo is thinking ...</p>
        </div>
        <div v-else>
            <p class="bold">Original:</p>
            <p>{{selection.original}}</p>
            <p class="bold">Beemo Translates:</p>
            <p>{{selection.translation}}</p>
        </div>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          loading: false,
          selection: {
            original: '',
            translation: ''
          }
        };
      },
      methods: {
        renderPopup(mouseX, mouseY, selection) {
          this.$refs.popup.style.top = mouseY + 'px';
          this.$refs.popup.style.left = mouseX + 'px';
          this.$refs.popup.style.visibility = 'visible';

          this.getTranslation(selection).then((translated) => {
            this.selection.translation = translated;
            this.selection.original = selection;
          });
        },
        getTranslation(text) {
          // Set to empty string in order do not show previous translation while new is pending
          this.selection.translation = '';
          this.loading = true;

          return this.$http.get(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=uk&dt=t&q=${encodeURI(text)}`
          )
            .then((response) => {
              // Success
              console.log(response.data[0][0][0]); // TODO delete than
              return response.data[0][0][0];
            }, (response) => {
              // Error
              console.log(response.data); // TODO delete than
              return 'Переклад не доступний :(';
            })
            .finally((translated) => {
              this.loading = false;

              return translated;
            });
        }
      },
      mounted() {
        const self = this;

        document.addEventListener('mouseup', function (e) {
          const selection = window.getSelection().toString();

          // TODO delete than
          console.log(selection, 'selection');

          if (selection.length > 0) {
            self.renderPopup(e.pageX, e.pageY, selection);
          } else {
            // TODO do not hide if selection is inside popup
            self.$refs.popup.style.visibility = 'hidden';
          }
        }, false);
      }
    };
</script>
<style scoped lang="scss">
    $grey: #3C4858;

    .bold {
        font-weight: bold;
    }

    .beemo-popup {
        position: absolute;
        padding: 15px;
        font-size: 14px;
        min-height: 200px;
        width: 200px;
        background: #fff;
        color: $grey;
        z-index: 1000000;
        border-radius: 2px;
        box-shadow: 10px 11px 28px -18px rgba(0,0,0,0.55);

        p {
            margin-bottom: 20px;
        }
    }

    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding-top: 30px;
    }
</style>
