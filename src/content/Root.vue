<template>
    <div class="beemo-popup" ref="popup" id="content-popup">
        <div v-if="loading && !error" class="loading">
            <img src="http://33.media.tumblr.com/ed93010586d5be345730a1ced4b5396c/tumblr_n60a0vf8Sr1s33ojro1_250.gif"
                 alt="Beemo is thinking"
                 width="80"
            />
            <p>Beemo is thinking ...</p>
        </div>
        <div v-if="error && !loading" class="error">
            <img src="https://media1.tenor.com/images/2a7614b89d467345750faef7af2c4280/tenor.gif?itemid=8025392"
                 alt="Beemo cries"
                 width="80"
            />
            <p class="heading">Something went wrong!</p>
            <p>Beemo is very upset! Please try to reload page or make a cup of coffee and wait till our super team is fixing it!</p>
        </div>
        <div v-if="!loading && !error">
            <p class="heading">
                Beemo Translates to
                <select v-model="lang.translation" @change="translate(selection.original)">
                    <option v-for="country in countryList" :key="country.code" v-bind:value="country.code">
                        {{country.title}}
                    </option>
                </select>:
            </p>
            <p>{{flag.translation}} {{selection.translation}}</p>
            <p class="heading original">Original:</p>
            <p class="original"><span v-if="flag.original">{{flag.original}}</span> {{selection.original}}</p>
        </div>
    </div>
</template>
<script>
    import flag from 'country-code-emoji';

    const codeToFlag = {
      'uk': 'ua',
      'en': 'us'
    };
    const codeToCountry = {
      'uk': 'Ukrainian',
      'en': 'English',
      'de': 'German',
      'es': 'Spanish',
      'fr': 'French'
    };

    export default {
      data() {
        return {
          loading: false,
          error: false,
          countryList: [],
          selection: {
            original: '',
            translation: ''
          },
          flag: {
            translation: flag('ua'),
            original: undefined
          },
          lang: {
            translation: 'uk'
          }
        };
      },
      methods: {
        renderPopup(mouseX, mouseY, selection) {
          this.loading = true;
          this.$refs.popup.style.top = mouseY + 'px';
          this.$refs.popup.style.left = mouseX + 'px';
          this.$refs.popup.style.visibility = 'visible';

          this.translate(selection);
        },
        translate(selection) {
          this.loading = true;
          this.error = false;
          this.$refs.popup.style.width = this.getPopupWidth(selection.length);

          this.getTranslation(selection).then((data) => {
            if (data) {
              this.selection.original = selection;
              this.selection.translation = data.text;
              this.flag.original = this.getFlagEmoji(data.originalLang);
              this.flag.translation = this.getFlagEmoji(this.lang.translation);
            }

            // add small delay not to prevent small popup flashing on quick load
            setTimeout(() => {
              this.loading = false;
              this.error = !data;
            }, 250);
          });
        },
        getTranslation(text) {
          // Set to empty string in order do not show previous translation while new is pending
          this.selection.translation = '';

          const translated = {
            text: '',
            originalLang: ''
          };

          return this.$http.get(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${this.lang.translation}&dt=t&q=${encodeURI(text)}`
          )
            .then((response) => {
              // Success
              console.log(response.data[0][0][0]); // TODO delete than
              console.log(response.data[2]);
              translated.text = response.data[0].map((item) => {
                return item[0];
              }).join('');
              translated.originalLang = response.data[2];

              return translated;
            }, (response) => {
              // Error
              return response.ok;
            });
        },
        getFlagEmoji(lang) {
          // slice to pass only 2-digit code
          return flag(codeToFlag[lang] || lang.slice(0, 2));
        },
        getPopupWidth(length) {
          let width;

          if (length > 500) {
            width = '600px';
          } else if (length > 300) {
            width = '400px';
          } else {
            width = '270px';
          }

          return width;
        }
      },
      mounted() {
        const self = this;

        Object.keys(codeToCountry).forEach((code) => {
          this.countryList.push({code, title: codeToCountry[code]});
        });

        document.addEventListener('mouseup', function (e) {
          const selection = window.getSelection().toString();

          // TODO delete than
          console.log(selection, 'selection');

          if (selection && selection.length > 0) {
            self.renderPopup(e.pageX, e.pageY, selection);
          } else {
            self.$refs.popup.style.visibility = 'hidden';
          }
        }, false);

        document.getElementById('content-popup').addEventListener('mouseup', function(e) {
          e.preventDefault();
          e.stopPropagation();
        });
      }
    };
</script>
<style scoped lang="scss">
    $grey: #3C4858;
    $lighter-grey: #555;
    $lightest-grey: #888;

    .heading {
        font-weight: bold;
        color: $lighter-grey;
    }

    .original {
        color: $lightest-grey;
    }

    .beemo-popup {
        position: absolute;
        padding: 15px;
        font-size: 14px;
        min-height: 200px;
        width: 270px;
        background: #fff;
        color: $grey;
        z-index: 1000000;
        border-radius: 2px;
        box-shadow: 10px 11px 28px -18px rgba(0,0,0,0.55);

        p {
            margin-bottom: 20px;
        }

        img {
            margin-bottom: 20px;
        }
    }

    .loading, .error {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding-top: 30px;
    }
</style>
