<template>
  <node-view-wrapper>
    <div>wrapper node</div>
    <v-text-field v-model="password">
    </v-text-field>
  </node-view-wrapper>
</template>
<script>
import { NodeViewWrapper } from "@tiptap/vue-2"
export default {
    
    data() {
        return {
            password: '**********'
        }
    },
    components: {
      NodeViewWrapper
    }
}
</script>