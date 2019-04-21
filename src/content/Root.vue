<template>
    <div class="beemo-popup" ref="popup" id="content-popup">
        <div v-if="loading && !error" class="loading">
            <img src="https://orig00.deviantart.net/40d9/f/2012/221/5/b/beemo_dancing_by_norrling-d5afmpo.gif"
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
            <p>
                Beemo is very upset! Please try to reload page. <br>
                If it doesnt't help - don't worry, we are working on it.
            </p>
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
            <p class="hint" v-bind:class="{remembered}">
                {{remembered ? 'Added to Vocabulary!' : 'Add to your vocabulary!'}}</p>
            <el-button v-if="!remembered" type="default" @click="addToVocabulary">Remember</el-button>
        </div>
    </div>
</template>
<script>
    import utils from '../ext/utils';

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
          remembered: false,
          countryList: [],
          selection: {
            original: '',
            translation: ''
          },
          flag: {
            translation: utils.getFlagEmoji('ua'),
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
        addToVocabulary() {
          utils.set({selection: this.selection, flag: this.flag});
        },
        translate(selection) {
          this.loading = true;
          this.error = false;
          this.remembered = false;
          this.$refs.popup.style.width = this.getPopupWidth(selection.length);

          this.getTranslation(selection).then((data) => {
            if (data) {
              this.selection.original = selection;
              this.selection.translation = data.text;
              this.flag.original = utils.getFlagEmoji(data.originalLang);
              this.flag.translation = utils.getFlagEmoji(this.lang.translation);
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

        window.addEventListener('vocabularyIsSet', function (e) {
          console.log(e, 'vocabulary is set'); // TODO remove if created
          self.remembered = true;
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
    $border-light-grey: #dcdcdc;
    $green: #42b983;

    .heading {
        font-weight: bold;
        color: $lighter-grey;
    }

    .original {
        color: $lightest-grey;
    }

    .hint {
        font-size: 11px;
        color: $lightest-grey;
        border-top: 1px solid $border-light-grey;
        padding-top: 15px;
        margin-bottom: 10px;

        &.remembered {
            color: $green;
        }
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
