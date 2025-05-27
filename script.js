const answers = {};

function showStep(n) {
  document.querySelectorAll('.step').forEach((el,i) =>
    el.classList.toggle('hidden', i !== n)
  );
}

// Step 1 → enable Next
document.getElementsByName('domain').forEach(radio => {
  radio.onchange = () => {
    answers.domain = radio.value;
    document.getElementById('toStep2').disabled = false;
  };
});
document.getElementById('toStep2').onclick = () => showStep(1);

// Step 2
document.getElementById('back1').onclick = () => showStep(0);
document.getElementsByName('tech').forEach(radio => {
  radio.onchange = () => {
    answers.tech = radio.value;
    document.getElementById('toStep3').disabled = false;
  };
});
document.getElementById('toStep3').onclick = () => showStep(2);

// Step 3
document.getElementById('back2').onclick = () => showStep(1);
document.getElementsByName('involve').forEach(radio => {
  radio.onchange = () => {
    answers.involve = radio.value;
    document.getElementById('showResults').disabled = false;
  };
});
document.getElementById('showResults').onclick = () => {
  suggestIdeas();
  showStep(3);
};

// Suggestions logic
function suggestIdeas() {
  const list = document.getElementById('ideas');
  list.innerHTML = '';

  const { domain, tech, involve } = answers;
  const ideas = [];

  if (domain === 'counseling') {
    ideas.push("► **Micro-guide PDF**: Summarize one technique (e.g. grounding) into a 1-page PDF—sell on Ko-fi or Gumroad.");
    ideas.push("► **Webinar snippet**: Record a 10-min video on stress relief → sell as on-demand session.");
  }
  if (domain === 'writing') {
    ideas.push("► **Email course**: 5-day self-care email mini-course—use MailerLite’s free tier and paid upgrade.");
    ideas.push("► **Blog ad revenue**: Publish 2 posts/week on Medium and enable the Partner Program.");
  }
  if (domain === 'design') {
    ideas.push("► **Printable templates**: Canva-style worksheets—host on Etsy or Teachers Pay Teachers.");
    ideas.push("► **Merch mockups**: Create art for mugs/t-shirts via Printful dropshipping.");
  }
  if (domain === 'tech') {
    ideas.push("► **No-code tool**: Build a simple Streamlit app that automates a routine task—offer a $5/month subscription.");
    ideas.push("► **Bot tutorials**: Package your JAX/Qiskit scripts into a `pip` package and sell support/licensing.");
  }

  if (tech === 'none') {
    ideas.push("🔧 *Tip:* All of these can be done with free, drag-and-drop online tools—no code required.");
  } else if (tech === 'some') {
    ideas.push("🔧 *Tip:* Use Canva, MailerLite, Zapier integrations—just point-and-click.");
  } else {
    ideas.push("🔧 *Tip:* You can customize any template or script yourself for unique branding.");
  }

  if (involve === 'setup') {
    ideas.push("⏲️ *Low-maintenance:* Focus on one PDF or one video—set it up, then promote.");
  } else if (involve === 'hybrid') {
    ideas.push("⏲️ *Occasional:* Rotate new topics monthly for fresh downloads or posts.");
  } else {
    ideas.push("⏲️ *High engagement:* Expand into multi-week courses or a membership site.");
  }

  ideas.forEach(text => {
    const li = document.createElement('li');
    li.innerHTML = text;
    list.appendChild(li);
  });
}

document.getElementById('restart').onclick = () => {
  document.querySelectorAll('input[type=radio]').forEach(i => i.checked=false);
  document.querySelectorAll('button').forEach(b => b.disabled = ['','restart'].includes(b.id) === false);
  showStep(0);
};
