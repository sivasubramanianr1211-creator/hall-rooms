"""Build the Raja Valamburi logo set: emblem (crown over a right-turning conch)
plus a Cinzel wordmark converted to outlines. Usage: build.py <out_dir>"""

import math, pathlib, sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

here = pathlib.Path(__file__).parent
out = pathlib.Path(sys.argv[1])
out.mkdir(parents=True, exist_ok=True)

font = instantiateVariableFont(TTFont(here / "fonts/Cinzel.ttf"), {"wght": 600})
cmap, glyphs, hmtx = font.getBestCmap(), font.getGlyphSet(), font["hmtx"]
upm = font["head"].unitsPerEm
cap = font["OS/2"].sCapHeight


def text_path(text, cap_px, x, baseline, tracking_em=0.0):
    """Outline `text` so its capitals are cap_px tall. Returns (d, width)."""
    s = cap_px / cap
    pen = SVGPathPen(glyphs)
    cursor = 0.0
    track = tracking_em * upm
    for i, ch in enumerate(text):
        name = cmap[ord(ch)]
        glyphs[name].draw(TransformPen(pen, (s, 0, 0, -s, x + cursor * s, baseline)))
        cursor += hmtx[name][0] + (track if i < len(text) - 1 else 0)
    return pen.getCommands(), cursor * s


# ---- emblem, drawn in a 240-unit box ---------------------------------------

def spiral(cx, cy, r0, r1, end_angle, turns, n=220):
    start = end_angle - turns * 2 * math.pi
    pts = [
        (cx + (r0 + (r1 - r0) * t) * math.cos(start + t * turns * 2 * math.pi),
         cy + (r0 + (r1 - r0) * t) * math.sin(start + t * turns * 2 * math.pi))
        for t in (i / n for i in range(n + 1))
    ]
    return "M" + " L".join(f"{x:.2f} {y:.2f}" for x, y in pts)


def emblem(stroke, paint, simple=False):
    cx, cy, R = 150, 150, 38
    # The spiral's last turn ends at the top of the shell and becomes its outline.
    turns = 1.35 if simple else 1.85
    body = (f"M44 158 C66 144 100 {cy - R + 4} {cx} {cy - R} "
            f"A{R} {R} 0 0 1 {cx} {cy + R} C{cx - 44} {cy + R} 78 178 44 158 Z")
    strokes = [
        "M86 84 L78 46 Q94 62 104 60 L120 32 L136 60 Q146 62 162 46 L154 84 Z",
        "M84 93 H156",
        body,
        spiral(cx, cy, 3, R, -math.pi / 2, turns),
    ]
    jewels = ['<circle cx="78" cy="42" r="5.5"/>', '<circle cx="120" cy="27" r="6.5"/>',
              '<circle cx="162" cy="42" r="5.5"/>']
    if simple:
        strokes.append("M90 135 Q101 157 91 178")
    else:
        strokes.append("M72 146 Q78 158 70 170 M94 132 Q104 156 94 180")
        jewels.append('<path d="M120 64 L126.5 73 L120 82 L113.5 73 Z"/>')
    lines = "".join(f'<path d="{d}"/>' for d in strokes)
    return (f'<g fill="none" stroke="{paint}" stroke-width="{stroke}" stroke-linecap="round" '
            f'stroke-linejoin="round">{lines}</g><g fill="{paint}">{"".join(jewels)}</g>')


EMBLEM_BOX = (40, 18, 194, 192)  # visual bounds of the emblem in its 240 box


def gradient(gid, y1, y2):
    return (f'<linearGradient id="{gid}" gradientUnits="userSpaceOnUse" x1="0" y1="{y1:.1f}" x2="0" y2="{y2:.1f}">'
            '<stop offset="0" stop-color="#F6E7B0"/><stop offset="0.45" stop-color="#D9B648"/>'
            '<stop offset="1" stop-color="#A07E24"/></linearGradient>')


SOLID_ON_LIGHT = "#8F7020"  # gold-700: readable on ivory / white


def write(name, w, h, body, bg=None):
    rect = f'<rect width="{w:.0f}" height="{h:.0f}" rx="{w * 0.18 if bg == "tile" else 0:.0f}" fill="#0E0B07"/>' if bg else ""
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" width="{w:.0f}" height="{h:.0f}">'
           f'<title>Raja Valamburi Hall &amp; Rooms</title>{rect}{body}</svg>\n')
    (out / name).write_text(svg)


def placed_emblem(x, y, height, paint, stroke=4, simple=False):
    ex0, ey0, ex1, ey1 = EMBLEM_BOX
    s = height / (ey1 - ey0)
    return (f'<g transform="translate({x - ex0 * s:.2f} {y - ey0 * s:.2f}) scale({s:.4f})">'
            f'{emblem(stroke, paint, simple)}</g>'), (ex1 - ex0) * s


def stacked(light=False):
    W, pad = 640, 48
    eh = 250
    emb_w = (EMBLEM_BOX[2] - EMBLEM_BOX[0]) * eh / (EMBLEM_BOX[3] - EMBLEM_BOX[1])
    name_cap, sub_cap = 54, 20
    name_d, name_w = text_path("RAJA VALAMBURI", name_cap, 0, 0, 0.06)
    sub_d, sub_w = text_path("HALL & ROOMS", sub_cap, 0, 0, 0.42)
    W = max(W, name_w + 2 * pad)
    y_emb = pad
    y_name = y_emb + eh + 44 + name_cap
    y_rule = y_name + 30
    y_sub = y_rule + 22 + sub_cap
    H = y_sub + pad
    g1, g2 = ("url(#ge)", "url(#gt)") if not light else (SOLID_ON_LIGHT, SOLID_ON_LIGHT)
    emb, _ = placed_emblem((W - emb_w) / 2, y_emb, eh, g1)
    name_d, _ = text_path("RAJA VALAMBURI", name_cap, (W - name_w) / 2, y_name, 0.06)
    sub_d, _ = text_path("HALL & ROOMS", sub_cap, (W - sub_w) / 2, y_sub, 0.42)
    cx, rl = W / 2, name_w * 0.32
    rule = (f'<g stroke="{g2}" stroke-width="1.6" stroke-linecap="round">'
            f'<path d="M{cx - rl:.1f} {y_rule} H{cx - 14:.1f} M{cx + 14:.1f} {y_rule} H{cx + rl:.1f}"/></g>'
            f'<path fill="{g2}" d="M{cx} {y_rule - 6} L{cx + 6} {y_rule} L{cx} {y_rule + 6} L{cx - 6} {y_rule} Z"/>')
    defs = "" if light else f"<defs>{gradient('ge', y_emb, y_emb + eh)}{gradient('gt', y_name - name_cap, y_sub)}</defs>"
    body = f'{defs}{emb}<path fill="{g2}" d="{name_d}"/>{rule}<path fill="{g2}" d="{sub_d}"/>'
    return W, H, body


def horizontal(light=False):
    pad, eh = 8, 112
    name_cap, sub_cap = 36, 17
    emb_w = (EMBLEM_BOX[2] - EMBLEM_BOX[0]) * eh / (EMBLEM_BOX[3] - EMBLEM_BOX[1])
    gap = 26
    tx = pad + emb_w + gap
    H = eh + 2 * pad
    y_name = pad + eh / 2 - 6
    y_sub = y_name + 16 + sub_cap + 8
    name_d, name_w = text_path("RAJA VALAMBURI", name_cap, tx, y_name, 0.05)
    sub_d, _ = text_path("HALL & ROOMS", sub_cap, tx, y_sub, 0.3)
    W = tx + name_w + pad
    y_rule = y_name + 14
    g1, g2 = ("url(#ge)", "url(#gt)") if not light else (SOLID_ON_LIGHT, SOLID_ON_LIGHT)
    emb, _ = placed_emblem(pad, pad, eh, g1, stroke=6)
    defs = "" if light else f"<defs>{gradient('ge', pad, pad + eh)}{gradient('gt', y_name - name_cap, y_sub)}</defs>"
    rule = f'<path stroke="{g2}" stroke-width="1.2" d="M{tx} {y_rule} H{tx + name_w:.1f}"/>'
    body = f'{defs}{emb}<path fill="{g2}" d="{name_d}"/>{rule}<path fill="{g2}" d="{sub_d}"/>'
    return W, H, body


def icon(size=512):
    pad = size * 0.16
    eh = size - 2 * pad
    emb_w = (EMBLEM_BOX[2] - EMBLEM_BOX[0]) * eh / (EMBLEM_BOX[3] - EMBLEM_BOX[1])
    emb, _ = placed_emblem((size - emb_w) / 2, pad, eh, "url(#ge)", stroke=9, simple=True)
    return size, size, f"<defs>{gradient('ge', pad, pad + eh)}</defs>{emb}"


for name, (w, h, body), bg in [
    ("logo.svg", stacked(), None),
    ("logo-on-light.svg", stacked(light=True), None),
    ("logo-horizontal.svg", horizontal(), None),
    ("logo-horizontal-on-light.svg", horizontal(light=True), None),
    ("logo-mark.svg", icon(), None),
    ("logo-icon.svg", icon(), "tile"),
]:
    write(name, w, h, body, bg)
    print(name, round(w), "x", round(h))
