#!/usr/bin/env python3
"""Generate A1 Professional Fence LLC website from A1 asphalt template."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

PHONE = "8882233797"
PHONE_FMT = "888-223-3797"
SITE = "A1FencePro.com"
VOXTALK = "https://a1-asphalt-voxtalk-3.onrender.com/fence/"

IMG = {
    "hero": "https://images.unsplash.com/photo-1691821331552-ab4f12500a24?w=1920&q=80",
    "wood": "https://images.unsplash.com/photo-1691821331552-ab4f12500a24?w=1200&q=80",
    "vinyl": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    "chain": "https://images.pexels.com/photos/951408/pexels-photo-951408.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "gates": "https://images.pexels.com/photos/4371606/pexels-photo-4371606.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "residential": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
    "commercial": "https://images.pexels.com/photos/3605822/pexels-photo-3605822.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "coverage": "https://images.pexels.com/photos/1211719/pexels-photo-1211719.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "cta": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
}

NAV = """<header class="site-header">
  <a href="index.html" class="nav-brand" aria-label="A1 Professional Fence home">
    <img src="images/a1-fence-logo.png" alt="A1 Professional Fence LLC" />
  </a>
  <button class="hamburger" onclick="toggleMenu(event)" aria-label="Open menu">
    <span></span><span></span><span></span>
  </button>
  <nav class="desktop-nav" aria-label="Main navigation">
    <div class="has-drop">
      <a href="index.html#services">Services</a>
      <ul class="drop">
        <li><a href="wood-fences.html">Wood Fences</a></li>
        <li><a href="vinyl-fences.html">Vinyl Fences</a></li>
        <li><a href="chain-link-fences.html">Chain Link</a></li>
        <li><a href="gates.html">Gates &amp; Entry</a></li>
        <li><a href="residential-fences.html">Residential</a></li>
        <li><a href="commercial-fences.html">Commercial</a></li>
      </ul>
    </div>
    <a href="about.html">About</a>
  </nav>
  <div class="nav-actions">
    <a href="javascript:void(0)" onclick="openVox()" class="ai-nav">Artificial Person Team Member</a>
    <a href="tel:{phone}" class="phone-nav">{phone_fmt}</a>
  </div>
</header>
<div class="nav-stripe" aria-hidden="true"></div>
<div class="mobile-menu" id="mobileMenu">
  <a href="index.html#services">Services</a>
  <a href="wood-fences.html">Wood Fences</a>
  <a href="vinyl-fences.html">Vinyl Fences</a>
  <a href="chain-link-fences.html">Chain Link</a>
  <a href="gates.html">Gates</a>
  <a href="residential-fences.html">Residential</a>
  <a href="commercial-fences.html">Commercial</a>
  <a href="about.html">About</a>
  <a href="javascript:void(0)" onclick="openVox()">Artificial Person Team Member</a>
  <a href="tel:{phone}">{phone_fmt}</a>
</div>""".format(phone=PHONE, phone_fmt=PHONE_FMT)

SCRIPTS = f"""<script>
function toggleMenu(e){{if(e)e.stopPropagation();document.getElementById('mobileMenu').classList.toggle('open');}}
document.addEventListener('click',function(e){{var m=document.getElementById('mobileMenu'),b=document.querySelector('.hamburger');if(m&&b&&!m.contains(e.target)&&!b.contains(e.target))m.classList.remove('open');}});
function openVox(){{var o=document.getElementById('vox-overlay');o.classList.add('open');o.style.display='flex';var f=document.getElementById('vox-iframe');if(f){{f.style.display='block';try{{f.contentWindow.postMessage({{type:'voxtalk-start'}},'*');}}catch(e){{}}}}}}
function closeVox(){{var o=document.getElementById('vox-overlay');o.style.display='none';o.classList.remove('open');}}
document.addEventListener('keydown',function(e){{if(e.key==='Escape')closeVox();}});
document.addEventListener('click',function(e){{var o=document.getElementById('vox-overlay');if(!o||!o.classList.contains('open'))return;if(e.target.closest('#aiOrb')||e.target.closest('[onclick*="openVox"]'))return;if(!o.contains(e.target))closeVox();}});
</script>
<div id="vox-overlay" onclick="if(event.target===this)closeVox()">
  <button id="vox-close-btn" type="button" onclick="closeVox()" aria-label="Close">&#10005;</button>
  <iframe id="vox-iframe" src="{VOXTALK}" title="A1 Fence Team Member" allow="microphone *" style="display:none;position:fixed;inset:0;width:100%;height:100%;border:none;z-index:10001;"></iframe>
  <div class="vox-hint">Tap outside to return</div>
</div>"""

FOOTER = f"""<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <img src="images/a1-fence-logo.png" alt="A1 Professional Fence LLC" />
      <p>Professional fence installation for homes and businesses across St. Louis and the Midwest. Wood, vinyl, chain link, gates, and custom entry systems.</p>
      <p style="margin-top:12px;"><strong style="color:var(--yellow);">Call:</strong> <a href="tel:{PHONE}">{PHONE_FMT}</a></p>
      <p><strong style="color:var(--yellow);">Web:</strong> <a href="https://{SITE}">{SITE}</a></p>
    </div>
    <div>
      <h4>Fence Types</h4>
      <a href="wood-fences.html">Wood Fences</a>
      <a href="vinyl-fences.html">Vinyl Fences</a>
      <a href="chain-link-fences.html">Chain Link</a>
      <a href="gates.html">Gates &amp; Entry</a>
    </div>
    <div>
      <h4>Markets</h4>
      <a href="residential-fences.html">Residential</a>
      <a href="commercial-fences.html">Commercial</a>
      <a href="about.html">About A1 Fence</a>
    </div>
    <div>
      <h4>Get Started</h4>
      <a href="index.html#contact">Free Estimate</a>
      <a href="javascript:void(0)" onclick="openVox()">Talk to Our Team Member</a>
    </div>
  </div>
  <p class="copyright">&copy; 2026 A1 Professional Fence LLC &middot; {SITE}</p>
</footer>
{SCRIPTS}"""

HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
"""

SERVICES = [
    ("wood-fences.html", "Wood Fences", "Wood", "Cedar, privacy, picket, and board-on-board fences built to last.", IMG["wood"],
     "Premium wood fencing adds privacy, curb appeal, and property value. We install cedar and treated lumber systems with proper posts, gates, and hardware."),
    ("vinyl-fences.html", "Vinyl Fences", "Vinyl", "Low-maintenance white and tan privacy fencing for backyards and pools.", IMG["vinyl"],
     "Vinyl fencing stays clean, resists rot, and looks sharp year after year. Ideal for privacy, pool enclosures, and HOA-friendly residential layouts."),
    ("chain-link-fences.html", "Chain Link Fences", "Chain Link", "Commercial-grade cyclone fencing for security and perimeter control.", IMG["chain"],
     "Chain link is the workhorse for warehouses, lots, schools, and industrial sites. We install galvanized systems with barbed wire, gates, and access controls as needed."),
    ("gates.html", "Gates & Entry", "Gates", "Driveway gates, walk gates, and automated entry systems.", IMG["gates"],
     "From simple walk gates to double-drive entries, we match your fence style and layout. Manual and automated options for residential and commercial properties."),
    ("residential-fences.html", "Residential Fences", "Residential", "Backyard privacy, pet containment, and curb appeal for homeowners.", IMG["residential"],
     "We help homeowners choose the right height, material, and gate layout for privacy, pets, and neighborhood standards."),
    ("commercial-fences.html", "Commercial Fences", "Commercial", "Perimeter security for retail, industrial, and municipal properties.", IMG["commercial"],
     "Commercial clients need durable perimeter fencing, access gates, and clean installs with minimal downtime. We coordinate around your operations."),
]


def service_page(slug, title, kicker, subtitle, img, body):
    return HEAD.format(title=f"{title} — A1 Professional Fence LLC") + NAV + f"""
<section class="page-hero" style="--hero-img:url('{img}')">
  <div class="page-hero-inner">
    <p class="kicker">{kicker}</p>
    <h1 class="display">{title.split()[0]} <span>{' '.join(title.split()[1:]) or title}</span></h1>
    <p class="lead">{subtitle}</p>
  </div>
</section>
<section class="section">
  <div class="container two-col">
    <div>
      <h2 class="display">Built <span>Right</span></h2>
      <p>{body}</p>
      <p>Every project starts with a site walk, clear scope, and a straight answer on timeline. Call for a free estimate — real crew, real install, no runaround.</p>
      <ul class="checklist">
        <li>Licensed &amp; insured installation crews</li>
        <li>Residential and commercial projects</li>
        <li>Wood, vinyl, chain link, and custom gates</li>
        <li>St. Louis metro and Midwest service area</li>
      </ul>
      <div style="margin-top:28px;display:flex;gap:14px;flex-wrap:wrap;">
        <a href="tel:{PHONE}" class="btn btn-primary">Call {PHONE_FMT}</a>
        <a href="index.html#contact" class="btn btn-phone">Request Estimate</a>
      </div>
    </div>
    <div class="service-photo-large" style="--img:url('{img}')"></div>
  </div>
</section>
<section class="cta-section">
  <div class="container center">
    <h2><span>Ready</span> for Your Fence Quote?</h2>
    <p>Talk to our team member anytime — or call {PHONE_FMT} for a fast estimate.</p>
    <div class="hero-buttons">
      <a href="javascript:void(0)" onclick="openVox()" class="btn btn-primary">Talk to Team Member</a>
      <a href="tel:{PHONE}" class="btn btn-phone">&#9990; {PHONE_FMT}</a>
    </div>
  </div>
</section>
""" + FOOTER + "\n</body></html>\n"


def index():
    cards = ""
    for slug, title, _, desc, img, _ in SERVICES:
        cards += f"""      <a href="{slug}" class="service-card" style="--img:url('{img}')">
        <div class="service-photo"></div>
        <div class="service-body"><h3>{title}</h3><p>{desc}</p><span class="service-arrow">Learn More →</span></div>
      </a>
"""
    return HEAD.format(title="A1 Professional Fence LLC — St. Louis Fence Installation") + NAV + f"""
<section class="hero">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="hero-inner">
    <p class="hero-location">St. Louis &amp; The Midwest</p>
    <div class="hero-logo-wrap">
      <img src="images/a1-fence-logo.png" alt="A1 Professional Fence LLC" />
    </div>
    <div class="logo-stripe" aria-hidden="true"></div>
    <h1>The Last <span>Fence Company</span><br>You&#8217;ll Ever Need</h1>
    <p class="hero-sub">Wood, vinyl, and chain link fencing for residential backyards and commercial properties — installed right the first time.</p>
    <div class="hero-buttons">
      <a href="#contact" class="btn btn-primary">Request an Estimate</a>
      <a href="tel:{PHONE}" class="btn btn-phone">&#9990; {PHONE_FMT}</a>
    </div>
  </div>
</section>

<section class="intro-section">
  <div class="container center">
    <p class="kicker">What We Do</p>
    <h2 class="display">Full-Service <span>Fence Solutions</span></h2>
    <p class="lead">From backyard privacy to commercial perimeter security, A1 Professional Fence delivers clean installs, straight communication, and fences built to stay straight.</p>
  </div>
</section>

<section class="section services-section" id="services">
  <div class="container">
    <div class="section-heading center">
      <p class="kicker">Our Services</p>
      <h2 class="display">Fence Types <span>We Install</span></h2>
      <p class="lead">Residential wood and vinyl, commercial chain link, custom gates, and entry systems.</p>
      <div style="margin-top:32px;">
        <a href="tel:{PHONE}" class="wide-cta">Speak With a Fence Specialist Today →</a>
      </div>
    </div>
    <div class="services-grid">
{cards}    </div>
  </div>
</section>

<section class="coverage-section">
  <div class="container">
    <div class="section-heading center">
      <p class="kicker">Coverage</p>
      <h2 class="display">Serving St. Louis <span>&amp; Beyond</span></h2>
      <p class="lead">Residential neighborhoods, retail centers, warehouses, and municipal sites.</p>
    </div>
    <div class="stats-grid" style="margin-top:40px;">
      <div class="stat-card"><strong>Wood</strong><span>Privacy &amp; Picket</span></div>
      <div class="stat-card"><strong>Vinyl</strong><span>Low Maintenance</span></div>
      <div class="stat-card"><strong>Chain Link</strong><span>Commercial Grade</span></div>
      <div class="stat-card"><strong>Gates</strong><span>Entry Systems</span></div>
    </div>
  </div>
</section>

<section class="reviews-section">
  <div class="container">
    <div class="reviews-header center">
      <p class="kicker">Customer Feedback</p>
      <h2 class="display">Built on <span>Trust</span></h2>
    </div>
    <div class="reviews-grid">
      <article><div class="review-stars">★★★★★</div><p>"Clean install, fair price, and the crew left the yard spotless. Exactly what we wanted for our backyard privacy fence."</p><strong>— Homeowner, St. Louis County</strong></article>
      <article><div class="review-stars">★★★★★</div><p>"They handled our warehouse perimeter fast — chain link, gates, and access points all dialed in."</p><strong>— Facilities Manager</strong></article>
      <article><div class="review-stars">★★★★★</div><p>"Communication was clear from estimate to final walk-through. Gate alignment is perfect."</p><strong>— Property Owner</strong></article>
    </div>
  </div>
</section>

<section class="ai-section" id="ai">
  <div class="container two-col">
    <div>
      <p class="kicker">Innovation</p>
      <h2 class="display">Talk to Our <span>Artificial Person</span><br>Team Member</h2>
      <p>Get answers about fence types, timelines, and what to expect — anytime. Real crews still handle every install.</p>
    </div>
    <div class="ai-orb-wrap">
      <a href="javascript:void(0)" onclick="openVox()" class="ai-orb" id="aiOrb" title="Start a conversation"></a>
      <span class="orb-label">Press to Start a Conversation<br>With Our Artificial Person Team Member</span>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container center">
    <h2><span>Ready</span> to Get Your<br>Fence Quote Started?</h2>
    <p>Call us or request an estimate — fast response, real answers.</p>
    <div class="hero-buttons">
      <a href="#contact" class="btn btn-primary">Request an Estimate</a>
      <a href="tel:{PHONE}" class="btn btn-phone">&#9990; {PHONE_FMT}</a>
    </div>
  </div>
</section>

<section class="contact-section" id="contact">
  <div class="container contact-grid">
    <div>
      <p class="kicker">Get a Fast Quote</p>
      <h2 class="display">Request Your <span>Estimate</span></h2>
      <p class="lead">Tell us your fence type, approximate length, and job location. We respond quickly with next steps.</p>
      <div class="contact-info">
        <p><strong>Call:</strong> <a href="tel:{PHONE}">{PHONE_FMT}</a></p>
        <p><strong>Web:</strong> <a href="https://{SITE}">{SITE}</a></p>
      </div>
    </div>
    <form class="quote-form">
      <div class="form-row"><input type="text" placeholder="Name" /><input type="tel" placeholder="Phone" /></div>
      <div class="form-row"><input type="email" placeholder="Email" /><select><option>Fence type...</option><option>Wood</option><option>Vinyl</option><option>Chain Link</option><option>Gates</option></select></div>
      <input type="text" placeholder="Job Location / City, State" />
      <textarea placeholder="Approximate fence length, gates, notes..."></textarea>
      <button type="submit">Send Request</button>
      <small>Or call {PHONE_FMT} directly.</small>
    </form>
  </div>
</section>

<section class="slogan-band">
  <blockquote>Good fences make <span>good neighbors</span> — A1 makes them <span>built right</span></blockquote>
  <p style="margin-top:16px;font-size:.82rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;">— A1 Professional Fence LLC · {SITE}</p>
</section>
""" + FOOTER + "\n</body></html>\n"


def about():
    return HEAD.format(title="About — A1 Professional Fence LLC") + NAV + f"""
<section class="page-hero" style="--hero-img:url('{IMG['coverage']}')">
  <div class="page-hero-inner">
    <p class="kicker">About Us</p>
    <h1 class="display">A1 <span>Professional Fence</span></h1>
    <p class="lead">Part of the A1 family of professional contracting brands — same commitment to quality, communication, and crews that show up.</p>
  </div>
</section>
<section class="section">
  <div class="container two-col">
    <div>
      <h2 class="display">Fence Work <span>Done Right</span></h2>
      <p>A1 Professional Fence LLC installs wood, vinyl, and chain link fencing for homeowners and commercial clients across the St. Louis area and Midwest.</p>
      <p>We believe in straight answers, clean job sites, and fences that stay plumb. Whether you need backyard privacy or a secured commercial perimeter, we scope it clearly and install it properly.</p>
      <p><strong>Call:</strong> <a href="tel:{PHONE}">{PHONE_FMT}</a><br/><strong>Web:</strong> <a href="https://{SITE}">{SITE}</a></p>
    </div>
    <div class="service-photo-large" style="--img:url('{IMG['wood']}')"></div>
  </div>
</section>
""" + FOOTER + "\n</body></html>\n"


def styles_css():
    base = (Path(__file__).resolve().parents[2] / "a1-test" / "public" / "styles.css").read_text()
    base = base.replace(
        "A1 PROFESSIONAL ASPHALT & SEALING LLC",
        "A1 PROFESSIONAL FENCE LLC",
    )
    base = base.replace(
        "--line:    rgba(245,197,24,.28);",
        "--line:    rgba(245,197,24,.28);\n  --green:   #2d5a27;",
    )
    base = base.replace(
        ".hero-bg{position:absolute;inset:0;background:url('asphalt background.jpg') center/cover no-repeat;opacity:.28}",
        f".hero-bg{{position:absolute;inset:0;background:linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.72)),url('{IMG['hero']}') center/cover no-repeat;opacity:1}}",
    )
    base = base.replace(
        ".hero-flags{position:absolute;inset:0;background:url('images/unitedstatesflag.jpg') center/cover no-repeat;opacity:.30;filter:grayscale(.05)}",
        ".hero-flags{display:none}",
    )
    base = base.replace(
        "background:url('A1__asphalt_logo.jpeg')",
        "background:url('images/a1-fence-logo.png')",
    )
    base = base.replace(
        "background-color:#F5C518",
        "background-color:#f5c518",
    )
    base = base.replace(
        ".intro-section{padding:64px 0 40px;background:radial-gradient(circle at top,rgba(245,197,24,.06),transparent 40%),var(--dark)}",
        ".intro-section{padding:64px 0 40px;background:radial-gradient(circle at top,rgba(45,90,39,.12),transparent 40%),var(--dark)}",
    )
    base = base.replace(
        "url('images/stlouis-background.jpg')",
        f"url('{IMG['coverage']}')",
    )
    base = base.replace(
        "url('images/striping%20parking%20lot.png')",
        f"url('{IMG['chain']}')",
    )
    base = base.replace(
        "url('images/asphalt-road.jpg')",
        f"url('{IMG['cta']}')",
    )
    base = base.replace(
        "url('images/unitedstatesflag.jpg')",
        f"url('{IMG['wood']}')",
    )
    extra = """
.page-hero{position:relative;min-height:52vh;display:flex;align-items:center;background:linear-gradient(rgba(0,0,0,.62),rgba(0,0,0,.78)),var(--hero-img) center/cover no-repeat;border-bottom:3px solid var(--yellow)}
.page-hero-inner{padding:120px 40px 80px;max-width:900px}
.page-hero .display{font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,7vw,5.5rem);line-height:.95;margin:12px 0 16px}
.page-hero .lead{margin:0;text-align:left;max-width:640px}
.checklist{list-style:none;margin:24px 0}
.checklist li{display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.15);font-size:.95rem}
.checklist li::before{content:'✓';color:var(--yellow);font-weight:900;flex-shrink:0}
.service-photo-large{min-height:360px;border-radius:4px;border:1px solid rgba(245,197,24,.35);background:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.45)),var(--img) center/cover no-repeat}
#vox-overlay iframe.active,#vox-overlay iframe[style*="display: block"]{display:block!important}
"""
    return base + extra


def main():
    PUBLIC.mkdir(parents=True, exist_ok=True)
    (PUBLIC / "images").mkdir(exist_ok=True)
    (PUBLIC / "images" / "README.txt").write_text(
        "Drop a1-fence-logo.png here (Joe's yellow A1 Professional Fence logo).\n"
        "Until then, pages reference images/a1-fence-logo.png.\n",
        encoding="utf-8",
    )
    (PUBLIC / "styles.css").write_text(styles_css(), encoding="utf-8")
    (PUBLIC / "index.html").write_text(index(), encoding="utf-8")
    (PUBLIC / "about.html").write_text(about(), encoding="utf-8")
    for slug, title, kicker, subtitle, img, body in SERVICES:
        (PUBLIC / slug).write_text(service_page(slug, title, kicker, subtitle, img, body), encoding="utf-8")
    print("Generated", len(list(PUBLIC.glob("*.html"))), "HTML pages in", PUBLIC)


if __name__ == "__main__":
    main()
