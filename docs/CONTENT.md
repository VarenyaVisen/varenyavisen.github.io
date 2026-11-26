# Website content (source of truth for the YAML files)

Everything here comes from my resume (new_resume_2027.pdf). Lines marked ✏️ are mine to fill in.
Never put my phone number on the site.

---

## profile.yaml

**name:** Varenya Visen

**headline:** Software Engineer · AI/ML & GenAI

**eyebrow:** SOFTWARE ENGINEER · KELLTON · AI / ML

**tagline:** I build AI that survives production.
(Alternatives: "LLMs, logs, and a lot of tests." / "Backend engineer with an AI habit.")

**intro:**
Software engineer working across machine learning and GenAI: RAG pipelines, LLM-powered systems, and ML models, built in Python.

**about** (2 paragraphs):

> I'm a software engineer who builds AI and ML systems that hold up in the real world: RAG pipelines, LLM-powered tools, and models that turn messy data into decisions.

> I care most about what happens after the demo: evaluation, edge cases, and the bugs nobody sees coming. When I'm not training models, I'm gaming, trekking up a mountain, or riding somewhere with no fixed plan.

**aboutNote** (handwritten annotation): the short version

**quickFacts** (Lucide icons):
- `briefcase`: Software Engineer · AI/ML
- `graduation-cap`: B.Tech CSE (AI/ML), Sushant University
- `brain-circuit`: RAG · LangGraph · AI agents
- `map-pin`: Delhi, India

**location:** Delhi, India

**email:** varenyavisen@gmail.com

**links:**
- GitHub: https://github.com/VarenyaVisen (Simple Icons: `github`)
- LinkedIn: https://www.linkedin.com/in/varenya-visen (text label, or my own LinkedIn SVG)

**resume:** /resume.pdf (a version without my phone number)

---

## experience.yaml (Kellton)

**location:** Delhi, India
**summary:** Building GenAI and ML solutions for enterprise clients: LLM-assisted verification, RAG over logs, ML cost forecasting, and analytics APIs.

The project entries already match the resume. Keep them as they are.

---

## projects.yaml (personal / side projects)

### Customer Churn Analysis · Mar 2025 – Apr 2025
- **oneLiner:** Finding who churns, and when, across 7,043 telecom customers.
- **highlight:** 38% of churners: monthly plan, < 3 months tenure
- **details:**
  - Analysed churn patterns by tenure, contract type and monthly charges
  - Engineered contract-type buckets and tenure bands for sharper segmentation
  - 11 visualisations (histograms, box plots, heatmaps) of churn-prone segments
  - Suggested early-engagement strategies for new monthly-plan users
- **tags:** Python, Pandas, EDA, Data Viz
- **repo:** ✏️ GitHub link
- **featured:** true

### Sales Dashboard for Regional Performance · Feb 2025 – Mar 2025
- **oneLiner:** A drill-down Power BI dashboard over 25,000+ sales rows across 5 regions.
- **highlight:** Spotted a 14% post-festival sales drop
- **details:**
  - Joined 3 sales tables (12 months, 5 regions) with optimised SQL
  - 10 dynamic measures and KPIs for regional sales, returns and products
  - Multipage dashboards with slicers to drill down by region, category and time
  - The South-region insight fed into a marketing recovery plan
- **tags:** SQL, Power BI, Dashboards
- **repo:** ✏️ link (or remove)

---

## skills.yaml

- **Languages & Backend:** Python, SQL, FastAPI, REST APIs, Celery, Pytest
- **GenAI & LLMs:** RAG, Hybrid Search, Reranking, RAG Evaluation, LangChain, LangGraph, AI Agents, Tool Calling, Azure OpenAI
- **Machine Learning:** Scikit-learn, PyTorch, TensorFlow, Hugging Face, XGBoost, Feature Engineering, Pandas, NumPy
- **Databases:** MongoDB, PostgreSQL, Chroma
- **Cloud & Tools:** Microsoft Azure, Git, GitHub, CI/CD, Log-Based Debugging

---

## achievements.yaml ("Achievement Unlocked" cards)

- **Best Final Year Project**: 2025 · Power BI dashboard on academic performance across 6 departments · rarity: gold · icon: `award`
- **Top 5% · SQL HackerRank Challenge**: 2024 · Top 150 of 3,000+ participants · rarity: silver · icon: `trophy`
- **RAG Triad, passed**: 2026 · 92% context relevance · 95% groundedness · 92% answer relevance · rarity: bronze · icon: `target` *(optional, a fun "work achievement")*

---

## certifications.yaml

- **Google Data Analytics Certificate**: Coursera · 2024 · 8 case studies on SQL, data cleaning and dashboards · url: ✏️ credential link

---

## interests.yaml (bento cards, each with a small ASCII drawing instead of photos)

- **I love gaming** · layout: wide · kind: stack · note: "some of my favourites" · art: game controller
  Getting humbled by Sekiro and Wukong, getting lost in open worlds, and 'just one more' Clash of Clans attack.
- **& trekking** · layout: tall · kind: carousel · art: mountain range
  Mountains, trails and the view at the top.
- **& biking** · layout: square · kind: plain · art: bike
  Long rides, open roads, no fixed plan.

`images` is optional on every card (scenery photos later, never photos of me); not shown on the page yet.

---

## site.yaml

**title:** Varenya Visen · Software Engineer (AI/ML & GenAI)
**description:** Varenya Visen is a software engineer working on machine learning and GenAI: RAG pipelines, LLM-powered systems and ML models in Python.
**sections:** home, about, experience, projects, skills, achievements (certifications shown inside), interests (on the page, not in the nav), contact

---

## hero-shapes.yaml (optional tweak)

Current: VV, neural network, `</>`, controller, `O(1)`, trophy.
Optional: swap `O(1)` for `RAG` or `LLM` to match my AI focus.
