// 塔罗牌数据
export interface TarotCard {
  id: string;
  name: string;
  nameEn: string;
  category: 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
  image: string;
  upright: string[];
  reversed: string[];
  isReverse?: boolean;
  orientation?: 'upright' | 'reversed';
}

// 牌阵数据
export interface Spread {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  layout: string;
  icon: string;
  positionLabels?: string[];
  introText?: string;
  exampleQuestions?: string[];
}

// 大阿卡那牌
const majorArcana: TarotCard[] = [
  { id: '0', name: '愚人', nameEn: 'The Fool', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/愚人 The Fool.jpg', upright: ['新的开始', '冒险', '自由'], reversed: ['鲁莽', '缺乏计划'] },
  { id: '1', name: '魔术师', nameEn: 'The Magician', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/魔术师 The Magician.jpg', upright: ['意志力', '创造力', '技能'], reversed: ['缺乏方向', '意志薄弱'] },
  { id: '2', name: '女祭司', nameEn: 'The High Priestess', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/女祭司 The High Priestess.jpg', upright: ['直觉', '潜意识', '神秘'], reversed: ['缺乏洞察力', '秘密'] },
  { id: '3', name: '女皇', nameEn: 'The Empress', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/女皇 The Empress.jpg', upright: ['丰饶', '母性', '自然'], reversed: ['依赖', '缺乏成长'] },
  { id: '4', name: '皇帝', nameEn: 'The Emperor', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/皇帝 The Emperor.jpg', upright: ['权威', '结构', '控制'], reversed: ['专制', '缺乏纪律'] },
  { id: '5', name: '聖職者', nameEn: 'The Hierophant', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/聖職者 The Hierophant.jpg', upright: ['传统', '精神指导', '学习'], reversed: ['反叛', '非传统'] },
  { id: '6', name: '恋人', nameEn: 'The Lovers', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/恋人 The Lovers.jpg', upright: ['爱情', '选择', '和谐'], reversed: ['不和谐', '错误选择'] },
  { id: '7', name: '戰車', nameEn: 'The Chariot', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/戰車 The Chariot.jpg', upright: ['意志力', '胜利', '决心'], reversed: ['缺乏控制', '失败'] },
  { id: '8', name: '力量', nameEn: 'Strength', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/力量 Strength.jpg', upright: ['内在力量', '耐心', '控制'], reversed: ['软弱', '缺乏自信'] },
  { id: '9', name: '隐士', nameEn: 'The Hermit', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/隐士 The Hermit.jpg', upright: ['内省', '寻求真理', '指导'], reversed: ['孤立', '缺乏方向'] },
  { id: '10', name: '命运之轮', nameEn: 'Wheel Of Fortune', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/命运之轮 Wheel Of Fortune.jpg', upright: ['变化', '命运', '周期'], reversed: ['坏运气', '缺乏控制'] },
  { id: '11', name: '正义', nameEn: 'Justice', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/正义 Justice.jpg', upright: ['公正', '平衡', '真理'], reversed: ['不公正', '缺乏责任'] },
  { id: '12', name: '倒吊者', nameEn: 'The Hanged Man', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/倒吊者 The Hanged Man.jpg', upright: ['牺牲', '等待', '新视角'], reversed: ['拖延', '不必要的牺牲'] },
  { id: '13', name: '死神', nameEn: 'Death', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/死神 Death.jpg', upright: ['结束', '转变', '重生'], reversed: ['抗拒变化', '停滞'] },
  { id: '14', name: '节制', nameEn: 'Temperance', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/节制 Temperance.jpg', upright: ['平衡', '调和', '耐心'], reversed: ['不平衡', '缺乏节制'] },
  { id: '15', name: '恶魔', nameEn: 'The Devil', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/恶魔 The Devil.jpg', upright: ['束缚', '物质主义', '成瘾'], reversed: ['解放', '摆脱束缚'] },
  { id: '16', name: '高塔', nameEn: 'The Tower', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/高塔 The Tower.jpg', upright: ['突然变化', '启示', '解放'], reversed: ['避免灾难', '抗拒变化'] },
  { id: '17', name: '星星', nameEn: 'The Stars', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/星星 The Stars.jpg', upright: ['希望', '灵感', '平静'], reversed: ['绝望', '缺乏信心'] },
  { id: '18', name: '月亮', nameEn: 'The Moon', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/月亮 The Moon.jpg', upright: ['幻觉', '恐惧', '潜意识'], reversed: ['释放恐惧', '真相'] },
  { id: '19', name: '太阳', nameEn: 'The Sun', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/太阳 The Sun.jpg', upright: ['快乐', '成功', '活力'], reversed: ['过度乐观', '缺乏成功'] },
  { id: '20', name: '审判', nameEn: 'Judgement', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/审判 Judgement.jpg', upright: ['判断', '重生', '觉醒'], reversed: ['缺乏自我意识', '自我怀疑'] },
  { id: '21', name: '世界', nameEn: 'The World', category: 'major', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/世界 The World.jpg', upright: ['完成', '成就', '旅行'], reversed: ['缺乏完成', '不完整'] },
];

// 权杖系列
const wands: TarotCard[] = [
  { id: 'w1', name: '权杖一', nameEn: 'Ace Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖一 Ace Of Wands.jpg', upright: ['灵感', '新机会', '潜力'], reversed: ['缺乏方向', '延迟'] },
  { id: 'w2', name: '权杖二', nameEn: 'Two Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖二 Two Of Wands.jpg', upright: ['计划', '未来规划', '发现'], reversed: ['缺乏计划', '恐惧'] },
  { id: 'w3', name: '权杖三', nameEn: 'Three Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖三 Three Of Wands.jpg', upright: ['探索', '领导力', '远见'], reversed: ['缺乏远见', '延迟'] },
  { id: 'w4', name: '权杖四', nameEn: 'Four Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖四 Four Of Wands.jpg', upright: ['庆祝', '和谐', '团聚'], reversed: ['缺乏和谐', '过渡'] },
  { id: 'w5', name: '权杖五', nameEn: 'Five Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖五 Five Of Wands.jpg', upright: ['竞争', '冲突', '分歧'], reversed: ['避免冲突', '和平'] },
  { id: 'w6', name: '权杖六', nameEn: 'Six Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖六 Six Of Wands.jpg', upright: ['胜利', '成功', '公众认可'], reversed: ['缺乏认可', '失败'] },
  { id: 'w7', name: '权杖七', nameEn: 'Seven Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖七 Seven Of Wands.jpg', upright: ['挑战', '竞争', '坚持'], reversed: ['放弃', '缺乏自信'] },
  { id: 'w8', name: '权杖八', nameEn: 'Eight Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖八 Eight Of Wands.jpg', upright: ['快速行动', '进展', '速度'], reversed: ['延迟', '缺乏进展'] },
  { id: 'w9', name: '权杖九', nameEn: 'Nine Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖九 Nine Of Wands.jpg', upright: ['韧性', '最后努力', '测试'], reversed: ['疲惫', '放弃'] },
  { id: 'w10', name: '权杖十', nameEn: 'Ten Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖十 Ten Of Wands.jpg', upright: ['负担', '责任', '努力工作'], reversed: ['释放负担', '缺乏组织'] },
  { id: 'wp', name: '权杖侍从', nameEn: 'Page Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖侍从 Page Of Wands.jpg', upright: ['探索', '发现', '自由精神'], reversed: ['缺乏方向', '延迟'] },
  { id: 'wk', name: '权杖骑士', nameEn: 'Knight Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖骑士 Knight Of Wands.jpg', upright: ['能量', '行动', '冒险'], reversed: ['冲动', '缺乏方向'] },
  { id: 'wq', name: '权杖王后', nameEn: 'Queen Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖王后 Queen Of Wands.jpg', upright: ['自信', '独立', '决心'], reversed: ['自私', '缺乏自信'] },
  { id: 'wki', name: '权杖国王', nameEn: 'King Of Wands', category: 'wands', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/权杖国王 King Of Wands.jpg', upright: ['自然领导', '远见', '企业家'], reversed: ['冲动', '坏脾气'] },
];

// 圣杯系列
const cups: TarotCard[] = [
  { id: 'c1', name: '圣杯一', nameEn: 'Ace Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯一 Ace Of Cups.jpg', upright: ['新感觉', '精神觉醒', '直觉'], reversed: ['情感阻塞', '缺乏连接'] },
  { id: 'c2', name: '圣杯二', nameEn: 'Two Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯二 Two Of Cups.jpg', upright: ['统一', '伙伴关系', '相互吸引'], reversed: ['不平衡', '破裂'] },
  { id: 'c3', name: '圣杯三', nameEn: 'Three Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯三 Three Of Cups.jpg', upright: ['友谊', '社区', '庆祝'], reversed: ['过度放纵', '孤立'] },
  { id: 'c4', name: '圣杯四', nameEn: 'Four Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯四 Four Of Cups.jpg', upright: ['冥想', '沉思', '重新评估'], reversed: ['重新连接', '错过机会'] },
  { id: 'c5', name: '圣杯五', nameEn: 'Five Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯五 Five Of Cups.jpg', upright: ['损失', '遗憾', '失望'], reversed: ['接受', '向前看'] },
  { id: 'c6', name: '圣杯六', nameEn: 'Six Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯六 Six Of Cups.jpg', upright: ['重温过去', '童年', '记忆'], reversed: ['生活在过去', '成长'] },
  { id: 'c7', name: '圣杯七', nameEn: 'Seven Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯七 Seven Of Cups.jpg', upright: ['选择', '幻觉', '愿望'], reversed: ['缺乏目的', '混乱'] },
  { id: 'c8', name: '圣杯八', nameEn: 'Eight Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯八 Eight Of Cups.jpg', upright: ['放弃', '失望', '离开'], reversed: ['犹豫', '恐惧'] },
  { id: 'c9', name: '圣杯九', nameEn: 'Nine Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯九 Nine Of Cups.jpg', upright: ['满足', '情感满足', '愿望'], reversed: ['缺乏满足', '贪婪'] },
  { id: 'c10', name: '圣杯十', nameEn: 'Ten Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯十 Ten Of Cups.jpg', upright: ['神圣的爱', '和谐', '对齐'], reversed: ['不和谐', '破裂'] },
  { id: 'cp', name: '圣杯侍从', nameEn: 'Page Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯侍从 Page Of Cups.jpg', upright: ['新感觉', '创造力', '直觉'], reversed: ['情感不稳定', '缺乏创造力'] },
  { id: 'ck', name: '圣杯骑士', nameEn: 'Knight Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯骑士 Knight Of Cups.jpg', upright: ['跟随心', '理想主义', '浪漫'], reversed: ['过度情绪化', '不切实际'] },
  { id: 'cq', name: '圣杯王后', nameEn: 'Queen Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯王后 Queen Of Cups.jpg', upright: ['同情', '冷静', '安慰'], reversed: ['情绪不稳定', '缺乏同情'] },
  { id: 'cki', name: '圣杯国王', nameEn: 'King Of Cups', category: 'cups', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/圣杯国王 King Of Cups.jpg', upright: ['情感平衡', '同情', '外交'], reversed: ['情绪控制', '冷漠'] },
];

// 宝剑系列
const swords: TarotCard[] = [
  { id: 's1', name: '宝剑一', nameEn: 'Ace Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑一 Ace Of Swords.jpg', upright: ['突破', '清晰', '新想法'], reversed: ['混乱', '缺乏清晰'] },
  { id: 's2', name: '宝剑二', nameEn: 'Two Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑二 Two Of Swords.jpg', upright: ['困难选择', '僵局', '平衡'], reversed: ['优柔寡断', '缺乏平衡'] },
  { id: 's3', name: '宝剑三', nameEn: 'Three Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑三 Three Of Swords.jpg', upright: ['心痛', '情感痛苦', '悲伤'], reversed: ['恢复', '宽恕', '向前看'] },
  { id: 's4', name: '宝剑四', nameEn: 'Four Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑四 Four Of Swords.jpg', upright: ['休息', '恢复', '冥想'], reversed: ['疲惫', '倦怠', '重新进入'] },
  { id: 's5', name: '宝剑五', nameEn: 'Five Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑五 Five Of Swords.jpg', upright: ['冲突', '分歧', '竞争'], reversed: ['和解', '宽恕', '恢复'] },
  { id: 's6', name: '宝剑六', nameEn: 'Six Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑六 Six Of Swords.jpg', upright: ['过渡', '离开', '前进'], reversed: ['无法前进', '被困'] },
  { id: 's7', name: '宝剑七', nameEn: 'Seven Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑七 Seven Of Swords.jpg', upright: ['欺骗', '战术', '策略'], reversed: ['自我欺骗', '无计划'] },
  { id: 's8', name: '宝剑八', nameEn: 'Eight Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑八 Eight Of Swords.jpg', upright: ['限制', '自我限制', '无能为力'], reversed: ['新视角', '自由', '自我接受'] },
  { id: 's9', name: '宝剑九', nameEn: 'Nine Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑九 Nine Of Swords.jpg', upright: ['焦虑', '噩梦', '担忧'], reversed: ['内心平静', '释放恐惧'] },
  { id: 's10', name: '宝剑十', nameEn: 'Ten Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑十 Ten Of Swords.jpg', upright: ['背叛', '损失', '结束'], reversed: ['恢复', '再生', '不可避免的结束'] },
  { id: 'sp', name: '宝剑侍从', nameEn: 'Page Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑侍从 Page Of Swords.jpg', upright: ['新想法', '好奇心', '沟通'], reversed: ['缺乏方向', '混乱'] },
  { id: 'sk', name: '宝剑骑士', nameEn: 'Knight Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑骑士 Knight Of Swords.jpg', upright: ['行动', '冲动', '缺乏方向'], reversed: ['缺乏方向', '不思考'] },
  { id: 'sq', name: '宝剑王后', nameEn: 'Queen Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑王后 Queen Of Swords.jpg', upright: ['清晰', '直接沟通', '独立'], reversed: ['冷酷', '缺乏同情'] },
  { id: 'ski', name: '宝剑国王', nameEn: 'King Of Swords', category: 'swords', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/宝剑国王 King Of Swords.jpg', upright: ['心理清晰', '真理', '权威'], reversed: ['操纵', '冷酷', '滥用权力'] },
];

// 钱币系列
const pentacles: TarotCard[] = [
  { id: 'p1', name: '钱币一', nameEn: 'Ace Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币一 Ace Of Pentacles.jpg', upright: ['新机会', '潜力', '物质'], reversed: ['错失机会', '缺乏计划'] },
  { id: 'p2', name: '钱币二', nameEn: 'Two Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币二 Two Of Pentacles.jpg', upright: ['平衡', '优先事项', '适应'], reversed: ['不平衡', '优先事项错误'] },
  { id: 'p3', name: '钱币三', nameEn: 'Three Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币三 Three Of Pentacles.jpg', upright: ['团队合作', '协作', '建设'], reversed: ['缺乏团队合作', '不和谐'] },
  { id: 'p4', name: '钱币四', nameEn: 'Four Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币四 Four Of Pentacles.jpg', upright: ['安全控制', '保存', '占有'], reversed: ['控制', '缺乏安全感'] },
  { id: 'p5', name: '钱币五', nameEn: 'Five Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币五 Five Of Pentacles.jpg', upright: ['需要', '贫困', '不安全'], reversed: ['恢复', '慈善', '精神贫困'] },
  { id: 'p6', name: '钱币六', nameEn: 'Six Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币六 Six Of Pentacles.jpg', upright: ['给予', '接受', '分享财富'], reversed: ['自私', '不平衡', '权力动态'] },
  { id: 'p7', name: '钱币七', nameEn: 'Seven Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币七 Seven Of Pentacles.jpg', upright: ['长期观点', '可持续结果', '坚持'], reversed: ['缺乏进展', '不耐烦', '缺乏奖励'] },
  { id: 'p8', name: '钱币八', nameEn: 'Eight Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币八 Eight Of Pentacles.jpg', upright: ['技能发展', '质量', '掌握'], reversed: ['缺乏质量', '缺乏动力'] },
  { id: 'p9', name: '钱币九', nameEn: 'Nine Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币九 Nine Of Pentacles.jpg', upright: ['丰富', '独立', '自我照顾'], reversed: ['过度工作', '缺乏平衡'] },
  { id: 'p10', name: '钱币十', nameEn: 'Ten Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币十 Ten Of Pentacles.jpg', upright: ['财富', '安全', '家庭'], reversed: ['财务损失', '缺乏安全'] },
  { id: 'pp', name: '钱币侍从', nameEn: 'Page Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币侍从 Page Of Pentacles.jpg', upright: ['雄心', '渴望', '新机会'], reversed: ['缺乏承诺', '缺乏优先事项'] },
  { id: 'pk', name: '钱币骑士', nameEn: 'Knight Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币骑士 Knight Of Pentacles.jpg', upright: ['效率', '努力工作', '责任'], reversed: ['懒惰', '缺乏雄心'] },
  { id: 'pq', name: '钱币王后', nameEn: 'Queen Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币王后 Queen Of Pentacles.jpg', upright: ['实用', '接地气', '慷慨'], reversed: ['物质主义', '自我中心'] },
  { id: 'pki', name: '钱币国王', nameEn: 'King Of Pentacles', category: 'pentacles', image: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/tarot_card/钱币国王 King Of Pentacles.jpg', upright: ['安全', '控制', '财务安全'], reversed: ['财务管理不善', '贪婪'] },
];

export const allCards: TarotCard[] = [...majorArcana, ...wands, ...cups, ...swords, ...pentacles];

// 牌阵数据
export const spreads: Spread[] = [
  {
    id: 'lovers-reunion',
    name: '恋人复合牌阵',
    description: '高阶牌阵,分手复合&前任想法。分析自身以及对方的想法,多方面综合分析评估,你们复合的可能性。',
    cardCount: 9,
    layout: 'lovers-reunion',
    icon: 'grid',
    positionLabels: [
      '牌1 双方基础',
      '牌2 你的现状',
      '牌3 TA的现状',
      '牌4 你对TA的看法',
      '牌5 TA对你的看法',
      '牌6 分手原因',
      '牌7 复合建议',
      '牌8 一件隐秘的事',
      '牌9 最后结果'
    ],
    introText: '恋人复合牌阵不同于三牌阵，不仅可以评估复合的可能性，还能揭示更多细节。例如，了解对方对你的真实想法，以及分手前你所不知道的事情等。',
    exampleQuestions: [
      '我和前男友还能复合吗？',
      '我和他为什么分开？',
      '我们还有可能吗？',
      '我如何修复与前任的关系？'
    ]
  },
  {
    id: 'three-card',
    name: '三牌阵',
    description: '万能牌阵,适合解答简单的问题,比如事务核心、是非判断或事件结果。',
    cardCount: 3,
    layout: 'three-card',
    icon: 'line',
    positionLabels: ['牌1', '牌2', '牌3'],
    introText: '三张无牌阵是一个经典且多功能的牌阵，适合你在面对简单问题时使用。无论是需要了解某件事的核心本质，判断一件事情的对错，还是预测某个事件的结果，这个牌阵都能提供有力的指引。通过三张牌，你可以迅速抓住问题的要点，并得到清晰的答案。',
    exampleQuestions: [
      '我三个月内能谈恋爱吗?',
      '前男友这周回来找我吗?',
      '我最近能通过面试吗?',
      '我应如何改善与某人的关系?'
    ]
  },
  {
    id: 'time-flow',
    name: '时间之流牌阵',
    description: '万能牌阵,揭示事件的发展动向,适合提问一件事或方向的发展性问题。如感情进展、健康状况、工作发展。',
    cardCount: 3,
    layout: 'time-flow',
    icon: 'flow',
    positionLabels: ['牌1 过去', '牌2 现在', '牌3 未来'],
    introText: '时间之流牌阵是一个专注于事件发展过程的万能牌阵，适合用于探索感情进展、健康状况、工作发展等具有时间延续性的问题。这个牌阵能够帮助你了解某个事务从当前到未来的变化趋势，揭示关键的转折点或潜在的障碍。通过分析牌阵中的信息，你可以获得关于事情如何推进的洞见，从而更好地把握方向或做出调整。',
    exampleQuestions: [
      '我和我伴侣的感情未来将会是如何发展呢?',
      '这份新工作在未来几个月的表现如何?',
      '我目前的健康状况在未来几个月会如何变化?',
      '这段友谊未来会变得更紧密还是疏远?'
    ]
  },
  {
    id: 'two-choices',
    name: '二选一牌阵',
    description: '进阶牌阵,适合两难的选择,给出指引',
    cardCount: 5,
    layout: 'two-choices',
    icon: 'choice',
    positionLabels: [
      '牌1 目前的状况',
      '牌2 选择A近未来',
      '牌3 选择A结果',
      '牌4 选择B近未来',
      '牌5 选择B结果'
    ],
    introText: '二选一牌阵专为帮助你在两种选择之间做出决策而设计。当你面对两难抉择时，这个牌阵能指引你洞察每个选项背后的潜在影响，帮助你更清晰地看到哪个选择更符合你的内心需求或现实利益。通过解读五张牌的含义，你将获得关于每个选项的更深层次洞察，从而做出更明智的决定。',
    exampleQuestions: [
      '我应不应该跳槽?',
      '我要不要找他和好?',
      '我应该选择销售类工作还是非销售类工作?',
      '我应该选择和A在一起还是和B在一起?'
    ]
  },
  {
    id: 'single-card',
    name: '单牌阵',
    description: '万能牌阵,适合当下问题提供启发性答案,解答事件核心问题。比如每日的小事、是非判断或结果。',
    cardCount: 1,
    layout: 'single-card',
    icon: 'single',
    positionLabels: ['牌1'],
    introText: '单牌阵是一种简洁、直接的万能牌阵，用于快速回答当下日常问题或帮助做出是非判断。它适合处理每日的小事、简单的事件判断，或者你想知道某个事件的结果。单牌阵通过抽取一张牌，给出启发性的指引，帮助你直击问题的核心，提供清晰的答案。简单高效，这种牌阵非常适合在短时间内获得快速洞见。',
    exampleQuestions: [
      '今天该注意什么事情?',
      '今天的运势如何?',
      '该怎么做才能今天工作顺利?',
      '我目前的计划是否正确?'
    ]
  }
];

// 获取随机卡片
export function getRandomCard(): TarotCard {
  const index = Math.floor(Math.random() * allCards.length);
  return allCards[index];
}

// ✅ 【最终版】50% 正位 + 50% 逆位 随机
export function getRandomCards(count: number): Array<
  TarotCard & {
    isReverse: boolean;
    orientation: 'upright' | 'reversed';
  }
> {
  const shuffled = [...allCards].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return selected.map(card => {
    const isReverse = Math.random() < 0.5;

    return {
      ...card,
      isReverse,
      orientation: isReverse ? 'reversed' : 'upright',
    };
  });
}

// 根据分类获取卡片
export function getCardsByCategory(category: string): TarotCard[] {
  if (category === 'all') return allCards;
  return allCards.filter(card => card.category === category);
}

// 搜索卡片
export function searchCards(keyword: string): TarotCard[] {
  const lowerKeyword = keyword.toLowerCase();
  return allCards.filter(card => 
    card.name.includes(keyword) || 
    card.nameEn.toLowerCase().includes(lowerKeyword)
  );
}