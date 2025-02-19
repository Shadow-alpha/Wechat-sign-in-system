// components/tables/tables.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    column: {
      type: Array,
      value: []
    },
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods:{
      handleTap(e){
        //   console.log(e.currentTarget.dataset.index)
          this.triggerEvent('handletap',e.currentTarget.dataset.index)
      },
      handleLongpress(e){
        this.triggerEvent('press',e.currentTarget.dataset.index)
      }
  }
})
