/* Published RAG example, Vincentwei1021/anything2explainer @ ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d. Toolkit not included. */
window.A2E = {
  "commit": "ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d",
  "repo": "https://github.com/Vincentwei1021/anything2explainer",
  "example": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag",
  "films": [
    {
      "id": "en",
      "src": "media/rag-en.mp4",
      "label": "English cut",
      "title": "RAG & Knowledge Bases",
      "meta": "5′02″ · 44 lines · 785 words · kokoro-82m am_liam · natural speed",
      "note": "The English film embedded in the README. Re-timed to that voice."
    },
    {
      "id": "zh",
      "src": "media/rag-zh.mp4",
      "label": "Chinese v2",
      "title": "RAG 与知识库",
      "meta": "4′54″ · 44 lines · 1,490 characters · dot-field backdrop · Volcengine TTS 2.0",
      "note": "The later Chinese film embedded in the README. Dot field, not the star field in the trail."
    }
  ],
  "stills": [
    {
      "src": "media/frames/ref_title_f0058.jpg",
      "frame": 58,
      "file": "ref_title_f0058.jpg",
      "shot": ""
    },
    {
      "src": "media/frames/ref_shortcomings_f0600.jpg",
      "frame": 600,
      "file": "ref_shortcomings_f0600.jpg",
      "shot": "SC04"
    },
    {
      "src": "media/frames/ref_rag_reveal_f1090.jpg",
      "frame": 1090,
      "file": "ref_rag_reveal_f1090.jpg",
      "shot": "SC08"
    },
    {
      "src": "media/frames/ref_paper_f1300.jpg",
      "frame": 1300,
      "file": "ref_paper_f1300.jpg",
      "shot": "SC09"
    },
    {
      "src": "media/frames/ref_chapter_card_f1490.jpg",
      "frame": 1490,
      "file": "ref_chapter_card_f1490.jpg",
      "shot": ""
    },
    {
      "src": "media/frames/ref_parse_f1760.jpg",
      "frame": 1760,
      "file": "ref_parse_f1760.jpg",
      "shot": "SC12"
    },
    {
      "src": "media/frames/ref_chunk_size_f2200.jpg",
      "frame": 2200,
      "file": "ref_chunk_size_f2200.jpg",
      "shot": "SC14"
    },
    {
      "src": "media/frames/ref_vector_space_f2990.jpg",
      "frame": 2990,
      "file": "ref_vector_space_f2990.jpg",
      "shot": "SC17"
    },
    {
      "src": "media/frames/ref_hnsw_f3260.jpg",
      "frame": 3260,
      "file": "ref_hnsw_f3260.jpg",
      "shot": "SC18"
    },
    {
      "src": "media/frames/ref_hybrid_rrf_f4640.jpg",
      "frame": 4640,
      "file": "ref_hybrid_rrf_f4640.jpg",
      "shot": "SC25"
    },
    {
      "src": "media/frames/ref_rerank_funnel_f4900.jpg",
      "frame": 4900,
      "file": "ref_rerank_funnel_f4900.jpg",
      "shot": "SC26"
    },
    {
      "src": "media/frames/ref_lost_in_middle_f5250.jpg",
      "frame": 5250,
      "file": "ref_lost_in_middle_f5250.jpg",
      "shot": "SC28"
    },
    {
      "src": "media/frames/ref_ragas_f6150.jpg",
      "frame": 6150,
      "file": "ref_ragas_f6150.jpg",
      "shot": "SC33"
    },
    {
      "src": "media/frames/ref_graphrag_f6600.jpg",
      "frame": 6600,
      "file": "ref_graphrag_f6600.jpg",
      "shot": "SC36"
    },
    {
      "src": "media/frames/ref_agentic_loop_f6900.jpg",
      "frame": 6900,
      "file": "ref_agentic_loop_f6900.jpg",
      "shot": "SC37"
    },
    {
      "src": "media/frames/ref_long_context_f7480.jpg",
      "frame": 7480,
      "file": "ref_long_context_f7480.jpg",
      "shot": "SC40"
    },
    {
      "src": "media/frames/ref_moat_f8100.jpg",
      "frame": 8100,
      "file": "ref_moat_f8100.jpg",
      "shot": "SC44"
    }
  ],
  "stages": [
    {
      "id": "research",
      "title": "Research",
      "blurb": "Sourced facts from examples/rag/research.md. The film only puts a number on screen when it is in §7.",
      "source": "examples/rag/research.md",
      "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/research.md",
      "items": [
        {
          "kicker": "Research · one sentence",
          "title": "RAG = 让大模型先\"查资料\"再\"答题\"；知识库 = 把文档切块、变成向量、建好索引的\"资料室\"。术语来自 Meta 2020 年 NeurIPS 论文。",
          "paragraphs": [
            "From the executive summary of the published research doc, 2026-09-06. Section 7 is the list the picture was allowed to show."
          ],
          "meta": [],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/research.md",
              "label": "research.md"
            }
          ]
        },
        {
          "kicker": "Fact 1 of 16 · §7.1",
          "title": "RAG 一词来自 2020 年 Meta（Facebook AI）的 NeurIPS 论文，最初是\"语言模型 + 维基百科向量索引\"",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★★"
            },
            {
              "label": "出处",
              "value": "https://arxiv.org/abs/2005.11401"
            }
          ],
          "links": [
            {
              "href": "https://arxiv.org/abs/2005.11401",
              "label": "https://arxiv.org/abs/2005.11401"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Fact 2 of 16 · §7.1",
          "title": "Anthropic 实测：给每个块补 50–100 token 的\"上下文说明\"，top-20 检索失败率降 35%；再叠加 BM25 降 49%；再加重排降 67%（5.7%→1.9%）",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★（Anthropic 自有数据集）"
            },
            {
              "label": "出处",
              "value": "https://www.anthropic.com/news/contextual-retrieval（2024）"
            }
          ],
          "links": [
            {
              "href": "https://www.anthropic.com/news/contextual-retrieval",
              "label": "https://www.anthropic.com/news/contextual-retrieval"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Fact 3 of 16 · §7.1",
          "title": "知识库不到 20 万 token（≈500 页）时，可以不用 RAG，直接整个塞进 prompt",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★"
            },
            {
              "label": "出处",
              "value": "同上"
            }
          ],
          "links": [],
          "lang": "zh"
        },
        {
          "kicker": "Fact 4 of 16 · §7.1",
          "title": "Lost in the Middle：模型对上下文开头和结尾记得最牢，中间最容易漏——U 形曲线",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★★"
            },
            {
              "label": "出处",
              "value": "https://arxiv.org/abs/2307.03172（2023）"
            }
          ],
          "links": [
            {
              "href": "https://arxiv.org/abs/2307.03172",
              "label": "https://arxiv.org/abs/2307.03172"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Fact 5 of 16 · §7.1",
          "title": "Context rot：2025 年测 18 个前沿模型，输入越长越不可靠，哪怕任务很简单",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★"
            },
            {
              "label": "出处",
              "value": "https://www.trychroma.com/research/context-rot（2025）"
            }
          ],
          "links": [
            {
              "href": "https://www.trychroma.com/research/context-rot",
              "label": "https://www.trychroma.com/research/context-rot"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Fact 6 of 16 · §7.1",
          "title": "典型 chunk 大小 256–1024 token；LlamaIndex 默认 1024；Chroma 实测 200 token 无重叠效果好；NVIDIA 实测\"按页切\"最稳",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★"
            },
            {
              "label": "出处",
              "value": "LlamaIndex 文档；Chroma 2024；NVIDIA 2025"
            }
          ],
          "links": [],
          "lang": "zh"
        },
        {
          "kicker": "Fact 7 of 16 · §7.1",
          "title": "HNSW 查询复杂度是对数级：百万向量也只需几十步\"跳跃\"即可逼近最近邻",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★★（\"几十步\"为对数级的口语化，非原文数字）"
            },
            {
              "label": "出处",
              "value": "https://arxiv.org/abs/1603.09320（2016）"
            }
          ],
          "links": [
            {
              "href": "https://arxiv.org/abs/1603.09320",
              "label": "https://arxiv.org/abs/1603.09320"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Fact 8 of 16 · §7.1",
          "title": "RRF 融合公式 1/(60+排名)，k=60 来自 2009 年 SIGIR 论文的试验，作者说\"取值不关键\"",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★★"
            },
            {
              "label": "出处",
              "value": "http://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf"
            }
          ],
          "links": [
            {
              "href": "http://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf",
              "label": "http://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Fact 9 of 16 · §7.1",
          "title": "稠密检索开山作 DPR：top-20 准确率比 BM25 高 9–19 个百分点（2020）；但 BEIR（2021）发现零样本下 BM25 仍是难以击败的基线",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★★"
            },
            {
              "label": "出处",
              "value": "https://arxiv.org/abs/2004.04906 ；https://arxiv.org/abs/2104.08663"
            }
          ],
          "links": [
            {
              "href": "https://arxiv.org/abs/2004.04906",
              "label": "https://arxiv.org/abs/2004.04906"
            },
            {
              "href": "https://arxiv.org/abs/2104.08663",
              "label": "https://arxiv.org/abs/2104.08663"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Fact 10 of 16 · §7.1",
          "title": "Embedding 维度从 384（MiniLM）到 4096（Qwen3-8B）；Qwen3-Embedding-8B 发布时以 70.58 分登顶 MTEB 多语言榜",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★★（\"发布时\"限定）"
            },
            {
              "label": "出处",
              "value": "https://qwenlm.github.io/blog/qwen3-embedding/（2025）"
            }
          ],
          "links": [
            {
              "href": "https://qwenlm.github.io/blog/qwen3-embedding/",
              "label": "https://qwenlm.github.io/blog/qwen3-embedding/"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Fact 11 of 16 · §7.1",
          "title": "重排很贵：小 BERT 重排 4000 万条要 50+ 小时，向量检索 <100 ms——所以只能\"粗召回 25 条，精排留 3 条\"",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★"
            },
            {
              "label": "出处",
              "value": "https://www.pinecone.io/learn/series/rag/rerankers/"
            }
          ],
          "links": [
            {
              "href": "https://www.pinecone.io/learn/series/rag/rerankers/",
              "label": "https://www.pinecone.io/learn/series/rag/rerankers/"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Fact 12 of 16 · §7.1",
          "title": "GraphRAG 在 100 万 token 语料上，回答全局性问题时全面性胜率 72–83%",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★★（LLM 评审）"
            },
            {
              "label": "出处",
              "value": "https://arxiv.org/abs/2404.16130（2024）"
            }
          ],
          "links": [
            {
              "href": "https://arxiv.org/abs/2404.16130",
              "label": "https://arxiv.org/abs/2404.16130"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Fact 13 of 16 · §7.1",
          "title": "RAG vs 长上下文：63% 的问题两者答案完全一样；先 RAG、答不了再长上下文，可省 39–65% 成本",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★★"
            },
            {
              "label": "出处",
              "value": "https://arxiv.org/abs/2407.16833（2024）"
            }
          ],
          "links": [
            {
              "href": "https://arxiv.org/abs/2407.16833",
              "label": "https://arxiv.org/abs/2407.16833"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Fact 14 of 16 · §7.1",
          "title": "Weaviate 单节点可跑 5 万+ 租户，各自独立索引——权限隔离靠架构而非靠模型\"自觉\"",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★"
            },
            {
              "label": "出处",
              "value": "https://docs.weaviate.io/weaviate/concepts/data"
            }
          ],
          "links": [
            {
              "href": "https://docs.weaviate.io/weaviate/concepts/data",
              "label": "https://docs.weaviate.io/weaviate/concepts/data"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Fact 15 of 16 · §7.1",
          "title": "OWASP 2025 把\"向量与嵌入弱点\"列为 LLM 十大风险之一（LLM08）",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★★"
            },
            {
              "label": "出处",
              "value": "https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/"
            }
          ],
          "links": [
            {
              "href": "https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/",
              "label": "https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Fact 16 of 16 · §7.1",
          "title": "pgvector 让 Postgres 直接存向量：vector 类型最高 16000 维，支持 HNSW/IVFFlat",
          "paragraphs": [],
          "meta": [
            {
              "label": "可信度",
              "value": "★★★"
            },
            {
              "label": "出处",
              "value": "https://github.com/pgvector/pgvector"
            }
          ],
          "links": [
            {
              "href": "https://github.com/pgvector/pgvector",
              "label": "https://github.com/pgvector/pgvector"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "Analogy · §7.2",
          "title": "开卷考试",
          "paragraphs": [],
          "meta": [
            {
              "label": "对应概念",
              "value": "RAG 整体"
            },
            {
              "label": "贴切之处",
              "value": "模型不再靠死记（参数），而是先翻资料再答；资料可随时更新"
            },
            {
              "label": "失真之处",
              "value": "开卷考试的资料是\"全给你\"，RAG 是\"只发给你几页\"——发错页就答错（检索失败）；且考生可能不看资料硬答（幻觉仍会发生）"
            }
          ],
          "links": [],
          "lang": "zh"
        },
        {
          "kicker": "Analogy · §7.2",
          "title": "图书馆索引卡 / 书脊上的分类号",
          "paragraphs": [],
          "meta": [
            {
              "label": "对应概念",
              "value": "分块 + Embedding + 向量索引"
            },
            {
              "label": "贴切之处",
              "value": "每张卡（块）有个\"坐标\"（向量），相近主题的卡挨在一起；找书先查卡不翻书"
            },
            {
              "label": "失真之处",
              "value": "图书分类是人工、离散、单维的；embedding 是连续高维空间（几百到几千维），\"相近\"是语义而非题目"
            }
          ],
          "links": [],
          "lang": "zh"
        },
        {
          "kicker": "Analogy · §7.2",
          "title": "把书撕成卡片",
          "paragraphs": [],
          "meta": [
            {
              "label": "对应概念",
              "value": "Chunking"
            },
            {
              "label": "贴切之处",
              "value": "直观呈现\"切太碎丢上下文、切太大找不准\"的两难；父子块 = 卡片背面写着\"来自第几章\""
            },
            {
              "label": "失真之处",
              "value": "真实分块不\"撕\"原书，原文仍保留；撕法（按页/段/语义）可以很聪明"
            }
          ],
          "links": [],
          "lang": "zh"
        },
        {
          "kicker": "Analogy · §7.2",
          "title": "两轮面试：海选 + 终面",
          "paragraphs": [],
          "meta": [
            {
              "label": "对应概念",
              "value": "两阶段检索（向量粗召回 + cross-encoder 重排）"
            },
            {
              "label": "贴切之处",
              "value": "海选快但看简历（单向量）粗糙；终面慢但面对面（问题与文档同时读）更准，所以只面少数人"
            },
            {
              "label": "失真之处",
              "value": "现实里\"终面\"也可能选错；且候选没进海选就永远没机会（召回决定上限）"
            }
          ],
          "links": [],
          "lang": "zh"
        },
        {
          "kicker": "Analogy · §7.2",
          "title": "U 形注意力 / 三明治",
          "paragraphs": [],
          "meta": [
            {
              "label": "对应概念",
              "value": "Lost in the Middle"
            },
            {
              "label": "贴切之处",
              "value": "开头和结尾的资料最容易被记住，夹在中间的被忽略；动画可把最关键的一块放两端"
            },
            {
              "label": "失真之处",
              "value": "这是统计趋势不是硬规则；新模型有改善（Databricks 数据：GPT-4o、Claude 3.5 Sonnet 退化很小）"
            }
          ],
          "links": [],
          "lang": "zh"
        }
      ]
    },
    {
      "id": "narration",
      "title": "Narration",
      "blurb": "All 44 spoken lines from narration.txt. The bars are the subtitle cuts. Frames are from timeline.md (8,246 frames, edge-tts Yunxi +8%).",
      "source": "examples/rag/narration.txt",
      "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
      "items": [
        {
          "kicker": "S01 · Chapter 1 为什么要RAG",
          "title": "大模型很聪明｜但它有三个天生的短板",
          "blocks": [
            "大模型很聪明",
            "但它有三个天生的短板"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "86–165"
            },
            {
              "label": "时长",
              "value": "2.7s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S02 · Chapter 1 为什么要RAG",
          "title": "第一｜它的知识有截止日期｜训练之后发生的事｜它一概不知",
          "blocks": [
            "第一",
            "它的知识有截止日期",
            "训练之后发生的事",
            "它一概不知"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "176–300"
            },
            {
              "label": "时长",
              "value": "4.2s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S03 · Chapter 1 为什么要RAG",
          "title": "第二｜它读不到你公司内网里的文档｜也不知道你昨天刚写的会议纪要",
          "blocks": [
            "第二",
            "它读不到你公司内网里的文档",
            "也不知道你昨天刚写的会议纪要"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "311–443"
            },
            {
              "label": "时长",
              "value": "4.4s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S04 · Chapter 1 为什么要RAG",
          "title": "第三｜遇到不知道的问题｜它不会说我不知道｜而是一脸自信地编一个答案｜这就是幻觉",
          "blocks": [
            "第三",
            "遇到不知道的问题",
            "它不会说我不知道",
            "而是一脸自信地编一个答案",
            "这就是幻觉"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "454–610"
            },
            {
              "label": "时长",
              "value": "5.2s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S05 · Chapter 1 为什么要RAG",
          "title": "怎么办｜重新训练一遍｜成本太高｜而且明天数据又变了",
          "blocks": [
            "怎么办",
            "重新训练一遍",
            "成本太高",
            "而且明天数据又变了"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "621–741"
            },
            {
              "label": "时长",
              "value": "4.0s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S06 · Chapter 1 为什么要RAG",
          "title": "于是工程师们想出了一个办法｜让模型开卷考试",
          "blocks": [
            "于是工程师们想出了一个办法",
            "让模型开卷考试"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "752–868"
            },
            {
              "label": "时长",
              "value": "3.9s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S07 · Chapter 1 为什么要RAG",
          "title": "考试前先把资料整理成一本手册｜答题时先翻手册｜再作答",
          "blocks": [
            "考试前先把资料整理成一本手册",
            "答题时先翻手册",
            "再作答"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "879–1010"
            },
            {
              "label": "时长",
              "value": "4.4s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S08 · Chapter 1 为什么要RAG",
          "title": "这套方法就是今天的主角｜RAG｜检索增强生成",
          "blocks": [
            "这套方法就是今天的主角",
            "RAG",
            "检索增强生成"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "1021–1127"
            },
            {
              "label": "时长",
              "value": "3.6s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S09 · Chapter 1 为什么要RAG",
          "title": "2020年｜Facebook AI 的研究者在论文里｜正式提出了这个名字｜Retrieval-Augmented Generation",
          "blocks": [
            "2020年",
            "Facebook AI 的研究者在论文里",
            "正式提出了这个名字",
            "Retrieval-Augmented Generation"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "1138–1326"
            },
            {
              "label": "时长",
              "value": "6.3s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S10 · Chapter 1 为什么要RAG",
          "title": "它把检索和生成两个动作接在一起｜回答不再只靠记忆｜而是靠证据",
          "blocks": [
            "它把检索和生成两个动作接在一起",
            "回答不再只靠记忆",
            "而是靠证据"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "1337–1478"
            },
            {
              "label": "时长",
              "value": "4.7s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S11 · Chapter 2 知识库构建",
          "title": "RAG 好不好用｜一半取决于那本手册｜也就是知识库是怎么建的",
          "blocks": [
            "RAG 好不好用",
            "一半取决于那本手册",
            "也就是知识库是怎么建的"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "1534–1652"
            },
            {
              "label": "时长",
              "value": "4.0s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S12 · Chapter 2 知识库构建",
          "title": "第一步解析｜PDF 网页 表格 扫描件｜要先统一变成干净的文本｜还得保留标题段落和表格结构",
          "blocks": [
            "第一步解析",
            "PDF 网页 表格 扫描件",
            "要先统一变成干净的文本",
            "还得保留标题段落和表格结构"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "1663–1888"
            },
            {
              "label": "时长",
              "value": "7.5s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S13 · Chapter 2 知识库构建",
          "title": "第二步切块｜模型一次读不完一整本手册｜所以要把文档切成一段段的 chunk",
          "blocks": [
            "第二步切块",
            "模型一次读不完一整本手册",
            "所以要把文档切成一段段的 chunk"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "1899–2052"
            },
            {
              "label": "时长",
              "value": "5.1s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S14 · Chapter 2 知识库构建",
          "title": "切多大是个学问｜太大检索不精准｜太小上下文被切碎｜常见做法是几百个 token 一块｜块与块之间留一点重叠",
          "blocks": [
            "切多大是个学问",
            "太大检索不精准",
            "太小上下文被切碎",
            "常见做法是几百个 token 一块",
            "块与块之间留一点重叠"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "2063–2306"
            },
            {
              "label": "时长",
              "value": "8.1s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S15 · Chapter 2 知识库构建",
          "title": "更讲究的做法｜是按语义或标题层级来切｜再给每个小块补一句它来自哪篇文档的哪一节｜Anthropic 的实验显示｜配合关键词检索｜这一招能把检索失败率降低 49%",
          "blocks": [
            "更讲究的做法",
            "是按语义或标题层级来切",
            "再给每个小块补一句它来自哪篇文档的哪一节",
            "Anthropic 的实验显示",
            "配合关键词检索",
            "这一招能把检索失败率降低 49%"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "2317–2683"
            },
            {
              "label": "时长",
              "value": "12.2s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S16 · Chapter 2 知识库构建",
          "title": "第三步向量化｜用 Embedding 模型｜把每一块文字压成一串几百到几千维的数字",
          "blocks": [
            "第三步向量化",
            "用 Embedding 模型",
            "把每一块文字压成一串几百到几千维的数字"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "2694–2858"
            },
            {
              "label": "时长",
              "value": "5.5s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S17 · Chapter 2 知识库构建",
          "title": "意思相近的文字｜向量就靠得近｜退款流程和怎么把钱要回来｜在这个空间里是邻居",
          "blocks": [
            "意思相近的文字",
            "向量就靠得近",
            "退款流程和怎么把钱要回来",
            "在这个空间里是邻居"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "2869–3031"
            },
            {
              "label": "时长",
              "value": "5.4s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S18 · Chapter 2 知识库构建",
          "title": "第四步建索引｜上亿个向量不能一个个比｜要用 HNSW 这类近似最近邻索引｜把查找从线性扫描变成几十次跳转",
          "blocks": [
            "第四步建索引",
            "上亿个向量不能一个个比",
            "要用 HNSW 这类近似最近邻索引",
            "把查找从线性扫描变成几十次跳转"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "3042–3296"
            },
            {
              "label": "时长",
              "value": "8.5s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S19 · Chapter 2 知识库构建",
          "title": "存进向量数据库｜再配上元数据和权限标签｜谁能看什么｜在这一步就要定下来",
          "blocks": [
            "存进向量数据库",
            "再配上元数据和权限标签",
            "谁能看什么",
            "在这一步就要定下来"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "3307–3480"
            },
            {
              "label": "时长",
              "value": "5.8s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S20 · Chapter 2 知识库构建",
          "title": "别忘了文档会变｜知识库要能增量更新｜否则模型很快又在讲过期的故事",
          "blocks": [
            "别忘了文档会变",
            "知识库要能增量更新",
            "否则模型很快又在讲过期的故事"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "3491–3660"
            },
            {
              "label": "时长",
              "value": "5.7s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S21 · Chapter 3 检索与生成",
          "title": "手册建好了｜用户提问的那一刻｜真正的考试才开始",
          "blocks": [
            "手册建好了",
            "用户提问的那一刻",
            "真正的考试才开始"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "3716–3819"
            },
            {
              "label": "时长",
              "value": "3.5s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S22 · Chapter 3 检索与生成",
          "title": "第一步理解问题｜用户的原话往往含糊｜可以让模型先改写｜拆成几个子问题｜或者先假想一个答案｜再拿它去检索",
          "blocks": [
            "第一步理解问题",
            "用户的原话往往含糊",
            "可以让模型先改写",
            "拆成几个子问题",
            "或者先假想一个答案",
            "再拿它去检索"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "3830–4054"
            },
            {
              "label": "时长",
              "value": "7.5s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S23 · Chapter 3 检索与生成",
          "title": "第二步检索｜把问题也变成向量｜去索引里找最近的邻居｜这是语义检索",
          "blocks": [
            "第二步检索",
            "把问题也变成向量",
            "去索引里找最近的邻居",
            "这是语义检索"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "4065–4223"
            },
            {
              "label": "时长",
              "value": "5.3s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S24 · Chapter 3 检索与生成",
          "title": "但语义检索有盲区｜型号 编号 专有名词这种精确匹配｜它经常抓不住",
          "blocks": [
            "但语义检索有盲区",
            "型号 编号 专有名词这种精确匹配",
            "它经常抓不住"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "4234–4412"
            },
            {
              "label": "时长",
              "value": "6.0s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S25 · Chapter 3 检索与生成",
          "title": "所以工程上通常做混合检索｜向量找相似的｜BM25 关键词找精确的｜两路结果用倒数排名融合成一份",
          "blocks": [
            "所以工程上通常做混合检索",
            "向量找相似的",
            "BM25 关键词找精确的",
            "两路结果用倒数排名融合成一份"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "4423–4674"
            },
            {
              "label": "时长",
              "value": "8.4s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S26 · Chapter 3 检索与生成",
          "title": "第三步重排｜粗召回几十条｜再用 Cross-Encoder 重排器｜把问题和每一段放在一起精细打分｜只留最相关的几条",
          "blocks": [
            "第三步重排",
            "粗召回几十条",
            "再用 Cross-Encoder 重排器",
            "把问题和每一段放在一起精细打分",
            "只留最相关的几条"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "4685–4924"
            },
            {
              "label": "时长",
              "value": "8.0s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S27 · Chapter 3 检索与生成",
          "title": "这一步很像推荐系统里的精排｜贵｜但准",
          "blocks": [
            "这一步很像推荐系统里的精排",
            "贵",
            "但准"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "4935–5015"
            },
            {
              "label": "时长",
              "value": "2.7s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S28 · Chapter 3 检索与生成",
          "title": "第四步组装上下文｜研究发现｜模型对塞在长上下文中间的信息记得最差｜这叫 Lost in the Middle｜所以最重要的证据要放在开头和结尾",
          "blocks": [
            "第四步组装上下文",
            "研究发现",
            "模型对塞在长上下文中间的信息记得最差",
            "这叫 Lost in the Middle",
            "所以最重要的证据要放在开头和结尾"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "5026–5311"
            },
            {
              "label": "时长",
              "value": "9.5s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S29 · Chapter 3 检索与生成",
          "title": "最后生成｜把问题和证据一起交给大模型｜并要求它只根据给定资料回答｜答不出来就说不知道｜每句结论都标注来源",
          "blocks": [
            "最后生成",
            "把问题和证据一起交给大模型",
            "并要求它只根据给定资料回答",
            "答不出来就说不知道",
            "每句结论都标注来源"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "5322–5562"
            },
            {
              "label": "时长",
              "value": "8.0s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S30 · Chapter 3 检索与生成",
          "title": "一个有引用可追溯的回答｜才是 RAG 真正的价值",
          "blocks": [
            "一个有引用可追溯的回答",
            "才是 RAG 真正的价值"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "5573–5694"
            },
            {
              "label": "时长",
              "value": "4.1s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S31 · Chapter 4 评估与进阶",
          "title": "系统搭起来了｜怎么知道它好不好",
          "blocks": [
            "系统搭起来了",
            "怎么知道它好不好"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "5750–5819"
            },
            {
              "label": "时长",
              "value": "2.3s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S32 · Chapter 4 评估与进阶",
          "title": "评估要拆成两半｜检索有没有找对｜生成有没有说对",
          "blocks": [
            "评估要拆成两半",
            "检索有没有找对",
            "生成有没有说对"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "5830–5944"
            },
            {
              "label": "时长",
              "value": "3.8s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S33 · Chapter 4 评估与进阶",
          "title": "检索端看召回率 MRR 和 nDCG｜生成端看忠实度和答案相关性｜RAGAS 这类框架把它们做成了标准指标",
          "blocks": [
            "检索端看召回率 MRR 和 nDCG",
            "生成端看忠实度和答案相关性",
            "RAGAS 这类框架把它们做成了标准指标"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "5955–6210"
            },
            {
              "label": "时长",
              "value": "8.5s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S34 · Chapter 4 评估与进阶",
          "title": "一个常见的坑｜回答很流畅｜但证据是错的｜所以忠实度永远比流畅度重要",
          "blocks": [
            "一个常见的坑",
            "回答很流畅",
            "但证据是错的",
            "所以忠实度永远比流畅度重要"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "6221–6404"
            },
            {
              "label": "时长",
              "value": "6.1s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S35 · Chapter 4 评估与进阶",
          "title": "RAG 也在进化",
          "blocks": [
            "RAG 也在进化"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "6415–6448"
            },
            {
              "label": "时长",
              "value": "1.1s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S36 · Chapter 4 评估与进阶",
          "title": "GraphRAG｜把文档里的实体和关系抽成知识图谱｜再对社区做摘要｜专门回答这批文档整体讲了什么｜这类全局问题",
          "blocks": [
            "GraphRAG",
            "把文档里的实体和关系抽成知识图谱",
            "再对社区做摘要",
            "专门回答这批文档整体讲了什么",
            "这类全局问题"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "6459–6707"
            },
            {
              "label": "时长",
              "value": "8.3s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S37 · Chapter 4 评估与进阶",
          "title": "Agentic RAG｜让模型自己决定要不要检索｜检索几轮｜结果够不够｜不够就换个问法再搜｜今天的 Deep Research 类产品｜本质上就是它",
          "blocks": [
            "Agentic RAG",
            "让模型自己决定要不要检索",
            "检索几轮",
            "结果够不够",
            "不够就换个问法再搜",
            "今天的 Deep Research 类产品",
            "本质上就是它"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "6718–6988"
            },
            {
              "label": "时长",
              "value": "9.0s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S38 · Chapter 4 评估与进阶",
          "title": "多模态 RAG｜直接对图片和 PDF 页面做向量｜图表 截图也能被检索到",
          "blocks": [
            "多模态 RAG",
            "直接对图片和 PDF 页面做向量",
            "图表 截图也能被检索到"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "6999–7165"
            },
            {
              "label": "时长",
              "value": "5.6s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S39 · Chapter 4 评估与进阶",
          "title": "有人问｜模型上下文都百万 token 了｜还需要 RAG 吗",
          "blocks": [
            "有人问",
            "模型上下文都百万 token 了",
            "还需要 RAG 吗"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "7176–7299"
            },
            {
              "label": "时长",
              "value": "4.1s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S40 · Chapter 4 评估与进阶",
          "title": "Anthropic 给过一条经验线｜资料不到 20 万 token｜大约 500 页｜直接整本塞进上下文就够了",
          "blocks": [
            "Anthropic 给过一条经验线",
            "资料不到 20 万 token",
            "大约 500 页",
            "直接整本塞进上下文就够了"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "7310–7501"
            },
            {
              "label": "时长",
              "value": "6.4s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S41 · Chapter 4 评估与进阶",
          "title": "但一家公司的资料远不止 500 页｜还有权限 时效和成本｜RAG 负责找｜长上下文负责读｜两者是搭档不是对手",
          "blocks": [
            "但一家公司的资料远不止 500 页",
            "还有权限 时效和成本",
            "RAG 负责找",
            "长上下文负责读",
            "两者是搭档不是对手"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "7512–7751"
            },
            {
              "label": "时长",
              "value": "8.0s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S42 · Chapter 4 评估与进阶",
          "title": "回到最初的比喻｜RAG 让模型从闭卷变成开卷",
          "blocks": [
            "回到最初的比喻",
            "RAG 让模型从闭卷变成开卷"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "7762–7867"
            },
            {
              "label": "时长",
              "value": "3.5s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S43 · Chapter 4 评估与进阶",
          "title": "但开卷考试想考高分｜靠的从来不是翻书翻得快｜而是那本手册整理得有多好",
          "blocks": [
            "但开卷考试想考高分",
            "靠的从来不是翻书翻得快",
            "而是那本手册整理得有多好"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "7878–8050"
            },
            {
              "label": "时长",
              "value": "5.8s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "S44 · Chapter 4 评估与进阶",
          "title": "知识库｜才是 RAG 真正的护城河",
          "blocks": [
            "知识库",
            "才是 RAG 真正的护城河"
          ],
          "paragraphs": [],
          "meta": [
            {
              "label": "帧",
              "value": "8061–8146"
            },
            {
              "label": "时长",
              "value": "2.9s"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/narration.txt",
              "label": "narration.txt"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/timeline.md",
              "label": "timeline.md"
            }
          ],
          "lang": "zh"
        }
      ]
    },
    {
      "id": "storyboard",
      "title": "Storyboard",
      "blurb": "All 44 shots from the filled board, 分镜表.md. Frame ranges already include the in and out handles.",
      "source": "examples/rag/分镜表.md",
      "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
      "items": [
        {
          "kicker": "SC01 · 78–167",
          "title": "大模型与三个短板",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "86 大模型很聪明 / 116 三个短板"
            },
            {
              "label": "画面",
              "value": "画面中央偏左 (400,360) `LLMIcon` size 170 标签「大模型」；右侧三个空的虚线框 (700–1180, y 200/340/480 各 h100 w440) 编号 ①②③（Orbitron 数字灰）。"
            },
            {
              "label": "动效",
              "value": "LLMIcon 21 帧缩放入场 + 紫柔光脉冲；「很聪明」时图标上方冒 3 颗小星（rnd 位置，8 帧淡入）。116：三个虚线框自右滑入（Δ300，2 帧错峰），编号 glitch。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 78,
          "frameEnd": 167,
          "shot": "SC01",
          "lang": "zh"
        },
        {
          "kicker": "SC02 · 168–302",
          "title": "短板① 知识截止",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "176 第一 / 186 截止日期 / 233 之后发生的事 / 275 一概不知"
            },
            {
              "label": "画面",
              "value": "承接 SC01 布局（LLMIcon 与三个框保持原位、可整体缩到 0.9 腾空间）。框① 内：一条水平时间轴（x 730→1150），中点竖直红标「训练截止」（ORANGE 小 Pill），左侧几个白色事件点、右侧事件点为灰色「?」。"
            },
            {
              "label": "动效",
              "value": "176 框①边框灰→紫 11 帧变色 + 标签「知识截止」Pill 滑入；186 时间轴 draw-on（LineArrow p 0→1，20 帧）+ 红标自下弹起；233 右侧灰「?」点逐个 2 帧错峰出现；275 LLMIcon 内神经元点闪灰一次（accent 紫→灰 6 帧再回）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 168,
          "frameEnd": 302,
          "shot": "SC02",
          "lang": "zh"
        },
        {
          "kicker": "SC03 · 303–445",
          "title": "短板② 私有数据",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "311 第二 / 320 内网文档 / 380 会议纪要"
            },
            {
              "label": "画面",
              "value": "框② 内：左侧 `DocIcon` ×2 标「内网文档」+ 一个锁形（SVG 简笔，白）；右侧一张「会议纪要」文档带「昨天」小橙标；框与 LLMIcon 之间一条虚线被红色 `Cross` 拦住。"
            },
            {
              "label": "动效",
              "value": "311 框②变紫 + 标签「读不到私有数据」；320 文档图标 2 帧错峰缩放入场、锁 glitch；380 会议纪要文档自右滑入并试图向左移向 LLM（12 帧），被 Cross draw-on 拦住回弹 4px。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 303,
          "frameEnd": 445,
          "shot": "SC03",
          "lang": "zh"
        },
        {
          "kicker": "SC04 · 446–612",
          "title": "短板③ 幻觉",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "454 第三 / 463 不知道的问题 / 499 不会说不知道 / 534 一脸自信地编 / 588 幻觉"
            },
            {
              "label": "画面",
              "value": "框③ 内：左侧问句气泡「公司去年营收是多少？」（白边黑底圆角气泡 26px），右侧 LLM 的答复气泡「是 3.2 亿元，增长 18%」（自信、无来源），角落一个 RED_DEEP `TagBlock`「幻觉」带红柔光。"
            },
            {
              "label": "动效",
              "value": "454 框③变紫；463 问句气泡自左弹入（slideUp 方向改为自左）；499 一个灰色「不知道」小胶囊闪现后被划掉（Cross 12 帧）；534 答复气泡打字机逐字出现（stepKf，每 2 帧 1 字），数字用 ORANGE；588 「幻觉」TagBlock glitch 入 + 答复气泡边框变红 8 帧。末 2 帧整组开始 exitFade（下一镜头硬切）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_shortcomings_f0600.jpg",
              "caption": "ref_shortcomings_f0600.jpg · frame 600"
            }
          ],
          "frameStart": 446,
          "frameEnd": 612,
          "shot": "SC04",
          "lang": "zh"
        },
        {
          "kicker": "SC05 · 613–743",
          "title": "重新训练？",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "621 怎么办 / 637 重新训练 / 670 成本太高 / 692 数据又变了"
            },
            {
              "label": "画面",
              "value": "清场重排：中央 LLMIcon (640,330)；上方大问号「？」Orbitron 90px 白；637 起一条循环箭头环绕 LLM（SVG 圆弧箭头，紫）标「重新训练」；左下 Pill「成本」+ 三个 ORANGE 「¥」叠字 + 上升柱；右下一张日历卡「明天」翻页，卡上文档小图标变灰并出现「已过期」小橙标。"
            },
            {
              "label": "动效",
              "value": "问号 glitch 入（621）；循环箭头 draw-on 24 帧（637）；成本柱 3 根 2 帧错峰自下长出 + ¥ 逐个弹出（670）；日历翻页 10 帧（上半页 rotateX 用 scaleY 0→−1 近似或两张卡替换）+ 「已过期」glitch（692）。末 2 帧不做离场（G2 的 SC06 硬切）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 613,
          "frameEnd": 743,
          "shot": "SC05",
          "lang": "zh"
        },
        {
          "kicker": "SC06 · 744–870",
          "title": "开卷考试",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "752 想出一个办法 / 828 开卷考试"
            },
            {
              "label": "画面",
              "value": "中央一张考卷（白边黑底竖卡 300×380，顶部「试卷」字样、几行题目线条），左上「闭卷」灰 Pill；828 考卷右侧翻开一本书（两页，SVG 简笔，白边，页面文本线条），大字「开卷考试」Noto 900 64px scaleX .8 白 + 紫描边 glitch 入。"
            },
            {
              "label": "动效",
              "value": "考卷 slideUp 入场；灯泡小图标在 LLMIcon 位置闪一下（可选）；828 「闭卷」被划掉、书本 21 帧缩放入场 + 大字 GlitchIn（rgbSplit 6）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 744,
          "frameEnd": 870,
          "shot": "SC06",
          "lang": "zh"
        },
        {
          "kicker": "SC07 · 871–1012",
          "title": "手册流程预告",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "879 整理成手册 / 956 翻手册 / 995 再作答"
            },
            {
              "label": "画面",
              "value": "三步横排（y 380）：左「资料」= 一堆 DocIcon（5 张错落）→ 箭头 → 中「手册」= 书图标 + 紫标签「知识库」→ 箭头 → 右「作答」= 答复气泡带引用角标 [1][2]。上方 (640,200) 一个问句气泡「问题」在 956 时飞向手册。"
            },
            {
              "label": "动效",
              "value": "879 文档堆 2 帧错峰入场 → 箭头①自根部长出 → 书图标缩放入场；956 问句气泡自上落到书上（powOutRemain 22 帧）、书页高亮一行（紫条 wipe）；995 箭头②长出、答复气泡弹入，引用角标 glitch。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 871,
          "frameEnd": 1012,
          "shot": "SC07",
          "lang": "zh"
        },
        {
          "kicker": "SC08 · 1013–1129",
          "title": "主角登场 RAG",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "1021 今天的主角 / 1080 RAG / 1096 检索增强生成"
            },
            {
              "label": "画面",
              "value": "清场。中央巨大「RAG」Audiowide 150px 白（字距 8）+ 紫色硬投影 (+6,+6)；下方「检索增强生成」Noto 900 48px scaleX .8；再下方三小 Pill「Retrieval」「Augmented」「Generation」（Exo 2 紫）分别对应 R/A/G。"
            },
            {
              "label": "动效",
              "value": "1021 三道横向紫光条从左扫过（R6 光条样式，α 0.3，16 帧）；1080 「RAG」GlitchIn rgbSplit 8 + slices 20，之后 emphasisPulse 1.11；1096 中文副标自下滑入、三小 Pill 2 帧错峰 glitch。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_rag_reveal_f1090.jpg",
              "caption": "ref_rag_reveal_f1090.jpg · frame 1090"
            }
          ],
          "frameStart": 1013,
          "frameEnd": 1129,
          "shot": "SC08",
          "lang": "zh"
        },
        {
          "kicker": "SC09 · 1130–1328",
          "title": "2020 论文",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "1138 2020年 / 1152 Facebook AI / 1211 提出这个名字 / 1238 Retrieval-Augmented Generation"
            },
            {
              "label": "画面",
              "value": "左侧 (330,370) 一张论文卡（白边黑底 380×460，顶部两行标题「Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks」Times New Roman 20px，作者行「Lewis et al. · NeurIPS 2020」灰，下方灰文本线条 + 一个小图表方块）；右侧 (860,300) 大年份「2020」Orbitron 96px；其下 Pill「Facebook AI Research」。1238：卡片标题中 Retrieval / Augmented / Generation 三词依次变紫，右侧出现大号 Exo 2 「Retrieval-Augmented Generation」两行。"
            },
            {
              "label": "动效",
              "value": "年份数字滚动 2016→2020 计数（Counter，14 帧）；论文卡 slideUp 入；Pill glitch；三词 11 帧灰→紫依次变色（间隔 10 帧）；大号英文 slideUp。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_paper_f1300.jpg",
              "caption": "ref_paper_f1300.jpg · frame 1300"
            }
          ],
          "frameStart": 1130,
          "frameEnd": 1328,
          "shot": "SC09",
          "lang": "zh"
        },
        {
          "kicker": "SC10 · 1329–1480",
          "title": "检索 + 生成 = 靠证据",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "1337 检索和生成接在一起 / 1413 不再只靠记忆 / 1454 靠证据"
            },
            {
              "label": "画面",
              "value": "上半：两个大 Pill「检索」(x 380) 与「生成」(x 900)（黑底白边 200×70，34px）向中间靠拢并用 R2 风格的 ⊐ 连接线接成一体，接口处闪一次白光。下半左：LLMIcon 小 + 灰 Pill「记忆」（灰）；下半右：三张 DocIcon（紫 accent 首行）+ 紫 Pill「证据」+ 绿勾。"
            },
            {
              "label": "动效",
              "value": "1337 两 Pill 自两侧滑入 → 连接线 draw-on（16 帧）→ 白闪 4 帧；1413 记忆组淡入后 8 帧变灰并轻微下沉 12px；1454 证据组 2 帧错峰入场、Pill glitch、绿勾 draw-on 12 帧。末 2 帧整组 exitFade（进章节卡）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 1329,
          "frameEnd": 1480,
          "shot": "SC10",
          "lang": "zh"
        },
        {
          "kicker": "SC11 · 1526–1654",
          "title": "手册 = 知识库",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "1534 好不好用 / 1568 取决于手册 / 1606 知识库怎么建"
            },
            {
              "label": "画面",
              "value": "中央 (640,390) 书本图标（翻开，SVG 白边）+ 上方 Pill「手册」；1606 「手册」Pill 翻转成紫 Pill「知识库」（Exo 2 副标 Knowledge Base）；左右两侧各一个小天平/进度：左「RAG 效果」半圆刻度盘指针指向一半（\"一半取决于\"）。"
            },
            {
              "label": "动效",
              "value": "书本缩放入场；刻度盘 draw-on + 指针 easeInOutPow 摆到 50%（1568）；1606 Pill 翻转（scaleX 1→0→1 各 6 帧，中点换字换色）。注意 rail 会在 1655 出现在 y112–160，本镜头末尾内容可向下让位或直接硬切。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 1526,
          "frameEnd": 1654,
          "shot": "SC11",
          "lang": "zh"
        },
        {
          "kicker": "SC12 · 1655–1890",
          "title": "第一步 解析",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "1663 第一步解析 / 1690 PDF 网页 表格 扫描件 / 1760 干净的文本 / 1819 保留标题段落表格结构"
            },
            {
              "label": "画面",
              "value": "主区 y 190–620。左列四个文件图标（x 200，y 220/320/420/520）：PDF（红角标 PDF）、网页（窗口三色点小卡）、表格（网格小卡）、扫描件（歪斜的纸 + 噪点）；中间大箭头 → 一个「解析器」黑底白边框 (560–720)；右侧一张大文档卡 (780–1180, y 200–600)，内含：标题行（粗白）、段落线条、一个 3×3 小表格。"
            },
            {
              "label": "动效",
              "value": "1690 四图标 2 帧错峰自左滑入；箭头 draw-on；1760 文档卡自右滑入，文本线条自上而下逐行 wipe（每行 2 帧）；1819 标题/段落/表格三处依次套紫色标签「标题」「段落」「表格」（glitch，间隔 12 帧）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_parse_f1760.jpg",
              "caption": "ref_parse_f1760.jpg · frame 1760"
            }
          ],
          "frameStart": 1655,
          "frameEnd": 1890,
          "shot": "SC12",
          "lang": "zh"
        },
        {
          "kicker": "SC13 · 1891–2054",
          "title": "第二步 切块",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "1899 第二步切块 / 1921 读不完一整本 / 1974 切成 chunk"
            },
            {
              "label": "画面",
              "value": "承接右侧文档卡（整体移到中央 (640,400) 放大 1.1）。1921 左侧 LLMIcon 小 + 灰问号（读不完）；1974 三条水平虚线切割文档 → 四段分离成 `ChunkCard`（间距拉开 14px，2 帧错峰），每段右上角小字「chunk」Exo 2 紫。"
            },
            {
              "label": "动效",
              "value": "文档卡平移+缩放 easeInOutPow 20 帧；LLM 与问号淡入；切割线 draw-on（虚线 wipe 10 帧）→ 分离 powOutRemain 18 帧。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 1891,
          "frameEnd": 2054,
          "shot": "SC13",
          "lang": "zh"
        },
        {
          "kicker": "SC14 · 2055–2308",
          "title": "切多大",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "2063 切多大是学问 / 2098 太大不精准 / 2133 太小被切碎 / 2173 几百个 token 一块 / 2257 留一点重叠"
            },
            {
              "label": "画面",
              "value": "三栏对比：左 (240) 一个巨大 ChunkCard 360 高 + 放大镜找不到（灰问号）标签「太大」；右 (1040) 十几个碎小方块散落标签「太小」；中 (640) 三张标准 ChunkCard 竖排，右侧标注「≈ 几百 token」（Orbitron 数字 300–800 滚动后停在「几百」文字）；2257 相邻两卡之间出现紫色半透明重叠带 + 标签「重叠」。"
            },
            {
              "label": "动效",
              "value": "左右两栏依次滑入（2098/2133）并配红色小 Cross；中栏 2173 缩放入场 + 绿勾；重叠带 wipe 8 帧（2257）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_chunk_size_f2200.jpg",
              "caption": "ref_chunk_size_f2200.jpg · frame 2200"
            }
          ],
          "frameStart": 2055,
          "frameEnd": 2308,
          "shot": "SC14",
          "lang": "zh"
        },
        {
          "kicker": "SC15 · 2309–2685",
          "title": "语义切块 + 补上下文 −49%",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "2317 更讲究的做法 / 2346 按语义或标题层级 / 2400 补一句来自哪 / 2498 Anthropic 实验 / 2572 配合关键词检索 / 2606 降低 49%"
            },
            {
              "label": "画面",
              "value": "左半：一份带层级的文档树（标题 H1 → H2 → 段落，缩进线条），切割线沿标题边界（紫）而不是等距；中：一张 ChunkCard 上方长出一条紫色\"上下文前缀\"条：「《员工手册》› 第 3 章 差旅报销」（Noto 22px）；右半 (980,380)：大数字 Counter「−49%」ORANGE 72px + 下方灰小字「Top-20 检索失败率 · Anthropic Contextual Retrieval, 2024」（22px）。"
            },
            {
              "label": "动效",
              "value": "2346 文档树逐级 wipe + 紫切割线 draw-on；2400 前缀条自卡片顶部长出（scaleY 0→1 12 帧）+ 文字打字机；2498 「Anthropic」Pill glitch；2572 一个小 Pill「BM25」贴到前缀条旁；2606 数字 0→49 计数 20 帧 + 橙柔光脉冲。末 2 帧不离场（SC16 硬切）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 2309,
          "frameEnd": 2685,
          "shot": "SC15",
          "lang": "zh"
        },
        {
          "kicker": "SC16 · 2686–2860",
          "title": "第三步 向量化",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "2694 第三步向量化 / 2720 Embedding 模型 / 2779 几百到几千维数字"
            },
            {
              "label": "画面",
              "value": "左 (260,400) 一张 ChunkCard（active）；中 (640,400) 紫色大盒「Embedding」（R4 Embedding 盒样式：#6630F8 填充 + 白 3px 边 220×110，Exo 2 白字）；右 (1000,400) 一列等宽数字「[ 0.12, −0.87, 0.33, 0.05, … ]」FONT_MONO 24px 分三行，末尾灰字「× 1024 维」。"
            },
            {
              "label": "动效",
              "value": "卡片入场 → 箭头 draw-on → 盒子 glitch（2720）→ 数字逐个 2 帧错峰出现，随机数用 rnd 生成（2779）；维度字样 Orbitron 计数 384→1024。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 2686,
          "frameEnd": 2860,
          "shot": "SC16",
          "lang": "zh"
        },
        {
          "kicker": "SC17 · 2861–3033",
          "title": "向量空间邻居",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "2869 意思相近 / 2902 向量靠得近 / 2931 退款流程 vs 怎么把钱要回来 / 2988 是邻居"
            },
            {
              "label": "画面",
              "value": "主区一个 2D 坐标平面（细灰网格 #4A4A4A 1px，范围 x 240–1040、y 190–600），散落 ~40 个灰点（rnd，固定 seed）；两个紫点相邻 (600,380)/(650,400) 分别标「退款流程」「怎么把钱要回来」（白 Pill 26px）；远处一个灰点标「年假规定」。"
            },
            {
              "label": "动效",
              "value": "网格 wipe 入场；灰点 rnd 顺序 1 帧错峰亮起；2931 两紫点缩放入场 + 标签 glitch；2988 两点之间画一条短紫线段 + 圆形高亮圈（draw-on 12 帧）+ 「邻居」小 Pill；「年假规定」灰点闪一次表示\"远\"。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_vector_space_f2990.jpg",
              "caption": "ref_vector_space_f2990.jpg · frame 2990"
            }
          ],
          "frameStart": 2861,
          "frameEnd": 3033,
          "shot": "SC17",
          "lang": "zh"
        },
        {
          "kicker": "SC18 · 3034–3298",
          "title": "第四步 建索引 HNSW",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "3042 第四步建索引 / 3073 上亿个向量不能一个个比 / 3130 HNSW 近似最近邻 / 3219 线性扫描→几十次跳转"
            },
            {
              "label": "画面",
              "value": "左 (300,400)：一列 12 个小圆点竖排，一个扫描光标自上而下逐个比对（灰）标「线性扫描」+ 顶部 Orbitron「1 0000 0000 ×」；右 (860,400)：HNSW 三层图——三块平行四边形平面（skew，白边）自上而下越来越密的点，一条橙色查询路径从顶层几个点跳到中层再到底层目标点（LineArrow 连续 draw-on），标签「HNSW」Exo 2 紫 + 「Hierarchical NSW」小字。"
            },
            {
              "label": "动效",
              "value": "3073 扫描光标快速下扫两遍后出现红 Cross；3130 三层平面 2 帧错峰自下滑入，点阵 rnd 亮起；3219 查询路径 draw-on 24 帧（每一跳 3–4 帧），到达目标点后目标点紫柔光脉冲，右上角计数「跳转 ×N」随路径增加。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_hnsw_f3260.jpg",
              "caption": "ref_hnsw_f3260.jpg · frame 3260"
            }
          ],
          "frameStart": 3034,
          "frameEnd": 3298,
          "shot": "SC18",
          "lang": "zh"
        },
        {
          "kicker": "SC19 · 3299–3482",
          "title": "向量数据库 + 权限",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "3307 存进向量数据库 / 3345 元数据和权限标签 / 3405 谁能看什么 / 3432 这一步定下来"
            },
            {
              "label": "画面",
              "value": "中央 (640,330) `DBIcon` w160 标「向量数据库」（顶面紫 accent）；左侧三张 ChunkCard 依次飞入库中；3345 每张卡飞入前贴上两枚小标签：「来源：员工手册 p.12」白、「ACL：财务组」ORANGE；右下 (1000,520) 两个用户小图标（圆头+肩线 SVG）：「财务组」可见（绿勾）、「实习生」被挡（红 Cross）。"
            },
            {
              "label": "动效",
              "value": "DBIcon 缩放入场；卡片沿弧线飞入（kf 表，18 帧一张，错峰 12 帧）；标签 glitch；3405 用户图标滑入 + 勾/叉 draw-on；3432 DB 边框紫柔光脉冲。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 3299,
          "frameEnd": 3482,
          "shot": "SC19",
          "lang": "zh"
        },
        {
          "kicker": "SC20 · 3483–3662",
          "title": "增量更新",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "3491 文档会变 / 3531 增量更新 / 3582 过期的故事"
            },
            {
              "label": "画面",
              "value": "左 (300,380) DocIcon 大「v1」→ 翻新为「v2」（版本角标 Orbitron），中间循环箭头（两条弧形箭头组成环，紫）标「增量更新」，右 (960,380) DBIcon 小；3582 库里一张灰色 ChunkCard 标「过期」被划线，替换为新卡（紫）。"
            },
            {
              "label": "动效",
              "value": "v1→v2 角标翻转（scaleX 翻页 8 帧）；循环箭头 draw-on 18 帧后持续缓慢旋转（每帧 2°）；过期卡变灰 + 删除线 wipe（3582）→ 新卡自上落入。末 2 帧整组 exitFade（进章节卡）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 3483,
          "frameEnd": 3662,
          "shot": "SC20",
          "lang": "zh"
        },
        {
          "kicker": "SC21 · 3708–3821",
          "title": "提问的那一刻",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "3716 手册建好了 / 3741 用户提问 / 3781 考试才开始"
            },
            {
              "label": "画面",
              "value": "左上 (300,300) 小 DBIcon + 绿勾（建好了）；中央一个聊天输入框（白边黑底圆角 720×80 at (640,420)，左侧光标闪烁），3741 打字机输入「差旅报销的上限是多少？」（Noto 30px）；右端一个紫圆形发送按钮。3781 「开始」考卷小图标翻开。"
            },
            {
              "label": "动效",
              "value": "输入框 slideUp；光标 8 帧一闪（stepKf）；打字每 2 帧 1 字；发送按钮 emphasisPulse；末 2 帧不离场（SC22 硬切；rail 在 3822 出现）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 3708,
          "frameEnd": 3821,
          "shot": "SC21",
          "lang": "zh"
        },
        {
          "kicker": "SC22 · 3822–4056",
          "title": "理解问题",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "3830 第一步理解问题 / 3865 原话含糊 / 3909 先改写 / 3948 拆成子问题 / 3982 假想一个答案 / 4026 拿它去检索"
            },
            {
              "label": "画面",
              "value": "主区 y 190–620。左 (250,400) 用户问句气泡「报销上限？」（含糊，灰边）；向右三条分支（y 260/400/540）各一个卡：①「改写」→「差旅费报销标准与上限」（Exo 2 小字 Query Rewriting）②「拆分」→ 两条子问题「住宿上限？」「交通上限？」（Multi-Query）③「假想答案」→ 一张灰底斜体答案卡「差旅住宿每天不超过…」（HyDE）；三卡右侧汇成一个箭头指向右边缘的 DBIcon 小图标。"
            },
            {
              "label": "动效",
              "value": "气泡入场 + 边框闪灰（3865）；三分支箭头依次 draw-on、卡片 glitch（3909/3948/3982）；4026 汇合箭头长出 + DBIcon 缩放入场。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 3822,
          "frameEnd": 4056,
          "shot": "SC22",
          "lang": "zh"
        },
        {
          "kicker": "SC23 · 4057–4225",
          "title": "语义检索",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "4065 第二步检索 / 4093 问题变向量 / 4137 找最近的邻居 / 4192 语义检索"
            },
            {
              "label": "画面",
              "value": "复用 SC17 的坐标平面（同 seed 灰点分布，可直接复制参数），左上角问句 Pill「差旅报销上限？」→ 经过小 Embedding 盒 → 变成一个 ORANGE 查询点落入平面 (620,390)；以它为中心画圆（半径 90）圈住 3 个紫点（最近邻），三点标签「报销标准 §3」「住宿上限」「交通补贴」。"
            },
            {
              "label": "动效",
              "value": "平面 wipe；问句 Pill 滑入 → 盒子 glitch → 橙点沿弧线飞入（4093）；圆圈 draw-on 14 帧 + 三点依次变紫（4137）；标签「语义检索」Exo 2 紫 glitch（4192）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 4057,
          "frameEnd": 4225,
          "shot": "SC23",
          "lang": "zh"
        },
        {
          "kicker": "SC24 · 4226–4414",
          "title": "盲区：精确匹配",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "4234 语义检索有盲区 / 4282 型号 编号 专有名词 / 4377 抓不住"
            },
            {
              "label": "画面",
              "value": "上方问句 Pill「型号 X-2000B 的保修期？」其中「X-2000B」ORANGE 高亮；下方三张结果卡（横排 y 400）：「X-2000A 保修…」「X-3000 保修…」「保修政策总则」，每张右上角相似度分「0.83 / 0.81 / 0.79」（Orbitron 灰）；三张卡都被红 Cross 划掉；右侧一张「X-2000B 保修 2 年」卡在远处灰暗（漏掉）。"
            },
            {
              "label": "动效",
              "value": "问句滑入 + 高亮词 glitch（4282）；结果卡 2 帧错峰入场、分数计数；Cross 依次 draw-on（4377）；漏掉卡淡入 40% 并轻晃。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 4226,
          "frameEnd": 4414,
          "shot": "SC24",
          "lang": "zh"
        },
        {
          "kicker": "SC25 · 4415–4676",
          "title": "混合检索 + RRF",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "4423 混合检索 / 4492 向量找相似 / 4526 BM25 找精确 / 4594 倒数排名融合"
            },
            {
              "label": "画面",
              "value": "左列 (300) 紫标题 Pill「向量检索」+ 4 张小结果卡带排名 1–4；右列 (980) ORANGE 标题 Pill「BM25」+ 4 张小卡排名 1–4（其中一张「X-2000B」高亮）；中央 (640,300) 大 Pill「混合检索」；下方 (640,540) 公式 Times New Roman Italic 34px：score(d) = Σ 1 / (k + rank_r(d))，其下灰小字「RRF · k = 60」；两列卡在 4594 沿弧线汇入中央一列融合结果（5 张，紫边）。"
            },
            {
              "label": "动效",
              "value": "「混合检索」glitch（4423）；左列 2 帧错峰入（4492）；右列同（4526）；公式逐 token 出现（每 3 帧一个）+ 卡片汇合 kf 20 帧（4594）。末 2 帧不离场。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_hybrid_rrf_f4640.jpg",
              "caption": "ref_hybrid_rrf_f4640.jpg · frame 4640"
            }
          ],
          "frameStart": 4415,
          "frameEnd": 4676,
          "shot": "SC25",
          "lang": "zh"
        },
        {
          "kicker": "SC26 · 4677–4926",
          "title": "第三步 重排",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "4685 第三步重排 / 4707 粗召回几十条 / 4734 Cross-Encoder / 4823 放在一起打分 / 4890 只留几条"
            },
            {
              "label": "画面",
              "value": "沿用推荐系统片的漏斗语言：顶部 (640,230) 一排 12 张小 ChunkCard（w 70）标「召回 30 条」（Orbitron 数字）；中间一个紫色梯形层（R2 `Trap` 样式，wTop 720 wBot 360 h 90）写「Cross-Encoder 重排」；梯形左侧一个小卡「问题 + 段落」成对进入（问句 Pill 与 ChunkCard 并排），右侧弹出分数「0.92」；底部只剩 3 张卡（紫 active）标「Top 3」。"
            },
            {
              "label": "动效",
              "value": "小卡 1 帧错峰自上落下（4707）；梯形 slideUp（4734）；配对卡滑入 → 分数 Counter 计数（4823）；4890 12 张卡穿过梯形，9 张变灰下落出画（powIn 2），3 张落到底部变紫。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_rerank_funnel_f4900.jpg",
              "caption": "ref_rerank_funnel_f4900.jpg · frame 4900"
            }
          ],
          "frameStart": 4677,
          "frameEnd": 4926,
          "shot": "SC26",
          "lang": "zh"
        },
        {
          "kicker": "SC27 · 4927–5017",
          "title": "像推荐系统的精排",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "4935 像推荐系统的精排 / 5001 贵 / 5006 但准"
            },
            {
              "label": "画面",
              "value": "右侧 (940,400) 一个迷你三层漏斗「召回 → 粗排 → 精排」（灰/灰/紫，Trap 三层，各 h 60），左侧 (340,400) 对应「向量召回 → 混合 → 重排」三层；两组间用 ≈ 号（白 46px）。5001 「贵」ORANGE TagBlock（w 120）弹出于精排层右侧，5006 「准」紫 TagBlock 弹出于其下 + 绿勾。"
            },
            {
              "label": "动效",
              "value": "两漏斗 2 帧错峰滑入；≈ 号 glitch；TagBlock 21 帧缩放入场 + 各自柔光；末 2 帧 exitFade。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 4927,
          "frameEnd": 5017,
          "shot": "SC27",
          "lang": "zh"
        },
        {
          "kicker": "SC28 · 5018–5313",
          "title": "组装上下文 Lost in the Middle",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "5026 第四步组装上下文 / 5060 研究发现 / 5077 中间记得最差 / 5154 Lost in the Middle / 5244 放开头和结尾"
            },
            {
              "label": "画面",
              "value": "左 (300,400) 一根竖长的「上下文」条（白边黑底 120×400），内部 8 段横条（证据段），中段几条灰暗；右 (860,400) 一张曲线图卡（440×300，网格 #4A4A4A）：横轴「证据位置」1→20，纵轴「准确率」，一条 U 形紫曲线（Sigmoid 曲线画法，两端高中间低），中点处红点 + 标签；卡下方 Exo 2 紫「Lost in the Middle」+ 灰小字「Liu et al., TACL 2024」。"
            },
            {
              "label": "动效",
              "value": "上下文条 slideUp；5060 曲线卡缩放入场；5077 U 曲线按 x 揭示（clipPath wipe 24 帧）+ 中间段横条变灰；5154 标题 glitch；5244 两条最亮的证据段（紫）沿 kf 从中间移动到条的顶部和底部（18 帧），落位后柔光脉冲。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_lost_in_middle_f5250.jpg",
              "caption": "ref_lost_in_middle_f5250.jpg · frame 5250"
            }
          ],
          "frameStart": 5018,
          "frameEnd": 5313,
          "shot": "SC28",
          "lang": "zh"
        },
        {
          "kicker": "SC29 · 5314–5564",
          "title": "生成：约束提示词",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "5322 最后生成 / 5342 问题和证据交给大模型 / 5407 只根据资料回答 / 5472 答不出来就说不知道 / 5517 标注来源"
            },
            {
              "label": "画面",
              "value": "左 (330,400) 一张「提示词」卡（黑底白边 400×420，标题 Pill「Prompt」Exo 2）内三条规则逐条出现：「① 只根据以下资料回答」「② 资料不足就回答：不知道」「③ 每句结论标注来源 [n]」（Noto 24px）；中间 LLMIcon (640,400) size 130；右 (950,400) 答复卡 380×260：「差旅住宿上限为每天 600 元[1]，一线城市 800 元[2]。」其中 [1][2] 紫色角标。"
            },
            {
              "label": "动效",
              "value": "卡片 slideUp；证据卡（3 张小 ChunkCard）与问句一起沿箭头飞入 LLMIcon（5342）；规则三行依次打字机（5407/5472/5517）；答复卡逐字出现，角标 glitch。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 5314,
          "frameEnd": 5564,
          "shot": "SC29",
          "lang": "zh"
        },
        {
          "kicker": "SC30 · 5565–5696",
          "title": "可追溯 = 价值",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "5573 有引用可追溯 / 5631 RAG 真正的价值"
            },
            {
              "label": "画面",
              "value": "承接答复卡移到中央 (640,330)；5573 角标 [1][2] 各自拉出一条紫色引线到下方两张来源 ChunkCard（标题「员工手册 p.12」「差旅补充规定 2025」），来源卡边框紫柔光；5631 下方 Pill「可追溯 · 可核查」+ 大字「RAG 的价值」Noto 900 48px。"
            },
            {
              "label": "动效",
              "value": "引线 draw-on 14 帧（LineArrow 无箭头或 headL 0）；来源卡 2 帧错峰缩放入场；大字 GlitchIn rgbSplit 4；末 2 帧 exitFade（进章节卡）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 5565,
          "frameEnd": 5696,
          "shot": "SC30",
          "lang": "zh"
        },
        {
          "kicker": "SC31 · 5742–5821",
          "title": "好不好？",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "5750 系统搭起来了 / 5780 怎么知道好不好"
            },
            {
              "label": "画面",
              "value": "一条横向迷你流水线（y 380）：「问题 → 检索 → 重排 → 生成 → 回答」5 个小 Pill + 箭头；5780 上方 (640,220) 大问号「？」Orbitron 110px 紫，流水线各 Pill 依次闪一下。"
            },
            {
              "label": "动效",
              "value": "Pill 2 帧错峰 glitch + 箭头 draw-on；问号缩放入场 + emphasisPulse。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 5742,
          "frameEnd": 5821,
          "shot": "SC31",
          "lang": "zh"
        },
        {
          "kicker": "SC32 · 5822–5946",
          "title": "拆成两半",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "5830 拆成两半 / 5869 检索找对 / 5907 生成说对"
            },
            {
              "label": "画面",
              "value": "流水线从中间裂开：左半「检索」组（问题→检索→重排）套一个紫虚线框标「检索质量」，右半「生成」组（生成→回答）套 ORANGE 虚线框标「生成质量」；两框各一个大绿勾占位。"
            },
            {
              "label": "动效",
              "value": "裂开：两组分别左右移 90px（easeInOutPow 16 帧）+ 中间白色竖线闪一下；虚线框 draw-on（5869/5907）+ 标签 glitch。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 5822,
          "frameEnd": 5946,
          "shot": "SC32",
          "lang": "zh"
        },
        {
          "kicker": "SC33 · 5947–6212",
          "title": "指标与 RAGAS",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "5955 召回率 MRR nDCG / 6045 忠实度 答案相关性 / 6110 RAGAS"
            },
            {
              "label": "画面",
              "value": "左框内竖排三枚 Pill：「Recall@k 召回率」「MRR」「nDCG」（英文 Exo 2 + 中文 Noto 24px）；右框内竖排四枚：「Faithfulness 忠实度」「Answer Relevancy 答案相关性」「Context Precision」「Context Recall」；底部 (640,580) 一枚宽 Pill「RAGAS」紫 + 灰小字「Retrieval-Augmented Generation Assessment」。"
            },
            {
              "label": "动效",
              "value": "左列 2 帧错峰滑入（5955）；右列同（6045）；RAGAS Pill glitch + 两侧短横线向外长出（6110）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_ragas_f6150.jpg",
              "caption": "ref_ragas_f6150.jpg · frame 6150"
            }
          ],
          "frameStart": 5947,
          "frameEnd": 6212,
          "shot": "SC33",
          "lang": "zh"
        },
        {
          "kicker": "SC34 · 6213–6406",
          "title": "忠实度 > 流畅度",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "6221 常见的坑 / 6257 回答很流畅 / 6288 证据是错的 / 6325 忠实度 > 流畅度"
            },
            {
              "label": "画面",
              "value": "左 (380,360) 一张答复卡，文字通顺（3 行）+ 绿色小标「流畅」；卡下方一条引线连到一张来源卡，来源卡内容与答复矛盾（用红色 Cross 划掉引线中段）+ 红标「证据错误」；右 (900,400) 一个天平（沿用 R6 天平：横梁 + 两托盘），左盘「忠实度」紫、右盘「流畅度」灰，梁向忠实度一侧倾斜 12°。"
            },
            {
              "label": "动效",
              "value": "答复卡打字机；引线 draw-on → Cross（6288）；天平缩放入场（6325）→ 梁 easeOutCubic 倾斜 21 帧 + 忠实度盘柔光。末 2 帧 exitFade。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 6213,
          "frameEnd": 6406,
          "shot": "SC34",
          "lang": "zh"
        },
        {
          "kicker": "SC35 · 6407–6450",
          "title": "进化",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "6415 RAG 也在进化"
            },
            {
              "label": "画面",
              "value": "中央大字「RAG」Audiowide 120px 白 → 一次 glitch 后右侧长出「 ↗」和三枚待展开的小 Pill（灰）「GraphRAG」「Agentic RAG」「多模态 RAG」排成扇形。"
            },
            {
              "label": "动效",
              "value": "大字 GlitchIn slices 20；三 Pill 2 帧错峰从大字位置飞出（kf）；末 2 帧不离场（SC36 硬切）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 6407,
          "frameEnd": 6450,
          "shot": "SC35",
          "lang": "zh"
        },
        {
          "kicker": "SC36 · 6451–6709",
          "title": "GraphRAG",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "6459 GraphRAG / 6498 实体关系抽成图谱 / 6576 社区做摘要 / 6610 整体讲了什么 / 6679 全局问题"
            },
            {
              "label": "画面",
              "value": "左 (280,400) 三张 DocIcon；中 (640,400) 一张知识图谱：约 14 个节点（白圆 r9）+ 边（灰线），节点标签少量（「公司 A」「产品 X」「合作」）；6576 节点被分成 3 个社区，各套一个紫色半透明圆（radial-gradient）+ 摘要小卡「社区摘要 ①②③」；右 (1000,400) 一个问句 Pill「这批文档整体讲了什么？」→ 指向三张摘要卡。顶部标签 Exo 2 紫「GraphRAG」+ 灰小字「Microsoft Research, 2024」。"
            },
            {
              "label": "动效",
              "value": "标签 glitch（6459）；文档 → 图谱：节点 rnd 顺序 1 帧错峰亮起、边 draw-on（6498）；社区圆缩放入场 + 摘要卡 glitch（6576）；问句滑入 + 箭头（6610）；6679 「全局问题」Pill 强调脉冲。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_graphrag_f6600.jpg",
              "caption": "ref_graphrag_f6600.jpg · frame 6600"
            }
          ],
          "frameStart": 6451,
          "frameEnd": 6709,
          "shot": "SC36",
          "lang": "zh"
        },
        {
          "kicker": "SC37 · 6710–6990",
          "title": "Agentic RAG",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "6718 Agentic RAG / 6762 自己决定要不要检索 / 6810 检索几轮 / 6826 结果够不够 / 6845 换个问法再搜 / 6881 Deep Research / 6965 本质上就是它"
            },
            {
              "label": "画面",
              "value": "中央一个环形流程（半径 170，中心 (640,400)）：四个节点顺时针「检索」「评估够不够」「改写问题」「回答」，节点间弧形箭头；中心 LLMIcon size 110；右上角 (1040,230) 轮次计数「第 1 轮 → 第 2 轮 → 第 3 轮」Orbitron；6881 顶部标签 Exo 2「Deep Research」紫 Pill。"
            },
            {
              "label": "动效",
              "value": "标签 glitch；节点 2 帧错峰缩放入场（6762）；一颗橙色小球沿环跑 3 圈（每圈 24 帧，6810 起），每到「评估」节点闪红 Cross 两次、第三次变绿勾并停在「回答」（6845→6965）；轮次计数随圈数 +1；Deep Research Pill glitch（6881）。末 2 帧不离场（SC38 硬切）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_agentic_loop_f6900.jpg",
              "caption": "ref_agentic_loop_f6900.jpg · frame 6900"
            }
          ],
          "frameStart": 6710,
          "frameEnd": 6990,
          "shot": "SC37",
          "lang": "zh"
        },
        {
          "kicker": "SC38 · 6991–7167",
          "title": "多模态 RAG",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "6999 多模态 RAG / 7033 图片和 PDF 页面做向量 / 7112 图表 截图也能被检索"
            },
            {
              "label": "画面",
              "value": "左 (300,400) 三张「页面缩略图」卡（120×160，内含一个小柱状图/折线图/截图窗口线框）；中箭头 → Embedding 紫盒（同 SC16 样式）→ 右侧向量数字列；7112 一个问句 Pill「Q3 营收趋势图在哪？」从右上飞到向量列，命中折线图那张卡（紫柔光）。顶部标签 Exo 2「Multimodal RAG」。"
            },
            {
              "label": "动效",
              "value": "卡 2 帧错峰入；盒 glitch；数字错峰；问句飞行 kf 16 帧 + 命中脉冲。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 6991,
          "frameEnd": 7167,
          "shot": "SC38",
          "lang": "zh"
        },
        {
          "kicker": "SC39 · 7168–7301",
          "title": "百万 token 还需要 RAG？",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "7176 有人问 / 7189 百万 token / 7260 还需要 RAG 吗"
            },
            {
              "label": "画面",
              "value": "中央大数字 Counter「1,000,000」Orbitron 96px 白，其下「tokens」Exo 2 灰；左侧 LLMIcon 小；7260 右侧 Pill「RAG」紫 + 巨大问号「？」ORANGE。"
            },
            {
              "label": "动效",
              "value": "数字从 0 滚到 1,000,000（26 帧，tabular）；问号 glitch + emphasisPulse。末 2 帧不离场。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 7168,
          "frameEnd": 7301,
          "shot": "SC39",
          "lang": "zh"
        },
        {
          "kicker": "SC40 · 7302–7503",
          "title": "20 万 token ≈ 500 页",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "7310 Anthropic 经验线 / 7373 20 万 token / 7428 500 页 / 7457 整本塞进上下文"
            },
            {
              "label": "画面",
              "value": "一根横向刻度尺（y 380，x 200→1080）：左端 0，右端「1M」；在 20% 处一条紫色竖线标「200K tokens」，其下「≈ 500 页」Noto 900 40px；尺左段（0–200K）被一叠文档图标填满并整体飞进右上角一个「上下文窗口」框（白边黑底 300×160 at (1000,220)）。左上 Pill「Anthropic, 2024」灰。"
            },
            {
              "label": "动效",
              "value": "尺 draw-on；紫线自下长出 + 标签 glitch（7373）；「500 页」计数 0→500（7428）；文档叠 kf 飞入窗口框 + 绿勾（7457）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_long_context_f7480.jpg",
              "caption": "ref_long_context_f7480.jpg · frame 7480"
            }
          ],
          "frameStart": 7302,
          "frameEnd": 7503,
          "shot": "SC40",
          "lang": "zh"
        },
        {
          "kicker": "SC41 · 7504–7753",
          "title": "搭档不是对手",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "7512 远不止 500 页 / 7593 权限 时效 成本 / 7641 RAG 负责找 / 7675 长上下文负责读 / 7709 搭档不是对手"
            },
            {
              "label": "画面",
              "value": "承接刻度尺：文档叠继续增长溢出窗口框（数百张小方块堆到画外，红 Cross）；7593 三枚 ORANGE 小 Pill「权限」「时效」「成本」依次弹出；7641/7675 清出下半区：左 Pill 大「RAG · 找」紫（含放大镜简笔），右 Pill 大「长上下文 · 读」白边（含书页简笔），中间一个「+」（白 60px）；7709 两 Pill 向中间靠拢 20px，「+」变紫并柔光，下方 Pill「搭档」。"
            },
            {
              "label": "动效",
              "value": "文档堆 rnd 增长 20 帧；三 Pill glitch 错峰 8 帧；两大 Pill 自两侧滑入；靠拢 easeInOutPow 16 帧。末 2 帧 exitFade。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 7504,
          "frameEnd": 7753,
          "shot": "SC41",
          "lang": "zh"
        },
        {
          "kicker": "SC42 · 7754–7869",
          "title": "闭卷→开卷",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "7762 回到最初的比喻 / 7798 闭卷变开卷"
            },
            {
              "label": "画面",
              "value": "复用 SC06 的考卷与书本：左「闭卷」灰考卷（合上），右侧翻开的书（白边）；7798 大字「闭卷 → 开卷」Noto 900 56px，「闭卷」灰、箭头白、「开卷」紫。"
            },
            {
              "label": "动效",
              "value": "考卷/书本 2 帧错峰缩放入场；大字 glitch；箭头 draw-on。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 7754,
          "frameEnd": 7869,
          "shot": "SC42",
          "lang": "zh"
        },
        {
          "kicker": "SC43 · 7870–8052",
          "title": "手册整理得有多好",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "7878 想考高分 / 7927 不是翻得快 / 7986 手册整理得多好"
            },
            {
              "label": "画面",
              "value": "左 (360,400) 一本乱页的书（页面歪斜、线条杂乱，灰）+ 一只快速翻页的动态（页面 3 帧一换）标「翻得快」+ 红 Cross；右 (920,400) 一本整齐的书，侧边 5 个彩色索引标签（紫/橙/白/灰/紫）、章节层级线条清晰，标「整理得好」+ 绿勾 + 紫柔光。"
            },
            {
              "label": "动效",
              "value": "两书 2 帧错峰入；左书翻页 stepKf 循环；Cross / Check draw-on（7927/7986）；右书 emphasisPulse。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [],
          "frameStart": 7870,
          "frameEnd": 8052,
          "shot": "SC43",
          "lang": "zh"
        },
        {
          "kicker": "SC44 · 8053–8148",
          "title": "知识库 = 护城河",
          "paragraphs": [],
          "meta": [
            {
              "label": "节拍",
              "value": "8061 知识库 / 8077 护城河"
            },
            {
              "label": "画面",
              "value": "中央 (640,330) 一座简笔城堡（白边黑底：主塔 + 两侧塔，SVG 线稿）顶上紫 Pill「知识库」；城堡四周一圈护城河（椭圆环，紫色渐变 + 微波纹，2 帧一相位）；下方大字「知识库 = 护城河」Noto 900 60px scaleX .85 白 + 紫描边。"
            },
            {
              "label": "动效",
              "value": "城堡自下滑入（Δ 300）；护城河环 draw-on 20 帧 + 波纹循环；大字 GlitchIn rgbSplit 6；末 2 帧不离场（G0 片尾接管淡出）。"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/分镜表.md",
              "label": "分镜表.md"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_moat_f8100.jpg",
              "caption": "ref_moat_f8100.jpg · frame 8100"
            }
          ],
          "frameStart": 8053,
          "frameEnd": 8148,
          "shot": "SC44",
          "lang": "zh"
        }
      ]
    },
    {
      "id": "shots",
      "title": "Shots",
      "blurb": "Eight build groups plus the overlay file. Each card is the opening of a published shot file, not a rewrite.",
      "source": "examples/rag/shots_src/",
      "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/shots_src",
      "items": [
        {
          "kicker": "G0 · main session, not a build group",
          "title": "Overlays — title, chapter cards, HUD, rail, ending",
          "paragraphs": [
            "片头 · 1–77 · 黑场 → 星点/雾底亮起 → 「RAG 与知识库」大字 glitch（rgbSplit）+ Exo 2 副标 Retrieval-Augmented Generation + 底部小字「让大模型开卷考试」；末 8 帧上摇出画",
            "章节卡 ×3 · 1481–1525 / 3663–3707 / 5697–5741 · 「知识库构建 / 检索与生成 / 评估与进阶」+ 章序号 02/03/04（Orbitron），glitch 入、加速上出",
            "顶部 HUD 胶囊 (533,28,216,51) · 全片 · 第 1 章：「大模型的短板」86–741 → 「开卷考试」752–1010 → 「RAG」1080–1478（副标 Retrieval-Augmented Generation）。第 2 章：「知识库构建」（副标 Indexing）。第 3 章：「检索与生成」（副标 Retrieval & Generation）。第 4 章：「评估」(Evaluation) 5750–6404 → 「进阶」(Advanced RAG) 6415–7165 → 「长上下文 vs RAG」7176–7751 → 「总结」7762–8146",
            "流程轨 rail（第 2、3 章） · 1655–3662 / 3822–5564 · y 118–162（胶囊 top 118 高 44），五个胶囊 w150 等距（中心 x 240/440/640/840/1040），间以小箭头；当前步骤紫底、已过灰底白字、未到灰边。第 2 章：解析→切块→向量化→建索引→更新（切换帧 1663/1899/2694/3042/3491）。第 3 章：理解问题→检索→重排→组装→生成（3830/4065/4685/5026/5322）。**第 2、3 章内容镜头请把主区放在 y 175–620。**",
            "片尾 · 8149–8246 · 内容淡出后星点渐暗、进度条走满，末 40 帧纯黑（BG fog:false stars:'none'）"
          ],
          "meta": [
            {
              "label": "Lines",
              "value": "Lines 1–40 of 168"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/shots_src/G0/Overlay.tsx",
              "label": "G0/Overlay.tsx"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_title_f0058.jpg",
              "caption": "ref_title_f0058.jpg · frame 58"
            },
            {
              "src": "media/frames/ref_chapter_card_f1490.jpg",
              "caption": "ref_chapter_card_f1490.jpg · frame 1490"
            }
          ],
          "code": "import React from 'react';\nimport {useCurrentFrame} from 'remotion';\nimport {GlitchIn, kf, emphasisPulse, easeInOutPow, SENTENCES, TOTAL_FRAMES, FONT_HEAVY, FONT_WIDE, FONT_ORB} from '../../common';\nimport {SUBS} from '../../common/subs';\nimport {CText, TechText, Pill, TopCapsule, ArrowH, PURPLE, PURPLE_TECH, GREY, GREY_MID, WHITE, GLOW_PURPLE_S, fadeIn, slideUp, clampFrames} from './util';\n\n// ---------- 时间轴查询 ----------\nexport const S = (id: string) => {\n  const s = SENTENCES.find((x) => x.id === id);\n  if (!s) throw new Error(`no sentence ${id}`);\n  return s;\n};\n/** 某句里某个字幕块的起始帧（按文本匹配） */\nexport const subStart = (id: string, text: string) => {\n  const s = S(id);\n  const e = SUBS.find((x) => x.from >= s.from && x.from <= s.to && x.text === text);\n  return e ? e.from : s.from;\n};\n\n/** 12 帧加速上出：n<0 → 原位；位移 (n/11)^2·440px，透明度 1−(n/11)^1.6 → 末帧 0（QC v1 C1 #1/#2） */\nconst exitOut = (n: number) => {\n  if (n < 0) return {dy: 0, op: 1};\n  const t = Math.min(1, n / 11);\n  return {dy: t * t * 440, op: 1 - Math.pow(t, 1.6)};\n};\n\n// ---------- 片头 ----------\nexport const TITLE_RANGE: [number, number] = [1, S('S01').from - 9];\nexport const Title: React.FC = () => {\n  const N = useCurrentFrame() + TITLE_RANGE[0];\n  const [a, b] = TITLE_RANGE;\n  const exitN = N - (b - 11); // 末 12 帧上摇出画（QC v1：原 8 帧只走了 59px/63% 亮度就被硬切）\n  const dy = -exitOut(exitN).dy;\n  const op = exitOut(exitN).op;\n  const glow = 0.5 + 0.5 * Math.sin((N / 30) * Math.PI); // 缓慢呼吸\n  return (\n    <div style={{position: 'absolute', inset: 0, transform: `translateY(${dy}px)`, opacity: op}}>\n      <GlitchIn N={N} f0={a + 11} rgbSplit={6} slices={14} seed={3}>\n        <div style={{position: 'absolute', left: 0, top: 268, width: 1280, display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 26}}>\n          <span style={{fontFamily: FONT_WIDE, fontSize: 118, color: WHITE, lineHeight: 1, letterSpacing: 6, textShadow: `0 0 ${18 + 14 * glow}px rgba(102,45,248,${0.55 + 0.3 * glow}), 6px 6px 0 ${PURPLE}`}}>RAG</span>",
          "lang": "zh"
        },
        {
          "kicker": "G1 · SC01–SC05",
          "title": "第 1 章上半：S01–S05",
          "paragraphs": [],
          "meta": [
            {
              "label": "Lines",
              "value": "Full file, 10 lines"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/shots_src/G1/SC01.tsx",
              "label": "G1/SC01.tsx"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_shortcomings_f0600.jpg",
              "caption": "ref_shortcomings_f0600.jpg · frame 600"
            }
          ],
          "code": "import React from 'react';\nimport {useCurrentFrame} from 'remotion';\nimport {Scene1Frame} from './layout';\n\n/** SC01 大模型与三个短板（78–167）：86 LLMIcon 缩放入场 + 柔光脉冲 + 冒星；116 三个虚线框自右滑入（2 帧错峰）+ 编号徽章 8 帧淡入（本镜头无 glitch，协议 §8） */\nconst F0 = 78;\nexport const SC01: React.FC = () => {\n  const N = useCurrentFrame() + F0;\n  return <Scene1Frame N={N} />;\n};",
          "lang": "zh"
        },
        {
          "kicker": "G2 · SC06–SC10",
          "title": "第 1 章下半：S06–S10",
          "paragraphs": [],
          "meta": [
            {
              "label": "Lines",
              "value": "Lines 1–40 of 104"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/shots_src/G2/SC08.tsx",
              "label": "G2/SC08.tsx"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_rag_reveal_f1090.jpg",
              "caption": "ref_rag_reveal_f1090.jpg · frame 1090"
            },
            {
              "src": "media/frames/ref_paper_f1300.jpg",
              "caption": "ref_paper_f1300.jpg · frame 1300"
            }
          ],
          "code": "import React from 'react';\nimport {useCurrentFrame} from 'remotion';\nimport {GlitchIn, emphasisPulse, clamp01, easeInOutPow, FONT_TECH, FONT_WIDE} from '../../common';\nimport {CText, Box, WHITE, PURPLE, PURPLE_TECH, PURPLE_LIGHT, slideUp, fadeIn, stagger, SoftIn} from '../../ui';\nimport {LightBar} from './parts';\n\n/**\n * SC08 主角登场 RAG · N 1013–1129（S08 1021–1127：1021「这套方法就是今天的主角」/ 1080「RAG」/ 1096「检索增强生成」）\n * 版式（清场）：中央「RAG」Audiowide 150px 白 + 紫硬投影 (+6,+6)，中心 (640,330)；下方「检索增强生成」Noto 900 48px scaleX .8 (640,452)；\n *       再下三小胶囊 Retrieval / Augmented / Generation（Exo 2 紫斜体，首字母白）y 520–566，中心 x 420 / 640 / 860。\n * 节拍：1017/1035/1053 三轮横向紫光条（每轮 3 条、2 帧错峰、16 帧、α .6/.55/.55 + 白芯）连续扫过（\"舞台追光\"）；1031 起中央留一条呼吸紫光线；\n *       1050 起「RAG」白描边轮廓以 8–12% 不透明度隐现（光条扫过其上）；\n *       1080「RAG」GlitchIn(rgbSplit 8, slices 20)（本镜头唯一 glitch，白名单 §8 重口味四处之一）+ 光线白闪 3 帧后消失；1092 起 emphasisPulse 1.11；1096 中文副标自下滑入（Δ80/22，不穿过胶囊行）；1104/1106/1108 三胶囊 SoftIn；\n *       1124–1129 整组 6 帧淡出（SC09 硬切）。\n * QC v1 修复：原 1015/1048 两轮 α .3/.2 光条 + 极淡呼吸线 → 1021–1079 观感近黑屏 2 秒；现三轮连续 + 提亮 + 白芯 + RAG 轮廓预示。\n */\nconst F0 = 1013;\n/** 三轮扫光起始帧（轮距 18 帧，单轮含错峰共 20 帧 → 首尾相接） */\nconst T_SWEEPS = [1017, 1035, 1053];\nconst SWEEP_ALPHA = [0.6, 0.55, 0.55];\nconst T_LINE = 1031, T_GHOST = 1050, T_RAG = 1080, T_PULSE = 1092, T_SUB = 1096, T_PILLS = 1104, T_EXIT = 1124;\n\n/** 光条：[y, h, w, 帧偏移] */\nconst BARS: Array<[number, number, number, number]> = [[292, 6, 420, 0], [334, 10, 560, 2], [378, 6, 380, 4]];\nconst SWEEP_LEN = 16;\nconst PILLS: Array<[string, string, number, number]> = [['R', 'etrieval', 420, 200], ['A', 'ugmented', 640, 214], ['G', 'eneration', 860, 214]];\n\nconst sweepX = (n: number, w: number) => {\n  // 自左 −w 扫到 1280+w，easeInOut\n  const t = clamp01(n / SWEEP_LEN);\n  return -w + (1280 + 2 * w) * easeInOutPow(1.6)(t);\n};\n\nexport const SC08: React.FC = () => {\n  const N = useCurrentFrame() + F0;\n  const ex = N - T_EXIT;\n  const exOp = ex <= 0 ? 1 : Math.max(0, 1 - ex / 6);\n\n  // 舞台光线：1031 起 14 帧展宽到 720，呼吸；1080 起 3 帧白闪后消失\n  const ln = N - T_LINE;",
          "lang": "zh"
        },
        {
          "kicker": "G3 · SC11–SC15",
          "title": "第 2 章上半：S11–S15",
          "paragraphs": [],
          "meta": [
            {
              "label": "Lines",
              "value": "Lines 1–40 of 127"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/shots_src/G3/SC15.tsx",
              "label": "G3/SC15.tsx"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_parse_f1760.jpg",
              "caption": "ref_parse_f1760.jpg · frame 1760"
            },
            {
              "src": "media/frames/ref_chunk_size_f2200.jpg",
              "caption": "ref_chunk_size_f2200.jpg · frame 2200"
            }
          ],
          "code": "import React from 'react';\nimport {useCurrentFrame} from 'remotion';\nimport {slideIn, emphasisPulse, clamp01, FONT_TECH} from '../../common';\nimport {Box, Pill, CText, TechText, ChunkCard, Svg, LineArrow, PURPLE, PURPLE_LIGHT, ORANGE, GREY, GREY_LIGHT, WHITE, abs, scaleIn, slideUp, fadeIn, exitAccel, SoftIn} from '../../ui';\nimport {LText, Bar} from './g3ui';\n\n/**\n * SC15 语义切块 + 补上下文 −49%（2309–2685，S15）\n * 节拍：2317 更讲究的做法（左：带层级的文档树卡自左滑入）/ 2346 按语义或标题层级来切（条目逐级 wipe；等距灰线 → 沿标题边界的紫切割线 draw-on）\n *      / 2400 补一句来自哪（中：ChunkCard 上方长出紫色前缀条「员工手册 › 第 3 章 差旅报销」打字机；文档树 3.1 段高亮 + 虚线箭头指向卡片）\n *      / 2498 Anthropic 实验（右：「Anthropic」Pill + Contextual Retrieval）/ 2572 配合关键词检索（「BM25」小 Pill 贴到前缀条旁）\n *      / 2606 降低 49%（Counter 0→49 计数 20 帧 + 橙柔光脉冲；灰小字 Top-20 检索失败率）\n * 2674–2685 末 12 帧离场 opacity = 1 − (n/12)^1.5（末帧归零）+ 轻微下摇 exitAccel(n,0.2)（QC v1 组界裁定；G4 SC16 卡片 2686 起自左入场）。条目 wipe 自 2322 起（原 2346，避免空框停留 26 帧）。数字依据：research/RAG调研.md §2.3 Contextual Retrieval（Anthropic 2024，+BM25 → top-20 失败率 −49%）。\n */\nconst F0 = 2309;\nconst TREE = {x: 100, y: 200, w: 400, h: 400};\nconst PREFIX = '员工手册 › 第 3 章 差旅报销';\nconst CUTS = [94, 176, 264, 348]; // 沿标题边界（局部 y）\nconst EVEN = [80, 160, 240, 320]; // 等距（对照）\n\ntype Entry = {kind: 'text' | 'bar'; x: number; y: number; text?: string; size?: number; weight?: number; color?: string; w?: number; h?: number};\nconst ENTRIES: Entry[] = [\n  {kind: 'text', x: 24, y: 16, text: '员工手册', size: 24, weight: 800},\n  {kind: 'text', x: 44, y: 60, text: '第 3 章 差旅报销', size: 22, weight: 700},\n  {kind: 'text', x: 64, y: 104, text: '3.1 住宿上限', size: 22, weight: 600, color: GREY_LIGHT},\n  {kind: 'bar', x: 64, y: 138, w: 260},\n  {kind: 'bar', x: 64, y: 156, w: 220},\n  {kind: 'text', x: 64, y: 186, text: '3.2 交通', size: 22, weight: 600, color: GREY_LIGHT},\n  {kind: 'bar', x: 64, y: 220, w: 250},\n  {kind: 'bar', x: 64, y: 238, w: 180},\n  {kind: 'bar', x: 44, y: 278, w: 160, h: 5, color: WHITE},\n  {kind: 'bar', x: 64, y: 306, w: 240},\n  {kind: 'bar', x: 64, y: 324, w: 200},\n  {kind: 'bar', x: 44, y: 362, w: 140, h: 5, color: WHITE},\n];\n\nexport const SC15: React.FC = () => {\n  const N = useCurrentFrame() + F0;\n  // 离场（2674 起 12 帧，末帧 α=0）\n  const ex = N - 2673;",
          "lang": "zh"
        },
        {
          "kicker": "G4 · SC16–SC20",
          "title": "第 2 章下半：S16–S20",
          "paragraphs": [],
          "meta": [
            {
              "label": "Lines",
              "value": "Lines 1–40 of 191"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/shots_src/G4/SC18.tsx",
              "label": "G4/SC18.tsx"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_vector_space_f2990.jpg",
              "caption": "ref_vector_space_f2990.jpg · frame 2990"
            },
            {
              "src": "media/frames/ref_hnsw_f3260.jpg",
              "caption": "ref_hnsw_f3260.jpg · frame 3260"
            }
          ],
          "code": "import React from 'react';\nimport {useCurrentFrame} from 'remotion';\nimport {GlitchIn, rnd, kf, emphasisPulse, easeOutCubic, clamp01, FONT_ORB} from '../../common';\nimport {CText, TechText, Pill, Svg, LineArrow, Cross, PURPLE, PURPLE_LIGHT, ORANGE, WHITE, GREY, GREY_LINE, GREY_LIGHT, TEXT_GLOW, fadeIn, slideUp, scaleIn, exitAccel, abs, SoftIn} from '../../ui';\n\n/**\n * SC18 第四步 建索引 HNSW（3034–3298）\n * 节拍：3042 第四步建索引（左：12 点竖列 + 「线性扫描」Pill 3044 自左滑入）→ 3073 上亿个向量不能一个个比（Orbitron「1 0000 0000 ×」，\n *      扫描光标下扫两遍 → 红 Cross）→ 3130 HNSW 近似最近邻（三层平行四边形平面 2 帧错峰自下 Δ80 滑入（QC v1：原 Δ300 穿字幕带），点阵亮起，图边淡入）→\n *      3219 线性扫描→几十次跳转（橙色查询路径 22 跳 + 2 次下降逐段 draw-on，3219–3269；目标点紫脉冲，「跳转 ×N」计数终值 22）→ 3291 起 8 帧离场。\n * 依据 research §2.6：HNSW 多层可导航小世界图，上层稀疏快速定位、下层稠密精确逼近，查询复杂度对数级。\n */\nexport const F0 = 3034;\nconst B_COL = 3042, B_BIG = 3073, B_SCAN = 3076, B_CROSS = 3117, B_DIM = 3128, B_HNSW = 3130, B_PATH = 3219, EXIT = 3291;\n\n// ---- 左：线性扫描 ----\nconst LX = 360;\nconst DOTS = Array.from({length: 12}, (_, i) => 225 + i * 30);\nconst SCAN: Array<[number, number]> = [[B_SCAN, DOTS[0]], [B_SCAN + 18, DOTS[11]], [B_SCAN + 21, DOTS[0]], [B_SCAN + 39, DOTS[11]]];\n\n// ---- 右：HNSW 三层 ----\nconst HX = 860, HW = 150, HH = 30, SKEW = 28;\nconst LAYER_Y = [275, 395, 515];\nconst LAYER_T0 = [B_HNSW + 4, B_HNSW + 2, B_HNSW]; // 顶/中/底：底层先入\ntype UV = [number, number];\n/** 查询路径节点：顶层 4 跳 / 中层 7 跳 / 底层 11 跳（自左向右漂移 + 底层绕目标螺旋收敛），共 22 跳 + 2 次层间下降 */\nconst PATH_NODES: UV[][] = [\n  [[0.06, 0.30], [0.20, 0.72], [0.34, 0.28], [0.46, 0.66], [0.56, 0.36]],\n  [[0.56, 0.36], [0.62, 0.78], [0.70, 0.22], [0.78, 0.60], [0.84, 0.26], [0.90, 0.70], [0.78, 0.86], [0.74, 0.48]],\n  [[0.74, 0.48], [0.64, 0.18], [0.60, 0.62], [0.66, 0.86], [0.80, 0.80], [0.92, 0.88], [0.96, 0.56], [0.96, 0.22], [0.82, 0.14], [0.68, 0.30], [0.76, 0.66], [0.86, 0.48]],\n];\nconst COUNTS = [8, 14, 26];\nconst toXY = (L: number, [u, v]: UV) => ({x: HX - HW - SKEW + 2 * HW * u + 2 * SKEW * v, y: LAYER_Y[L] + HH - 2 * HH * v});\n/** 每层点：路径节点在前，其余 rnd 拒绝采样填充；order 为亮起顺序 */\nconst LAYER_PTS = COUNTS.map((c, L) => {\n  const uv: UV[] = [...PATH_NODES[L]];\n  for (let i = uv.length, k = 0; i < c && k < 400; k++) {\n    const cand: UV = [0.06 + 0.88 * rnd(18, L, i, k, 1), 0.12 + 0.76 * rnd(18, L, i, k, 2)];\n    const p = toXY(L, cand);\n    if (uv.some((q) => Math.hypot(toXY(L, q).x - p.x, toXY(L, q).y - p.y) < 20)) continue;",
          "lang": "zh"
        },
        {
          "kicker": "G5 · SC21–SC25",
          "title": "第 3 章上半：S21–S25",
          "paragraphs": [],
          "meta": [
            {
              "label": "Lines",
              "value": "Lines 1–40 of 140"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/shots_src/G5/SC25.tsx",
              "label": "G5/SC25.tsx"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_hybrid_rrf_f4640.jpg",
              "caption": "ref_hybrid_rrf_f4640.jpg · frame 4640"
            }
          ],
          "code": "import React from 'react';\nimport {useCurrentFrame} from 'remotion';\nimport {GlitchIn, clamp01, FONT_HEAVY, FONT_ORB, FONT_SERIF, powOutRemain} from '../../common';\nimport {Box, Pill, TechText, CText, PURPLE, PURPLE_LIGHT, ORANGE, GREY, WHITE, GLOW_PURPLE_S, slideUp, fadeIn, fadeOut, exitAccel, stagger, SoftIn} from '../../ui';\nimport {bez2, inOut, mixHex, mixK} from './g5util';\n\n/**\n * SC25 混合检索 + RRF（4415–4676，S25）。节拍：4423 混合检索 / 4492 向量找相似 / 4526 BM25 找精确 / 4594 倒数排名融合。\n * 左列「向量检索」4 张卡 / 右列「BM25」4 张卡 → 4594 沿弧线汇入中央 5 张融合结果（紫边）；下方 Times 公式 score(d)=Σ 1/(k+rank_r(d))，k=60（Cormack 等 SIGIR 2009）。\n * QC v1：4664 起 12 帧下摇（0.6·n²）+ 线性淡出，4676 全透明，交给 SC26 的 4685 入场（原「末 2 帧不离场」改掉，避免满画面硬切到空场）。\n */\nexport const F0 = 4415;\nconst T_TITLE = 4423, T_L = 4492, T_R = 4526, T_MERGE = 4594, T_EXIT = 4664;\nconst CARD_W = 260, CARD_H = 42;\nconst LX = 300, RX = 980, MX = 640;\nconst COL_Y = [280, 336, 392, 448];\nconst MID_Y = [296, 342, 388, 434, 480];\ntype Src = {side: 'L' | 'R'; rank: number; text: string; slot: number; hot?: boolean};\n// slot = 融合后名次（0 起）；slot 5 = 淘汰（飞向中央后淡出）。RRF(k=60)：§3 两路命中 1/61+1/63 居首。\nconst SRC: Src[] = [\n  {side: 'L', rank: 1, text: '差旅报销标准 §3', slot: 0},\n  {side: 'L', rank: 2, text: '住宿上限说明', slot: 2},\n  {side: 'L', rank: 3, text: '交通补贴规定', slot: 4},\n  {side: 'L', rank: 4, text: '报销流程 FAQ', slot: 5},\n  {side: 'R', rank: 1, text: '差旅补充规定 2025', slot: 1},\n  {side: 'R', rank: 2, text: 'X-2000B 保修 2 年', slot: 3, hot: true},\n  {side: 'R', rank: 3, text: '差旅报销标准 §3', slot: 0},\n  {side: 'R', rank: 4, text: '出差审批表', slot: 5},\n];\n\nconst Card: React.FC<{cx: number; cy: number; rank: number; text: string; accent: string; stroke?: string; glow?: string; hot?: boolean; rankColor?: string}> = ({cx, cy, rank, text, accent, stroke = WHITE, glow, hot, rankColor}) => {\n  const x = cx - CARD_W / 2, y = cy - CARD_H / 2;\n  return (\n    <>\n      <Box x={x} y={y} w={CARD_W} h={CARD_H} r={8} sw={hot ? 2.5 : 2} stroke={hot ? ORANGE : stroke} glow={hot ? '0 0 14px 3px rgba(240,95,65,.5)' : glow} />\n      <CText cx={x + 24} cy={cy} size={22} weight={700} family={FONT_ORB} color={rankColor ?? accent} dy={0}>{rank}</CText>\n      <div style={{position: 'absolute', left: x + 44, top: y, height: CARD_H, display: 'flex', alignItems: 'center', fontFamily: FONT_HEAVY, fontWeight: 600, fontSize: 21, color: WHITE, whiteSpace: 'nowrap', lineHeight: 1, transform: 'translateY(-1px)'}}>\n        {hot ? <span><span style={{color: ORANGE, fontFamily: FONT_ORB, fontWeight: 700, fontSize: 19}}>X-2000B</span> 保修 2 年</span> : text}\n      </div>\n    </>",
          "lang": "zh"
        },
        {
          "kicker": "G6 · SC26–SC30",
          "title": "第 3 章下半：S26–S30",
          "paragraphs": [],
          "meta": [
            {
              "label": "Lines",
              "value": "Lines 1–40 of 139"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/shots_src/G6/SC28.tsx",
              "label": "G6/SC28.tsx"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_rerank_funnel_f4900.jpg",
              "caption": "ref_rerank_funnel_f4900.jpg · frame 4900"
            },
            {
              "src": "media/frames/ref_lost_in_middle_f5250.jpg",
              "caption": "ref_lost_in_middle_f5250.jpg · frame 5250"
            }
          ],
          "code": "import React from 'react';\nimport {useCurrentFrame} from 'remotion';\nimport {GlitchIn, easeInOutPow, emphasisPulse, clamp01, rnd, FONT_HEAVY} from '../../common';\nimport {CText, TechText, Box, Pill, Svg, fadeIn, slideUp, scaleIn, PURPLE, PURPLE_DEEP, PURPLE_LIGHT, CORAL, GREY, GREY_LIGHT, GREY_LINE, WHITE, abs, SoftIn} from '../../ui';\nimport {mixHex} from './ui';\n\n/**\n * SC28 组装上下文 · Lost in the Middle（5018–5313）\n * 节拍：5026 第四步组装上下文 / 5060 研究发现 / 5077 中间记得最差 / 5154 Lost in the Middle / 5244 放开头和结尾\n * 画面：左 竖长「上下文」条（8 段证据，2 段紫色关键证据在中间）；右 曲线卡（证据位置 1→20 × 准确率，U 形紫曲线，中点红点「中间最差」）；\n *      5077 曲线按 x 揭示 + 中段变暗；5154 标题「Lost in the Middle」+「Liu et al., TACL 2024」；5244 两段紫色证据移到条的两端并脉冲。\n */\nconst F0 = 5018;\nconst B_CTX = 5026, B_CARD = 5060, B_CURVE = 5077, B_TITLE = 5154, B_MOVE = 5244;\nconst T_CTX_IN = B_CTX - 4;\nconst easeMove = easeInOutPow(2.5);\n\n// 上下文条\nconst BAR = {x: 220, y: 200, w: 160, h: 400};\nconst SEG_X = 236, SEG_W = 128, SEG_H = 36, SEG_GAP = 8, SEG_Y0 = 230;\nconst slotY = (p: number) => SEG_Y0 + p * (SEG_H + SEG_GAP);\nconst PURPLE_IDS = [3, 4];\n\n// 曲线卡\nconst CARD = {x: 640, y: 235, w: 440, h: 300};\nconst PX0 = 700, PX1 = 1050, PY0 = 265, PY1 = 470;\nconst xFor = (p: number) => PX0 + ((p - 1) / 19) * (PX1 - PX0);\nconst yFor = (p: number) => {\n  const norm = Math.pow((p - 10.5) / 9.5, 2);\n  const v = 0.08 + 0.92 * norm * (p < 10.5 ? 1 : 0.88); // 首因略高于近因（Liu et al. U 形）\n  return PY1 - 15 - v * (PY1 - PY0 - 35);\n};\nconst CURVE_PTS: Array<[number, number]> = Array.from({length: 77}, (_, i) => {\n  const p = 1 + i * 0.25;\n  return [xFor(p), yFor(p)];\n});\nconst X_TICKS = [1, 5, 10, 15, 20];\n\nexport const SC28: React.FC = () => {\n  const N = useCurrentFrame() + F0;",
          "lang": "zh"
        },
        {
          "kicker": "G7 · SC31–SC37",
          "title": "第 4 章上半：S31–S37",
          "paragraphs": [],
          "meta": [
            {
              "label": "Lines",
              "value": "Lines 1–40 of 173"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/shots_src/G7/SC37.tsx",
              "label": "G7/SC37.tsx"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_ragas_f6150.jpg",
              "caption": "ref_ragas_f6150.jpg · frame 6150"
            },
            {
              "src": "media/frames/ref_graphrag_f6600.jpg",
              "caption": "ref_graphrag_f6600.jpg · frame 6600"
            },
            {
              "src": "media/frames/ref_agentic_loop_f6900.jpg",
              "caption": "ref_agentic_loop_f6900.jpg · frame 6900"
            }
          ],
          "code": "import React from 'react';\nimport {AbsoluteFill, useCurrentFrame} from 'remotion';\nimport {GlitchIn, slideIn, kf, clamp01, emphasisPulse, FONT_HEAVY, FONT_TECH, FONT_ORB} from '../../common';\nimport {Svg, Cross, Check, LineArrow, Pill, CText, TechText, LLMIcon, PURPLE, PURPLE_LIGHT, ORANGE, CORAL, GREEN, GREY, WHITE, fadeIn, scaleIn, abs, SoftIn} from '../../ui';\nimport {EASE, mixHex, exitOut} from './g7ui';\n\n/**\n * SC37 Agentic RAG（6710–6990）\n * 6716 顶部「Agentic RAG」glitch；6720 中心 LLMIcon 缩放入场；6760 环上三节点（检索 / 评估够不够 / 改写问题）2 帧错峰缩放入场，\n * 6766「回答」出口节点；6772 起弧形箭头 draw-on，6784 评估→回答的灰虚线出口；6808 右侧轮次计数「第 N 轮」SoftIn 淡入（数字换位 6 帧淡入）；\n * 6810 起橙球沿环跑 3 圈（每圈 38 帧含停顿）：到「评估」停 8 帧闪红叉两次（6820/6858），第三次（6896）变绿勾，\n * 6904 沿出口滑到「回答」并停住，回答 Pill 变紫 + 脉冲；6879「Deep Research」紫 Pill SoftIn 淡入；6963「=」SoftIn + Deep Research 脉冲。闪烁整改：本镜头 glitch 只给「Agentic RAG」。\n * 设计偏离说明：分镜写「四节点同环」，但「回答」在环上会让球每圈都经过它，语义不通；改为三节点循环 + 「回答」作为评估通过后的出口分支。\n * QC v1：末 8 帧 exitOut（6982–6990 线性收 0 + 轻微下摇），避免组界 6991 从满画面切到空帧。\n */\nconst F0 = 6710, F1 = 6990;\nconst T_EXIT = F1 - 8;\nconst T_LABEL = 6716, T_ICON = 6720, T_NODES = 6760, T_ANS = 6766, T_ARCS = 6772, T_EXITARR = 6784, T_COUNTER = 6808, T_BALL = 6810, T_DR = 6879, T_EQ = 6963;\nconst C = {x: 600, y: 400}, R = 170;\nconst D2R = Math.PI / 180;\nconst P = (deg: number) => ({x: C.x + R * Math.cos(deg * D2R), y: C.y + R * Math.sin(deg * D2R)});\ntype RingNode = {name: string; deg: number; w: number; clear: number};\nconst RING: RingNode[] = [\n  {name: '检索', deg: -90, w: 130, clear: 24},\n  {name: '评估够不够', deg: 30, w: 170, clear: 31},\n  {name: '改写问题', deg: 150, w: 150, clear: 28},\n];\nconst ANS = {x: 980, y: 485, w: 130};\n/** 球角度时间表（度，单调递增；在各节点前沿停顿） */\nconst BALL_KF: Array<[number, number]> = [\n  [T_BALL, -117], [T_BALL + 2, -117], [6820, 3], [6828, 3], [6836, 123], [6840, 123], [6848, 243], [6850, 243],\n  [6858, 363], [6866, 363], [6874, 483], [6878, 483], [6886, 603], [6888, 603], [6896, 723], [6904, 723],\n];\nconst T_OUT = 6904, T_ARRIVE = 6918;\nconst HOLDS_EVAL = [6820, 6858];\nconst T_CHECK = 6896;\nconst ROUND_STARTS = [T_COUNTER, 6848, 6886];\nconst CROSS_POS = {cx: 850, cy: 425};\n\n/** 环上弧形箭头（a→b 顺时针），p 为 draw-on 进度 */",
          "lang": "zh"
        },
        {
          "kicker": "G8 · SC38–SC44",
          "title": "第 4 章下半：S38–S44",
          "paragraphs": [],
          "meta": [
            {
              "label": "Lines",
              "value": "Lines 1–40 of 75"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/shots_src/G8/SC44.tsx",
              "label": "G8/SC44.tsx"
            }
          ],
          "stills": [
            {
              "src": "media/frames/ref_long_context_f7480.jpg",
              "caption": "ref_long_context_f7480.jpg · frame 7480"
            },
            {
              "src": "media/frames/ref_moat_f8100.jpg",
              "caption": "ref_moat_f8100.jpg · frame 8100"
            }
          ],
          "code": "import React from 'react';\nimport {useCurrentFrame} from 'remotion';\nimport {GlitchIn, clamp01} from '../../common';\nimport {CText, Pill, PURPLE, PURPLE_LIGHT, WHITE, fadeIn, slideUp, SoftIn} from '../../ui';\nimport {FR, Castle, ellipsePerim} from './shared';\n\n/**\n * SC44 知识库 = 护城河（8053–8148）。中央城堡自下滑入（Δ170，8061）；顶上紫 Pill「知识库」SoftIn 淡入（8069；闪烁整改：本镜头 glitch 只给大字）；护城河椭圆环 draw-on 20 帧（8071）+ 波纹 2 帧一相位；\n * 8077 大字「知识库 = 护城河」Noto 900 60px scaleX .85 白 + 紫描边 GlitchIn rgbSplit 6。末 2 帧不离场（G0 片尾接管淡出）。\n */\nconst F0 = FR.SC44.from;\nconst CX = 640, BASE_Y = 420;\nconst MOAT = {cx: 640, cy: 428, rxo: 335, ryo: 78, rxi: 245, ryi: 44};\nconst PERIM_O = ellipsePerim(MOAT.rxo, MOAT.ryo), PERIM_I = ellipsePerim(MOAT.rxi, MOAT.ryi);\n\nexport const SC44: React.FC = () => {\n  const N = useCurrentFrame() + F0;\n  const nC = N - 8061;\n  const castleDy = slideUp(nC, 170); // QC v1：Δ300→170，起点城堡底 y≈590 不穿字幕带\n  const mp = clamp01((N - 8071) / 20);\n  const mpe = 1 - Math.pow(1 - mp, 2);\n  const phase = Math.floor(Math.max(0, N - 8071) / 2) * 5; // 波纹相位：2 帧一步\n  const fillOp = 0.85 * clamp01((N - 8079) / 12);\n  return (\n    <>\n      {nC >= 0 ? (\n        <svg width={1280} height={720} viewBox=\"0 0 1280 720\" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.45))', opacity: fadeIn(nC, 10), transform: `translateY(${castleDy.toFixed(2)}px)`}}>\n          <defs>\n            <linearGradient id=\"g8-moat\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n              <stop offset=\"0%\" stopColor=\"#3A1E8C\" />\n              <stop offset=\"55%\" stopColor={PURPLE} />\n              <stop offset=\"100%\" stopColor=\"#8F62F5\" />\n            </linearGradient>\n            <clipPath id=\"g8-moat-back\">\n              <rect x={0} y={0} width={1280} height={MOAT.cy} />\n            </clipPath>\n            <clipPath id=\"g8-moat-front\">\n              <rect x={0} y={MOAT.cy} width={1280} height={720 - MOAT.cy} />\n            </clipPath>\n          </defs>",
          "lang": "zh"
        }
      ]
    },
    {
      "id": "qc",
      "title": "QC",
      "blurb": "Measured notes from qc/qc_v3_final.md and the delivery note. v1 found the problems. v3 checked the flicker whitelist. v4 is what shipped.",
      "source": "examples/rag/qc/qc_v3_final.md",
      "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
      "items": [
        {
          "kicker": "QC · v1 tally",
          "title": "Four chapter reports, before the fixes",
          "paragraphs": [
            "v1 由 4 个 QC agent 按 `AGENT_RAG_QC_RULES.md` 逐章检查（`qc/qc_v1_C1–C4.md`）：高 1 / 中 23 / 低 42；根因集中在\"硬切落空帧\"、\"入场穿字幕带\"、\"离场未归零\"、\"覆盖层出场太短\"。全部由 4 个修复 agent + 主会话修复（各组 BUILD_NOTES 末尾「QC v1 修复」），v2 复验见 `qc/qc_v2_recheck_C12.md`、`qc/qc_v2_recheck_C34.md`（66 条中 62 已修、3 部分、1 有意保留；新增 6 条已在 v3 修掉）。"
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/交付说明.md",
              "label": "交付说明.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · pass rule",
          "title": "What counted as a flicker",
          "paragraphs": [
            "判据：白名单内且每镜头 ≤1 处 → OK；白名单外仍闪 → 中；白名单内重点词未闪 → 低。HUD 换词应为淡入。"
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · v2 leftover 1",
          "title": "SC27 延到 5021、5016–5021 淡出归零",
          "paragraphs": [
            "主区超出星底亮度（% of 5015）：5016 100 → 5017 91 → 5018 75 → 5019 55 → 5020 31 → **5021 3（归零）**；5021–5022 仅星点 2 帧呼吸，SC28 竖条 5023 起淡入（v2：5017 满画面 → 5018 空 硬切 + 4 空帧）"
          ],
          "meta": [
            {
              "label": "帧",
              "value": "5013–5026"
            },
            {
              "label": "判定",
              "value": "已修"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · v2 leftover 2",
          "title": "SC26 灰梯形起点 ≤620",
          "paragraphs": [
            "梯形 4688 首见（极淡）y≈407–500；4689 灰像素行区 (409,500) → 底缘 **500 ≤ 620**；随后上移至 (400,427) 附近落定。字幕带 (x300–1000, y637–690) 灰像素 4685–4693 恒 2923–2941（无增量；v2 4688 为 +2160）"
          ],
          "meta": [
            {
              "label": "帧",
              "value": "4684–4701"
            },
            {
              "label": "判定",
              "value": "已修"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · v2 leftover 3",
          "title": "SC32 角标上移 14",
          "paragraphs": [
            "5882 角标白框 y **298–337**（v2 312–351），「问题」Pill 上边 352 → 338–351 共 **14 px 全暗间隙**；5940 同值。角标 5869 起 8 帧淡入（v2 #19 角标 glitch 随之消失）"
          ],
          "meta": [
            {
              "label": "帧",
              "value": "5869–5946"
            },
            {
              "label": "判定",
              "value": "已修"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · v2 leftover 4",
          "title": "SC15 离场下摇限幅 10px",
          "paragraphs": [
            "旁注「沿标题边界切，而不是等距」质心 y：2672 608.5 → 2677 610.6 → 2678 613.3 → 2679 615.2 → **2680 618.0（峰值 +9.5 px）** → 2682 617.2 → 2683 淡尽；字幕带 (x40–470) 亮像素 2681–2683 仅 +5～+9（v2 +350–550）"
          ],
          "meta": [
            {
              "label": "帧",
              "value": "2670–2684"
            },
            {
              "label": "判定",
              "value": "已修"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · v2 leftover 5",
          "title": "SC20 3655–3662 与 HUD 同步淡出",
          "paragraphs": [
            "HUD / 流程轨 / 主区（% of 3650）：3655 88/88/100 → 3656 76/75/95 → 3657 63/63/84 → 3658 51/51/72 → 3659 38/38/57 → 3660 26/25/40 → 3661 13/13/22 → **3662 0/0/1**。同起点 3655、同终点 3662，主区滞后 ≤1 帧（v2 主区 3660 满亮→2 帧快淡）"
          ],
          "meta": [
            {
              "label": "帧",
              "value": "3653–3663"
            },
            {
              "label": "判定",
              "value": "已修"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · v2 leftover 6",
          "title": "SC10 1475–1480 淡出归零",
          "paragraphs": [
            "主区（% of 1470）：1474 103 → 1475 97 → 1476 84 → 1477 68 → 1478 48 → 1479 26 → **1480 1**；HUD 1471–1478 先行淡出（1477 13% → 1478 0）。1480–1483 仅星点，「02」1482 隐约、标题 1484 glitch 起（无硬切；空拍比 v2 多 1 帧，见 §3 备注）"
          ],
          "meta": [
            {
              "label": "帧",
              "value": "1470–1484"
            },
            {
              "label": "判定",
              "value": "已修"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · v2 leftover 7",
          "title": "HUD「长上下文 vs RAG」「总结」延后 4 帧",
          "paragraphs": [
            "「进阶」7179 满亮 12534 px → **7180** 换词帧 HUD 17 → 7181 3864 → 7183 12493；「长上下文 vs RAG」7765 12720 → **7766** HUD 0 → 7767 2255 → 7769 10700。7180 时主区 2991 px（「上下文窗口」框 + 图标已淡入）不再同帧全灭；7766 主区仅 978 px（SC42 试卷图标刚起）→ 仍 1 帧近空（v2 2 帧），见 §3 R-1"
          ],
          "meta": [
            {
              "label": "帧",
              "value": "7170–7193 / 7756–7779"
            },
            {
              "label": "判定",
              "value": "已修"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · §2",
          "title": "§2 结论：7/7 已修。",
          "paragraphs": [],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · §1",
          "title": "§1 结论：白名单外仍闪 0 处；白名单漏闪 0 处；每镜头 ≤1 处全部满足。",
          "paragraphs": [
            "模板扫描的其它候选（960/1156/4604/5553/7155/6201，≤11 块）逐帧看均为打字机/滚动数字/边缘运动，非闪烁。"
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · 低 · G0 HUD ↔ SC42",
          "title": "HUD 换词帧 SoftIn n=0 → HUD 像素 0–22（旧词已撤、新词未起），7766 该帧主区仅 978 px（SC42 试卷图标 7765 刚起）→ 画面近空 1 帧（v2 N4 为 2 帧，已减半）；其余 4 处换词帧主区有内容，仅 HUD 空 1 帧",
          "paragraphs": [
            "新 HUD f0 提前 1 帧与旧 HUD 末帧重叠，或 SoftIn 起始 opacity ≥0.15；7766 处亦可把 SC42 首元素 f0 提到 ≤7763"
          ],
          "meta": [
            {
              "label": "帧",
              "value": "7766（同类 752/1021/6419/7180）"
            },
            {
              "label": "判据",
              "value": "§5 衔接（轻微）"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · 低 · G0 章节卡 ×3",
          "title": "章节卡标题 GlitchIn `rgbSplit=5`（Overlay.tsx:75，+1/+7 帧可见青/品红彩边）；§8 末行\"重口味 glitch 只允许片头、SC08、SC35、SC44\"字面未含章节卡",
          "paragraphs": [
            "主会话裁定：保留（与片头同族、分镜表写\"glitch 入\"）则在 §8 补注\"+章节卡\"；否则 rgbSplit→0"
          ],
          "meta": [
            {
              "label": "帧",
              "value": "1484 / 3666 / 5700"
            },
            {
              "label": "判据",
              "value": "§8 规则字面"
            }
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · v3 summary",
          "title": "The final report’s own wrap-up",
          "paragraphs": [
            "**闪烁合规**：全片 23 处闪烁事件（22 处透明度序列 + SC26 换字序列）= 白名单 23 项一一对应；**白名单外仍闪 0 处、白名单漏闪 0 处**，每镜头 ≤1 处；rgbSplit 重口味 4 处按规则 + 章节卡 3 处（低项待裁定）；HUD 9 处换词均为 8 帧单调淡入。",
            "**v2 遗留 7 项：7/7 已修**（读数见 §2）。",
            "**新问题 2 条，均低，无中/高**：① 7766 HUD 换词帧近空 1 帧（v2 2 帧→1 帧，SoftIn n=0 固有）；② 章节卡 rgbSplit 与 §8 末行字面不符。",
            "可交付；如再出 v4 只需顺手改 R-1（HUD f0 −1 或起始 opacity）并在 §8 补注章节卡。"
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            }
          ],
          "lang": "zh"
        },
        {
          "kicker": "QC · v4",
          "title": "The delivery note on the last pass",
          "paragraphs": [
            "v4 仅把淡入首帧从 0 提到 ≈25% 可见，消掉 HUD 换词的 1 帧空档。"
          ],
          "links": [
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/qc/qc_v3_final.md",
              "label": "qc_v3_final.md"
            },
            {
              "href": "https://github.com/Vincentwei1021/anything2explainer/blob/ddf03a5f2b920526a7460a6d1a35fb94dfcbc15d/examples/rag/交付说明.md",
              "label": "交付说明.md"
            }
          ],
          "lang": "zh"
        }
      ]
    }
  ]
};
