export default `varying vec3 vWorldPosition;

float hash13(vec3 p3)
{
		p3 = floor(p3*0.33333)*3.0;		
		p3  = fract(p3 * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

void main() {
		vec3 bColor = vec3(0.8,0.0,0.0);
		vec3 tColor = vec3(0.15,0.20,0.23);
		if(hash13(vWorldPosition)>0.998) tColor= vec3(1.0,1.0,1.0);
		vec3 dir=normalize(vWorldPosition);
		tColor+=smoothstep(0.99,0.991,clamp(dot(dir,normalize(vec3(0.5,0.5,-0.5))),0.0,1.0));
    float h = dir.y+0.4;
    gl_FragColor = vec4( mix( bColor, tColor, h ), 1.0 );
}`
