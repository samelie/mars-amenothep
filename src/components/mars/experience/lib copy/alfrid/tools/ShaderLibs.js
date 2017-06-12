// ShaderLbs.js

'use strict';

const ShaderLibs = {
	simpleColorFrag:require('glslify!raw!../shaders/simpleColor.frag'),
	bigTriangleVert:require('glslify!raw!../shaders/bigTriangle.vert'),
	generalVert:require('glslify!raw!../shaders/general.vert'),
	generalNormalVert:require('glslify!raw!../shaders/generalWithNormal.vert')
};


export default ShaderLibs;
