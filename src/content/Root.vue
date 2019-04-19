<template>
    <div class="beemo-popup" ref="popup">
        <p><strong>Original:</strong></p>
        <p>{{content.original}}</p>
        <p><strong>Beemo Translates:</strong></p>
        <p>{{content.translation}}</p>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          content: {
            original: '',
            translation: ''
          }
        };
      },
      methods: {
        renderPopup(mouseX, mouseY, selection) {
          this.content.original = selection;
          this.$refs.popup.style.top = mouseY + 'px';
          this.$refs.popup.style.left = mouseX + 'px';
          this.$refs.popup.style.visibility = 'visible';
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
    }

</style>