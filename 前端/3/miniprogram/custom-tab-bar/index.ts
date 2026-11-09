Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "pages/index/index",
        text: "指引"
      },
      {
        pagePath: "pages/tarot/tarot",
        text: "塔罗"
      },
      {
        pagePath: "pages/card-meaning/card-meaning",
        text: "牌意"
      },
      {
        pagePath: "pages/mine/mine",
        text: "我的"
      }
    ]
  },
  lifetimes: {
    attached() {
      this.setSelected();
    }
  },
  pageLifetimes: {
    show() {
      this.setSelected();
    }
  },
  methods: {
    setSelected() {
      const pages = getCurrentPages();
      if (pages.length === 0) return;
      const currentPage = pages[pages.length - 1];
      const url = currentPage.route;
      const selected = this.data.list.findIndex(item => item.pagePath === url);
      if (selected >= 0) {
        this.setData({
          selected: selected
        });
      }
    },
    switchTab(e: any) {
      const index = e.detail.index;
      const url = this.data.list[index].pagePath;
      wx.switchTab({
        url: `/${url}`,
        success: () => {
          this.setData({
            selected: index
          });
        }
      });
    }
  }
});
