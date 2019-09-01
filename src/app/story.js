export default function(type,height){return 'data:image/svg+xml;base64,'+btoa(`<?xml version="1.0"?>
<svg version="1.1" width="1176" height="1150" xmlns="http://www.w3.org/2000/svg">
    <path
       d="m61 1121 46-226-33 55-30-172-3-171 37-57-47 3 14-339 41-13-33-44 101-143l314 15 391 20h100l-77 126 8 210-48-32 29 68 33 276-97 106 80-71 2 323-347 56 44-76-126 81z"
       style="fill:#f8e7ab;stroke:#000;" transform="scale(1.2,`+height+`)" />
<foreignObject x="160" y="110" width="780" height="1100">
<div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center; font-size: 30px; font-family: 'Times New Roman', serif;">`+(type=='fail'?`
<h1 style="font-weight: 100;margin:0;font-size: 55px">Purgatory</h1>
<h2 style="font-weight: 100;margin:0;font-size: 48px">The Kingdom Burns!</h2>
<div style="font-size: 28px;line-height: 30px; padding-top: 10px;">
<p style="font-size:28px; line-height: 30px">Your efforts have failed to win favour with the Gods and they refuse to intervene, leaving Jar to burn in the pits of the 13th Realm. Yet, your bravery has tempered them with mercy; they have sent you <b>back</b> to battle the evil once more for another chance to win their favour.</p>
<p style="font-size: 42px; line-height: 50px"><b>Kill the spider with your crossbow</b><br />to battle the evil hordes.</p>`:type=='win'?`<h1 style="font-weight: 100;margin:0;font-size: 55px">Ascension</h1>
<h2 style="font-weight: 100;margin:0;font-size: 48px">The 13th Knight is Born</h2>
<div style="font-size: 28px;line-height: 30px; padding-top: 10px;">
<p style="font-size:28px; line-height: 30px">The Gods are pleased with your efforts and offer their favour, they will save Jar from the ancient evil, but require something in return. You must return to your life with a sacred quest. You must protect the land of Jar from the evils of the 13th Realm; you must go <b>back</b> and take your place as the 13th Knight of Jar.</p>
<p style="font-size: 42px; line-height: 50px"><b>Kill the spider with your crossbow</b><br />the battle with evil must continue</p>`:`
<h1 style="font-weight: 100;margin:0;font-size: 55px"><b>Johnny Smiter</b>: <i><small>Episode Zero</small></i></h1>
<h2 style="font-weight: 100;margin:0;font-size: 48px"><small><b>Back</b> to the beginning, a knight is born</small></h2>
<div style="font-size: 28px;line-height: 30px; padding-top: 10px;">
<p style="font-size:28px; line-height: 30px">Peace has reigned in the land of Jar for 100 generations. You are going about your business as a lowly huntsman when you hear a commotion in the distance. The young princes have been playing in the forbidden forest, and unwittingly opened a portal to the hellish 13th Realm, releasing the ancient evil that dwelled&#160;within.</p>
<p style="font-size:28px; line-height: 30px">You stand no chance of fending off the evil alone and your death is certain. Your only chance to save the kingdom is to win the favour of the Gods. Capture the runes you will need them to petition the Gods upon your death</p>
<p style="font-size:28px; line-height: 30px">Be warned - evil will emerge from the darkness, hungry for your blood, so remember always watch your <b>back</b>.</p>
<p style="font-size: 42px; line-height: 50px"><b>Kill the spider with your crossbow</b><br />and begin your battle with evil.</p>
<p style="padding-right: 100px; font-size: 24px; text-align: left; position: absolute; bottom: 160px;padding-left: 30px"><b>Created for js13kgames 2019</b><br />
<b>Credits:</b> Three.js, A-Frame and Soundbox devs<br />
<b>Built by:</b> Paul Brunt (@supereggbert)</p>
`)+`</div>
</div>
</foreignObject>`+(type==''?`
<g transform="translate(810,950) scale(0.25,0.25)">
<text x="10" y="-35" style="font:80px sans-serif;fill:#555">Powered by</text>
<path d="m40 195c-3-6-39-95-39-95s-9-20 22-35c30-14 68-33 68-33v138s-22 21-30 30c-8 8-16 2-20-6z" fill="#f00"/>
<path d="m142 196c3-8 40-96 40-96s9-20-22-35c-31-14-69-32-69-32v138s22 21 31 31c8 8 16 2 20-6z" fill="#a00"/>
<path d="m91 33-63-31s-14-6-10 13l9 49z" fill="#b44"/>
<path d="m91 33 64-31s14-6 10 13l-9 49z" fill="#c55"/>
<text x="220" y="160" style="font:160px sans-serif;fill:#555">WebXR</text>
</g>`:'')+`
</svg>`);};
