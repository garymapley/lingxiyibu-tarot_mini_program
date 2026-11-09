import { allCards, getCardsByCategory, searchCards } from '../../utils/tarotData';

Page({
  data: {
    allCards: [] as any[],
    displayedCards: [] as any[],
    categories: [
      { id: 'all', name: '全部' },
      { id: 'major', name: '大阿卡那' },
      { id: 'wands', name: '权杖系列' },
      { id: 'cups', name: '圣杯系列' },
      { id: 'swords', name: '宝剑系列' },
      { id: 'pentacles', name: '钱币系列' }
    ],
    currentCategory: 'all',
    searchKeyword: ''
  },

  onLoad() {
    this.setData({
      allCards: allCards,
      displayedCards: allCards
    });
  },

  onShow() {
    // 更新底部导航栏状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      });
    }
  },

  onCategoryChange(e: any) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category,
      searchKeyword: ''
    });
    this.filterCards();
  },

  onSearchInput(e: any) {
    const keyword = e.detail.value;
    this.setData({
      searchKeyword: keyword
    });
    this.filterCards();
  },

  filterCards() {
    let cards = [];
    
    if (this.data.searchKeyword) {
      cards = searchCards(this.data.searchKeyword);
    } else {
      cards = getCardsByCategory(this.data.currentCategory);
    }
    
    this.setData({
      displayedCards: cards
    });
  },

  viewCardDetail(e: any) {
    const cardId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/card-detail/card-detail?id=${cardId}`
    });
  }
});
