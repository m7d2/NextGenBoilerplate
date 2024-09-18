import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Sketch {
    constructor(options) {
        this.container = options.domElement;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.camera = new THREE.PerspectiveCamera(90, this.width / this.height, 0.01, 200);
        this.camera.position.z = 1;

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.time = 0;
        this.resize();
        this.addObjects();
        this.render();
        this.setupResize();

    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    setupResize() {
        window.addEventListener('resize', this.resize.bind(this));
    }

    addObjects() {
        // this.geometry = new THREE.SphereGeometry(15, 32, 16, 0, 6.3);
        this.geometry = new THREE.BoxGeometry(10, 10, 10);
        // this.material = new THREE.MeshBasicMaterial({ color: 0x12b0db });
        this.material = new THREE.MeshNormalMaterial();
        this.material.side = 2;

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    render() {
        this.time += 0.05;
        this.mesh.rotation.x = this.time / 2000;
        this.mesh.rotation.y = this.time / 1000;
        this.mesh.rotation.x += this.time * -0.80;
        this.mesh.rotation.y += (this.time * 0.50);

        this.renderer.render(this.scene, this.camera);
        console.log(this.mesh.rotation.x, this.mesh.rotation.y, this.mesh.position);
        requestAnimationFrame(this.render.bind(this))
    }
}