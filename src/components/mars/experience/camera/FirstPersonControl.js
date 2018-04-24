// FirstPersonControl.js
'use strict';

import EaseNumber from '../lib/alfrid/tools/EaseNumber';
import Scheduler from '../lib/alfrid/tools/Scheduler';
import glm from 'gl-matrix';

const getMouse = function(mEvent, mTarget) {

    let o = mTarget || {};
    if (mEvent.touches) {
        o.x = mEvent.touches[0].pageX;
        o.y = mEvent.touches[0].pageY;
    } else {
        o.x = mEvent.clientX;
        o.y = mEvent.clientY;
    }

    return o;
};

const TAO = Math.PI * 2

class FirstPersonControl {

    constructor(mTarget, mListenerTarget = window, mRadius = 500) {
        this._target = mTarget;
        this._listenerTarget = mListenerTarget;
        this._mouse = {};
        this._preMouse = {};
        this.center = glm.vec3.fromValues(0, 0, 0)
        this._up = glm.vec3.fromValues(0, 1, 0);
        this.radius = new EaseNumber(mRadius);
        //this.radius.limit(8, 200)
        this.position = glm.vec3.fromValues(0, 0, 0);
        this.positionOffset = glm.vec3.fromValues(1, 1, 1);
        this.positionOffsetNorm = glm.vec3.create();
        this._rx = new EaseNumber(0);
        this._rx.limit(-Math.PI / 2, Math.PI / 2);
        this._ry = new EaseNumber(0);
        this._ry.limit(-Math.PI / 2, Math.PI / 2);
        this._preRX = 0;
        this._preRY = 0;

        this._isLockZoom = false;
        this._isLockRotation = false;
        this._isInvert = false;

        this._listenerTarget.addEventListener('mousewheel', (e) => this._onWheel(e));
        this._listenerTarget.addEventListener('DOMMouseScroll', (e) => this._onWheel(e));

        this._listenerTarget.addEventListener('mousedown', (e) => this._onDown(e));
        this._listenerTarget.addEventListener('touchstart', (e) => this._onDown(e));
        this._listenerTarget.addEventListener('mousemove', (e) => this._onMove(e));
        this._listenerTarget.addEventListener('touchmove', (e) => this._onMove(e));
        window.addEventListener('touchend', () => this._onUp());
        window.addEventListener('mouseup', () => this._onUp());

        Scheduler.addEF(() => this._loop());
    }


    //  PUBLIC METHODS

    limit(b, t) {
        this._rx.limit(b, t);
    }

    lock(mValue = true) {
        this._isLockZoom = mValue;
        this._isLockRotation = mValue;
    }

    lockZoom(mValue = true) {
        this._isLockZoom = mValue;
    }


    lockRotation(mValue = true) {
        this._isLockRotation = mValue;
    }


    inverseControl(isInvert = true) {
        this._isInvert = isInvert;
    }

    removePress(v){
        this._removePress = v;
    }

    //  EVENT HANDLERES
    _onDown(mEvent) {
        if (this._isLockRotation) {
            return;
        }
        this._isMouseDown = true;
        getMouse(mEvent, this._mouse);
        getMouse(mEvent, this._preMouse);
        this._preRX = this._rx.targetValue;
        this._preRY = this._ry.targetValue;
    }


    _onMove(mEvent) {
        if (this._isLockRotation) {
            return;
        }
        getMouse(mEvent, this._mouse);
        if (mEvent.touches) { mEvent.preventDefault(); }

        if (this._isMouseDown) {
            let diffX = -(this._mouse.x - this._preMouse.x);
            if (this._isInvert) { diffX *= -1; }
            this._ry.value = this._preRY - diffX * 0.01;

            let diffY = -(this._mouse.y - this._preMouse.y);
            if (this._isInvert) { diffY *= -1; }
            this._rx.value = this._preRX - diffY * 0.01;
        }
    }


    _onUp() {
        if (this._isLockRotation) {
            return;
        }
        this._isMouseDown = false;
    }


    _onWheel(mEvent) {
        if (this._isLockZoom) {
            return;
        }
        let w = mEvent.wheelDelta;
        let d = mEvent.detail;
        let value = 0;
        if (d) {
            if (w) {
                value = w / d / 40 * d > 0 ? 1 : -1; // Opera
            } else {
                value = -d / 3; // Firefox;         TODO: do not /3 for OS X
            }
        } else {
            value = w / 120;
        }
        this.radius.add(-value * 2);
    }

    _loop() {
        this._updatePosition();

        if (this._target) {
            this._updateCamera();
        }
    }

    setPositionOffset(pos) {
        glm.vec3.set(this.positionOffset, ...pos);
        this._updatePosition();
        this._updateCamera();
    }

    setCenter(pos) {
        glm.vec3.set(this.center, ...pos);
        this._updateCamera();
    }

    _updatePosition() {
        this.position[1] = Math.sin(this._rx.value) * this.radius.value;
        let tr = Math.cos(this._rx.value) * this.radius.value;
        this.position[0] = Math.cos(this._ry.value + Math.PI * 0.5) * tr;
        this.position[2] = Math.sin(this._ry.value + Math.PI * 0.5) * tr;
        glm.vec3.add(this.position, this.position, this.positionOffset);
    }

    getNormalizedPosition() {
        glm.vec3.normalize(this.positionOffsetNorm, this.positionOffset)
        return this.positionOffsetNorm
    }

    _updateCamera() {
        this._target.lookAt(this.position, this.center, this._up);
    }


    //  GETTER / SETTER


    get rx() {
        return this._rx;
    }


    get ry() {
        return this._ry;
    }


}


export default FirstPersonControl;
