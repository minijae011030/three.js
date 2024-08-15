import * as THREE from "three";

export default function RenderTubeObjectFunction({ mountRef }) {
  // 씬 생성
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xff5733);

  // 카메라 설정 (FOV, aspect ratio, near, far)
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // WebGLRenderer 생성 및 그림자 활성화
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true; // 그림자 활성화

  // 렌더러를 mountRef가 가리키는 DOM 요소에 추가
  mountRef.current.appendChild(renderer.domElement);

  // 토러스 매듭 생성
  const radius = 3; // 반지름
  const tubeRadius = 1; // 관의 반지름
  const radialSegments = 100; // 방사형 세그먼트(튜브의 단면을 따라 얼마나 많은 세그먼트로 나눌 것인지)
  const tubularSegments = 10000; // 관형 세그먼트(토러스 매듭을 따라 얼마나 많은 세그먼트로 나눌 것인지)
  const p = 2; // 매듭 반복 횟수(매듭이 메인 루프를 한번 도는 동안 p번 반복됨)
  const q = 10; // 매듭이 꼬이는 횟수(매듭이 튜브 자채를 한번 도는 동안 q번 꼬임)
  const geometry = new THREE.TorusKnotGeometry(
    radius,
    tubeRadius,
    tubularSegments,
    radialSegments,
    p,
    q
  );

  const material = new THREE.MeshPhongMaterial({
    color: 0x2600ff,
    shininess: 100,
  });

  const torusKnot = new THREE.Mesh(geometry, material);
  torusKnot.castShadow = true;
  torusKnot.receiveShadow = true;
  scene.add(torusKnot);

  // 카메라 위치 설정
  camera.position.z = 15;

  // 조명 추가
  const ambientLight = new THREE.AmbientLight(0xbaf1ff);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // 애니메이션 함수
  const animate = function () {
    requestAnimationFrame(animate);

    // 토러스 매듭 회전
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;

    // 씬과 카메라를 사용하여 렌더링
    renderer.render(scene, camera);
  };

  animate();

  // 클린업 함수
  return () => {
    mountRef.current.removeChild(renderer.domElement);
  };
}
