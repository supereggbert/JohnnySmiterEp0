THREE.ShaderChunk.fog_fragment=THREE.ShaderChunk.fog_fragment.replace(new RegExp('fogDepth','g'),'length(vViewPosition)');//fog Hack
if(!window.localStorage.highscore) window.localStorage.highscore=50;
import './SpidersComponent.js'
import './GridComponent.js'
import './BulletsComponent.js'
import './TerrainComponent.js'
import './TreesComponent.js'
import './CloudComponent.js'
import './LifeComponent.js'
import './GetbowComponent.js'
import './StoryComponent.js'
import './CameracorrectComponent.js'
import './gradient.js'
/*import {Wind} from './player.js'
var started=false;
document.addEventListener("click",function(){
	if(!started){
		Wind();
		started=true;
	}
});*/



