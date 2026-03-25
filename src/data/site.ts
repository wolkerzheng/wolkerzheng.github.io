export const siteMeta = {
  title: 'Zheng Guidong',
  description: 'AI / NLP / Recommendation / Engineering / Blog',
  siteName: 'ZG / AI Notes'
};

export const navItems = [
  { href: '/', label: '首页' },
  { href: '/blog/', label: 'MDX 博客' },
  { href: '/archives/', label: '历史归档' },
  { href: '/resume/', label: '简历' },
  { href: '/guide/', label: '维护指南' }
];

export const stats = [
  { value: '45', label: '历史文章' },
  { value: '5', label: '核心主题域' },
  { value: 'Astro + MDX', label: '当前源码栈' }
];

export const stackGroups = [
  {
    title: 'AI / NLP',
    description:
      '从实体关系分类、句子相似度，到 attention、memory、LSTM 等主题，构成了站点最有辨识度的一条技术线。',
    chips: ['NLP', 'Relation Extraction', 'Sentence Similarity', 'Attention'],
    links: [
      { href: '/2017/03/08/基于相关度计算的实体关系分类/', label: '实体关系分类' },
      { href: '/2017/04/30/句子相似度计算/', label: '句子相似度' }
    ]
  },
  {
    title: '推荐系统与排序',
    description:
      '推荐系统概览、向量空间模型、PageRank 等内容适合归到检索、排序和推荐这一组，更利于后续继续扩写。',
    chips: ['Recommendation', 'Ranking', 'VSM', 'PageRank'],
    links: [
      { href: '/2017/08/06/推荐系统技术的简要了解/', label: '推荐系统技术的简要了解' },
      { href: '/2017/01/05/vsm/', label: '向量空间模型' }
    ]
  },
  {
    title: '机器学习基础',
    description:
      '贝叶斯、KNN、决策树、GBDT、PCA、正则化、SGD 等文章适合放在“算法基础与建模方法”的层级下。',
    chips: ['Classical ML', 'Optimization', 'Feature Engineering'],
    links: [
      { href: '/2017/03/20/随机梯度下降/', label: '随机梯度下降' },
      { href: '/2017/03/23/主成分分析/', label: '主成分分析' }
    ]
  },
  {
    title: '深度学习框架与数据工具',
    description:
      'TensorFlow、Keras、pandas、scikit-learn 这部分更像日常生产力栈，适合后续持续补充实践经验。',
    chips: ['TensorFlow', 'Keras', 'pandas', 'scikit-learn'],
    links: [
      { href: '/2017/02/21/tensorflow学习笔记/', label: 'TensorFlow 学习笔记' },
      { href: '/2017/04/10/10分钟学pandas/', label: '10 分钟学 pandas' }
    ]
  },
  {
    title: '工程实践与职业成长',
    description:
      'Linux 指令、Python 设计模式、Hexo 同步，以及春招校招总结，适合放到工程与职业发展的栏目里。',
    chips: ['Python', 'Linux', 'Hexo', 'Career'],
    links: [
      { href: '/2017/03/16/python与设计模式/', label: 'Python 与设计模式' },
      { href: '/2017/08/22/校招/', label: '校招总结' }
    ]
  }
];

export const featuredLinks = [
  {
    tag: 'Paper Notes',
    title: 'End-to-End Relation Extraction using LSTMs',
    href: '/2017/05/20/end2end-relation-extractio-lstm/',
    description: '适合作为英文论文阅读与关系抽取方向积累的代表文章。'
  },
  {
    tag: 'Deep Learning',
    title: 'Attention 与 Memory',
    href: '/2017/04/17/深度学习和自然语言处理中的attention和memory/',
    description: '把深度学习和 NLP 中高频出现的核心机制串起来，适合做内容门面。'
  },
  {
    tag: 'Recommendation',
    title: '推荐系统技术的简要了解',
    href: '/2017/08/06/推荐系统技术的简要了解/',
    description: '为推荐系统方向预留了一条很自然的后续更新主线。'
  },
  {
    tag: 'NLP',
    title: '句子相似度计算',
    href: '/2017/04/30/句子相似度计算/',
    description: '主题明确、实用度高，也更容易承接今天的大模型和检索增强内容。'
  }
];
