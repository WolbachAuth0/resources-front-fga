<template>
  <pre>
    <code :class="`language-${language}`">
{{ code }}
    </code>
  </pre>
</template>

<script>
import * as Prism from "prismjs";
import 'prismjs/components/prism-json';
import "prismjs/themes/prism-twilight.min.css";

export default {
  name: 'CodeBlock',
  data () {
    return {}
  },
  props: {
    code: { type: String },
    language: { type: String },
    parent: { type: String }
  },
  watch: {
    code: {
      deep: true,
      handler (newValue) {
        setTimeout(function () {
          Prism.highlightAll()
        }, 10)
      }
    }
  },
  mounted() {
    this.initialize();
    this.highlightAll();
  },
  methods: {
    initialize () {
      window.Prism = window.Prism || {};
      window.Prism.manual = true;
    },
    highlightAll () {
      Prism.highlightAll()
    }
  }
}
</script>

<style scoped>
 pre {
  white-space: break-word;
 }
 code {
  white-space: break-word;
 }
</style>