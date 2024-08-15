import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  IcosahedronGeometry,
  MeshPhongMaterial,
  Mesh,
  AmbientLight,
  DirectionalLight,
  SpotLight,
} from "three";

export default function RenderObjectFunction({ mountRef }) {
  // 씬 생성
  const scene = new Scene();

  // 카메라 설정 (FOV, aspect ratio, near, far)
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // WebGLRenderer 생성 및 그림자 활성화
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true; // 그림자 활성화

  // 렌더러를 mountRef가 가리키는 DOM 요소에 추가
  mountRef.current.appendChild(renderer.domElement);

  // 이십면체 생성 (입체감 있는 재질 사용)
  const geometry = new IcosahedronGeometry(1, 0);
  const material = new MeshPhongMaterial({
    color: "skyblue",
    shininess: 100, // 광택도 설정
    specular: 0x222222, // 하이라이트 색상
  });
  const mesh = new Mesh(geometry, material);

  // 그림자 활성화
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add(mesh);

  // 카메라 위치 설정
  camera.position.z = 5;

  // 바닥 추가 (그림자가 투사될 곳)
  const floorGeometry = new IcosahedronGeometry(10, 1);
  const floorMaterial = new MeshPhongMaterial({ color: "gray" });
  const floor = new Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.5;
  floor.receiveShadow = true;

  scene.add(floor);

  // 조명 추가
  const ambientLight = new AmbientLight(0x404040); // 전체 조명
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(0xffffff, 1); // 방향성 조명
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const spotLight = new SpotLight(0xffffff, 0.5); // 추가 조명으로 입체감 향상
  spotLight.position.set(-5, 5, 5);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // 애니메이션 함수
  const animate = function () {
    requestAnimationFrame(animate);

    // 메쉬 회전
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    // 씬과 카메라를 사용하여 렌더링
    renderer.render(scene, camera);
  };

  animate();

  // 클린업 함수
  return () => {
    mountRef.current.removeChild(renderer.domElement);
  };
}
