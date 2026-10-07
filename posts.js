/* =========================================================
   BLOG POSTS — this is the only place you need to edit!
   To add a post: copy a { ... } block, paste it at the TOP
   of the list, and change the text. The 5 newest show on the
   home page; all of them show on archive.html.

   date  : "YYYY-MM-DD"
   tag   : short label (Research, Life, Learning...)
   title : the headline
   body  : your writing. Leave a blank line between paragraphs.
           You can use <a href="...">links</a>, <strong>bold</strong>,
           and <em>italics</em> right in the text.
   ========================================================= */
const POSTS = [
  {
    date: "2026-10-01",
    tag: "Research",
    title: "How students choose between AI tools",
    body: `I’ve been researching what makes someone reach for ChatGPT, Claude, Copilot, or something else — and how they decide whether to trust the output.

Write more here! What you’ve found so far, what surprised you, what you’re trying next.`
  },
  {
    date: "2026-09-15",
    tag: "Projects",
    title: "Agentic retrieval experiments",
    body: `Exploring multi-agent systems, structured retrieval, document reasoning, and better ways to work with messy data.

Add details here: what you built, what broke, what you learned.`
  },
  {
    date: "2026-09-01",
    tag: "Community",
    title: "Mentorship + leadership",
    body: `Helping people learn from each other and build stronger technical communities.`
  },
  {
    date: "2026-08-20",
    tag: "NYC / Life",
    title: "Events, talks, and good conversations",
    body: `Keeping track of ideas that start outside the classroom or workplace.`
  },
  {
    date: "2026-08-05",
    tag: "Learning",
    title: "Cloud, systems, and infrastructure",
    body: `Getting deeper into how resilient systems are designed and operated.`
  }
];

/* ---------- renders posts (no need to edit below) ----------
   renderBlog("blog-feed", {limit: 5})            -> newest 5
   renderBlog("blog-feed", {groupByYear: true})   -> everything, grouped by year */
function renderBlog(containerId, opts){
  opts = opts || {};
  const feed = document.getElementById(containerId);
  if(!feed) return;
  const fmt = d => {
    const dt = new Date(d + "T12:00:00");
    return isNaN(dt) ? d : dt.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  };
  let posts = [...POSTS].sort((a,b)=> (b.date||"").localeCompare(a.date||""));
  if(opts.limit) posts = posts.slice(0, opts.limit);
  if(!posts.length){
    feed.innerHTML = '<p class="blog-empty">No posts yet — check back soon!</p>';
    return;
  }
  let lastYear = null;
  posts.forEach(p=>{
    if(opts.groupByYear){
      const y = (p.date||"").slice(0,4);
      if(y !== lastYear){
        const yh = document.createElement("div");
        yh.className = "archive-year";
        yh.setAttribute("role","heading");
        yh.setAttribute("aria-level","2");
        yh.textContent = y;
        feed.appendChild(yh);
        lastYear = y;
      }
    }
    const el = document.createElement("article");
    el.className = "post reveal";
    const meta = document.createElement("div");
    meta.className = "post-meta";
    const time = document.createElement("span");
    time.textContent = fmt(p.date);
    meta.appendChild(time);
    if(p.tag){
      const tag = document.createElement("span");
      tag.className = "post-tag";
      tag.textContent = p.tag;
      meta.appendChild(tag);
    }
    const h = document.createElement("h3");
    h.textContent = p.title;
    const body = document.createElement("div");
    body.className = "post-body";
    body.innerHTML = (p.body||"").trim().split(/\n\s*\n/)
      .map(par => "<p>" + par.trim().replace(/\n/g,"<br>") + "</p>").join("");
    el.append(meta, h, body);
    feed.appendChild(el);
  });
}
