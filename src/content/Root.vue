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
            <p class="heading">Original:</p>
            <p><span v-if="flag.original">{{flag.original}}</span> {{selection.original}}</p>
            <p class="heading">Beemo Translates to Ukrainian:</p>
            <p>{{flag.translation}} {{selection.translation}}</p>
        </div>
    </div>
</template>
<script>
    import flag from 'country-code-emoji';

    const codeToFlag = {
      'uk': 'ua',
      'en': 'us'
    };

    export default {
      data() {
        return {
          loading: false,
          selection: {
            original: '',
            translation: ''
          },
          flag: {
            original: undefined,
            translation: flag('ua')
          }
        };
      },
      methods: {
        renderPopup(mouseX, mouseY, selection) {
          this.$refs.popup.style.top = mouseY + 'px';
          this.$refs.popup.style.left = mouseX + 'px';
          this.$refs.popup.style.visibility = 'visible';

          this.getTranslation(selection).then((translated) => {
            // slice to pass only 2-digit code
            const langCode = codeToFlag[translated.lang] || translated.lang.slice(0, 2);

            this.selection.translation = translated.text;
            this.flag.original = flag(langCode);
            this.selection.original = selection;
          });
        },
        getTranslation(text) {
          // Set to empty string in order do not show previous translation while new is pending
          this.selection.translation = '';
          this.loading = true;

          const translated = {
            text: 'Переклад не доступний :(',
            lang: ''
          };

          return this.$http.get(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=uk&dt=t&q=${encodeURI(text)}`
          )
            .then((response) => {
              // Success
              console.log(response.data[0][0][0]); // TODO delete than
              console.log(response.data[2]);
              translated.text = response.data[0][0][0];
              translated.lang = response.data[2];

              return translated;
            }, (response) => {
              // Error
              console.log(response.data); // TODO delete than
              return translated;
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
    $lighter-grey: #555;

    .heading {
        font-weight: bold;
        color: $lighter-grey;
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
