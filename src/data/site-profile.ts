export const siteMeta = {
  title: 'ZGDisZhengguidong',
  description: '大模型算法研究、智能体开发、对话系统架构师',
  siteName: 'ZGDisZhengguidong',
  profile: '大模型算法研究、智能体开发、对话系统架构师'
};

export const navItems = [
  { href: '/', label: '首页' },
  { href: '/categories/', label: '分类体系' },
  { href: '/blog/', label: 'MDX 博客' },
  { href: '/archives/', label: '历史归档' },
  { href: '/resume/', label: '简历' },
  { href: '/guide/', label: '维护指南' }
];

export const stats = [
  { value: '45', label: '历史文章' },
  { value: '7', label: '新分类' },
  { value: 'Astro + MDX', label: '当前源码栈' }
];

export const stackGroups = [
  {
    title: '大模型与智能体基础',
    description:
      '把原来分散在阅读笔记、模型理解和 NLP 主题里的内容，统一收拢到更贴近你现在定位的“大模型与智能体基础能力”主线。',
    chips: ['LLM', 'Agent', 'Attention', 'Memory'],
    links: [
      { href: '/2017/04/17/深度学习和自然语言处理中的attention和memory/', label: 'Attention 与 Memory' },
      { href: '/2017/05/20/end2end-relation-extractio-lstm/', label: '端到端关系抽取' }
    ]
  },
  {
    title: '自然语言处理与信息抽取',
    description:
      '覆盖序列标注、实体消歧、关系分类、文本分类和语言处理基础，是你历史博客中最系统的一条技术线。',
    chips: ['NLP', 'IE', 'NER', 'Text Classification'],
    links: [
      { href: '/2017/03/08/基于相关度计算的实体关系分类/', label: '实体关系分类' },
      { href: '/2016/12/29/crf/', label: 'CRF' }
    ]
  },
  {
    title: '推荐系统与搜索排序',
    description:
      '把推荐、检索和排序相关内容收敛成一个单独栏位，方便你后续把召回、排序、RAG 和搜索增强也接进来。',
    chips: ['Recommendation', 'Search', 'Ranking', 'Retrieval'],
    links: [
      { href: '/2017/08/06/推荐系统技术的简要了解/', label: '推荐系统技术的简要了解' },
      { href: '/2017/03/02/PageRank基本介绍/', label: 'PageRank 基本介绍' }
    ]
  },
  {
    title: '机器学习算法基础',
    description:
      '传统机器学习、优化方法和统计建模仍然是你的知识底座，这部分适合继续沉淀为方法论型内容。',
    chips: ['ML', 'Optimization', 'Statistics', 'Modeling'],
    links: [
      { href: '/2017/03/20/随机梯度下降/', label: '随机梯度下降' },
      { href: '/2017/03/23/主成分分析/', label: '主成分分析' }
    ]
  },
  {
    title: '深度学习框架与实验笔记',
    description:
      '把 TensorFlow、Keras、sklearn、pandas 这类内容单独抽出来，更适合以后持续补框架经验、实验记录和数据处理流程。',
    chips: ['TensorFlow', 'Keras', 'scikit-learn', 'pandas'],
    links: [
      { href: '/2017/02/21/tensorflow学习笔记/', label: 'TensorFlow 学习笔记' },
      { href: '/2017/04/10/10分钟学pandas/', label: '10 分钟学 pandas' }
    ]
  },
  {
    title: '工程实践与开发效率',
    description:
      '这部分承接环境搭建、工程命令、Python 技巧和博客维护经验，更贴近“智能体开发”和“系统落地”的工程底座。',
    chips: ['Python', 'Linux', 'Tooling', 'Workflow'],
    links: [
      { href: '/2017/03/16/python与设计模式/', label: 'Python 与设计模式' },
      { href: '/2016/12/13/ubuntu-windows同步hexo/', label: 'Ubuntu / Windows 同步 Hexo' }
    ]
  },
  {
    title: '职业成长与随笔',
    description:
      '保留求职总结和个人随笔，让站点不只是技术知识库，也能体现你的成长轨迹和职业判断。',
    chips: ['Career', 'Interview', 'Reflection'],
    links: [
      { href: '/2017/08/22/春招/', label: '春招总结' },
      { href: '/2017/08/22/校招/', label: '校招总结' }
    ]
  }
];

export const featuredLinks = [
  {
    tag: 'LLM Foundation',
    title: 'Attention 与 Memory',
    href: '/2017/04/17/深度学习和自然语言处理中的attention和memory/',
    description: '适合放在首页门面，能够自然过渡到今天的大模型与智能体主题。'
  },
  {
    tag: 'NLP / IE',
    title: 'End-to-End Relation Extraction using LSTMs',
    href: '/2017/05/20/end2end-relation-extractio-lstm/',
    description: '代表你在关系抽取、论文阅读和模型理解方面的历史积累。'
  },
  {
    tag: 'Recommendation',
    title: '推荐系统技术的简要了解',
    href: '/2017/08/06/推荐系统技术的简要了解/',
    description: '推荐系统与搜索排序是你后续很适合继续扩写的一条内容线。'
  },
  {
    tag: 'Engineering',
    title: 'Python 与设计模式',
    href: '/2017/03/16/python与设计模式/',
    description: '能把算法背景和工程实践能力连接起来，适合作为站点的另一面。'
  }
];

export const legacyCategoryGroups = [
  {
    slug: 'llm-agent-foundation',
    title: '大模型与智能体基础',
    description: '围绕模型记忆、注意力机制、阅读理解和高阶语义建模的历史积累。',
    articles: [
      { title: 'machinecomprehensionusingmatch-lstmandanwserpointer', href: '/2016/10/07/machinecomprehensionusingmatch-lstmandanwserpointer/' },
      { title: 'lstm-for-sentiment-Analysis', href: '/2017/04/17/lstm-for-sentiment-Analysis/' },
      { title: '深度学习和自然语言处理中的attention和memory', href: '/2017/04/17/深度学习和自然语言处理中的attention和memory/' },
      { title: 'memory networks', href: '/2017/04/19/memory-networks/' },
      { title: '句子相似度计算', href: '/2017/04/30/句子相似度计算/' },
      { title: '篇章结构', href: '/2017/05/07/篇章结构/' },
      { title: 'End-to-End Relation Extraction using LSTMs on Sequences and Tree Structures', href: '/2017/05/20/end2end-relation-extractio-lstm/' }
    ]
  },
  {
    slug: 'nlp-information-extraction',
    title: '自然语言处理与信息抽取',
    description: '语言处理、序列标注、信息抽取与文本理解相关内容的集中归档。',
    articles: [
      { title: '图方法命名实体消歧', href: '/2016/09/21/图方法命名实体消歧/' },
      { title: 'tackbp', href: '/2016/12/22/tackbp/' },
      { title: 'crf', href: '/2016/12/29/crf/' },
      { title: '最大熵原理简单介绍', href: '/2017/03/02/最大熵原理简单介绍/' },
      { title: '基于相关度计算的实体关系分类', href: '/2017/03/08/基于相关度计算的实体关系分类/' },
      { title: 'nltk学习笔记', href: '/2017/03/09/nltk学习笔记/' },
      { title: '文本分类', href: '/2017/03/14/文本分类/' }
    ]
  },
  {
    slug: 'recommendation-search-ranking',
    title: '推荐系统与搜索排序',
    description: '推荐、检索、排序和图算法相关内容，后续也适合承接 RAG 与搜索增强。',
    articles: [
      { title: 'vsm', href: '/2017/01/05/vsm/' },
      { title: 'PageRank基本介绍', href: '/2017/03/02/PageRank基本介绍/' },
      { title: '推荐系统技术的简要了解', href: '/2017/08/06/推荐系统技术的简要了解/' }
    ]
  },
  {
    slug: 'machine-learning-foundation',
    title: '机器学习算法基础',
    description: '传统机器学习、统计学习和优化方法的基础内容。',
    articles: [
      { title: '决策树', href: '/2016/09/22/决策树/' },
      { title: 'ufldl-softmax', href: '/2016/12/15/ufldl-softmax/' },
      { title: 'knn', href: '/2016/12/17/knn/' },
      { title: '贝叶斯定理', href: '/2016/12/17/贝叶斯定理/' },
      { title: 'mlcourse-3', href: '/2017/01/05/mlcourse-3/' },
      { title: 'gbdt', href: '/2017/01/06/gbdt/' },
      { title: '时间序列分析学习笔记', href: '/2017/03/06/时间序列分析学习笔记/' },
      { title: 'mlcourse-5', href: '/2017/03/20/mlcourse-5/' },
      { title: '随机梯度下降', href: '/2017/03/20/随机梯度下降/' },
      { title: '主成分分析', href: '/2017/03/23/主成分分析/' },
      { title: 'l1-l2正则化', href: '/2017/04/13/l1-l2正则化/' }
    ]
  },
  {
    slug: 'dl-framework-and-experiments',
    title: '深度学习框架与实验笔记',
    description: '框架上手、实验记录和数据处理方法，适合继续扩展为工程实战型内容。',
    articles: [
      { title: 'tensorflow学习笔记', href: '/2017/02/21/tensorflow学习笔记/' },
      { title: 'tensorflow-learn-note3', href: '/2017/03/14/tensorflow-learn-note3/' },
      { title: 'tensorflow-note4', href: '/2017/03/15/tensorflow-note4/' },
      { title: 'sklearn-note', href: '/2017/03/17/sklearn-note/' },
      { title: 'tensorflow-note5', href: '/2017/03/23/tensorflow-note5/' },
      { title: '10分钟学pandas', href: '/2017/04/10/10分钟学pandas/' },
      { title: 'keras_note', href: '/2017/04/18/keras-note/' },
      { title: 'deeplearnng_note', href: '/2017/08/16/deeplearnng-note/' }
    ]
  },
  {
    slug: 'engineering-and-productivity',
    title: '工程实践与开发效率',
    description: '环境配置、编码习惯、开发工具和工作流相关内容。',
    articles: [
      { title: 'hello world', href: '/2016/08/18/hello-world/' },
      { title: 'ubuntu-windows同步hexo', href: '/2016/12/13/ubuntu-windows同步hexo/' },
      { title: 'encoding', href: '/2016/12/14/encoding/' },
      { title: 'pythonnote', href: '/2017/01/10/pythonnote/' },
      { title: 'Linux常用的一些指令', href: '/2017/03/15/Linux常用的一些指令/' },
      { title: 'python与设计模式', href: '/2017/03/16/python与设计模式/' }
    ]
  },
  {
    slug: 'career-and-reflection',
    title: '职业成长与随笔',
    description: '求职总结、阶段复盘和个人思考。',
    articles: [
      { title: '春招', href: '/2017/08/22/春招/' },
      { title: '校招', href: '/2017/08/22/校招/' },
      { title: '20170902杂', href: '/2017/09/02/20170902杂/' }
    ]
  }
];
