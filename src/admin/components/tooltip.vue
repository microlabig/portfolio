<template lang="pug">
    .tooltip
      .tooltip__container(
          :class="{show: showed}"
        )
        .tooltip__wrapper(
          :class="`${this.color}`"      
        )
          .tooltip__box
            .tooltip__text {{message}}
            .tooltip__close(
              @click="closeTooltipWrapper"
            )
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {  
  computed: {
    ...mapState('tooltip', { 
      message: state => state.text,
      showed: state => state.show,
      color: state => state.col
    })
  },  

  methods: {    
    ...mapActions('tooltip',['closeTooltip']),
        
    closeTooltipWrapper() {
      this.closeTooltip();
    }
  }
  
}
</script>
