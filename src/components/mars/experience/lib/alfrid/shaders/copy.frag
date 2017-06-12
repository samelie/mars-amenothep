// copy.frag

#define SHADER_NAME COPY_FRAGMENT

precision highp float;

varying vec2 vTextureCoord;
uniform sampler2D texture;

void main(void) {
    gl_FragColor = texture2D(texture, vTextureCoord);
}