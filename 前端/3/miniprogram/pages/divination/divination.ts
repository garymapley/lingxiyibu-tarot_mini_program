import { spreads, getRandomCards } from '../../utils/tarotData';
import { API_BASE_URL } from '../../config';

// 各牌阵的牌位展示顺序（用于 gridSlots）
const LOVERS_GRID_ORDER = [0, 6, 5, 1, 2, 3, 8, 7, 4];
const THREE_CARD_ORDER = [0, 1, 2];
const TWO_CHOICES_ORDER = [2, 4, 1, 0, 3];
const SINGLE_CARD_ORDER = [0];

function getGridSlotsForSpread(spread: any): { cardIndex: number; labelIndex: number }[] {
  if (!spread || !spread.positionLabels) return [];
  const order = spread.layout === 'lovers-reunion' ? LOVERS_GRID_ORDER
    : spread.layout === 'two-choices' ? TWO_CHOICES_ORDER
    : spread.layout === 'single-card' ? SINGLE_CARD_ORDER
    : spread.layout === 'three-card' || spread.layout === 'time-flow' ? THREE_CARD_ORDER
    : null;
  if (!order) return spread.positionLabels.map((_: any, i: number) => ({ cardIndex: i, labelIndex: i }));
  return order.map((cardIndex: number) => ({ cardIndex, labelIndex: cardIndex }));
}

Page({
  data: {
    spreadId: '',
    spread: null as any,
    cards: [] as any[],
    shuffled: false,
    dealing: false,
    isLoversReunion: false,
    hasStyledLayout: false,
    layoutType: '',
    gridSlots: [] as { cardIndex: number; labelIndex: number }[],
    questionInput: ''
  },

  onLoad(options: any) {
    const spreadId = options.spreadId || 'three-card';
    const spread = spreads.find(s => s.id === spreadId) || spreads[1];
    const layoutType = spread.layout || '';
    const gridSlots = getGridSlotsForSpread(spread);
    const isLoversReunion = spread.id === 'lovers-reunion';
    const hasStyledLayout = !!spread.introText || ['three-card', 'time-flow', 'two-choices', 'single-card'].indexOf(layoutType) >= 0;
    this.setData({
      spreadId: spreadId,
      spread: spread,
      isLoversReunion,
      hasStyledLayout,
      layoutType,
      gridSlots
    });
  },

  shuffleCards() {
    // 🔴 增加空问题校验
    if (!this.data.questionInput || this.data.questionInput.trim() === "") {
      wx.showToast({ title: '请输入问题', icon: 'none' });
      return; // 中断洗牌
    }
  
    this.setData({
      dealing: true,
      shuffled: false,
      cards: []
    });
  
    const cards = getRandomCards(this.data.spread.cardCount);
    console.log('抽牌结果（带逆位）：', cards);
  
    this.setData({
      cards,
      dealing: false,
      shuffled: true
    });
  },

  viewResult() {
    if (!this.data.shuffled || this.data.cards.length === 0) {
      wx.showToast({ title: '请先洗牌', icon: 'none' })
      return
    }
  
    const { cards, spread, questionInput } = this.data;
    const token = wx.getStorageSync('token');
  
    if (!token) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
  
    wx.showLoading({ title: '解读生成中...' });
  
    const cardsJson = JSON.stringify(cards);
  
    // ==============================================
    // ✅【终极修复】牌阵ID 映射为数字！！！
    // ==============================================
    let arrayTypeId = 2; // 默认三牌阵
    switch (spread.id) {
      case 'lovers-reunion': arrayTypeId = 1; break;
      case 'three-card': arrayTypeId = 2; break;
      case 'time-flow': arrayTypeId = 3; break;
      case 'two-choices': arrayTypeId = 4; break;
      case 'single-card': arrayTypeId = 5; break;
    }
  
    wx.request({
      url: `${API_BASE_URL}/api/tarot/record/save`,
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      data: {
        arrayTypeId: arrayTypeId, // ✅ 正确数字ID
        question: questionInput || "",
        cardsJson: cardsJson,
        interpretationJson: JSON.stringify({ summary: "", detail: "", advice: "" })
      },
      success: (res) => {
        const resData = res.data as any;
        if (resData.code === 200) {
          const interpretation = resData.data.interpretation;
          wx.navigateTo({
            url: '/pages/result/result?data=' + encodeURIComponent(JSON.stringify({
              cards: cards,
              interpretation: interpretation
            }))
          });
        } else {
          wx.showToast({ title: resData.msg || '保存失败', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error("请求失败:", err);
        wx.showToast({ title: '网络异常', icon: 'none' });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  onQuestionInput(e: any) {
    this.setData({
      questionInput: e.detail.value
    });
  },

  onExampleQuestionTap(e: any) {
    const question = e.currentTarget.dataset.question;
    this.setData({
      questionInput: question
    });
  }
});
