Component({
  properties: {
    current: {
      type: Number,
      value: 0
    }
  },
  methods: {
    switchTab(e: any) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent('switchTab', { index })
    }
  }
})
